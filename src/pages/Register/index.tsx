import React, { useState } from 'react';
import {
  Column,
  Row,
  LayoutMiddle
} from '@components/atoms/Layout';
import styled from 'styled-components';
import SectionTitleForm from '@components/molecules/Titles/TitleForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFRegister } from '@models/IFRegister';
import FormControl from '@components/molecules/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import { BiLock } from 'react-icons/bi';
import Button from '@components/molecules/Buttons/ButtonPrimary';
import { useAuth } from '@hooks/useAuth';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const Register = () => {
  const navigate = useNavigate();
  const { registerApi } = useAuth();
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const {
    register,
    formState,
    handleSubmit,
    reset
  } = useForm<IFRegister>();

  const onSubmit: SubmitHandler<IFRegister> = async (data) => {
    setLoading(true);
    registerApi(data)
      .then((rs) => {
        if (rs.statusCode === 200) {
          setTimeout(() => {
            reset();
            navigate('/login', {
              state: { email: data.email, password: data.password }
            });
          }, 1000);
        } else {
          toasts('error', rs?.message ?? TOAST.ERROR_COMMON);
        }
        setLoading(false);
      });
  };

  return (
    <Container>
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
                autofocus={true}
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
          <RedirectBox>
            <Link to="/login">Already have an account? Sign in</Link>
          </RedirectBox>
        </FormElement>
      </RegisterBox>
    </Container>
  );
};

export default Register;

const Container = styled(LayoutMiddle)`
  padding: 0 15px;
`;

const RegisterBox = styled.section`
  width: 100%;
  max-width: 600px;
  margin: auto;
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
