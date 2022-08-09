const { test } = require("uvu");
const assert = require('uvu/assert');

const postcss = require('postcss');
const hocus = require('../index');

const hFixture = `
  a:hocus {
    color: red;
  }`;

const pFixture = `
  a:pocus {
    color: red;
  }`;

const hExpected = `
  a:hover, a:focus {
    color: red;
  }`;

const pExpected = `
  a:hover, a:focus, a:active {
    color: red;
  }`;

const hocusTest = () => {
    return async () => {
        const result = await postcss(hocus()).process(
            hFixture,
            { from: undefined }
        );

        assert.is(result.css, hExpected);
    }
}

const pocusTest = () => {
    return async () => {
        const result = await postcss(hocus()).process(
            pFixture,
            { from: undefined }
        );

        assert.is(result.css, pExpected);
    }
}

const followTest = () => {
  return async () => {
    const result = await postcss(hocus()).process(
      `
        a:hocus > span, p:hocus .foo {
          color: red;
        }
      `,
      { from: undefined }
    );

    assert.is(
      result.css,
      `
        a:hover > span, a:focus > span, p:hover .foo, p:focus .foo {
          color: red;
        }
      `
    )
  }
}

test('should convert `hocus` to `hover` and `focus`', hocusTest())
test('should convert `pocus` to `hover`, `focus`, and `active`', pocusTest())
test('should convert `hocus` and retain selectors following it', followTest())

test.run();