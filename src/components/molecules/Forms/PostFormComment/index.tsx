import React from 'react';
import Textarea from '@components/atoms/Textarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import SiteAvatar from '@components/molecules/Avatars/SiteAvatar';

const PostFormComment = () => {
  const {
    // setValue,
    // control,
    handleSubmit,
    register,
    formState
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async data => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <PostFormCommentBox>
      <SiteAvatar />
      <FormElement onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          register={register}
          formState={formState}
          nameField={'excerpt'}
          placeholder={'Add to the discussion...'}
          textEr={'The comment field is required'}
          $isRequired={true}
          $rows={2}
        />
      </FormElement>
    </PostFormCommentBox>

  );
};

export default PostFormComment;

const PostFormCommentBox = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`;

const FormElement = styled.form`
  width: 100%;
`;
