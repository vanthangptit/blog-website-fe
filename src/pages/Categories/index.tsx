import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import css from '@constants/styles';
import { Column, Row } from '@components/atoms/Layout';
import ImageText from '@components/molecules/ImageText';
import { useCategories } from '@hooks/useCategories';
import Modal from '@components/molecules/Modal';
import FormCategory from '@components/molecules/Forms/FormCategory';
import Button from '@components/molecules/Buttons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFCategories } from '@models/IFCategory';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { deleteFiles, uploadFile } from '@utils/uploadFile';
import { useNavigate } from 'react-router-dom';
import { messageErrors } from '@constants/messageErrors';

const Categories = () => {
  const navigate = useNavigate();
  const { getCategories, createCategory, categories } = useCategories();
  const [ isOpenModal, setIsOpen ] = useState<boolean>(false);

  const {
    // setValue,
    reset,
    register,
    formState,
    handleSubmit
  } = useForm<any>();

  const [ fileUploaded, setFileUploaded ] = useState<ManagedUpload.SendData>();
  const [ imageChanged, setImageChanged ] = useState<boolean>(false);
  const [ srcImage, setSrcImage ] = useState<string>();
  const [ file, setFile ] = useState<any>({
    name: ''
  });
  const [ submitting, setSubmitting ] = useState<boolean>(false);
  const [ submitError, setSubmitError ] = useState<string>();
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
              navigate('/create', {
                state: { _id: rs?.data?._id }
              });
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

  const onAfterClose = () => {
    setSubmitError(undefined);
    setSubmitSuccess(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout>
      <Container>
        <SectionTitle>
          <TitlePage>Your Categories</TitlePage>
        </SectionTitle>

        {categories && categories.length > 0 && (
          <Row>
            {categories?.map((item, index) => {
              return (
                <Column $width={'100%'} $lgWidth={'20%'} $mdWidth={'25%'} $xsWidth={`${(1/3)*100}%`} key={index}>
                  <ImageText item={item} />
                </Column>
              );
            })}
          </Row>
        )}

        <Button
          text={'Create'}
          handleClick={() => setIsOpen(true)}
          isLoading={false}
        />
      </Container>

      <Modal
        modalIsOpen={isOpenModal}
        shouldCloseOnOverlayClick={false}
        onAfterClose={onAfterClose}
        closeModal={() => setIsOpen(false)}
      >
        {submitSuccess ? (
          <SuccessBox>
            <SuccessTitle>Category created successfully</SuccessTitle>

            <Button
              text={'Create Post'}
              handleClick={() => setIsOpen(true)}
              isLoading={false}
            />
          </SuccessBox>
        ) : (
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
        )}
      </Modal>
    </Layout>
  );
};

export default Categories;

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

const Layout = styled.main`
  background-color: ${({ theme }) => theme.bg0};
  min-height: 100vh;
  width: 100%;
  height: 100%;

  @media (min-width: 767px) {
    min-height: calc(575px + ${css.heightFooter}px);
  }
`;

const Container = styled.section`
  max-width: ${css.widthContainer}px;
  width: 100%;
  padding: 0 15px;
  margin: auto;
`;

const SectionTitle = styled.hgroup`
  margin: 0 0 45px;
`;

const TitlePage = styled.h1`
  font-size: 30px;
  text-align: center;
  color: ${({ theme }) => theme.primary1};
`;
