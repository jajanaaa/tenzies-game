import React, { useState, useEffect } from "react";
import "./App.css";
import Die from "./Die";
import { v4 as uuidv4 } from "uuid";
import Confetti from "react-confetti";
/**
 * Challenge: Tie off loose ends!
 * 1. If tenzies is true, Change the button text to "New Game"
 * 2. If tenzies is true, use the "react-confetti" package to
 *    render the <Confetti /> component 🎉
 *
 *    Hint: don't worry about the `height` and `width` props
 *    it mentions in the documentation.
 */

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    if (
      diceArray.every((val) => val.value === diceArray[0].value && val.isHeld)
    ) {
      setTenzies(true);
    }
  }, [diceArray]);

  function allNewDice() {
    const randomArray = Array(10)
      .fill()
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: uuidv4(),
      }));
    return randomArray;
  }

  function rerenderDice() {
    setDiceArray((prevDice) =>
      prevDice.map((dice) => {
        return dice.isHeld
          ? dice
          : { ...dice, value: Math.ceil(Math.random() * 6), id: uuidv4() };
      })
    );
    if (tenzies) {
      setDiceArray(allNewDice());
      setTenzies(false);
    }
  }

  // function rollDice() {
  //   if (!tenzies) {
  //     setDice((oldDice) =>
  //       oldDice.map((die) => {
  //         return die.isHeld ? die : generateNewDie();
  //       })
  //     );
  //   } else {
  //     setTenzies(false);
  //     setDice(allNewDice());
  //   }
  // }

  function holdDice(id) {
    setDiceArray((prevDice) =>
      prevDice.map((dice) => {
        return id === dice.id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  const createdDices = diceArray.map((dice) => (
    <Die
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
      <div className="die-wrapper">{createdDices}</div>
      <button onClick={rerenderDice}>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
