import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'typeface-roboto';

const appToRender = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

appToRender();
