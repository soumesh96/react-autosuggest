import React from "react";
import './App.css';

import Autocomplete from "./Components/AutoComplete/AutoComplete";

function App() {
  return (
    <div className="mainWrapper">
      <h1 className="mainHeading">React AutoComplete</h1>
      <Autocomplete />
    </div>
  );
}

export default App;
