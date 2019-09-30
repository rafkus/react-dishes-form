import React from "react";
import TextField from "@material-ui/core/TextField";

const renderTextField = ({
  label,
  input,
  type,
  meta: { touched, invalid, error },
  // ...custom // solution based on documentation but does not work beacuse of some "forEach" error. 
  inputProps
}) => {
 
  return (
    <div className="form__field">
      <TextField
        type={type}
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        inputProps={inputProps}
        fullWidth={true}
        // {...custom}
      />
    </div>
  );
}

export default renderTextField;
