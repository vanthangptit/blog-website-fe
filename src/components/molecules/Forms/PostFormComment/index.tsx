import React, { MouseEvent, useContext, useEffect } from 'react';
import Textarea from '@components/atoms/Textarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import SiteAvatar from '@components/molecules/Avatars/SiteAvatar';
import Button from '@components/molecules/Buttons/ButtonPrimary';
import { useComment } from '@hooks/useComment';
import { IFDataComment, IFResponseComment } from '@models/IFComment';
import { UnauthorizedContext } from '@infra/../../../../services/context/UnauthorizedContext';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';
import SingleTitle from '@components/molecules/Titles/SingleTitle';
import CardComment from '@components/molecules/Cards/CardComment';
import { Link } from 'react-router-dom';
import { IUser } from '@models/IFUser';
import { AVATAR_DEFAULT } from '@constants/aws/s3';

const PostFormComment = ({ creatorId, postId, viewer }: { creatorId: string; postId: string; viewer?: IUser }) => {
  const { setUnauthorized } = useContext(UnauthorizedContext);
  const { isLoading, createComment, getCommentByPostId, comment } = useComment();

  const {
    reset,
    handleSubmit,
    register,
    formState
  } = useForm<IFDataComment>();

  const onSubmit: SubmitHandler<IFDataComment> = data => {
    if (viewer) {
      createComment({ id: postId }, data).unwrap().then(handleResponse);
    } else {
      setUnauthorized(true);
    }
  };

  const handleResponse = (rs: IFResponseComment) => {
    if (rs.status === 200 || rs.statusCode === 200) {
      reset();
      toasts('success', TOAST.CREATE_COMMENT);
    } else if (rs.status === 401 || rs.statusCode === 401) {
      setUnauthorized(true);
    } else {
      toasts('error', TOAST.ERROR_COMMON);
    }
  };

  const reportAbuse = (e: MouseEvent<HTMLAnchorElement | MouseEvent>) => {
    e.preventDefault();
    toasts('warn', TOAST.WARNING_UPDATING);
    return false;
  };

  useEffect(() => {
    getCommentByPostId({ id: postId });
  }, [ postId ]);

  return (
    <BoxComment>
      <SingleTitle title={`Top comments (${comment?.data?.length ?? 0})`} />

      <FormComment>
        <SiteAvatar viewerPhoto={viewer ? viewer?.profilePhoto ?? AVATAR_DEFAULT : undefined}/>
        <FormElement onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            register={register}
            formState={formState}
            nameField={'description'}
            placeholder={'Add to the discussion...'}
            textEr={'The comment field is required'}
            $isRequired={true}
            $rows={2}
            $resize={true}
          />
          <ButtonBox>
            <Button
              size={'sm'}
              text={'Send'}
              buttonType={'submit'}
              disabled={isLoading}
            />
          </ButtonBox>
        </FormElement>
      </FormComment>

      {comment?.data && comment?.data.length > 0 && comment?.data?.map((item, key) => (
        <Card key={key}>
          <CardComment comment={item} />
        </Card>
      ))}

      {creatorId !== viewer?._id && (
        <ReportAbuse>
          <Link to={'/report-abuse'} onClick={(e) => reportAbuse(e)}>Report abuse</Link>
        </ReportAbuse>
      )}
    </BoxComment>
  );
};

export default React.memo(PostFormComment);

const BoxComment = styled.div``;

const FormComment = styled.article`
  width: 100%;
  display: flex;
  gap: 15px;
`;

const FormElement = styled.form`
  width: 100%;
`;

const ButtonBox = styled.div`
  width: 100%;
  text-align: right;
`;

const Card = styled.article`
  margin: 25px 0;
`;

const ReportAbuse = styled.div`
  margin: 35px 0 25px;
  font-size: 0.875em;
  text-align: center;

  a {
    color: ${({ theme }) => theme.gray6};
    &:hover {
      color: ${({ theme }) => theme.gray6};
    }
  }
`;
