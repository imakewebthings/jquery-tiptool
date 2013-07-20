#jQuery Tiptool

- Master: [![Master Build Status](https://travis-ci.org/imakewebthings/jquery-tiptool.png?branch=master)](https://travis-ci.org/imakewebthings/jquery-tiptool)

Tiptool is a barebones tooltip plugin.

## Basic Usage

```js
$('.something-with-a-title').tiptool()
```

This will take the text in the `title` attribute and show it in a stylable tooltip. The tooltip HTML is injected as the next sibling and looks like this:

```html
<div class="tiptool" aria-role="dialog">
  <span class="tiptool-text">Title Text Here</span>
</div>
```

By default, the tooltip will be shown directly under the element on hover. The `title` will also be removed to prevent the native tooltip from showing. If a touch device is detected, this script will do nothing at all.

## Options

- **template** - The snippet of tooltip HTML that will be injected after the subject element.
- **textSelector** - Selector that matches where the tooltip text will be rendered.
- **position** - A String representing where in relation to the element the tooltip will be shown. Possible values are:
  - "top"
  - "bottom"
  - "left"
  - "right"
  - "top left"
  - "top right"
  - "bottom left"
  - "bottom right"
  

## Defaults

```js
{
  template: '<div class="tiptool" aria-role="dialog"><span class="tiptool-text"></span></div>',
  textSelector: '.tiptool-text',
  position: 'bottom'
}
```

## Declarative Equivalents

The `position` option can also be set with a data attribute.

```html
<a href="http://imakewebthings.com" title="Personal Site" data-tiptool-position="top right">...</a>
```

## Methods

There are a few methods you can manually invoke by passing their names to the `tiptool` function.

```js
$someElement.tiptool('show');
$someElement.tiptool('hide');
```

These do what they say on the tin.

```js
$someElement.tiptool('destroy');
```

This will undo anything done in initialization, killing the tooltip and restoring the original title attribute.

## What About Styling?

This repository includes no CSS. Besides positioning done by the script, it is up to you to style the tooltip to fit your needs.

## Changelog

- 0.0.1: Initial release.

## License

© 2013 - Caleb Troughton. Licensed under the [MIT license](http://opensource.org/licenses/MIT).