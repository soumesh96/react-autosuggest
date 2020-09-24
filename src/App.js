import React from "react";
import './App.css';

import Autocomplete from "./Components/AutoComplete/AutoComplete";
import { userList } from './UserList';


function App() {
  return (
    <div className="mainWrapper">
      <h1 className="mainHeading">React AutoComplete</h1>
      <Autocomplete
        suggestions={userList}
      />
    </div>
  );
}

export default App;
