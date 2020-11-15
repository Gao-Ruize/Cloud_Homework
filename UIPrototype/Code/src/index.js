import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import BasicRouter from "./Router";

ReactDOM.render(
  <React.StrictMode>
    <BasicRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
