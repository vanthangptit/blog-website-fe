import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IFEditGender, Gender } from '@models/IFUser';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import { Form } from '@components/atoms/Form';
import { useUser } from '@hooks/useUser';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter';
import Select from '@components/molecules/Select';
import { GENDER } from '@constants/selects';
import styled from 'styled-components';

const FormUserGender = ({ gender }: { gender?: Gender }) => {
  const { editUserGender } = useUser();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const {
    watch,
    setValue,
    handleSubmit,
    control,
    formState
  } = useForm<IFEditGender>();

  const onSubmit: SubmitHandler<IFEditGender> = async data => {
    setIsLoading(true);
    editUserGender(data)
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
    if (gender) {
      setValue('gender', gender);
    }
  }, [ gender ]);

  useEffect(() => {
    if (watch('gender') !== gender) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ watch('gender') ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        label={'Gender'}
        value={capitalizeFirstLetter(gender)}
        isLoading={isLoading}
      >
        <GroupField>
          <Select
            valueDefault={gender}
            colourOptions={GENDER}
            nameField={'gender'}
            height={'45px'}
            control={control}
            Controller={Controller}
            formState={formState}
            textEr={'Error'}
            classNamePrefix={'react-select'}
          />
        </GroupField>
      </ToggleField>
    </Form>
  );
};

export default FormUserGender;

const GroupField = styled.div`
  padding-bottom: 32px;
`;
