import React from 'react';
import styled from 'styled-components';
import FormControl from '@components/molecules/FormControl';
import { FormState, UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import UploadImage from '@components/molecules/UploadImage';
import { IFCategories } from '@models/IFCategory';
import Button from '@components/molecules/Buttons';
import { MessageError } from '@components/atoms/MessageError';

const FormCategory = ({
  register,
  formState,
  handleSubmit,
  onSubmit,
  setFile,
  setSrcImage,
  setImageChanged,
  srcImage,
  isLoading= false,
  submitError
}: {
  register: UseFormRegister<any>
  formState: FormState<any>
  handleSubmit: UseFormHandleSubmit<IFCategories>
  onSubmit: (data: IFCategories) => void
  setFile: (file: any) => void
  setSrcImage: (newImage: string) => void
  setImageChanged: (newState: boolean) => void
  srcImage?: string
  isLoading?: boolean
  submitError?: string
}) => {
  return (
    <FormElement onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Create Topic</FormTitle>
      <FormControl
        register={register}
        formState={formState}
        textEr={'The field is required'}
        typeField={'text'}
        nameField={'title'}
        placeholder={'Name topic..'}
        $with={'100%'}
        $height={'45px'}
      />

      <UploadImage
        label={'Upload image'}
        setFile={setFile}
        setSrcImage={setSrcImage}
        setImageChanged={setImageChanged}
        srcImage={srcImage}
      />

      <Button
        buttonType={'submit'}
        text={'Create'}
        isLoading={isLoading}
      />
      {submitError &&  <MessageError $align={'center'}>{submitError}</MessageError>}
    </FormElement>
  );
};

export default React.memo(FormCategory);

const FormElement = styled.form`
  font-size: 1.5em;
   text-align: center;
`;

const FormTitle = styled.h3`
  margin-bottom: 30px;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};
`;
