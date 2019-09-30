import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  inputProps
}) => (
  <div className="form__field">
    <FormControl fullWidth error={(touched && error) ? true : false}>
      <InputLabel htmlFor={inputProps.id}>{label}</InputLabel>
      <Select native {...input} inputProps={inputProps}>
        {children}
      </Select>
      <FormHelperText>{(touched && error) ? error : null}</FormHelperText>
    </FormControl>
  </div>
);

export default renderSelectField;
