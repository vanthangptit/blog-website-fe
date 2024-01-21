import React, { useState } from 'react';
import { Input } from '@components/atoms/Imput';
import { MessageError } from '@components/atoms/MessageError';
import { FormState, RegisterOptions, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { LabelField } from '@components/atoms/Label';

export type NameField =
  'title' |
  'shortUrl' |
  'excerpt' |
  'writer' |
  'email' |
  'password' |
  'passwordConfirm' |
  'firstName' |
  'lastName' |
  'newPassword' |
  'address' |
  'job' |
  'newConfirmPassword';

export type TypeField = 'email' | 'password' | 'text';

const FormControl = ({
  register,
  formState,
  textEr,
  typeField,
  nameField,
  placeholder,
  isRequired= true,
  $with,
  $height,
  $minLength,
  $maxLength,
  $pattern,
  $validate,
  label,
  errors
}: {
  register: UseFormRegister<any>
  formState: FormState<any>
  textEr: string
  typeField: TypeField
  nameField: NameField
  label?: string
  placeholder?: string
  isRequired?: boolean
  $with: string
  $height: string
  $minLength?: number
  $maxLength?: number
  $pattern?: any
  $validate?: any
  errors?: {
    required?: string
    pattern?: string
    length?: string
    validate?: string
  }
}) => {
  const [ isHiddenPassword, setHiddenPassword ] = useState<boolean>(true);
  const handleHiddenPassword = () => setHiddenPassword(!isHiddenPassword);
  const options: RegisterOptions = {
    required: isRequired
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

  if ($validate) {
    options['validate'] = $validate.validate;
  }

  return (
    <>
      <DivBox $isError={!!formState.errors[nameField]}>
        {label && <LabelField>{label}</LabelField>}
        <Input
          type={typeField === 'password' ? (isHiddenPassword ? 'password' : 'text') : typeField}
          placeholder={placeholder}
          $with={$with}
          $height={$height}
          {...register(nameField, options)}
        />

        {typeField === 'password' && (
          <FormIcons onClick={handleHiddenPassword}>
            {isHiddenPassword ? <BsEyeSlash size={16} /> : <BsEye size={18} />}
          </FormIcons>
        )}
      </DivBox>
      {!errors && formState.errors[nameField] && <MessageError>{textEr}</MessageError>}

      {
        isRequired && formState.errors[nameField]?.type === 'required' && errors?.required ? (
          <MessageError>{errors?.required}</MessageError>
        ) : ($minLength || $maxLength) &&
          (formState.errors[nameField]?.type === 'minLength' || formState.errors[nameField]?.type === 'maxLength') &&
          errors?.length ? (
            <MessageError>{errors?.length}</MessageError>
          ) : $pattern && formState.errors[nameField]?.type === 'pattern' && errors?.pattern ? (
            <MessageError>{errors?.pattern}</MessageError>
          ) : $validate && formState.errors[nameField]?.type === 'validate' && errors?.validate ? (
            <MessageError>{errors?.validate}</MessageError>
          ): <></>
      }
    </>
  );
};

export default FormControl;

const DivBox = styled.div<{ $isError: boolean }>`
  position: relative;
  margin-bottom: ${({ $isError }) => $isError ? '5px' : '25px'};
`;

const FormIcons = styled.span`
  cursor: pointer;
  position: absolute;
  right: 10px;
  width: 18px;
  height: 18px;
  line-height: 18px;
  color: ${({ theme }) => theme.colorEyes};
  top: 50%;
  transform: translateY(-50%);
`;
