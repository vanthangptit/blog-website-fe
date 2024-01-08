import React, { useContext, useEffect, useState } from 'react';
import FormCategory from '@components/molecules/Forms/FormCategory';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFCategories, IFResponseCategory } from '@models/IFCategory';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { deleteFiles, uploadFile } from '@utils/uploadFile';
import { useCategories } from '@hooks/useCategories';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutMiddle, Container } from '@components/atoms/Layout';
import styled from 'styled-components';
import SectionTitleForm from '@components/molecules/SectionTitle/TitleForm';
import SuccessBox from '@components/molecules/SuccessBox';
import { UnauthorizedContext } from '@infra/context/UnauthorizedContext';

const CreateCategory = () => {
  const { setUnauthorized } = useContext(UnauthorizedContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { createCategory, getCategoryById, singleCategory, editCategory } = useCategories();
  const {
    setValue,
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

  const handleResponse = (rs: IFResponseCategory) => {
    if (rs.status === 200 || rs.statusCode === 200) {
      reset();
      resetStates();
      setSubmitSuccess(true);
      setCategoryId(rs?.data?._id);
    } else {
      if (rs.status === 401 || rs.statusCode === 401) {
        setSubmitSuccess(false);
        setUnauthorized(true);
      } else {
        setSubmitSuccess(false);
        setSubmitError(rs?.message);
      }
      if (fileUploaded && imageChanged) {
        deleteFiles([ fileUploaded ]);
      }
    }
    setSubmitting(false);
  };

  const onSubmit: SubmitHandler<IFCategories> = async (data) => {
    setSubmitting(true);
    setSubmitSuccess(false);

    const callback = (rs?: ManagedUpload.SendData) => {
      const newData: IFCategories = {
        title: data.title
      };

      if (rs) {
        setFileUploaded(rs);
        newData.image = rs.Location;

        if (categoryId) {
          newData.id = categoryId;
          editCategory(newData)
            .unwrap()
            .then(handleResponse);
        } else {
          createCategory(newData)
            .unwrap()
            .then(handleResponse);
        }
      } else {
        newData.image = srcImage;

        if (categoryId) {
          newData.id = categoryId;

          if (newData.image && newData.image.length) {
            editCategory(newData)
              .unwrap()
              .then(handleResponse);
          } else {
            setSubmitError('image can not empty');
          }
        } else {
          setSubmitError('Category id can not empty');
        }
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
    } else if (singleCategory?.data) {
      navigate('/create-post', {
        state: { _id: singleCategory.data._id }
      });
    }
  };

  useEffect(() => {
    setCategoryId(id);
    if (id) {
      getCategoryById({ id });
    }
  }, [ id ]);

  useEffect(() => {
    if (singleCategory?.data) {
      setValue('title', singleCategory.data.title);
      setSrcImage(singleCategory.data.image);
    }
  }, [ singleCategory ]);

  return (
    <LayoutMiddle>
      <Container>
        <SectionTitleForm title={id ? 'Edit Topic' : 'Create Topic'} />

        {submitSuccess ? (
          <SuccessBox
            onClick={onClick}
            title={id ? 'Category changed successfully' : 'Category created successfully'}
            btnText={'Create Post'}
          />
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
              buttonText={id ? 'Save changes' : 'Create'}
            />
          </BoxForm>
        )}
      </Container>
    </LayoutMiddle>
  );
};

export default CreateCategory;

const BoxForm = styled.section`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 50px 25px 30px;
  border: 1px solid ${({ theme }) => theme.gray};
`;
