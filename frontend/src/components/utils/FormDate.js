import React from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormDate = ({ control }) => {
  return (
    <Controller
      defaultValue={new Date()}
      name="submissionDate"
      control={control}
      render={({ onChange, value, ref }) => (
        <div data-testid="DatePickerContainer">
          <DatePicker
            selected={value}
            onChange={onChange}
            inputRef={ref}
            minDate={new Date()}
            inline
            showTimeInput
          />
        </div>
      )}
    />
  );
};

export default FormDate;
