import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import FormControl from '@components/molecules/FormControl';
import { Form } from '@components/atoms/Form';
import { IFEditEmail } from '@models/IFUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const FormEmail = ({ email }: { email: string }) => {
  const [ isOpen, setOpen ] = useState<boolean>(false);
  const {
    setValue,
    // handleSubmit,
    register,
    formState
  } = useForm<IFEditEmail>();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toasts('warn', TOAST.WARNING_UPDATING);
  };

  useEffect(() => {
    setValue('email', email);
  }, [ email ]);

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'Email'}
        value={email}
      >
        <FormControl
          register={register}
          formState={formState}
          textEr={'Email is required'}
          typeField={'email'}
          nameField={'email'}
          $with={'100%'}
          $height={'45px'}
          $minLength={3}
          $maxLength={25}
          placeholder={'New email...'}
          isRequired={true}
          errors={{
            required: 'Email is required'
          }}
        />
      </ToggleField>
    </Form>
  );
};

export default FormEmail;