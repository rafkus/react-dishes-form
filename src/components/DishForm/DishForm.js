import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { SubmissionError, formValueSelector } from "redux-form";

import renderTextField from "../../utils/renderTextField";
import renderSelectField from "../../utils/renderSelectField";
import normalizePreparationTime from "../../utils/normalizePreparationTime";

import Button from "@material-ui/core/Button";
import PizzaDetails from "./DishDetails/PizzaDetails";
import SoupDetails from "./DishDetails/SoupDetails";
import SandwichDetails from "./DishDetails/SandwichDetails";

import * as dishTypes from "../../utils/constants/dishTypes";
import * as fieldNames from "../../utils/constants/fieldNames";

// todo fix parse - there is an warning bacause of NaN

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function submit(values) {
  return sleep(100).then(() => {
    console.log(values);

    throw new SubmissionError({
      name: "User does not exist",
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
      <Field name={fieldNames.NAME} component={renderTextField} label="Name" />

      <Field
        name={fieldNames.PREPARATION_TIME}
        component={renderTextField}
        label="Preparation time"
        normalize={normalizePreparationTime}
      />

      <Field
        name={fieldNames.DISH_TYPE}
        component={renderSelectField}
        label="Dish type"
        inputProps={{ id: "dish-type", name: fieldNames.DISH_TYPE }}
      >
        <option value={dishTypes.PIZZA}>Pizza</option>
        <option value={dishTypes.SOUP}>Soup</option>
        <option value={dishTypes.SANDWICH}>Sandwich</option>
      </Field>

      {dishDetails}

      {error && <strong>{error}</strong>}
      <div style={{marginTop: '20px'}}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          Primary
        </Button>

        <Button
          variant="contained"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear values
        </Button>
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
