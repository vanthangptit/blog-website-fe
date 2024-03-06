import 'react-image-lightbox/style.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import { BsArrowsFullscreen } from 'react-icons/bs';
import Lightbox from 'react-image-lightbox';

const BannerPost = ({
  photo,
  alt,
  clickOutsideToClose = true,
  figcaption
}: {
  photo: string;
  alt?: string;
  figcaption?: string;
  clickOutsideToClose?: boolean;
}) => {
  const [ open, setOpen ] = useState<boolean>(false);

  return (
    <BoxImage>
      <Image src={photo} alt={alt} />
      {figcaption && (
        <Figcaption>{figcaption}</Figcaption>
      )}

      <IconZoom className={'icon-zoom'} onClick={() => setOpen(true)}>
        <BsArrowsFullscreen size={16}/>
      </IconZoom>

      {open && (
        <Lightbox
          clickOutsideToClose={clickOutsideToClose}
          mainSrc={photo}
          onCloseRequest={() => setOpen(false)}
          imagePadding={50}
        />
      )}
    </BoxImage>
  );
};

export default BannerPost;

const BoxImage = styled.figure`
  margin: 0 0 15px;
  padding: 0;
  position: relative;

  &:hover .icon-zoom {
    visibility: visible;
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 700px;
  object-fit: cover;
  z-index: 1;
  text-align: center;
  display: block;
  margin: auto;
`;

const Figcaption = styled.figcaption`
  margin: 0;
  padding: 0;
  font: 400 13px arial;
  line-height: 160%;
  color: #222;
  padding: 10px 0 0 0;
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.gray6};
`;

const IconZoom = styled.span`
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 1;
  background-color: ${({ theme }) => theme.gray7};
  padding: 7px 12px 8px;
  display: flex;
  border-radius: 4px;
  color: ${({ theme }) => theme.gray3};
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
`;
