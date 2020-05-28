import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/card'

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <Card number={10} hidden={false} owner={true} />
      <Card number={50} hidden={true} owner={true} />
      <Card number={20} hidden={false} owner={true} />
    </div>
  );
}

export default App;
