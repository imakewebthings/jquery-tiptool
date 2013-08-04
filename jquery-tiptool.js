/*!
  jQuery Tiptool - v0.0.1
  © 2013 - Caleb Troughton
  MIT Licensed: http://opensource.org/licenses/MIT
  For more information, visit https://github.com/imakewebthings/jquery-tiptool
*/
(function(undefined) {
  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], function($) {
        return factory($, root);
      });
    }
    return factory(root.jQuery, root);
  })(this, function($, window) {

    var Tiptool = function($element, overrides) {
      var dataOptions = {
        position: $element.data('tiptool-position')
      };

      this.options = $.extend(
        {},
        $.fn.tiptool.defaults,
        dataOptions,
        overrides
      );
      this.xPosition = this.options.position.match(/left|right/);
      this.xPosition = this.xPosition && this.xPosition[0];
      this.yPosition = this.options.position.match(/top|bottom/);
      this.yPosition = this.yPosition && this.yPosition[0];

      this.$element = $element;
      this._buildTooltip();
      this._bindEvents();
    };

    $.extend(Tiptool.prototype, {
      show: function() {
        this.$element.after(this.$tooltip);
        this._position();
      },

      hide: function() {
        this.$tooltip.detach();
      },

      destroy: function() {
        this.$tooltip.remove();
        this.$element.attr('title', this.title)
                     .off('.tiptool')
                     .removeData('tiptool-plugin');
      },

      _buildTooltip: function() {
        this.$tooltip = $(this.options.template).css('position', 'absolute');
        this.title = this.$element.attr('title');
        this.$tooltip.find(this.options.textSelector).text(this.title);
        this.$tooltip.addClass(
          'tiptool-' + this.options.position.replace(' ', '-')
        );
        this.$element.removeAttr('title');
      },

      _bindEvents: function() {
        this.$element.on('mouseenter.tiptool', $.proxy(this.show, this));
        this.$element.on('mouseleave.tiptool', $.proxy(this.hide, this));
      },

      _position: function() {
        var elementPosition = this.$element.position();
        var elementWidth = this.$element.innerWidth();
        var elementHeight = this.$element.innerHeight();
        var tooltipWidth = this.$tooltip.innerWidth();
        var tooltipHeight = this.$tooltip.innerHeight();
        var left, top;

        switch (this.xPosition) {
          case 'left':
            left = elementPosition.left - tooltipWidth - 1;
            break;
          case 'right':
            left = elementPosition.left + elementWidth + 1;
            break;
          default:
            left = elementPosition.left + (elementWidth - tooltipWidth) / 2;
            break;
        }

        switch (this.yPosition) {
          case 'top':
            top = elementPosition.top - tooltipHeight - 1;
            break;
          case 'bottom':
            top = elementPosition.top + elementHeight + 1;
            break;
          default:
            top = elementPosition.top + (elementHeight - tooltipHeight) / 2;
            break;
        }

        this.$tooltip.css({
          left: left,
          top: top
        });
      }
    });

    $.fn.tiptool = function() {
      var method = options = arguments[0];

      if ($.fn.tiptool.isTouch) {
        return this;
      }

      return this.each(function() {
        var $this = $(this);
        var plugin = $this.data('tiptool-plugin');

        if (plugin && method) {
          plugin[method]();
        }
        else if (!plugin) {
          $this.data('tiptool-plugin', new Tiptool($this, options));
        }
      });
    };

    $.fn.tiptool.defaults = {
      template: '<div class="tiptool"><span class="tiptool-text"></span></div>',
      textSelector: '.tiptool-text',
      position: 'bottom'
    };
    $.fn.tiptool.isTouch = ('ontouchstart' in window) ||
                           (navigator.maxTouchPoints > 0) ||
                           (navigator.msMaxTouchPoints > 0);
  });
})();