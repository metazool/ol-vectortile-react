import React, { Component } from 'react';
import logo from './logo.svg';
import Map from './Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>OpenLayers / React / Vector Tiles</h2>
        </div>
        <Map/>
      </div>
    );
  }
}

export default App;
