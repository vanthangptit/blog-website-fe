import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { IFPostForm, IFResponseCreatePost } from '@models/IFPosts';
import FormControl from '@components/molecules/FormControl';
import { VISIBILITY } from '@src/constants/post';
import Select from '@components/molecules/Select';
import { deleteFilesInString, uploadFile } from '@utils/uploadFile';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LayoutMiddle, Container, Row, Column } from '@components/atoms/Layout';
import SectionTitleForm from '@components/molecules/SectionTitleForm';
import Textarea from '@components/atoms/Textarea';
import UploadImage from '@components/molecules/UploadImage';
import { usePosts } from '@hooks/usePost';
import { BtnSubmit } from '@components/atoms/Buttons/BtnSubmit';
import { MessageError } from '@components/atoms/MessageError';
import SuccessBox from '@components/molecules/SuccessBox';

const cateId = '6587e390da66d8f63cd6fa34';

const CreatePost = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const { shortUrl } = useParams();
  const {
    createPostApi,
    editPostApi,
    getSinglePostApi,
    singlePost
  } = usePosts();

  const {
    setValue,
    control,
    handleSubmit,
    register,
    formState
  } = useForm<IFPostForm>();

  const [ categoryId, setCategoryId ] = useState<string>();
  const [ newShortUrl, setNewShortUrl ] = useState<string>();
  const [ valueDescription, setValueDescription ] = useState('Hello body');
  const [ fileUploadedArray, setFileUploadArray ] = useState<ManagedUpload.SendData[]>();
  const [ featuredImageChanged, setFeaturedImageChanged ] = useState<boolean>(false);
  const [ srcImage, setSrcImage ] = useState<string>();
  const [ file, setFile ] = useState<any>({
    name: ''
  });

  const [ submitting, setSubmitting ] = useState<boolean>(false);
  const [ submitSuccess, setSubmitSuccess ] = useState<boolean>(false);
  const [ submitError, setSubmitError ] = useState<string>();
  const [ uploadImageError, setUploadImageError ] = useState<string>();
  const [ valueDescError, setValueDescError ] = useState<string>();

  // eslint-disable-next-line no-console
  console.log({ setFileUploadArray, valueDescError });

  const handleResponse = (rs: IFResponseCreatePost) => {
    if (rs.status === 200 || rs.statusCode === 200) {
      setSubmitSuccess(true);
      setSubmitError(undefined);
      setNewShortUrl(shortUrl ?? rs.data?.shortUrl);
    } else {
      setSubmitSuccess(false);
      setSubmitError(rs?.message);
    }
    setSubmitting(false);
  };

  const onSubmit: SubmitHandler<IFPostForm> = async data => {
    setSubmitting(true);

    const callback = (rs?: ManagedUpload.SendData) => {
      const { visibility, ...fields } = data;
      const isPublished = visibility === VISIBILITY[1].value;

      if (valueDescription && valueDescription.length > 0) {
        if (rs) {
          if (shortUrl) {
            editPostApi({
              ...fields,
              isPublished,
              description: valueDescription,
              imageUrl: rs.Location,
              params: { shortUrl }
            }).unwrap().then(handleResponse);
          } else if (categoryId) {
            createPostApi({
              ...fields,
              isPublished,
              description: valueDescription,
              imageUrl: rs.Location,
              categoryId
            }).unwrap().then(handleResponse);
          } else {
            setSubmitting(false);
            setSubmitError('An occurred error. Please try again!');
          }
        } else {
          if (shortUrl) {
            editPostApi({
              ...fields,
              isPublished,
              description: valueDescription,
              imageUrl: srcImage ?? singlePost?.data?.imageUrl ?? '',
              params: { shortUrl }
            }).unwrap().then(handleResponse);
          } else {
            setSubmitting(false);
            setSubmitError('An occurred error. Please try again!');
          }
        }
      } else {
        setSubmitting(false);
        setValueDescError('Description can not empty');
      }
    };

    if (fileUploadedArray) {
      await deleteFilesInString(fileUploadedArray, valueDescription);
    }

    if (featuredImageChanged) {
      await uploadFile({ file, callback, setErrorMessage: setUploadImageError });
    } else {
      callback(undefined);
    }
  };

  const clickOnView = () => {
    navigate(`/post/${newShortUrl}`);
  };

  useEffect(() => {
    setCategoryId(location?.state?._id ?? cateId);

    if (shortUrl) {
      getSinglePostApi({ shortUrl })
        .unwrap()
        .then((rs) => {
          if (rs.status === 200 || rs.statusCode === 200) {
            setSrcImage(rs.data.imageUrl);
            setValueDescription(rs.data.description);
            setValue('title', rs.data.title);
            setValue('writer', rs.data.writer);
            setValue('excerpt', rs.data.excerpt);
            setValue('shortUrl', rs.data.shortUrl);
            setValue(
              'visibility',
              rs.data.isPublished ? VISIBILITY[1].value : VISIBILITY[0].value
            );
          } else if (rs.status === 401 || rs.statusCode === 401) {
            // navigate('/login');
            /**
             * @todo: handle in error auth
             */
          } else {
            /**
             * @todo: handle in error access or internal server error
             */
          }
        });
    }
  }, [ shortUrl, location ]);

  return (
    <LayoutMiddle>
      <Container>
        <SectionTitleForm title={shortUrl ? 'Edit Post' : 'Create Post'} />

        {submitSuccess ? (
          <SuccessBox
            onClick={clickOnView}
            title={shortUrl ? 'Post changed successfully' : 'Post created successfully'}
            btnText={'View Post'}
          />
        ) : (
          <>
            <FormElement onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Column $smWidth={'50%'}>
                  <FormControl
                    register={register}
                    formState={formState}
                    textEr={'Title required and must between 5 - 255 characters.'}
                    typeField={'text'}
                    nameField={'title'}
                    placeholder={'Enter a title..'}
                    $with={'100%'}
                    $height={'45px'}
                    $minLength={5}
                    $maxLength={50}
                    label={'TITLE'}
                  />
                  <FormControl
                    register={register}
                    formState={formState}
                    textEr={'Invalid username! It can only contain letters, numbers.'}
                    typeField={'text'}
                    nameField={'writer'}
                    placeholder={'Enter a writer..'}
                    $with={'100%'}
                    $height={'45px'}
                    $minLength={5}
                    $maxLength={50}
                    $pattern={/^[a-zA-Z0-9\s]{3,25}$/}
                    label={'WRITER'}
                  />
                  <Textarea
                    register={register}
                    formState={formState}
                    nameField={'excerpt'}
                    placeholder={'Enter reduced information about the post...'}
                    label={'EXCERPT'}
                    textEr={'Excerpt required and must between 25 - 255 characters.'}
                    $minLength={5}
                    $maxLength={255}
                    $isRequired={true}
                    $rows={13}
                  />

                  <FormControl
                    register={register}
                    formState={formState}
                    textEr={'Invalid short url! It can only contain letters, numbers, hyphens (-), and underscores (_), and between 5-50 characters.'}
                    typeField={'text'}
                    nameField={'shortUrl'}
                    placeholder={'Enter a short url..'}
                    $with={'100%'}
                    $height={'45px'}
                    $minLength={5}
                    $maxLength={50}
                    $pattern={/^[a-zA-Z0-9-_\s]*.{5,50}$/}
                    label={'SHORT URL'}
                  />
                </Column>
                <Column $smWidth={'50%'}>
                  <UploadImage
                    label={'UPLOAD IMAGE'}
                    setFile={setFile}
                    setSrcImage={setSrcImage}
                    setImageChanged={setFeaturedImageChanged}
                    srcImage={srcImage}
                    maxWidth={'100%'}
                    messageError={uploadImageError}
                  />

                  <GroupField>
                    <Select
                      colourOptions={VISIBILITY}
                      nameField={'visibility'}
                      label={'VISIBILITY'}
                      height={'45px'}
                      control={control}
                      Controller={Controller}
                      formState={formState}
                      textEr={'Error'}
                    />
                  </GroupField>
                </Column>
              </Row>

              <BtnSubmit
                type={'submit'}
                disabled={submitting}
              >
                {shortUrl ? 'Save Changes' : 'Create'}
              </BtnSubmit>
            </FormElement>
            {submitError && submitError.length && (
              <MessageError $align={'center'}>{submitError}</MessageError>
            )}
          </>
        )}
      </Container>
    </LayoutMiddle>
  );
};

export default CreatePost;

const FormElement = styled.form`
  width: 100%;
`;

const GroupField = styled.div`
  padding-bottom: 32px;
`;
