import React, { useState } from 'react';
import {
  Column,
  Row,
  LayoutMiddle
} from '@components/atoms/Layout';
import styled from 'styled-components';
import SectionTitleForm from '@components/molecules/SectionTitleForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFRegister } from '@models/IFRegister';
import FormControl from '@components/molecules/FormControl';
import { MessageError } from '@components/atoms/MessageError';
import { API_REGISTER_URL } from '@constants/apis';
import { Link, useNavigate } from 'react-router-dom';
import { BiLock } from 'react-icons/bi';
import Button from '@components/molecules/Buttons';
import styles from '@constants/styles';

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
    <Layout>
      <RegisterBox>
        <SectionTitleForm
          icon={{ el: BiLock }}
          title={'Sign up'}
        />

        <FormElement onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Column $smWidth={'50%'}>
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
            </Column>
            <Column $smWidth={'50%'}>
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
            </Column>
          </Row>
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
          <Button
            text={'Submit'}
            buttonType={'submit'}
            disabled={isLoading}
          />
          {(messageErrors && messageErrors.length) && (
            <MessageError $align={'center'}>{messageErrors}</MessageError>
          )}
          <RedirectBox>
            <Link to="/login">Already have an account? Sign in</Link>
          </RedirectBox>
        </FormElement>
      </RegisterBox>
    </Layout>
  );
};

export default Register;

const Layout = styled(LayoutMiddle)`
  padding: 0 15px;
  height: calc(100vh - ${styles.heightFooter - styles.heightHeader}px);
  min-height: calc(575px + ${styles.heightFooter - styles.heightHeader}px);
`;

const RegisterBox = styled.article`
  width: 600px;
  max-width: 600px;
  border: 1px solid ${({ theme }) => theme.gray6};
  padding: 30px 45px;
  border-radius: 5px;
`;

const FormElement = styled.form`
  text-align: center;
`;

const RedirectBox = styled.div`
  margin: 15px 0 25px;

  a {
    color: ${({ theme }) => theme.primary4};

    &:hover {
      text-decoration: underline;
    }
  }
`;
