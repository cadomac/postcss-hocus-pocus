module.exports = (opts = {}) => {
  const target = /:[hp]ocus/;
  return {
    postcssPlugin: 'postcss-hocus',
    Rule(rule) {
      const newSelectors = []
      rule.selectors.forEach((selector, idx) => {

        if (target.test(selector)) {
          const preSelector = selector.slice(0, selector.indexOf(':'));

          newSelectors.push(`${preSelector}:hover`);
          newSelectors.push(`${preSelector}:focus`);

          if (selector.includes(':pocus')) {
            newSelectors.push(`${preSelector}:active`);
          }
        } else {
          newSelectors.push(selector)
        }
      })

      rule.selectors = newSelectors
    }
  }
}

module.exports.postcss = true
