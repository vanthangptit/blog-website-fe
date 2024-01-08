import React from 'react';
import Select from 'react-select';
import { IFColourOption } from '@models/SelectOptions';
import { LabelField } from '@components/atoms/Label';
import styled from 'styled-components';
import { FormState, Control, ControllerRenderProps } from 'react-hook-form';
import { MessageError } from '@components/atoms/MessageError';

type NameField = 'visibility';

export default ({
  control,
  Controller,
  formState,
  colourOptions,
  nameField,
  textEr,
  label,
  height,
  classNamePrefix
}: {
  formState: FormState<any>
  Controller: any,
  control: Control<any>
  colourOptions: IFColourOption[],
  nameField: NameField
  textEr: string
  label: string
  height?: string
  classNamePrefix?: string
}) => {
  return (
    <SelectBox $height={height}>
      <LabelField>{label}</LabelField>
      <DivController>
        <Controller
          control={control}
          name={nameField}
          render={({ field: { onChange, value, name } }: { field:  ControllerRenderProps<IFColourOption> }) => {
            return (
              <Select
                classNamePrefix={classNamePrefix ?? ''}
                value={colourOptions.find((c) => c.value === (value ?? colourOptions[0].value))}
                name={name}
                options={colourOptions}
                onChange={(selectedOption: IFColourOption | null) => {
                  selectedOption && onChange(selectedOption.value);
                }}
              />
            );
          }}
        />
      </DivController>

      {formState.errors[nameField] && <MessageError>{textEr}</MessageError>}
    </SelectBox>
  );
};

const SelectBox = styled.div<{ $height?: string }>`
  .react-select__control {
    border: 1px solid ${({ theme }) => theme.inputPlaceholder};
    height: ${({ $height }) => $height ?? 'auto'};
    background-color: ${({ theme }) => theme.bg0};
  }

  .react-select__single-value {
    color: ${({ theme }) => theme.text1};
  }
`;

const DivController = styled.div`
  border-radius: 20px;
`;
