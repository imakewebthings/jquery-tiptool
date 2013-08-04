describe('jQuery Tiptool', function() {
  var $tipped, $tool, $returned;

  beforeEach(function() {
    $.fn.tiptool.isTouch = false;
    setFixtures('<div class="tipped" title="test title" />');
    $tipped = $('.tipped');
  });

  describe('with default options', function() {
    beforeEach(function() {
      $returned = $tipped.tiptool();
    });

    describe('#init', function() {
      it('returns the element for chaining', function() {
        expect($returned).toEqual($tipped);
      });

      it('removes the title attribute', function() {
        expect($tipped).not.toHaveAttr('title', 'test title');
      });
    });

    describe('#show', function() {
      beforeEach(function() {
        $returned = $tipped.tiptool('show');
        $tool = $('.tiptool');
      });

      it('returns the same element for chaining', function() {
        expect($returned).toEqual($tipped);
      });

      it('appends tooltip directly after subject element', function() {
        expect($tipped.next()).toHaveClass('tiptool');
      });

      it('fills tooltip text with element title', function() {
        expect($tool.find('.tiptool-text')).toHaveText('test title');
      });

      it('shows on mouse hover', function() {
        $tipped.tiptool('hide');
        $tipped.trigger('mouseenter');
        expect($tipped.next()).toHaveClass('tiptool');
      });
    });

    describe('#hide', function() {
      beforeEach(function() {
        $tipped.tiptool('show');
        $tool = $('.tiptool');
      });

      it('removes tooltip from the DOM', function() {
        $tipped.tiptool('hide');
        expect($tool.closest('body')).not.toExist();
      });

      it('hides when the mouse leaves', function() {
        $tipped.trigger('mouseleave');
        expect($tool.closest('body')).not.toExist();
      });
    });

    describe('#destroy', function() {
      beforeEach(function() {
        $tipped.tiptool('show');
        $tool = $('.tiptool');
        $tipped.tiptool('destroy');
      });

      it('removes the tooltip element', function() {
        expect($tool).not.toExist();
      });

      it('destroys the plugin on the element', function() {
        expect($tipped).not.toHaveData('tiptool-plugin');
      });

      it('restores the old title attribute', function() {
        expect($tipped).toHaveAttr('title', 'test title');
      });
    });
  });

  describe('with custom options', function() {
    describe('template and textSelector', function() {
      beforeEach(function() {
        $tipped.tiptool({
          template: '<div class="cust"><span class="cust-text"></span></div>',
          textSelector: '.cust-text'
        });
        $tipped.tiptool('show');
        $tool = $('.cust');
      });

      it('uses custom template', function() {
        expect($tool).toExist();
      });

      it('fills text in textSelector element', function() {
        expect($('.cust-text')).toHaveText('test title');
      });
    });

    describe('positions', function() {
      beforeEach(function() {
        $tipped.css({
          position:'absolute',
          left:1,
          top:1,
          width:1,
          height:1
        });
      });

      describe('top', function() {
        beforeEach(function() {
          $tipped.tiptool({ position:'top' });
          $tipped.tiptool('show');
          $tool = $('.tiptool');
        });

        it('appears above', function() {
          expect(parseInt($tool.css('top'), 10)).toBeLessThan(1);
        });

        it('adds top position class to tooltip', function() {
          expect($tool).toHaveClass('tiptool-top');
        });
      });

      describe('bottom', function() {
        beforeEach(function() {
          $tipped.tiptool({ position:'bottom' });
          $tipped.tiptool('show');
          $tool = $('.tiptool');
        });

        it('appears below', function() {
          expect(parseInt($tool.css('top'), 10)).toBeGreaterThan(1);
        });

        it('adds bottom position class to tooltip', function() {
          expect($tool).toHaveClass('tiptool-bottom');
        });
      });

      describe('left', function() {
        beforeEach(function() {
          $tipped.tiptool({ position:'left' });
          $tipped.tiptool('show');
          $tool = $('.tiptool');
        });

        it('appears to the left', function() {
          expect(parseInt($tool.css('left'), 10)).toBeLessThan(1);
        });

        it('adds left position class to tooltip', function() {
          expect($tool).toHaveClass('tiptool-left');
        });
      });

      describe('right', function() {
        beforeEach(function() {
          $tipped.tiptool({ position:'right' });
          $tipped.tiptool('show');
          $tool = $('.tiptool');
        });

        it('appears to the right', function() {
          expect(parseInt($tool.css('left'), 10)).toBeGreaterThan(1);
        });

        it('adds right position class to tooltip', function() {
          expect($tool).toHaveClass('tiptool-right');
        });
      });

      describe('top left', function() {
        beforeEach(function() {
          $tipped.tiptool({ position:'top left' });
          $tipped.tiptool('show');
          $tool = $('.tiptool');
        });

        it('appears above', function() {
          expect(parseInt($tool.css('top'), 10)).toBeLessThan(1);
        });

        it('appears to the left', function() {
          expect(parseInt($tool.css('left'), 10)).toBeLessThan(1);
        });

        it('adds top-left position class to tooltip', function() {
          expect($tool).toHaveClass('tiptool-top-left');
        });
      });

      describe('top right', function() {
        beforeEach(function() {
          $tipped.tiptool({ position:'top right' });
          $tipped.tiptool('show');
          $tool = $('.tiptool');
        });

        it('appears above', function() {
          expect(parseInt($tool.css('top'), 10)).toBeLessThan(1);
        });

        it('appears to the right', function() {
          expect(parseInt($tool.css('left'), 10)).toBeGreaterThan(1);
        });

        it('adds top-right position class to tooltip', function() {
          expect($tool).toHaveClass('tiptool-top-right');
        });
      });

      describe('bottom left', function() {
        beforeEach(function() {
          $tipped.tiptool({ position:'bottom left' });
          $tipped.tiptool('show');
          $tool = $('.tiptool');
        });

        it('appears below', function() {
          expect(parseInt($tool.css('top'), 10)).toBeGreaterThan(1);
        });

        it('appears to the left', function() {
          expect(parseInt($tool.css('left'), 10)).toBeLessThan(1);
        });

        it('adds bottom-left position class to tooltip', function() {
          expect($tool).toHaveClass('tiptool-bottom-left');
        });
      });

      describe('bottom right', function() {
        beforeEach(function() {
          $tipped.tiptool({ position:'bottom right' });
          $tipped.tiptool('show');
          $tool = $('.tiptool');
        });

        it('appears below', function() {
          expect(parseInt($tool.css('top'), 10)).toBeGreaterThan(1);
        });

        it('appears to the left', function() {
          expect(parseInt($tool.css('left'), 10)).toBeGreaterThan(1);
        });

        it('adds bottom-left position class to tooltip', function() {
          expect($tool).toHaveClass('tiptool-bottom-right');
        });
      });
    });
  });

  describe('declarative options', function() {
    beforeEach(function() {
      setFixtures('<div class="tipped" />');
      $tipped = $('.tipped').tiptool();
    });
  });
});