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
  submitError,
  buttonText
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
  buttonText: string
}) => {
  return (
    <FormElement onSubmit={handleSubmit(onSubmit)}>
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
        text={buttonText}
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
