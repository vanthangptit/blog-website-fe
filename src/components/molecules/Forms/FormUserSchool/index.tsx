import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFEditSchool } from '@models/IFUser';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import FormControl from '@components/molecules/FormControl';
import { Form } from '@components/atoms/Form';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const FormUserSchool = ({ school }: { school?: string }) => {
  const { editUserSchool } = useUser();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState
  } = useForm<IFEditSchool>();

  const onSubmit: SubmitHandler<IFEditSchool> = async data => {
    setIsLoading(true);
    editUserSchool(data)
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
    if (school) {
      setValue('school', school);
    }
  }, [ school ]);

  useEffect(() => {
    if (watch('school') !== school) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ watch('school') ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'Education'}
        value={school}
        isLoading={isLoading}
      >
        <FormControl
          register={register}
          formState={formState}
          errors={{
            required: 'Education is required',
            pattern: 'Please enter letter characters and numbers.',
            length: 'Education must not exceed 255 characters'
          }}
          textEr={'Education is required'}
          typeField={'text'}
          nameField={'school'}
          $with={'100%'}
          $height={'45px'}
          $maxLength={255}
          placeholder={school ?? 'Where did you go to school?'}
          isRequired={true}
          $pattern={/^[a-zA-Z0-9\-\s]+$/}
        />
      </ToggleField>
    </Form>
  );
};

export default FormUserSchool;