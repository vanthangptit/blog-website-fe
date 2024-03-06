import React, { useEffect, useState } from 'react';
import ToggleField from '@components/molecules/Boxes/ToggleField';
import { Form } from '@components/atoms/Form';
import { toasts } from '@utils/toast';
import UploadImage from '@components/molecules/UploadImage';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { uploadFile } from '@utils/uploadFile';
import styled from 'styled-components';
import { useUser } from '@hooks/useUser';
import { TOAST } from '@constants/toast';

const FormProfilePhoto = ({ profilePhoto }: { profilePhoto: string }) => {
  const { changeProfilePhoto } = useUser();
  const [ isOpen, setOpen ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ imageChanged, setImageChanged ] = useState<boolean>(false);
  const [ srcImage, setSrcImage ] = useState<string>();
  const [ file, setFile ] = useState<any>({
    name: ''
  });
  const [ submitError, setSubmitError ] = useState<string>();

  const callback = (rs: ManagedUpload.SendData) => {
    changeProfilePhoto({
      profilePhoto: rs.Location
    }).unwrap()
      .then((rs) => {
        if (rs.status === 200 || rs.statusCode === 200) {
          toasts('success', TOAST.EDIT_PROFILE);
          setOpen(false);
        } else {
          toasts('error', TOAST.ERROR_COMMON);
        }
        setIsLoading(false);
      });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (imageChanged) {
      setIsLoading(true);
      await uploadFile({
        file,
        callback,
        setErrorMessage: setSubmitError
      });
    }
  };

  useEffect(() => {
    setSrcImage(profilePhoto);
  }, [ profilePhoto ]);

  useEffect(() => {
    if (submitError) {
      toasts('error', submitError);
    }
  }, [ submitError ]);

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <ToggleField
        isOpen={isOpen}
        setOpen={setOpen}
        isLoading={!imageChanged || isLoading}
        label={'Avatar'}
        imageUrl={profilePhoto}
      >
        <ImageBox>
          <UploadImage
            $align={'center'}
            maxWidth={'150px'}
            imageCircle={true}
            label={'Upload image'}
            setFile={setFile}
            setSrcImage={setSrcImage}
            setImageChanged={setImageChanged}
            srcImage={srcImage}
          />
        </ImageBox>

      </ToggleField>
    </Form>
  );
};

export default FormProfilePhoto;

const ImageBox = styled.div`
  max-width: 300px;
  margin: auto;
`;