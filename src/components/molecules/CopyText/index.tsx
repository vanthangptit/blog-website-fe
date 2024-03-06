import React from 'react';
import { AiOutlineCopy } from 'react-icons/ai';
import styled from 'styled-components';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';

const CopyText = ({ link, label }: { link: string, label: string }) => {
  const click = () => {
    navigator.clipboard.writeText(link).then(function() {
      toasts('success', TOAST.COPY_SUCCESS);
    }, function(err) {
      toasts('success', TOAST.COPY_FAILURE + err);
    });
    return false;
  };

  return (
    <Copy href={'#'} onClick={click}>
      <span>{label}</span>
      <span><AiOutlineCopy /></span>
    </Copy>
  );
};

export default CopyText;

const Copy = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text1};

  &:hover {
    color: ${({ theme }) => theme.text1};
  } 

  span {
    display: inline-flex;
  }
`;
