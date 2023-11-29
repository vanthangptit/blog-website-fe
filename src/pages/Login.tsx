import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutMiddle } from '@components/Layout';
import { BiLock } from 'react-icons/bi';
import { Input } from '@components/Imput';
import { BtnSubmit } from '@components/Buttons/BtnSubmit';
import { URL_API } from '@constants/apis';
import { useCookies } from '@hooks/useCookies';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFLogin } from '@models/IFLogin';
import { MessageError } from '@components/MessageError';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Login = () => {
  const { addCookies } = useCookies();
  const navigate = useNavigate();
  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
    // setValue,
    reset
  } = useForm<IFLogin>();
  const [ messageErrors, setMessageErrors ] = useState<string>();
  const [ isHiddenPassword, setHiddenPassword ] = useState<boolean>(true);

  const onSubmit: SubmitHandler<IFLogin> = async (data) => {
    await fetch(URL_API.LOGIN, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        if (response.status.toString() === '200') {
          reset({ email: '', password: '' });
          setMessageErrors('');
          addCookies('authToken', response.data.accessToken);

          setTimeout(() => {
            navigate('/');
          }, 500);
        } else {
          setMessageErrors(response.message);
        }
      });
  };

  const handleHiddenPassword = () => setHiddenPassword(!isHiddenPassword);

  return (
    <LayoutMiddle>
      <LoginBox>
        <Title>
          <TitleAvatar>
            <BiLock size={20} />
          </TitleAvatar>
          <TitleText>Sign in</TitleText>
        </Title>
        <FormElement onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Input
              type="email"
              placeholder={'Email'}
              $with={'100%'}
              $height={'45px'}
              {...register('email', { required: true })}
            />
            {errors.email && <MessageError>This field is required and cannot be empty</MessageError>}
          </FormControl>

          <FormControl>
            <Input
              type={isHiddenPassword ? 'password' : 'text'}
              placeholder={'Password'}
              $with={'100%'}
              $height={'45px'}
              style={{ paddingRight: '35px' }}
              {...register('password', { required: true })}
            />

            {errors.password && <MessageError>This field is required and cannot be empty</MessageError>}
            <FormIcons onClick={handleHiddenPassword}>
              {isHiddenPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
            </FormIcons>
          </FormControl>

          <BtnSubmit type={'submit'} $with={'100px'}>Submit</BtnSubmit>
          {(messageErrors && messageErrors.length) && (
            <MessageError $align={'center'}>{messageErrors}</MessageError>
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

const LoginBox = styled.div`
  background-color: ${({ theme }) => theme.white};
  padding: 30px 45px;
  box-shadow: 0 0px 7px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const TitleText = styled.span`
  text-align: center;
  font-size: 27px;
  font-weight: 400;
  margin-bottom: 10px;
  width: 100%;
  display: inline-block;

  @media (min-width: 768px) and (max-width: 991px) {
    font-size: calc(22px + (27 - 22) * (100vw - 768px) / (991 - 768));
  }

  @media (max-width: 767px) {
    // font-size: calc(18px + (23 - 18) * (100vw - 360px) / (767 - 360));
    font-size: 22px;
  }
`;

const TitleAvatar = styled.span`
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.bg4};
  color: ${({ theme }) => theme.white};
`;

const FormElement = styled.form`
  font-size: 1.5em;
  text-align: center;
  color: #BF4F74;
`;

const FormControl = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const FormIcons = styled.span`
  cursor: pointer;
  position: absolute;
  right: 10px;
  width: 18px;
  height: 18px;
  line-height: 18px;
  color: ${({ theme }) => theme.inputPlaceholder};
  top: 50%;
  transform: translateY(-50%);
`;

const RedirectBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 5px 0 15px;
`;
