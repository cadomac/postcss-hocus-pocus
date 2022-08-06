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

test('should convert `hocus` to `hover` and `focus`', hocusTest())
test('should convert `pocus` to `hover`, `focus`, and `active`', pocusTest())

test.run();