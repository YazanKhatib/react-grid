module.exports = {
  stories: ['../src/**/*.stories.mdx', '../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  framework: '@storybook/react',
  core: {
    builder: 'storybook-builder-vite',
  },
  typescript: {
    check: true, // type-check stories during Storybook build
  },
};
