import './style.css'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerInputProps {
  label: string
  selected: Date
  onChange: (date: Date | null) => void
  minDate?: Date
  maxDate?: Date
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  selected,
  onChange,
  minDate,
  maxDate,
}) => {
  return (
    <div className="datepicker-container">
      <label className="datepicker-label">{label}</label>
      <div className="datepicker-wrapper">
        <DatePicker
          selected={selected}
          onChange={onChange}
          className="datepicker-input"
          minDate={minDate}
          maxDate={maxDate}
          popperClassName="datepicker-popper"
          calendarClassName="datepicker-calendar"
          wrapperClassName="datepicker-custom-wrapper"
        />
      </div>
    </div>
  )
}

export default DatePickerInput
