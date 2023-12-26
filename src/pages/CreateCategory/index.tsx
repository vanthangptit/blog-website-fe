import React, { useState } from 'react';
import FormCategory from '@components/molecules/Forms/FormCategory';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFCategories } from '@models/IFCategory';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { messageErrors } from '@constants/messageErrors';
import { deleteFiles, uploadFile } from '@utils/uploadFile';
import { useCategories } from '@hooks/useCategories';
import { useNavigate } from 'react-router-dom';
import { LayoutMiddle } from '@components/atoms/Layout';
import styled from 'styled-components';
import SectionTitleForm from '@components/molecules/SectionTitleForm';
import Button from '@components/molecules/Buttons';

const CreateCategory = () => {
  const navigate = useNavigate();
  const { createCategory } = useCategories();
  const {
    // setValue,
    reset,
    register,
    formState,
    handleSubmit
  } = useForm<IFCategories>();

  const [ categoryId, setCategoryId ] = useState<string>();
  const [ fileUploaded, setFileUploaded ] = useState<ManagedUpload.SendData>();
  const [ imageChanged, setImageChanged ] = useState<boolean>(false);
  const [ srcImage, setSrcImage ] = useState<string>();
  const [ file, setFile ] = useState<any>({
    name: ''
  });

  const [ submitError, setSubmitError ] = useState<string>();
  const [ submitting, setSubmitting ] = useState<boolean>(false);
  const [ submitSuccess, setSubmitSuccess ] = useState<boolean>(false);

  const resetStates = () => {
    setSubmitting(false);
    setImageChanged(false);
    setSubmitError(undefined);
    setFileUploaded(undefined);
    setSrcImage(undefined);
    setFile({ name: '' });
  };

  const onSubmit: SubmitHandler<IFCategories>= async (data) => {
    setSubmitting(true);

    const callback = (rs?: ManagedUpload.SendData) => {
      if (rs) {
        setFileUploaded(rs);
        const newData: IFCategories = {
          title: data.title,
          image: rs.Location
        };

        createCategory(newData)
          .unwrap()
          .then((rs) => {
            if (rs.status === 200 || rs.statusCode === 200) {
              reset();
              resetStates();
              setSubmitSuccess(true);
              setCategoryId(rs?.data?._id);
            } else {
              setSubmitError(rs?.data?.message ?? messageErrors.createCategory);
              if (fileUploaded) {
                deleteFiles([ fileUploaded ]);
              }
            }
            setSubmitting(false);
          });
      } else {
        /* @todo
          Handle rs is undefined
         */
      }
    };

    if (imageChanged) {
      await uploadFile({
        file,
        callback,
        setErrorMessage: setSubmitError
      });
    } else {
      callback(undefined);
    }
  };

  const onClick = () => {
    if (categoryId) {
      navigate('/create-post', {
        state: { _id: categoryId }
      });
    } else {
      // eslint-disable-next-line no-console
      console.log('categoryId is not defined.');
    }
  };

  return (
    <LayoutMiddle>
      <CategoryBox>
        <SectionTitleForm title={'Create Topic'} />

        {submitSuccess ? (
          <SuccessBox>
            <SuccessTitle>Category created successfully</SuccessTitle>

            <Button
              text={'Create Post'}
              handleClick={onClick}
            />

            {/*
              @todo: Add button view detail category
            */}
          </SuccessBox>
        ) : (
          <BoxForm>
            <FormCategory
              register={register}
              formState={formState}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              setFile={setFile}
              setSrcImage={setSrcImage}
              setImageChanged={setImageChanged}
              srcImage={srcImage}
              isLoading={submitting}
              submitError={submitError}
            />
          </BoxForm>
        )}
      </CategoryBox>
    </LayoutMiddle>
  );
};

export default CreateCategory;

const CategoryBox = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 100px 0;
`;

const BoxForm = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 50px 25px 30px;
  border: 1px solid ${({ theme }) => theme.gray1};
`;

const SuccessBox = styled.section`
  height: 270px;
  text-align: center;
  padding: 80px 0 45px;
`;

const SuccessTitle = styled.h4`
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.primary1};
`;
