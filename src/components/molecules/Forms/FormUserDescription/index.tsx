import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFEditDescription } from '@models/IFUser';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import { Form } from '@components/atoms/Form';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';
import Textarea from '@components/atoms/Textarea';

const FormUserDescription = ({ description }: { description?: string }) => {
  const { editUserDescription } = useUser();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState
  } = useForm<IFEditDescription>();

  const onSubmit: SubmitHandler<IFEditDescription> = async data => {
    setIsLoading(true);
    editUserDescription(data)
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
    if (description) {
      setValue('description', description);
    }
  }, [ description ]);

  useEffect(() => {
    if (watch('description') !== description) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ watch('description') ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'Description'}
        value={description}
        isLoading={isLoading}
      >
        <Textarea
          register={register}
          formState={formState}
          nameField={'description'}
          placeholder={'Write a small introduction about yourself...'}
          textEr={'Description required and must between 25 - 255 characters.'}
          $minLength={25}
          $maxLength={500}
          $isRequired={true}
          $rows={3}
          $pattern={/^[a-zA-Z0-9#*()@!?&.,'"/\-\s]+$/}
          errors={{
            required: 'Description is required',
            //eslint-disable-next-line
            pattern: 'Please enter letter characters, number and [#*()@!?&.,\'-\"] special characters',
            length: 'Description required and must between 25 - 500 characters.'
          }}
        />
      </ToggleField>
    </Form>
  );
};

export default FormUserDescription;