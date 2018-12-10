import React from 'react';
import asyncComponent from './asyncComp';
import * as Babel from '@babel/standalone';
import SharedComponent from './shared-component';

function loadRemoteComponent(url) {
  return fetch(url)
    .then(res => res.text())
    .then(source => {
      var exports = {}
      function require(name) {
        if (name == 'react') return React
        else if (name == 'shared-component') return SharedComponent
        else throw `You can't use modules other than "react" or "shared-component" in remote component.`
      }
      const transformedSource = Babel
        .transform(source, { presets: ['react', 'es2015'] }).code;

      eval(transformedSource)
      return transformedSource.__esModule ? exports.default : exports

    })
}

const asyncLoadComponent = () => (
  loadRemoteComponent('https://codepen.io/chasewackerfuss/pen/YdzaMY.babel')
  // loadRemoteComponent('https://codepen.io/chasewackerfuss/pen/YdzaMY.js')
);

const AsyncComp = asyncComponent(asyncLoadComponent);

const container = () => {
  return (
    <div>
      <SharedComponent location='LOCAL' />
      <AsyncComp />
    </div>
  );
};

export default container;