import React from 'react';
import { BiLock } from 'react-icons/bi';
import styled from 'styled-components';

const TitleForm = ({
  icon,
  title,
  text
} : {
  icon?: {
    size?: number
    el: any
  }
  title: string;
  text?: string
}) => {
  return (
    <Hgroup>
      {icon && (
        <TitleAvatar>
          <icon.el size={icon?.size ?? 20} />
        </TitleAvatar>
      )}

      <Heading>{title}</Heading>

      {text && <Text>{text}</Text>}
    </Hgroup>
  );
};

export default TitleForm;

const Hgroup = styled.hgroup`
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 35px;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 5px;
  width: 100%;
  color: ${({ theme }) => theme.primary1};

  @media (min-width: 768px) and (max-width: 991px) {
    font-size: calc(24px + (32 - 26) * (100vw - 768px) / (991 - 768));
  }

  @media (max-width: 767px) {
    // font-size: calc(18px + (24 - 18) * (100vw - 360px) / (767 - 360));
    font-size: 24px;
  }
`;

const Text = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.primary1};
`;

const TitleAvatar = styled.span`
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: ${({ theme }) => theme.text1};
`;
