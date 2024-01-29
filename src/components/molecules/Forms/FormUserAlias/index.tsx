import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFEditAlias } from '@models/IFUser';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import FormControl from '@components/molecules/FormControl';
import { Form } from '@components/atoms/Form';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const FormUserAlias = ({ alias }: { alias?: string }) => {
  const { editUserAlias } = useUser();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState
  } = useForm<IFEditAlias>();

  const onSubmit: SubmitHandler<IFEditAlias> = async data => {
    setIsLoading(true);
    editUserAlias(data)
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
    if (alias) {
      setValue('alias', alias);
    }
  }, [ alias ]);

  useEffect(() => {
    if (watch('alias') !== alias) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ watch('alias') ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'Alias'}
        value={alias}
        isLoading={isLoading}
      >
        <FormControl
          register={register}
          formState={formState}
          errors={{
            required: 'Alias is required',
            pattern: 'Please enter letter characters and numbers.',
            length: 'Alias must not exceed 255 characters'
          }}
          textEr={'Alias is required'}
          typeField={'text'}
          nameField={'alias'}
          $with={'100%'}
          $height={'45px'}
          $maxLength={255}
          placeholder={alias}
          isRequired={true}
          $pattern={/^[a-zA-Z0-9\-\s]+$/}
        />
      </ToggleField>
    </Form>
  );
};

export default FormUserAlias;