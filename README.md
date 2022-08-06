# postcss-hocus-pocus <a href="https://github.com/postcss/postcss"><img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right"></a>

> **This project was originally created by [Kilian Valkhof](https://github.com/Kilian)!**

postcss-hocus-pocus fixes a tiny but annoying part of CSS: That you have to repeat yourself whenever you want to specify both `:hover` and `:focus`. Instead, you write `a:hocus`!

## Usage

```css
/* before */
a:hocus {
	color: red;
}

/* after */
a:hover,a:focus {
	color: red;
}
```
Additionally, you can write `a:pocus` to include the `:active` style:
```css
/* before */
a:pocus {
	color: red;
}

/* after */
a:hover,a:active,a:focus {
	color: red;
}
```
## Installation
**npm**

```bash
npm install --save-dev postcss-hocus-pocus
```

**yarn**

```bash
yarn add -D postcss-hocus-pocus
```
Then add in your PostCSS Config:

```js
postcss([
	require('postcss-hocus-pocus')
]);
```

### **WARNING: Load Order Matters!**

Say you had CSS that looked like this:

```css
.foo {
	&:hocus {
		color: red;
	}
}
```
If you want to make use of nested statements using [`postcss-nested`](https://github.com/postcss/postcss-nested), you need to load the `postcss-hocus-pocus` ***after:***

```js
postcss([
	require('postcss-nested'),
	require('postcss-hocus-pocus')
]);
```

Otherwise you're just gonna get a bunch of goofy-looking gobbledegook. In fact, I recommend you put this plugin as late in your load order as possible.