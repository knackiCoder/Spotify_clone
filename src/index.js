import React from 'react';
import reactDom from 'react-dom';
import App from './App';
import "./index.css"
import { DataLayer } from "./DataLayer"
import reducer, { initialState } from './reducer';

reactDom.render(
    <DataLayer initialState={initialState} reducer={reducer}>
        <App />
    </DataLayer>, document.querySelector('#root'));