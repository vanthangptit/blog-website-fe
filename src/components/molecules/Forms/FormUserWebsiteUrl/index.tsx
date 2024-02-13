import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFEditWebsiteUrl }  from '@models/IFUser';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import { Form } from '@components/atoms/Form';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';
import FormControl from '@components/molecules/FormControl';

const FormUserWebsiteUrl = ({ websiteUrl }: { websiteUrl?: string }) => {
  const { editUserWebsiteUrl } = useUser();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState
  } = useForm<IFEditWebsiteUrl>();

  const onSubmit: SubmitHandler<IFEditWebsiteUrl> = async data => {
    setIsLoading(true);
    editUserWebsiteUrl(data)
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
    if (websiteUrl) {
      setValue('websiteUrl', websiteUrl);
    }
  }, [ websiteUrl ]);

  useEffect(() => {
    if (watch('websiteUrl') !== websiteUrl) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ watch('websiteUrl') ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'Website URL'}
        value={websiteUrl}
        isLoading={isLoading}
      >
        <FormControl
          register={register}
          formState={formState}
          errors={{
            required: 'Website URL is required',
            pattern: 'Website URL is invalid'
          }}
          textEr={'Website URL is required'}
          typeField={'text'}
          nameField={'websiteUrl'}
          $with={'100%'}
          $height={'45px'}
          $maxLength={255}
          placeholder={'https://yoursite.com'}
          isRequired={true}
          /* eslint-disable */
          $pattern={/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/}
        />
      </ToggleField>
    </Form>
  );
};

export default FormUserWebsiteUrl;