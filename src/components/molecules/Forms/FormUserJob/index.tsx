import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFEditJob } from '@models/IFUser';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import FormControl from '@components/molecules/FormControl';
import { Form } from '@components/atoms/Form';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const FormUserJob = ({ job }: { job?: string }) => {
  const { editUserJob } = useUser();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState
  } = useForm<IFEditJob>();

  const onSubmit: SubmitHandler<IFEditJob> = async data => {
    setIsLoading(true);
    editUserJob(data)
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
    if (job) {
      setValue('job', job);
    }
  }, [ job ]);

  useEffect(() => {
    if (watch('job') !== job) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ watch('job') ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'Work'}
        value={job}
        isLoading={isLoading}
      >
        <FormControl
          register={register}
          formState={formState}
          errors={{
            required: 'Job is required',
            pattern: 'Please enter letter characters, number and [@!?&.,-] special characters',
            length: 'Job must not exceed 255 characters'
          }}
          textEr={'Job is required'}
          typeField={'text'}
          nameField={'job'}
          $with={'100%'}
          $height={'45px'}
          $maxLength={255}
          placeholder={job ? 'New job...' : 'Job description...'}
          isRequired={true}
          $pattern={/^[a-zA-Z0-9@!?&.,/\-\s]+$/}
        />
      </ToggleField>
    </Form>
  );
};

export default FormUserJob;