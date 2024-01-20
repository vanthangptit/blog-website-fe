import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@components/molecules/Buttons';

const FieldBoxChange = ({
  children,
  label,
  value,
  isLoading= false
}: {
  children: React.ReactNode;
  label?: string;
  value?: string
  isLoading?: boolean
}) => {
  const [ isOpen, setOpen ] = useState<boolean>(false);
  const handleOpen = () =>  setOpen(!isOpen);

  return (
    <Box>
      <BoxTop $isOpen={isOpen}>
        <BoxTopLeft>
          {label && <FieldName>{label}</FieldName>}
          {!isOpen && <FieldValue>{value ? value : 'No information'}</FieldValue>}
        </BoxTopLeft>

        <BoxTopRight>
          <FieldButton type={'button'} onClick={handleOpen}>
            {isOpen ? 'Close' : 'Change'}
          </FieldButton>
        </BoxTopRight>
      </BoxTop>

      {isOpen && (
        <BoxForm>
          {children}
          <ButtonSubmit>
            <Button
              size={'sm'}
              text={'Save'}
              buttonType={'submit'}
              disabled={isLoading}
            />
          </ButtonSubmit>
        </BoxForm>
      )}
    </Box>
  );
};

export default FieldBoxChange;

const ButtonSubmit = styled.div`
  text-align: right;
`;

const Box = styled.div`
  margin-bottom: 25px;

  * {
    font-size: 13px;
  }
`;

const BoxTop = styled.div<{ $isOpen: boolean }>`
  display: flex;
  margin-bottom: 10px;
`;

const BoxTopLeft = styled.div`
  flex: 1 1 auto;
`;

const BoxTopRight = styled.div``;

const FieldName = styled.div`
  color: ${({ theme }) => theme.textFieldNameChange};
  padding-bottom: 5px;
`;

const FieldValue = styled.div`
  color: ${({ theme }) => theme.gray6};
`;

const FieldButton = styled.button`
  font-size: 12px;
  color: ${({ theme }) => theme.gray6};
  border: none;
  border-radius: 0;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => theme.gray5};
  padding-bottom: 1px;
  outline: none;
  background-color: ${({ theme }) => theme.transparent};;
  cursor: pointer;
`;

const BoxForm = styled.div`
  background-color: ${({ theme }) => theme.bgFieldNameChange};
  border: 1px solid ${({ theme }) => theme.gray5};
  border-radius: 6px;
  padding: 25px;
`;
