import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  reduxForm,
  Field,
  SubmissionError,
  formValueSelector
} from "redux-form";

import * as dishTypes from "../../utils/constants/dishTypes";
import * as fieldNames from "../../utils/constants/fieldNames";
import normalizePreparationTime from "../../utils/normalizePreparationTime";

import renderTextField from "../../utils/renderTextField";
import renderSelectField from "../../utils/renderSelectField";

import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

import PizzaDetails from "./DishDetails/PizzaDetails";
import SoupDetails from "./DishDetails/SoupDetails";
import SandwichDetails from "./DishDetails/SandwichDetails";

const submit = values => {
  const URL = "https://frosty-wood-6558.getsandbox.com:443/dishes";
  return axios
    .post(URL, values)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      throw new SubmissionError({
        ...error.response.data,
        _error: "Please fill out the form correctly"
      });
    });
};

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
      <option></option>
        <option value={dishTypes.PIZZA}>Pizza</option>
        <option value={dishTypes.SOUP}>Soup</option>
        <option value={dishTypes.SANDWICH}>Sandwich</option>
      </Field>

      {dishDetails}

      {error && (
        <Typography variant="body1" gutterBottom>
          {error}
        </Typography>
      )}

      <div style={{ marginTop: "2rem" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          Submit
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
  // initialValues: {
    // type: dishTypes.PIZZA
  // }
})(DishForm);

const selector = formValueSelector(FORM_NAME);
DishForm = connect(state => {
  const type = selector(state, fieldNames.DISH_TYPE);
  return {
    dishType: type
  };
})(DishForm);

export default DishForm;
