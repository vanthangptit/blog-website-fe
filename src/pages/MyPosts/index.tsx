import React, { useContext, useEffect, useState } from 'react';
import { usePosts } from '@hooks/usePost';
import { Container, Row, Column } from '@components/atoms/Layout';
import ModalDelete from '@components/organisms/ModalDelete';
import { UnauthorizedContext } from '@infra/context/UnauthorizedContext';
import TitlePage from '@components/molecules/Titles/TitlePage';
import CardPost from '@components/molecules/Cards/CardPost';
import styled from 'styled-components';

const MyPosts = () => {
  const { setUnauthorized } = useContext(UnauthorizedContext);
  const { getAllPost, deletePost, allPost } = usePosts();
  const [ postIdDelete, setPostIdDelete ] = useState<string>();
  const [ isOpenModal, setIsOpen ] = useState<boolean>(false);
  const [ submitSuccess, setSubmitSuccess ] = useState<boolean>(false);
  const [ submitError, setSubmitError ] = useState<string>();

  const onAfterClose = () => {
    setSubmitSuccess(false);
    setSubmitError(undefined);
  };

  const handleShowModalDelete = (id: string) => {
    setPostIdDelete(id);
    setIsOpen(true);
  };

  const deletingPost = () => {
    if (postIdDelete) {
      deletePost({ id: postIdDelete })
        .unwrap()
        .then((rs) => {
          if (rs.status === 200 || rs.statusCode === 200) {
            setSubmitSuccess(true);
            setSubmitError(undefined);
            getAllPost();
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
    getAllPost()
      .unwrap()
      .then((rs) => {
        if (rs.status === 401 || rs.statusCode === 401) {
          setUnauthorized(true);
        }
      });
  }, []);

  return (
    <Layout>
      <Container>
        <TitlePage title={'All Post'} />

        <Row>
          <Column>
            {allPost?.data && allPost?.data.length > 0 && allPost?.data?.map((item, key) => (
              <CardPost key={key} item={item} handleDelete={handleShowModalDelete} />
            ))}
          </Column>
        </Row>
      </Container>

      <ModalDelete
        isOpenModal={isOpenModal}
        setIsOpen={setIsOpen}
        onAfterClose={onAfterClose}
        submitSuccess={submitSuccess}
        handleDelete={deletingPost}
        submitError={submitError}
        textSuccess={'CATEGORY DELETED SUCCESSFULLY'}
      />
    </Layout>
  );
};

export default MyPosts;

const Layout = styled.main`
  width: 100%;
`;
