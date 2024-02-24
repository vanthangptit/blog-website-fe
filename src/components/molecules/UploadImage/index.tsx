import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { AiFillEdit } from 'react-icons/ai';
import { MessageError } from '@components/atoms/MessageError';
import { validateFileTypes, validationSize } from '@utils/uploadFile';
import { LabelField } from '@components/atoms/Label';

const UploadImage = ({
  label,
  setFile,
  setSrcImage,
  setImageChanged,
  srcImage,
  messageError,
  maxWidth = '330px',
  imageCircle,
  $align
} : {
  label: string
  setFile: (file: any) => void
  setSrcImage: (newImage: string) => void
  setImageChanged: (newState: boolean) => void
  srcImage?: string
  imageChanged?: boolean
  messageError?: string
  maxWidth?: string
  imageCircle?: boolean
  $align?: 'left' | 'center' | 'right'
}) => {
  const [ validated, setValidated ] = useState<string>();

  const handleChangeFeaturedImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) {
      return;
    }
    const file = event.target.files[0];

    const validateSize = validationSize(file);
    if (validateSize) {
      setValidated(validateSize.message);
      return;
    }

    if (!validateFileTypes.find(type => type === file.type)) {
      setValidated('File invalid. File must be in JPG/PNG format.');
      return;
    }

    setValidated('');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setFile(file);
      setSrcImage(String(reader.result));
      setImageChanged(true);
    };
  };

  return (
    <ImageContainer>
      <LabelField $align={$align}>{label}</LabelField>
      <DivImage>
        <UploadImageBox $maxWidth={maxWidth} $imageCircle={imageCircle}>
          <LabelInput htmlFor={'imageFile'}>
            <IconEdit>
              <AiFillEdit size={38} />
            </IconEdit>
          </LabelInput>
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
            <figure>
              <PostImage src={srcImage} alt={'Post image'} $imageCircle={imageCircle} />
            </figure>
          )}
        </UploadImageBox>
        <DivImageNote>
          <p style={{ textAlign: 'left' }}>
            Recommended size:<br /> 300 x 300
          </p>
          <p style={{ textAlign: 'right' }}>
            Max 5 MB
            <br />
            Formats: JPG, PNG
          </p>
        </DivImageNote>
      </DivImage>
      {((messageError && messageError.length > 0) || (validated && validated.length > 0)) && (
        <MessageError>{messageError ?? validated}</MessageError>
      )}
    </ImageContainer>
  );
};

export default UploadImage;

const IconEdit = styled.span`
  display: inline-block;
  padding: 15px 20px 14px;
  background-color: rgba(0,0,0,0.3);
  border-radius: 20px;
  color: ${({ theme }) => theme.white};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageContainer = styled.article`
  margin-bottom: 35px;
`;

const DivImage = styled.div``;

const UploadImageBox = styled.div<{ $maxWidth: string; $imageCircle?: boolean }>`
  overflow: hidden;
  display: flex;
  position: relative;
  margin: auto auto 10px;
  max-width: ${({ $maxWidth }) => $maxWidth};
  border: 1px solid ${({ theme }) => theme.gray6};
  border-radius: 30px;

  figure {
    padding: 0;
    margin: 0;
  }

  ${({ $imageCircle }) =>
    $imageCircle &&
    css`
      border-radius: 50%;
    `}
`;

const PostImage = styled.img<{ $imageCircle?: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 10px;
  object-fit: cover;
  z-index: 1;

  ${({ $imageCircle }) =>
    $imageCircle &&
    css`
      border-radius: 50%;
    `}
`;

const DivImageNote = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.fontRobotoRegular};
  font-style: italic;
  font-size: 14px;
  color: ${({ theme }) => theme.text1};

  p {
    margin-bottom: 0;
  }
`;

const LabelInput = styled.label`
  cursor: pointer;
  display: inline-block;
  position: relative;
  z-index: 2;
  padding-bottom: 100%;
  width: 100%;
`;
