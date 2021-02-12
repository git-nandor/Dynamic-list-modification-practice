import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [validationText, setValidationText] = useState("");
  const [characterIds, setCharacterIds] = useState([]);
  const [characterButtons, setCharacterButtons] = useState([]);

  const onChangeHandler = (userInputText) => {
    setInputText(userInputText);
  };

  const handleCharacterRemove = (id) => {
    const characterIndex = characterIds.findIndex((characterId) =>
      [id].includes(characterId)
    );

    let textArrayForRemoveCharacter = inputText.split("");
    textArrayForRemoveCharacter.splice(characterIndex, 1);

    setInputText(textArrayForRemoveCharacter.join(""));
  };

  const generateCharacterIds = () => {
    const ids = inputText.split("").map((character, index) => {
      return uuidv4();
    });
    setCharacterIds(ids);
  };

  const generateCharacterButtons = () => {
    const buttons = inputText.split("").map((character, index) => (
      <button
        key={characterIds[index]}
        id={characterIds[index]}
        onClick={(e) => {
          handleCharacterRemove(e.target.id);
        }}
      >
        {character}
      </button>
    ));
    setCharacterButtons(buttons);
  };

  const checkValidation = () => {
    if (inputText.length === 0) {
      setValidationText("");
    } else if (inputText.length < 6) {
      setValidationText("Text too short");
    } else if (inputText.length > 6) {
      setValidationText("Text long enough");
    }
  };

  useEffect(() => {
    generateCharacterIds();
  }, [inputText]);

  useEffect(() => {
    generateCharacterButtons();
    checkValidation();
  }, [characterIds]);

  return (
    <div className="App">
      <h1>Dynamic list modification practice</h1>
      <h2>Write something and click buttons for removeing characters</h2>
      <div className="custom_input">
        <div>Validation:{validationText}</div>
        <input
          id="user_input"
          type="text"
          value={inputText}
          onChange={(e) => {
            onChangeHandler(e.target.value);
          }}
        />
        <p>Characters: {inputText.length}</p>
        <div className="character_remove_buttons">{characterButtons}</div>
      </div>
    </div>
  );
}
