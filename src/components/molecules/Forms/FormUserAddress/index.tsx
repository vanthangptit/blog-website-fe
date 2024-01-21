import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFEditAddress } from '@models/IFUser';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import FormControl from '@components/molecules/FormControl';
import { Form } from '@components/atoms/Form';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const FormUserAddress = ({ address }: { address?: string }) => {
  const { editUserAddress } = useUser();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState
  } = useForm<IFEditAddress>();

  const onSubmit: SubmitHandler<IFEditAddress> = async data => {
    setIsLoading(true);
    editUserAddress(data)
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
    if (address) {
      setValue('address', address);
    }
  }, [ address ]);

  useEffect(() => {
    if (watch('address') !== address) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ watch('address') ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'Address'}
        value={address}
        isLoading={isLoading}
      >
        <FormControl
          register={register}
          formState={formState}
          errors={{
            required: 'Address is required',
            pattern: 'Please enter letter characters, number and "/" special character',
            length: 'Address must not exceed 255 characters'
          }}
          textEr={'Address is required'}
          typeField={'text'}
          nameField={'address'}
          $with={'100%'}
          $height={'45px'}
          $maxLength={255}
          placeholder={'New address...'}
          isRequired={true}
          $pattern={/^[a-zA-Z0-9,/\-\s]+$/}
        />
      </ToggleField>
    </Form>
  );
};

export default FormUserAddress;