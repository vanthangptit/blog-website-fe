import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutMiddle } from '@components/atoms/Layout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFLogin, IFLoginResponse } from '@models/IFAuthenticated';
import { MessageError } from '@components/atoms/MessageError';
import SectionTitleForm from '@components/molecules/SectionTitleForm';
import FormControl from '@components/molecules/FormControl';
import { useAuth } from '@hooks/useAuth';
import { AuthContext } from '@infra/context/AuthContext';
import { useCookies } from '@hooks/useCookies';
import { BiLock } from 'react-icons/bi';
import Button from '@components/molecules/Buttons';
import styles from '@constants/styles';

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
    <Layout>
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

          <Button
            text={'Submit'}
            buttonType={'submit'}
            disabled={isLoading}
          />
          {(isErrorMessage && isErrorMessage.length) && (
            <MessageError $align={'center'}>{isErrorMessage}</MessageError>
          )}
        </FormElement>
        <RedirectBox>
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Don&rsquo;t have an account? Sign Up</Link>
        </RedirectBox>
      </LoginBox>
    </Layout>
  );
};

export default Login;

const Layout = styled(LayoutMiddle)`
  padding: 0 15px;
  height: calc(100vh - ${styles.heightFooter - styles.heightHeader}px);
  min-height: calc(575px + ${styles.heightFooter - styles.heightHeader}px);
`;

const LoginBox = styled.article`
  border: 1px solid ${({ theme }) => theme.gray6};
  padding: 30px 45px;
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
  margin: 15px 0 25px;

  a {
    color: ${({ theme }) => theme.primary4};
  }
`;
