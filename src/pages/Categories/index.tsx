import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import css from '@constants/styles';
import { Column, Row } from '@components/atoms/Layout';
import ImageText from '@components/molecules/ImageText';
import { useCategories } from '@hooks/useCategories';
import Button from '@components/molecules/Buttons';
import { IFCategory } from '@models/IFCategory';
import ModalDelete from '@components/organisms/ModalDelete';
import { UnauthorizedContext } from '@infra/context/UnauthorizedContext';
import { useNavigate } from 'react-router-dom';


const Categories = () => {
  const navigate = useNavigate();
  const { setUnauthorized } = useContext(UnauthorizedContext);
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
          } else if (rs.status === 401 || rs.statusCode === 401) {
            setSubmitSuccess(false);
            setUnauthorized(true);
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
                <Column $lgWidth={'20%'} $mdWidth={'25%'} $xsWidth={`${(1/3)*100}%`} key={index}>
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
          handleClick={() => navigate('/create-category')}
          isLoading={false}
        />
      </Container>

      <ModalDelete
        isOpenModal={isOpenModal}
        setIsOpen={setIsOpen}
        onAfterClose={onAfterClose}
        submitSuccess={submitSuccess}
        handleDelete={deletingCategory}
        submitError={submitError}
        textSuccess={'CATEGORY DELETED SUCCESSFULLY'}
      />
    </Layout>
  );
};

export default Categories;

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
