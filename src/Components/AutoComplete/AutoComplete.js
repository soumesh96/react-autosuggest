import React, { useState } from "react";

import { userList, highlightSuggestion } from "../../commonConfig";
import "../../App.css";

const Autocomplete = (props) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const onChange = (e) => {
    const userInput = e.target.value;

    const filteredSuggestions = userList.filter(
      (suggestion) =>
        suggestion.id.toLowerCase().indexOf(userInput.toLowerCase()) > -1 ||
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1 ||
        suggestion.address.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(userInput);
  };

  const onClick = (id) => {
    const selectedSuggestion = userList.filter(
      (suggestion) => suggestion.id === id
    )[0].name;
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(selectedSuggestion);
  };

  const onMouse = (id) => {
    setActiveSuggestion(id);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion].name);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        setActiveSuggestion(filteredSuggestions.length - 1);
      } else {
        setActiveSuggestion(activeSuggestion - 1);
      }
    } else if (e.keyCode === 40) {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        setActiveSuggestion(0);
      } else {
        setActiveSuggestion(activeSuggestion + 1);
      }
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li
                className={className}
                value={suggestion.name}
                key={suggestion.id}
                onClick={() => onClick(suggestion.id)}
                onMouseOver={() => onMouse(index)}
              >
                <div>
                  {highlightSuggestion(suggestion.id, userInput)}
                  {highlightSuggestion(suggestion.name, userInput)}
                  {highlightSuggestion(suggestion.address, userInput)}
                </div>
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="noSuggestions">No user Found</div>
      );
    }
  }

  return (
    <div className="autoCompleteWrapper">
      <p className="heading">Start Typing ...</p>
      <div>
        <input
          type="search"
          placeholder="Search Users by Id, Name, Address"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
      </div>
      <div>{suggestionsListComponent}</div>
    </div>
  );
};

export default Autocomplete;
