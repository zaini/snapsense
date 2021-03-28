import React from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormDate = ({ control, dateIn }) => {
  const intitialDate = dateIn || new Date();
  return (
    <Controller
      defaultValue={intitialDate}
      name="submissionDate"
      control={control}
      render={({ onChange, value, ref }) => (
        <div data-testid="DatePickerContainer">
          <DatePicker
            selected={value}
            onChange={onChange}
            inputRef={ref}
            minDate={intitialDate}
            inline
            showTimeInput
          />
        </div>
      )}
    />
  );
};

export default FormDate;
