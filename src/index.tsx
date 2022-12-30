import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export * from './components/grid';
export * from './components/tabs';

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */

export const App: React.FC = () => {
  return <h1>App</h1>;
};

ReactDOM.render(<App />, document.getElementById('root'));
