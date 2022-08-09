module.exports = (opts = {}) => {
  const target = /:[hp]ocus/;
  return {
    postcssPlugin: 'postcss-hocus-pocus',
    Rule(rule) {
      const newSelectors = []
      rule.selectors.forEach((selector, idx) => {

        if (target.test(selector)) {

          const colonIndex = selector.indexOf(':')
          const preSelector = selector.slice(0, colonIndex);
          let postSelector = ''

          if (selector.length - colonIndex - 1 !== 5) {
            postSelector = selector.slice(colonIndex+6,)
          }

          newSelectors.push(`${preSelector}:hover${postSelector}`);
          newSelectors.push(`${preSelector}:focus${postSelector}`);

          if (selector.includes(':pocus')) {
            newSelectors.push(`${preSelector}:active${postSelector}`);
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
