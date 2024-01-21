import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFChangePassword } from '@models/IFUser';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import FormControl from '@components/molecules/FormControl';
import { Form } from '@components/atoms/Form';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const FormNewPassword = ({ isLoginGoogle, password }: { isLoginGoogle: boolean, password?: string }) => {
  const { changePasswords } = useUser();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const {
    reset,
    watch,
    handleSubmit,
    register,
    formState
  } = useForm<IFChangePassword>();

  const onSubmit: SubmitHandler<IFChangePassword> = async data => {
    setIsLoading(true);
    changePasswords(data)
      .unwrap()
      .then((rs) => {
        if (rs.status === 200 || rs.statusCode === 200) {
          toasts('success', TOAST.EDIT_PROFILE);
          reset();
          setOpen(false);
        } else if (rs.status === 400 || rs.statusCode === 400) {
          toasts( 'error', rs?.message ?? TOAST.ERROR_COMMON);
        } else {
          toasts('error', TOAST.ERROR_COMMON);
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (watch('password')?.length && watch('newPassword')?.length && watch('newConfirmPassword')?.length) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ watch('password'), watch('newPassword'), watch('newConfirmPassword') ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'Password'}
        value={password}
        isLoading={isLoading}
      >
        {(!isLoginGoogle && password) && (
          <FormControl
            register={register}
            formState={formState}
            textEr={'Password is required'}
            typeField={'password'}
            nameField={'password'}
            placeholder={'Old password...'}
            $with={'100%'}
            $height={'45px'}
            $pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/}
            isRequired={true}
            errors={{
              required: 'Your old password was entered incorrectly',
              pattern: 'Your old password was entered incorrectly'
            }}
          />
        )}

        <FormControl
          register={register}
          formState={formState}
          textEr={'This field is required'}
          typeField={'password'}
          nameField={'newPassword'}
          $with={'100%'}
          $height={'45px'}
          placeholder={'New password'}
          $pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/}
          isRequired={true}
          errors={{
            required: 'New password is required',
            pattern: 'New password must contain at least one number, lower case, upper case and enter 8 or more characters',
            validate: 'Your new passwords do match with old passwords'
          }}
          $validate={(!isLoginGoogle && password) ? {
            validate: (val: string) => {
              if (watch('password') === val) {
                return 'Your new passwords do match with old passwords';
              }
            }
          } : undefined}
        />
        <FormControl
          register={register}
          formState={formState}
          errors={{
            required: 'Address is required',
            validate: 'Your passwords do no match'
          }}
          textEr={'Address is required'}
          typeField={'password'}
          nameField={'newConfirmPassword'}
          $with={'100%'}
          $height={'45px'}
          $maxLength={255}
          placeholder={'New address...'}
          isRequired={true}
          $validate={{
            validate: (val: string) => {
              if (watch('newPassword') !== val) {
                return 'Your new passwords do no match';
              }
            }
          }}
        />
      </ToggleField>
    </Form>
  );
};

export default FormNewPassword;