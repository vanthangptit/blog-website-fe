import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFEditFirstName } from '@models/IFUser';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import FormControl from '@components/molecules/FormControl';
import { Form } from '@components/atoms/Form';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const FormFirstName = ({ firstName }: { firstName: string }) => {
  const { editFirstName } = useUser();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const {
    setValue,
    handleSubmit,
    register,
    formState,
    watch
  } = useForm<IFEditFirstName>();

  const onSubmit: SubmitHandler<IFEditFirstName> = async data => {
    setIsLoading(true);
    editFirstName(data)
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
    setValue('firstName', firstName);
  }, [ firstName ]);

  useEffect(() => {
    if (watch('firstName') !== firstName) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ watch('firstName') ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'First name'}
        value={firstName}
        isLoading={isLoading}
      >
        <FormControl
          register={register}
          formState={formState}
          errors={{
            required: 'First name is required',
            pattern: 'Please enter only letter characters by alphabetical',
            length: 'First name must between 3 - 25 characters'
          }}
          textEr={'First name is required'}
          typeField={'text'}
          nameField={'firstName'}
          $with={'100%'}
          $height={'45px'}
          $minLength={3}
          $maxLength={25}
          placeholder={'New first name...'}
          isRequired={true}
          $pattern={/^[a-zA-Z\-\s]+$/}
        />
      </ToggleField>
    </Form>
  );
};

export default FormFirstName;