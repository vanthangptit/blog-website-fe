import React from 'react';
import styled from 'styled-components';

const BannerPost = ({ src }: { src: string }) => {
  return (
    <BoxImage>
      <Image src={src} alt="Image Post"/>
    </BoxImage>
  );
};

export default BannerPost;

const BoxImage = styled.figure`
  margin: 0;
  padding: 0;
  padding-bottom: 100%;
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Figcaption = styled.figcaption`
  margin: 0;
  padding: 0;
`;
