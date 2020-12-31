import React from 'react';
import ReactDOM from 'react-dom';
import Router from './app';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Router/>
  </BrowserRouter>,
  document.querySelector('#root')
);
