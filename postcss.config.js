// postcss.config.js
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import prefixSelector from 'postcss-prefix-selector';

export default {
  plugins: [
    tailwindcss,
    autoprefixer,
    prefixSelector({
      prefix: ".falcon-seo-audit",
      transform: (prefix, selector, prefixedSelector) => {
        // avoid prefixing @keyframes etc
        if (selector.startsWith("@")) return selector;
        return prefixedSelector;
      },
    }),
  ],
};
