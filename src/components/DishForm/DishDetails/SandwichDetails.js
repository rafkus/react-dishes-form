import React from 'react';
import { Field } from "redux-form";
import renderTextField from '../../../utils/renderTextField';
import * as fieldNames from '../../../utils/constants/fieldNames';

const SandwichDetails = (props) => {
  return (
    <React.Fragment>
      <Field
        name={fieldNames.SLICES_OF_BREAD}
        type="number"
        component={renderTextField}
        label="Slices of bread"
        parse={value => (value === "" ? "" : parseInt(value, 10))}
      />
    </React.Fragment>
  );
};
export default SandwichDetails
