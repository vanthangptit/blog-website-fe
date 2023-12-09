import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MessageError } from '@components/MessageError';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IPostForm, IPostParams } from '@models/IFPosts';
import FormControl from '@components/FormControl';
import { AWS_S3_URL_BLOG, VISIBILITY } from '@src/constants/post';
import Select from '@components/select';
import { IFColourOption } from '@models/SelectOptions';
import { deleteFile, uploadFile } from '@utils/uploadFile';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CreatePost = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const { shortUrl } = useParams();

  const {
    // reset,
    // setValue,
    handleSubmit,
    register,
    formState
  } = useForm<IPostForm>();

  const [ postType, setPostType ] = useState<string>('');
  const [ valueDescription, setValueDescription ] = useState('');
  const [ fileUploadedArray, setFileUploadArray ] = useState<ManagedUpload.SendData[]>();
  const [ visibility, setVisibility ] = useState<IFColourOption>(VISIBILITY[0]);
  const [ featuredImageChanged, setFeaturedImageChanged ] = useState<boolean>(false);
  const [ srcImage, setSrcImage ] = useState<string>();
  const [ file, setFile ] = useState<any>({
    name: ''
  });

  const [ postId, setPostId ] = useState<string>();
  const [ submitting, setSubmitting ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>();

  const handleChangeFeaturedImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setFile(file);
      setSrcImage(String(reader.result));
      setFeaturedImageChanged(true);
    };
  };

  const onSubmit: SubmitHandler<IPostForm> = async data => {
    setSubmitting(true);
    const callback = (rs?: ManagedUpload.SendData) => {
      if (rs) {
        if (postType && postType.length > 0) {
          const newData: IPostParams = {
            ...data,
            imageUrl: rs.Location,
            postType,
            public: visibility.value === VISIBILITY[1].value
          };
          if (valueDescription) {
            newData.description = valueDescription;
          }

          // if (shortUrl) {
          //   newData.postId = postId;
          //   editPostApi(newData)
          //     .unwrap()
          //     .then(({ status, post }) => {
          //       setSubmitting(false);
          //       if (status === 200) {
          //         navigate(`/post/${post.shortUrl}`);
          //       }
          //     });
          // } else {
          //   createPostApi(newData)
          //     .unwrap()
          //     .then(({ status, post }) => {
          //       setSubmitting(false);
          //       if (status === 200) {
          //         navigate(`/post/${post.shortUrl}`);
          //       }
          //     });
          // }
        } else {
          setSubmitting(false);
          // setErrorMessagePostType('Post type can not empty.');
        }
      } else {
        if (postType && postType.length > 0) {
          // resetMessageErrors();
          if (shortUrl) {
            // editPostApi({
            //   ...data,
            //   imageUrl: srcImage ?? '',
            //   description: valueDescription,
            //   postType: valuePostType,
            //   public: visibility.value === VISIBILITY[1].value
            //   postId
            // })
            //   .unwrap()
            //   .then(({ status, post }) => {
            //     setSubmitting(false);
            //     if (status === 200) {
            //       navigate(`/post/${post.shortUrl}`);
            //     }
            //   });
          } else {
            // createPostApi({
            //   ...data,
            //   imageUrl: srcImage ?? '',
            //   description: valueDescription,
            //   postType: valuePostType,
            //   public: visibility.value === VISIBILITY[1].value
            // })
            //   .unwrap()
            //   .then(({ status, post }) => {
            //     setSubmitting(false);
            //     if (status === 200) {
            //       navigate(`/post/${post.shortUrl}`);
            //     }
            //   });
          }
        } else {
          // setErrorMessagePostType('Post type can not empty.');
          setSubmitting(false);
        }
      }
    };

    if (fileUploadedArray) {
      await deleteFile(fileUploadedArray, valueDescription);
    }

    if (featuredImageChanged) {
      await uploadFile({ file, callback, setErrorMessage });
    } else {
      callback(undefined);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(visibility, submitting, setPostType, setValueDescription, setFileUploadArray);
    // eslint-disable-next-line no-console
    console.log(postId, setPostId, errorMessage);
    // eslint-disable-next-line no-console
    console.log(location, navigate);
  }, []);

  return (
    <FormElement onSubmit={handleSubmit(onSubmit)}>
      <RowField>
        <ColumnField>
          <GroupField>
            <LabelField>TITLE</LabelField>
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
            />
          </GroupField>
          <GroupField>
            <LabelField>WRITER</LabelField>
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
            />
          </GroupField>
          <GroupField>
            <LabelField>EXCERPT</LabelField>
            <TextareaAutosizeCustom
              value={''}
              rows={7}
              placeholder="Enter reduced information about the post..."
              autoComplete="excerpt"
              {...register('excerpt', { required: true, minLength: 5, maxLength: 255 })}
            />
            {formState.errors.excerpt && (
              <MessageError>Excerpt required and must between 25 - 255 characters.</MessageError>
            )}
          </GroupField>
          <RowField>
            <ColumnField>
              <GroupField>
                <LabelField>Short Url</LabelField>
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
                />
              </GroupField>
            </ColumnField>
          </RowField>
        </ColumnField>

        <ColumnField>
          <DivImageContainer>
            <LabelField>POST IMAGE</LabelField>
            <DivImage>
              <DivBoxImage>
                <label htmlFor={'imageFile'}>
                  <img src={`${AWS_S3_URL_BLOG}icon-edit.svg`} alt={'Change the post image!'} />
                </label>
                <input
                  type={'file'}
                  accept="image/*"
                  id={'imageFile'}
                  hidden={true}
                  onChange={ async (event: React.ChangeEvent<HTMLInputElement>) => {
                    await handleChangeFeaturedImage(event);
                  }}
                />
                {srcImage && (
                  <PostImage src={srcImage} alt={'Post image'} />
                )}
              </DivBoxImage>
              <DivImageNote>
                <p>Formats supported:<br />JPG, PNG</p>
                <p>Max 5 MB</p>
              </DivImageNote>
            </DivImage>
          </DivImageContainer>

          <GroupField>
            <LabelField>Visibility</LabelField>
            <Select
              colourOptions={VISIBILITY}
              nameField={'Visibility'}
              setUserChoice={setVisibility}
            />
          </GroupField>
        </ColumnField>
      </RowField>
    </FormElement>
  );
};

export default CreatePost;

const FormElement = styled.form``;

const RowField = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -16px;
  margin-right: -16px;
`;

const ColumnField = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  flex: 0 0 50%';
  max-width: 50%;

  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const GroupField = styled.div`
  padding-bottom: 32px;
`;

const LabelField = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  font-family: Roboto-bold, sans-serif;
  margin-bottom: 12px;
`;

const TextareaAutosizeCustom = styled.textarea`
  width: 100%;
  resize: none;
  padding: 16.5px 14px;

  &::-webkit-scrollbar {
    width: 6px;
  };

  &::-webkit-scrollbar-thumb {
    background: #555555;
    border-radius: 5px;
  };

  &::-webkit-scrollbar-thumb:hover {
    background: #555555;
  }
`;

const DivImageContainer = styled.div`
  margin-bottom: 40px;
`;

const DivImage = styled.div``;

const DivBoxImage = styled.div`
  overflow: hidden;
  border-radius: 30px;
  border: 1px solid #838383;
  marginBottom: 10px;
  position: relative;

  label {
    display: flex;
    height: 380px;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2,

    img {
      width: 75px;
      height: 75px;
      cursor: pointer;
      position: relative;
      z-index: 2
    }
  }
`;

const DivImageNote = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Roboto-light, sans-serif;
  font-style: italic;
  font-size: 14px;

  p {
    margin-bottom: 0;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 10px;
  object-fit: cover;
  z-index: 1
`;

const ButtonBox = styled.div`
  text-align: center;

  button {
    max-width: 300px;
  }
`;
