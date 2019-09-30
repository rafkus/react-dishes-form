import React from "react";
import { Field } from "redux-form";
import renderTextField from "../../../utils/renderTextField";
import * as fieldNames from "../../../utils/constants/fieldNames";

const SoupDetails = props => {
  return (
    <React.Fragment>
      <Field
        name={fieldNames.SPICINESS_SCALE}
        type="number"
        component={renderTextField}
        label="Spiciness scale (1-10)"
        parse={value => (value === "" ? "" : parseInt(value, 10))}
        inputProps={{ min: 1, max: 10 }}
      />
    </React.Fragment>
  );
};

export default SoupDetails;
