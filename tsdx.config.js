const cssnano = require('cssnano');
const postcss = require('rollup-plugin-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const images = require('@rollup/plugin-image');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      images({ include: ['**/*.png', '**/*.jpg', '**/*.svg'] }),
      postcss({
        plugins: [
          autoprefixer(),
          tailwindcss({
            purge: ['./src/**/*.tsx'],
            darkMode: false, // or 'media' or 'class'
            theme: {
              extend: {},
            },
            variants: {
              extend: {},
            },
            plugins: [],
          }),
        ],
        inject: true,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta,
      })
    );

    config.plugins.unshift(images());

    return config;
  },
};
