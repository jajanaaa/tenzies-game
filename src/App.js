import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import { v4 as uuidv4 } from "uuid"; // random id
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false); // check if a user won

  function allNewDice() {
    const randomArray = Array(10)
      .fill()
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: uuidv4(),
      }));
    return randomArray; // return array of 10 elements with random numbers from 1 to 6
  }

  useEffect(() => {
    if (
      diceArray.every(
        (dice) => dice.value === diceArray[0].value && dice.isHeld
      )
    ) {
      setTenzies(true);
    }
  }, [diceArray]);

  function rollDice() {
    if (!tenzies) {
      setDiceArray((prevDice) =>
        prevDice.map((dice) => {
          return dice.isHeld
            ? dice
            : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: uuidv4(),
              };
        })
      );
    } else {
      setTenzies(false);
      setDiceArray(allNewDice());
    }
  }

  function holdDice(id) {
    setDiceArray((prevDice) =>
      prevDice.map((dice) => {
        return id === dice.id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  const createdDices = diceArray.map((dice) => (
    <Dice
      value={dice.value}
      isHeld={dice.isHeld}
      key={dice.id}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <main className="App">
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-wrapper">{createdDices}</div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
