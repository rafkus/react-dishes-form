import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { SubmissionError, formValueSelector } from "redux-form";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function submit(values) {
  return sleep(1000).then(() => {
    console.log(values);

    throw new SubmissionError({
      username: "User does not exist",
      _error: "Login failed!"
    });
  });
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

let DishForm = props => {
  const { error, handleSubmit, pristine, reset, submitting, dishType } = props;
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field name="name" type="text" component={renderField} label="Name" />
      <Field
        name="preparation_time"
        type="text"
        component={renderField}
        label="Preparation time"
      />

      <div>
        <label>Dish type</label>
        <div>
          <Field name="type" component="select">
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </Field>
        </div>
      </div>

      <p>type: {dishType} </p>

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

const selector = formValueSelector("dish");

DishForm = reduxForm({
  form: "dish",
  initialValues: {
    type: "pizza"
  }
})(DishForm);

DishForm = connect(state => {
  const type = selector(state, "type");
  return {
    dishType: type
  };
})(DishForm);

export default DishForm;
