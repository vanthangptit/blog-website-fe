import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { IFPostForm, IFResponseCreatePost } from '@models/IFPosts';
import FormControl from '@components/molecules/FormControl';
import { VISIBILITY } from '@constants/selects';
import SelectSingle from '@components/molecules/Select/SingleSelect';
import { deleteFilesInString, uploadFile } from '@utils/uploadFile';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Column, LayoutMiddle } from '@components/atoms/Layout';
import SectionTitleForm from '@components/molecules/Titles/TitleForm';
import Textarea from '@components/atoms/Textarea';
import UploadImage from '@components/molecules/UploadImage';
import { usePosts } from '@hooks/usePost';
import SuccessBox from '@components/molecules/SuccessBox';
import RichTextEditor from '@components/molecules/RichTextEditor';
import Button from '@components/molecules/Buttons/ButtonPrimary';
import { UnauthorizedContext } from '@infra/context/UnauthorizedContext';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';
import SearchTags from '@components/molecules/SearchTags';
import { IFSearchTag } from '@models/IFTags';

const CreatePost = () => {
  const { setUnauthorized } = useContext(UnauthorizedContext);
  const location: any = useLocation();
  const navigate = useNavigate();
  const { shortUrl } = useParams();
  const {
    createPostApi,
    editPostApi,
    getSinglePostApi,
    getTags,
    singlePost,
    allTag
  } = usePosts();

  const {
    setValue,
    control,
    handleSubmit,
    register,
    formState
  } = useForm<IFPostForm>();

  const [ newShortUrl, setNewShortUrl ] = useState<string>();
  const [ valueDescription, setValueDescription ] = useState<string>('');
  const [ fileUploaded, setFileUpload ] = useState<ManagedUpload.SendData>();
  const [ fileUploadedArray, setFileUploadArray ] = useState<ManagedUpload.SendData[]>();
  const [ featuredImageChanged, setFeaturedImageChanged ] = useState<boolean>(false);
  const [ srcImage, setSrcImage ] = useState<string>();
  const [ file, setFile ] = useState<any>({
    name: ''
  });
  const [ tags, setTags ] = useState<IFSearchTag[]>();
  const [ suggestions, setSuggestions ] = useState<IFSearchTag[]>();
  const [ submitting, setSubmitting ] = useState<boolean>(false);
  const [ submitSuccess, setSubmitSuccess ] = useState<boolean>(false);
  const [ uploadImageError, setUploadImageError ] = useState<string>();
  const [ valueDescError, setValueDescError ] = useState<string>();
  const [ valueTagError, setValueTagError ] = useState<string>();

  const handleResponse = (rs: IFResponseCreatePost) => {
    if (rs.status === 200 || rs.statusCode === 200) {
      setSubmitSuccess(true);
      setNewShortUrl(shortUrl ?? rs.data?.shortUrl);
    } else if (rs.status === 401 || rs.statusCode === 401) {
      setSubmitSuccess(false);
      setUnauthorized(true);
    } else {
      setSubmitSuccess(false);
      toasts('error', rs?.message ?? TOAST.ERROR_COMMON);
    }
    setSubmitting(false);
    setValueDescError(undefined);
    setValueTagError(undefined);
    setUploadImageError(undefined);
  };

  const onSubmit: SubmitHandler<IFPostForm> = async data => {
    setSubmitting(true);

    const callback = (rs?: ManagedUpload.SendData) => {
      const { visibility, ...fields } = data;
      const isPublished = visibility === VISIBILITY[1].value;

      if (!valueDescription || valueDescription?.length === 0) {
        setSubmitting(false);
        setValueDescError('Description can not empty');
        toasts('error', 'Description can not empty');
      }

      const newTags = tags?.map((tag) => tag.id) ?? [];

      if (newTags.length > 0) {
        if (rs) {
          if (shortUrl) {
            editPostApi({
              data: {
                ...fields,
                isPublished,
                description: valueDescription,
                imageUrl: rs.Location,
                tags: newTags
              },
              params: { id: singlePost?.data?.singlePost?.id ?? '' }
            }).unwrap().then(handleResponse);
          } else {
            createPostApi({
              ...fields,
              isPublished,
              description: valueDescription,
              imageUrl: rs.Location,
              tags: newTags
            }).unwrap().then(handleResponse);
          }
        } else {
          if (shortUrl) {
            editPostApi({
              data: {
                ...fields,
                isPublished,
                description: valueDescription,
                tags: newTags,
                imageUrl: srcImage ?? singlePost?.data?.singlePost?.imageUrl ?? ''
              },
              params: { id: singlePost?.data?.singlePost?.id ?? '' }
            }).unwrap().then(handleResponse);
          } else {
            setSubmitting(false);
            setUploadImageError('Image can not be empty');
            toasts('error', 'Image can not be empty');
          }
        }
      } else {
        setSubmitting(false);
        setValueTagError('Tags can not empty');
        toasts('error', 'Tags can not empty');
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
    if (fileUploaded) {
      if (fileUploadedArray && fileUploadedArray.length > 0) {
        setFileUploadArray([ ...fileUploadedArray, fileUploaded ]);
      } else {
        setFileUploadArray([ fileUploaded ]);
      }
    }
  }, [ fileUploaded ]);

  useEffect(() => {
    if (shortUrl) {
      getSinglePostApi({ shortUrl })
        .unwrap()
        .then((rs) => {
          if (rs.status === 200 || rs.statusCode === 200) {
            setSrcImage(rs.data.singlePost.imageUrl);
            setValueDescription(rs.data.singlePost.description);
            setValue('title', rs.data.singlePost.title);
            setValue('writer', rs.data.singlePost.writer);
            setValue('excerpt', rs.data.singlePost.excerpt);
            setValue('shortUrl', rs.data.singlePost.shortUrl);
            setValue(
              'visibility',
              rs.data.isPublished ? VISIBILITY[1].value : VISIBILITY[0].value
            );
          } else if (rs.status === 401 || rs.statusCode === 401) {
            setSubmitSuccess(false);
            setUnauthorized(true);
          } else {
            setSubmitSuccess(false);
            toasts('error', rs?.message ?? TOAST.ERROR_COMMON);
          }
        });
    }
  }, [ shortUrl, location ]);

  useEffect(() => {
    getTags();
  }, [ location ]);

  useEffect(() => {
    if (allTag?.data && allTag.data?.length) {
      const newSuggestions = allTag.data?.map(tag => {
        return {
          id: tag.title,
          text: '# ' + tag.title
        };
      });

      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [ location, allTag ]);

  useEffect(() => {
    if (singlePost?.data && singlePost.data?.singlePost.tags) {
      const newTags = singlePost.data?.singlePost.tags?.map(tag => {
        return {
          id: tag.title,
          text: '# ' + tag.title
        };
      });

      setTags(newTags);
    } else {
      setTags([]);
    }
  }, [ location, singlePost ]);

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
                <Column $smWidth={'54%'}>
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
                    autofocus={true}
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
                    $minLength={25}
                    $maxLength={255}
                    $isRequired={true}
                    $rows={11}
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

                  <SearchTags
                    label={'TAGS'}
                    $with={'100%'}
                    $height={'45px'}
                    setTags={setTags}
                    tags={tags ?? []}
                    suggestions={suggestions ?? []}
                    valueTagError={valueTagError}
                  />
                </Column>
                <Column $smWidth={'46%'}>
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
                    <SelectSingle
                      colourOptions={VISIBILITY}
                      nameField={'visibility'}
                      label={'VISIBILITY'}
                      height={'45px'}
                      control={control}
                      Controller={Controller}
                      formState={formState}
                      textEr={'Error'}
                      classNamePrefix={'react-select'}
                    />
                  </GroupField>
                </Column>
              </Row>
              <Row>
                <Column>
                  <RichTextEditor
                    label={'Description'}
                    $heightEditor={'360px'}
                    toolbarId={'create-post-desc'}
                    value={valueDescription}
                    setValueRichText={setValueDescription}
                    setFileUpload={setFileUpload}
                    placeholder={'What are you thinking...'}
                    valueDescError={valueDescError}
                  />
                </Column>
              </Row>

              <ButtonBox>
                <Button
                  buttonType={'submit'}
                  text={shortUrl ? 'Save Changes' : 'Create'}
                  isLoading={submitting}
                />
              </ButtonBox>
            </FormElement>
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

const ButtonBox = styled.div`
  text-align: center;
  margin: 32px 0 80px;
`;
