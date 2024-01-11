import React from 'react';
import styled from 'styled-components';
import { LabelField } from '@components/atoms/Label';
import { MessageError } from '@components/atoms/MessageError';
import {
  FormState,
  RegisterOptions,
  UseFormRegister
} from 'react-hook-form';

type nameField = 'excerpt' | 'description';

const Textarea = ({
  register,
  formState,
  nameField,
  placeholder,
  label,
  textEr,
  $minLength,
  $maxLength,
  $isRequired= false,
  $pattern,
  $rows,
  $cols,
  $resize
}: {
  register: UseFormRegister<any>
  formState: FormState<any>
  nameField: nameField
  placeholder: string
  label?: string
  value?: string
  textEr: string
  $minLength?: number
  $maxLength?: number
  $pattern?: any
  $isRequired?: boolean
  $rows?: number
  $cols?: number
  $resize?: boolean
}) => {
  const options: RegisterOptions = {
    required: $isRequired
  };

  if ($minLength) {
    options['minLength'] = $minLength;
  }

  if ($maxLength) {
    options['maxLength'] = $maxLength;
  }

  if ($pattern) {
    options['pattern'] = $pattern;
  }

  return (
    <TextareaBox $isError={!!formState.errors[nameField]}>
      {label && <LabelField>{label}</LabelField>}
      <TextareaAutosize
        $resize={$resize}
        rows={$rows ?? 7}
        cols={$cols}
        placeholder={placeholder}
        {...register(nameField, options)}
      />
      {formState.errors[nameField] && <MessageError>{textEr}</MessageError>}
    </TextareaBox>
  );
};

export default Textarea;

const TextareaBox = styled.div<{ $isError: boolean }>`
  position: relative;
  margin-bottom: ${({ $isError }) => $isError ? '5px' : '25px'};
`;

const TextareaAutosize = styled.textarea<{ $resize?: boolean }>`
  width: 100%;
  resize: ${({ $resize }) => $resize ? 'vertical' : 'none'};
  padding: 18px 14px;
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg0};
  outline: none;

  &::-webkit-scrollbar {
    width: 3px;
  };

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.gray6};
    border-radius: 5px;
  };

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.gray6};
  }
`;
