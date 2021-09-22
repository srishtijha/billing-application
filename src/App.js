import React from 'react';
import { Bills } from './pages/bills/index';
import { TopMenu } from './components/top-menu/index'
import './App.css';

function App() {
  return (
    <div className="App">
      <TopMenu />
      <Bills />

    </div>
  );
}

export default App;
