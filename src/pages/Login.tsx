import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutMiddle } from '@components/atoms/Layout';
import { BtnSubmit } from '@components/atoms/Buttons/BtnSubmit';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFLogin } from '@models/IFAuth';
import { MessageError } from '@components/atoms/MessageError';
import SectionTitleForm from '@components/atoms/SectionTitleForm';
import FormControl from '@components/molecules/FormControl';
import { useAuth } from '@hooks/useAuth';
import { AuthContext } from '@src/infra/context/AuthContext';

const Login = () => {
  const location = useLocation();
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    loginApi,
    errorMessage,
    loading
  } = useAuth();
  const {
    register,
    formState,
    handleSubmit,
    setValue,
    reset
  } = useForm<IFLogin>();
  const onSubmit: SubmitHandler<IFLogin> = async (data) => {
    await loginApi(data)
      .unwrap()
      .then(() => {
        setAuthenticated(true);
        setTimeout(() => {
          reset();
          navigate('/');
        }, 500);
      });
  };

  useEffect(() => {
    setValue('email', location?.state?.email ?? '');
    /* eslint-disable */
  }, [ location ]);

  return (
    <LayoutMiddle>
      <LoginBox>
        <SectionTitleForm iconSize={20} text={'Sign in'} />

        <FormElement onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            register={register}
            formState={formState}
            textEr={'Email is required'}
            typeField={'email'}
            nameField={'email'}
            placeholder={'Email'}
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

          <BtnSubmit
            type={'submit'}
            $with={'100px'}
            disabled={loading}
          >
            Submit
          </BtnSubmit>
          {(errorMessage && errorMessage.length) && (
            <MessageError $align={'center'}>{errorMessage}</MessageError>
          )}
        </FormElement>
        <RedirectBox>
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Don&rsquo;t have an account? Sign Up</Link>
        </RedirectBox>
      </LoginBox>
    </LayoutMiddle>
  );
};

export default Login;

const LoginBox = styled.article`
  background-color: ${({ theme }) => theme.white};
  padding: 30px 45px;
  box-shadow: 0 0px 7px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const FormElement = styled.form`
  font-size: 1.5em;
  text-align: center;
`;

const RedirectBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 5px 0 15px;
`;
