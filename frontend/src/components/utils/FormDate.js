import React from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormDate = ({ control }) => {
  return (
    <Controller
      defaultValue={Date.now()}
      name="submissionDate"
      control={control}
      render={({ onChange, value, ref }) => (
        <DatePicker
          selected={value}
          onChange={onChange}
          inputRef={ref}
          minDate={Date.now()}
          inline
          showTimeInput
        />
      )}
    />
  );
};

export default FormDate;
