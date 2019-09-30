import React from "react";
import { Field, reduxForm } from "redux-form";

const submit = values => {
    console.log(values)
  }

let DishForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

DishForm = reduxForm({
  form: "dish"
})(DishForm);

export default DishForm;
