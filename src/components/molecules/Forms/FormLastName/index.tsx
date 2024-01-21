import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import FormControl from '@components/molecules/FormControl';
import { Form } from '@components/atoms/Form';
import { IFEditLastName } from '@models/IFUser';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const FormLastName = ({ lastName }: { lastName: string }) => {
  const { editLastName } = useUser();
  const [ isOpen, setOpen ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const {
    setValue,
    handleSubmit,
    register,
    formState
  } = useForm<IFEditLastName>();

  const onSubmit: SubmitHandler<IFEditLastName> = async data => {
    setIsLoading(true);
    editLastName(data)
      .unwrap()
      .then((rs) => {
        if (rs.status === 200 || rs.statusCode === 200) {
          toasts('success', TOAST.EDIT_PROFILE);
          setOpen(false);
        } else {
          toasts('error', TOAST.ERROR_COMMON);
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setValue('lastName', lastName);
  }, [ lastName ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        isLoading={isLoading}
        label={'Last name'}
        value={lastName}
      >
        <FormControl
          register={register}
          formState={formState}
          textEr={'Last name is required'}
          typeField={'text'}
          nameField={'lastName'}
          $with={'100%'}
          $height={'45px'}
          $minLength={3}
          $maxLength={25}
          placeholder={'New last name...'}
          isRequired={true}
          $pattern={/^[a-zA-Z\-\s]+$/}
          errors={{
            required: 'Last name is required',
            pattern: 'please enter only letter characters by alphabetical',
            length: 'Last name must between 3 - 25 characters'
          }}
        />
      </ToggleField>
    </Form>
  );
};

export default FormLastName;