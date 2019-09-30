import React from "react";
import DishForm from "./components/DishForm/DishForm";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Notes />
      <h1>Dish form</h1>
      <DishForm></DishForm>
    </div>
  );
}

const Notes = () => {
  return (
    <div>
      <h2>Notes:</h2>
      <ul>
        <li>Succesfull submit will be displayed in console.</li>
        <li>Couldn't figure out yet how to connect MD Slider with redux-form.</li>
        <li>Preparation time is not very user friendly while editing.</li>
        <li>There could be redundant data in submitted JSON. </li>
      </ul>
      <p>Read more at github: <a href="https://github.com/rafkus/react-dishes-form">source</a></p>
    </div>
  );
};

export default App;
