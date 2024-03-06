import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFEditBio }  from '@models/IFUser';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import { Form } from '@components/atoms/Form';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';
import Textarea from '@components/atoms/Textarea';

const FormUserBio = ({ bio }: { bio?: string }) => {
  const { editUserBio } = useUser();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState
  } = useForm<IFEditBio>();

  const onSubmit: SubmitHandler<IFEditBio> = async data => {
    setIsLoading(true);
    editUserBio(data)
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
    if (bio) {
      setValue('bio', bio);
    }
  }, [ bio ]);

  useEffect(() => {
    if (watch('bio') !== bio) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ watch('bio') ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'Bio'}
        value={bio}
        isLoading={isLoading}
      >
        <Textarea
          register={register}
          formState={formState}
          nameField={'bio'}
          placeholder={'A short bio...'}
          textEr={'Bio required and must between 25 - 255 characters.'}
          $minLength={25}
          $maxLength={500}
          $isRequired={true}
          $rows={3}
          errors={{
            required: 'Bio is required',
            length: 'Bio required and must between 25 - 500 characters.'
          }}
        />
      </ToggleField>
    </Form>
  );
};

export default FormUserBio;