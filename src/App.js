import React, { useState } from "react";
import "./App.css";
import Die from "./Die";
/**
 * Challenge: Create a function `holdDice` that takes
 * `id` as a parameter. For now, just have the function
 * console.log(id).
 *
 * Then, figure out how to pass that function down to each
 * instance of the Die component so when each one is clicked,
 * it logs its own unique ID property. (Hint: there's more
 * than one way to make that work, so just choose whichever
 * you want)
 *
 */
function App() {
  const [diceArray, setDiceArray] = useState(allNewDice());

  function allNewDice() {
    const randomArray = Array(10)
      .fill()
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      }));
    return randomArray;
  }

  const createdDices = diceArray.map((value) => {
    return <Die value={value.value} isHeld={value.isHeld} />;
  });

  function rerenderDice() {
    setDiceArray(allNewDice());
  }

  return (
    <main className="App">
      <div className="die-wrapper">{createdDices}</div>
      <button onClick={rerenderDice}>Roll</button>
    </main>
  );
}

export default App;
