import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { SubmissionError, formValueSelector } from "redux-form";

import renderField from "../../utils/renderField";

import PizzaDetails from "./DishDetails/PizzaDetails";
import SoupDetails from "./DishDetails/SoupDetails";
import SandwichDetails from "./DishDetails/SandwichDetails";

import * as dishTypes from "../../utils/constants/dishTypes";
import * as fieldNames from "../../utils/constants/fieldNames";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function submit(values) {
  return sleep(100).then(() => {
    console.log(values);

    throw new SubmissionError({
      username: "User does not exist",
      _error: "Login failed!"
    });
  });
}

let DishForm = props => {
  const { error, handleSubmit, pristine, reset, submitting, dishType } = props;

  let dishDetails = null;

  switch (dishType) {
    case dishTypes.PIZZA:
      dishDetails = <PizzaDetails />;
      break;
    case dishTypes.SOUP:
      dishDetails = <SoupDetails />;
      break;
    case dishTypes.SANDWICH:
      dishDetails = <SandwichDetails />;
      break;
    default:
      dishDetails = null; // default value in redux-form is set to pizza
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field
        name={fieldNames.NAME}
        type="text"
        component={renderField}
        label="Name"
      />
      <Field
        name={fieldNames.PREPARATION_TIME}
        type="text"
        component={renderField}
        label="Preparation time"
      />

      <div>
        <label>Dish type</label>
        <div>
          <Field name="type" component="select">
            <option value={dishTypes.PIZZA}>Pizza</option>
            <option value={dishTypes.SOUP}>Soup</option>
            <option value={dishTypes.SANDWICH}>Sandwich</option>
          </Field>
        </div>
      </div>

      {dishDetails}

      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Log In
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

const FORM_NAME = "dish";
DishForm = reduxForm({
  form: FORM_NAME,
  initialValues: {
    type: dishTypes.PIZZA
  }
})(DishForm);

const selector = formValueSelector(FORM_NAME);
DishForm = connect(state => {
  const type = selector(state, fieldNames.DISH_TYPE);
  return {
    dishType: type
  };
})(DishForm);

export default DishForm;
