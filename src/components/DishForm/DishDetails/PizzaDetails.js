import React from "react";
import { Field } from "redux-form";
import * as fieldNames from "../../../utils/constants/fieldNames";
import renderTextField from "../../../utils/renderTextField";

const PizzaDetails = props => {
  return (
    <React.Fragment>
      <Field
        name={fieldNames.NO_OF_SLICES}
        type="number"
        component={renderTextField}
        label="Number of slices"
        parse={value => (value === "" ? "" : parseInt(value, 10))} // because of NaN warning
      />
      <Field
        name={fieldNames.DIAMETER}
        type="number"
        component={renderTextField}
        label="Diameter"
        parse={value => (value === "" ? "" : parseFloat(value, 10))}
      />
    </React.Fragment>
  );
};

export default PizzaDetails;
