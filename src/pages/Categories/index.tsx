import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import css from '@constants/styles';
import { Column, Row } from '@components/atoms/Layout';
import ImageText from '@components/molecules/ImageText';
import { useCategories } from '@hooks/useCategories';
import Modal from '@components/molecules/Modal';
import Button from '@components/molecules/Buttons';
import { IFCategory } from '@models/IFCategory';
import { MessageError } from '@components/atoms/MessageError';


const Categories = () => {
  const { getCategories, deleteCategory, categories } = useCategories();
  const [ isOpenModal, setIsOpen ] = useState<boolean>(false);
  const [ categoryDel, setCategoryDel ] = useState<IFCategory>();
  const [ submitSuccess, setSubmitSuccess ] = useState<boolean>(false);
  const [ submitError, setSubmitError ] = useState<string>();

  const onAfterClose = () => {
    setSubmitSuccess(false);
    setSubmitError(undefined);
  };

  const getCategoryDelete = (category: IFCategory) => {
    setCategoryDel(category);
    setIsOpen(true);
  };

  const deletingCategory = () => {
    if (categoryDel) {
      deleteCategory({ id: categoryDel._id })
        .unwrap()
        .then((rs) => {
          if (rs.status === 200 || rs.statusCode === 200) {
            setSubmitSuccess(true);
            setSubmitError(undefined);
            getCategories();
          } else {
            setSubmitSuccess(false);
            setSubmitError(rs?.message);
          }
        });
    }
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

        {categories?.data && categories.data?.length > 0 && (
          <Row>
            {categories?.data?.map((item, index) => {
              return (
                <Column $width={'100%'} $lgWidth={'20%'} $mdWidth={'25%'} $xsWidth={`${(1/3)*100}%`} key={index}>
                  <ImageText
                    item={item}
                    url={`/category/${item._id}`}
                    handleDelete={getCategoryDelete}
                  />
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
        <SuccessBox>
          <SuccessTitle>
            {submitSuccess ? 'CATEGORY DELETED SUCCESSFULLY' : 'ARE YOU SURE TO DELETE?'}
          </SuccessTitle>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            {submitSuccess ? (
              <Button
                text={'Close'}
                handleClick={() => setIsOpen(false)}
              />
            ) : (
              <>
                <Button
                  text={'YES'}
                  handleClick={deletingCategory}
                  isLoading={false}
                />
                <Button
                  text={'No'}
                  handleClick={() => setIsOpen(false)}
                />
              </>
            )}
          </div>

          {submitError && <MessageError $align={'center'} style={{ marginTop: '15px' }}>{submitError}</MessageError>}
        </SuccessBox>
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
