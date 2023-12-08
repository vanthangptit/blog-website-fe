import React, { useState } from 'react';
import {
  CustomColumn,
  CustomRow,
  LayoutMiddle
} from '@components/Layout';
import styled from 'styled-components';
import SectionTitleForm from '@components/SectionTitleForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFRegister } from '@models/IFRegister';
import FormControl from '@components/FormControl';
import { BtnSubmit } from '@components/Buttons/BtnSubmit';
import { MessageError } from '@components/MessageError';
import { API_REGISTER_URL } from '@constants/apis';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [ messageErrors, setMessageErrors ] = useState<string>();
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const {
    register,
    formState,
    handleSubmit,
    reset
  } = useForm<IFRegister>();

  const onSubmit: SubmitHandler<IFRegister> = async (data) => {
    setLoading(true);
    await fetch(API_REGISTER_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        if (response.statusCode === 200) {
          setTimeout(() => {
            reset();
            navigate('/login', {
              state: { email: data.email }
            });
          }, 1000);
        } else {
          setMessageErrors(response.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LayoutMiddle styles={{ padding: '0 15px' }}>
      <RegisterBox>
        <SectionTitleForm
          iconSize={20}
          text={'Sign up'}
        />

        <FormElement onSubmit={handleSubmit(onSubmit)}>
          <CustomRow>
            <CustomColumn $smWidth={'50%'}>
              <FormControl
                register={register}
                formState={formState}
                textEr={'First name is required'}
                typeField={'text'}
                nameField={'firstName'}
                placeholder={'First Name'}
                $with={'100%'}
                $height={'45px'}
              />
            </CustomColumn>
            <CustomColumn $smWidth={'50%'}>
              <FormControl
                register={register}
                formState={formState}
                textEr={'Last name is required'}
                typeField={'text'}
                nameField={'lastName'}
                placeholder={'Last Name'}
                $with={'100%'}
                $height={'45px'}
              />
            </CustomColumn>
          </CustomRow>
          <FormControl
            register={register}
            formState={formState}
            textEr={'Email is required'}
            typeField={'email'}
            nameField={'email'}
            placeholder={'Your Email'}
            $with={'100%'}
            $height={'45px'}
          />
          <FormControl
            register={register}
            formState={formState}
            textEr={'Password is required'}
            typeField={'password'}
            nameField={'password'}
            placeholder={'Password'}
            $with={'100%'}
            $height={'45px'}
          />
          <FormControl
            register={register}
            formState={formState}
            textEr={'This field is required'}
            typeField={'password'}
            nameField={'passwordConfirm'}
            placeholder={'Confirm Password'}
            $with={'100%'}
            $height={'45px'}
          />

          <BtnSubmit type={'submit'} $with={'100px'} disabled={isLoading}>Submit</BtnSubmit>
          {(messageErrors && messageErrors.length) && (
            <MessageError $align={'center'}>{messageErrors}</MessageError>
          )}
        </FormElement>
      </RegisterBox>
    </LayoutMiddle>
  );
};

export default Register;

const RegisterBox = styled.div`
  background-color: ${({ theme }) => theme.white};
  padding: 30px 45px;
  box-shadow: 0 0px 7px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 600px;
  max-width: 600px;
`;

const FormElement = styled.form`
  font-size: 1.5em;
  text-align: center;
`;
