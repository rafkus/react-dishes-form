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

const PizzaDetails = props => {
  return (
    <React.Fragment>
      <Field
        name="no_of_slices"
        type="number"
        component={renderField}
        label="Number of slices"
        parse={value => parseInt(value, 10)}
      />
      <Field
        name="diameter"
        type="number"
        component={renderField}
        label="diameter"
        parse={value => parseInt(value, 10)}
      />
    </React.Fragment>
  );
};

const SoupDetails = props => {
  return (
    <React.Fragment>
      <Field
        name="spiciness_scale"
        type="number"
        component={renderField}
        label="Spiciness scale"
        parse={value => parseInt(value, 10)}
        min={1}
        max={10}
      />
    </React.Fragment>
  );
};

const SandwichDetails = props => {
  return (
    <React.Fragment>
      <Field
        name="slices_of_bread"
        type="number"
        component={renderField}
        label="Slices of bread"
        parse={value => parseInt(value, 10)}
      />
    </React.Fragment>
  );
};

let DishForm = props => {
  const { error, handleSubmit, pristine, reset, submitting, dishType } = props;

  let dishDetails = null;

  switch (dishType) {
    case "pizza": dishDetails = <PizzaDetails />
      break;
    case "soup":
      dishDetails = <SoupDetails />;
      break;
    case "sandwich":
      dishDetails = <SandwichDetails />;
      break;
    default: dishDetails = null; // default value in redux-form is set to pizza
  }

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

DishForm = reduxForm({
  form: "dish",
  initialValues: {
    type: "pizza"
    // spiciness_scale: 5
  }
})(DishForm);

const selector = formValueSelector("dish");
DishForm = connect(state => {
  const type = selector(state, "type");
  return {
    dishType: type
  };
})(DishForm);

export default DishForm;
