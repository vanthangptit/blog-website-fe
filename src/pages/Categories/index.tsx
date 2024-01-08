import React, { useContext, useEffect, useState } from 'react';
import { Container, Column, Row } from '@components/atoms/Layout';
import { useCategories } from '@hooks/useCategories';
import Button from '@components/molecules/Buttons';
import { IFCategory } from '@models/IFCategory';
import ModalDelete from '@components/organisms/ModalDelete';
import { UnauthorizedContext } from '@infra/context/UnauthorizedContext';
import { useNavigate } from 'react-router-dom';
import TitlePage from '@components/molecules/SectionTitle/TitlePage';
import CardCategory from '@components/molecules/Cards/CardCategory';

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
            setIsOpen(false);
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
    getCategories()
      .unwrap()
      .then((rs) => {
        if (rs.status === 401 || rs.statusCode === 401) {
          setUnauthorized(true);
        }
      });
  }, []);

  return (
    <>
      <Container>
        <TitlePage title={'Your Categories'} />

        {categories?.data && categories.data?.length > 0 && (
          <Row>
            {categories?.data?.map((item, index) => {
              return (
                <Column $lgWidth={'20%'} $mdWidth={'25%'} $smWidth={`${(1/3)*100}%`} key={index}>
                  <CardCategory
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
    </>
  );
};

export default Categories;
