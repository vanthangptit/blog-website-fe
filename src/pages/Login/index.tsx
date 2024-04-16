import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutMiddle } from '@components/atoms/Layout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFLogin } from '@models/IFAuthenticated';
import SectionTitleForm from '@components/molecules/Titles/TitleForm';
import FormControl from '@components/molecules/FormControl';
import { useAuth } from '@hooks/useAuth';
import { AuthContext } from '@infra/../../services/context/AuthContext';
import { BiLock } from 'react-icons/bi';
import Button from '@components/molecules/Buttons/ButtonPrimary';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const { loginApi, setAuth } = useAuth();
  const [ isLoading, setLoading ] = useState<boolean>(false);

  const {
    setValue,
    register,
    formState,
    handleSubmit
  } = useForm<IFLogin>();

  const onSubmit: SubmitHandler<IFLogin> = (data) => {
    setLoading(true);
    loginApi(data)
      .then((rs) => {
        if (rs.statusCode === 200) {
          setAuth('user', JSON.stringify(rs.user));
          setAuth('accessToken', rs.accessToken);
          setAuthenticated(rs.accessToken);

          setTimeout(() => {
            setLoading(false);
            navigate('/');
          }, 500);
        } else {
          toasts('error', rs?.message ?? TOAST.ERROR_COMMON);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    setValue('email', location?.state?.email ?? '');
    setValue('password', location?.state?.password ?? '');
    /* eslint-disable */
  }, [ location ]);

  return (
    <Container>
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
            autofocus={true}
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
        </FormElement>
        <RedirectBox>
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Don&rsquo;t have an account? Sign Up</Link>
        </RedirectBox>
      </LoginBox>
    </Container>
  );
};

export default Login;

const Container = styled(LayoutMiddle)`
  padding: 0 15px;
`;

const LoginBox = styled.section`
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
