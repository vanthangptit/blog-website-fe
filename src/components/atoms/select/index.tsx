import React from 'react';
import Select from 'react-select';
import { IFColourOption } from '@models/SelectOptions';

export default ({
  colourOptions,
  nameField,
  setUserChoice
}: {
  colourOptions: IFColourOption[],
  nameField: string
  setUserChoice: any
}) => {
  const onChange = (option: IFColourOption | null) => {
    setUserChoice(option);
  };

  return (
    <Select
      defaultValue={colourOptions[0]}
      // isClearable
      // isSearchable
      name={nameField}
      options={colourOptions}
      onChange={onChange}
    />
  );
};
