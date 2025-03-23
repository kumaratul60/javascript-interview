# CSS and HTML Concepts with Examples

## CSS Preprocessors

CSS preprocessors are scripting language tools that allow you to write CSS in a more efficient and organized manner. They provide additional features that make managing and maintaining CSS code easier.

### Types of CSS Preprocessors:

1. **SCSS/SASS (Syntactically Awesome Stylesheets)** - Uses `.scss` or `.sass` file extensions.
2. **LESS** - Extends CSS by adding features like variables, mixins, and functions. Uses `.less` extension.
3. **Stylus** - Provides a more dynamic and expressive syntax. Uses `.styl` extension.

```scss
// Example in SCSS
$primary-color: blue;
body {
  background-color: $primary-color;
}
```

```less
// Example in LESS
@primary-color: blue;
body {
  background-color: @primary-color;
}
```

## HTML Basics

HTML (HyperText Markup Language) is the standard language for creating web pages.

### Common HTML Tags

```html
<!DOCTYPE html>
<html>
  <head>
    <title>HTML Basics</title>
  </head>
  <body>
    <h1>Heading 1</h1>
    <p>This is a paragraph.</p>
    <a href="#">This is a link</a>
    <img src="image.jpg" alt="Image" />
  </body>
</html>
```

### Semantic HTML Tags

Semantic tags clearly define the meaning of the content in HTML. Examples:

```html
<header>Website Header</header>
<nav>Navigation Menu</nav>
<article>Blog Post</article>
<section>Page Section</section>
<footer>Website Footer</footer>
```

## Difference Between `<b>` and `<strong>`

- `<b>` (Bold) is used for stylistic purposes without adding importance.
- `<strong>` indicates that the enclosed text is of high importance.

```html
<p>This is <b>bold</b> text.</p>
<p>This is <strong>strong</strong> text, which is more meaningful.</p>
```

## Selectors

Selectors are used to target specific elements in the HTML document and apply styles to them.

```html
<!-- Example Markup -->
<div id="unique">ID Selector</div>
<div class="my-class">Class Selector</div>
<p>Element Selector</p>
<input type="text" placeholder="Attribute Selector" />

<style>
  /* ID Selector */
  #unique {
    color: red;
  }

  /* Class Selector */
  .my-class {
    font-size: 20px;
  }

  /* Element Selector */
  p {
    color: green;
  }

  /* Attribute Selector */
  input[type="text"] {
    border: 2px solid blue;
  }
</style>
```

## Box Model

The box model consists of:

1. **Content** - The area where text or images appear.
2. **Padding** - Space around the content inside the border.
3. **Border** - The outer boundary surrounding the padding and content.
4. **Margin** - Space outside the border separating elements.

```html
<div class="box-model">Box Model Example</div>

<style>
  .box-model {
    width: 200px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
  }
</style>
```

## Display Properties

### Block Element

- Takes up the full width of its parent container.

```html
<div style="display: block; background-color: lightgray;">Block Element</div>
```

### Inline Element

- Takes up only as much width as necessary.

```html
<span style="display: inline; color: blue;">Inline Element</span>
```

## Z-Index

The `z-index` property controls the stacking order of positioned elements.

- Z-index: The z-index property is used to control the stacking order of positioned elements. It determines which element appears on top of others when they overlap.

- element with a higher z-index value will be placed on top of the element with a lower z-index value.

- if two element has the same z-index, the one that appears later in the HTML code will be on top.

```html
<div class="box1">Box 1</div>
<div class="box2">Box 2</div>

<style>
  .box1,
  .box2 {
    position: absolute;
    width: 100px;
    height: 100px;
  }

  .box1 {
    background-color: red;
    z-index: 1;
  }

  .box2 {
    background-color: blue;
    z-index: 2;
  }
</style>
```

## Positioning Elements

- Relative: relative positions an element relative to its normal position of the page.
- Absolute: absolute is positioned as per the parent element.

- Fixed: fixed will fix the position of element even if the page is scrolled.

- Sticky: Static: static is the default position of element. it is also a combination of relative and fixed.

### Relative vs Absolute vs Fixed vs Sticky

```html
<div class="relative">Relative Position</div>
<div class="absolute">Absolute Position</div>
<div class="fixed">Fixed Position</div>
<div class="sticky">Sticky Position</div>

<style>
  .relative {
    position: relative;
    left: 20px;
  }

  .absolute {
    position: absolute;
    top: 50px;
    left: 50px;
  }

  .fixed {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }

  .sticky {
    position: sticky;
    top: 0;
    background-color: yellow;
  }
</style>
```

This document provides an overview of key CSS and HTML concepts, including selectors, the box model, display properties, z-index, positioning, semantic tags, and the difference between `<b>` and `<strong>`.
