import React from 'react';
import { BiLock } from 'react-icons/bi';
import styled from 'styled-components';

const SectionTitleForm = ({ iconSize = 20, text } : { iconSize: number; text: string }) => {
  return (
    <Title>
      <TitleAvatar>
        <BiLock size={iconSize ?? 20} />
      </TitleAvatar>
      <TitleText>{text}</TitleText>
    </Title>
  );
};

export default SectionTitleForm;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const TitleText = styled.span`
  text-align: center;
  font-size: 27px;
  font-weight: 400;
  margin-bottom: 10px;
  width: 100%;
  display: inline-block;

  @media (min-width: 768px) and (max-width: 991px) {
    font-size: calc(22px + (27 - 22) * (100vw - 768px) / (991 - 768));
  }

  @media (max-width: 767px) {
    // font-size: calc(18px + (23 - 18) * (100vw - 360px) / (767 - 360));
    font-size: 22px;
  }
`;

const TitleAvatar = styled.span`
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.bg4};
  color: ${({ theme }) => theme.white};
`;
