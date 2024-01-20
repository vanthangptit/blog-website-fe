import React, { useState } from 'react';
import { Input } from '@components/atoms/Imput';
import { MessageError } from '@components/atoms/MessageError';
import { FormState, RegisterOptions, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { LabelField } from '@components/atoms/Label';

type NameField =
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
  'job';

type TypeField = 'email' | 'password' | 'text';

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
  label
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
      {formState.errors[nameField] && <MessageError>{textEr}</MessageError>}
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
