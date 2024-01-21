import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { subYears } from 'date-fns';

const DateTimePicker = ({
  placeholder,
  $height,
  $with,
  date,
  setDate,
  $maxDate,
  $minDate
}: {
  $height?: string
  $with?: string
  placeholder?: string
  date: Date | null
  setDate: (data: null | Date) => void
  $maxDate?: Date
  $minDate?: Date
}) => {
  return (
    <DatePickerBox $height={$height} $with={$with}>
      <DatePicker
        wrapperClassName={'datetime-picker-box'}
        className={'datetime-picker-input'}
        placeholderText={placeholder}
        selected={date}
        onChange={(date) => setDate(date)}
        showYearDropdown
        showMonthDropdown
        maxDate={$maxDate ?? null}
        minDate={$minDate ? subYears($minDate, 100) : null}
        dropdownMode="select"
        dateFormat="dd/MM/yyyy"
      />
    </DatePickerBox>
  );
};

export default DateTimePicker;

const DatePickerBox = styled.div<{ $height?: string; $with?: string }>`
  margin-bottom: 25px;

  .datetime-picker-box {
    display: flex;
  }

  .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after {
    top: 1px;
  }

  .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before {
    top: 0px;
    border-bottom-color: #aeaeae;
  }

  .react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::after, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after {
    left: -25px;
  }
  
  .react-datepicker__header__dropdown {
    padding: 10px 0;
  }

  .react-datepicker__month-select,
  .react-datepicker__year-select {
    padding: 2px;
    border-color: ${({ theme }) => theme.gray5};
    border-radius: 4px;
  }

  .datetime-picker-input {
    width: ${({ $with }) => $with ? $with : 'auto'};
    padding: 10px 15px;
    height: ${({ $height }) => $height ? $height : 'auto'};
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg0};
    border: 1px solid ${({ theme }) => theme.inputPlaceholder};

    &::placeholder {
      color: ${({ theme }) => theme.inputPlaceholder};
      opacity: 1; /* Firefox */
    }

    &::-ms-input-placeholder { /* Edge 12 -18 */
      color: ${({ theme }) => theme.inputPlaceholder};
    }
  }
`;