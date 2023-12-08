import React, { useState } from 'react';
import { Input } from '@components/Imput';
import { MessageError } from '@components/MessageError';
import { FormState, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { NameFieldRegister } from '@models/IFRegister';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { NameFieldLogin } from '@models/IFAuth';

const FormControl = ({
  register,
  formState,
  textEr,
  typeField,
  nameField,
  placeholder,
  $with,
  $height
}: {
  register: UseFormRegister<any>
  formState: FormState<any>
  textEr: string
  typeField: 'email' | 'password' | 'text' | 'textarea'
  nameField: NameFieldRegister | NameFieldLogin
  placeholder: string
  $with: string
  $height: string
}) => {
  const [ isHiddenPassword, setHiddenPassword ] = useState<boolean>(true);
  const handleHiddenPassword = () => setHiddenPassword(!isHiddenPassword);

  return (
    <>
      <DivBox $isError={!!formState.errors[nameField]}>
        <Input
          type={typeField === 'password' ? (isHiddenPassword ? 'password' : 'text') : typeField}
          placeholder={placeholder}
          $with={$with}
          $height={$height}
          {...register(nameField, { required: true })}
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
