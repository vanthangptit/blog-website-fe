import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutMiddle } from '@components/atoms/Layout';
import { BtnSubmit } from '@components/atoms/Buttons/BtnSubmit';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFLogin, IFLoginResponse } from '@models/IFAuthenticated';
import { MessageError } from '@components/atoms/MessageError';
import SectionTitleForm from '@components/molecules/SectionTitleForm';
import FormControl from '@components/molecules/FormControl';
import { useAuth } from '@hooks/useAuth';
import { AuthContext } from '@infra/context/AuthContext';
import { useCookies } from '@hooks/useCookies';
import { BiLock } from 'react-icons/bi';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addCookies } = useCookies();
  const { setAuthenticated } = useContext(AuthContext);
  const { loginApi } = useAuth();
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const [ isErrorMessage, setErrorMessage ] = useState<string>();

  const {
    setValue,
    register,
    formState,
    handleSubmit
  } = useForm<IFLogin>();
  const onSubmit: SubmitHandler<IFLogin> = (data) => {
    setLoading(true);
    loginApi(data)
      .unwrap()
      .then((rs: IFLoginResponse) => {
        setAuthenticated(rs.user);
        addCookies('user', JSON.stringify(rs.user));
        setTimeout(() => {
          setLoading(false);
          navigate('/');
        }, 500);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error?.data?.message ?? 'An error occurred. Please try again!');
      });
  };

  useEffect(() => {
    setValue('email', location?.state?.email ?? '');
    setValue('password', location?.state?.password ?? '');
    /* eslint-disable */
  }, [ location ]);

  return (
    <LayoutMiddle>
      <LoginBox>
        <SectionTitleForm
          icon={{ el: BiLock }}
          title={'Sign in'}
        />

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
            disabled={isLoading}
          >
            Submit
          </BtnSubmit>
          {(isErrorMessage && isErrorMessage.length) && (
            <MessageError $align={'center'}>{isErrorMessage}</MessageError>
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
