import React, { Component } from 'react';
import {hydrate} from 'react-dom';
import App from './App';
//console.log(document.getElementById('root'));
hydrate(
    <App/>,document.getElementById('root')
)