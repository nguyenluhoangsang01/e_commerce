import { Grid, TextField } from "@material-ui/core";
import React from "react";

const Input = ({ name, label, register, required }) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        label={label}
        fullWidth
        {...register(name, { required })}
        required={required}
      />
    </Grid>
  );
};

export default Input;
