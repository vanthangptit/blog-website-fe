import React from 'react';
import Button from '@components/molecules/Buttons';
import styled from 'styled-components';
import SiteAvatar from '@components/molecules/Avatars/SiteAvatar';

const ToggleField = ({
  children,
  label,
  value,
  isLoading= false,
  isOpen,
  setOpen,
  imageUrl
}: {
  children: React.ReactNode;
  label?: string;
  value?: string
  imageUrl?: string
  isLoading?: boolean
  isOpen: boolean
  setOpen: (open: boolean) => void
}) => {
  return (
    <Box>
      <BoxTop $isOpen={isOpen}>
        <BoxTopLeft>
          {label && <FieldName>{label}</FieldName>}
          {!isOpen && (
            <FieldValue>
              {value ? value : (imageUrl ? (
                <SiteAvatar
                  viewerPhoto={imageUrl}
                  height={40}
                />
              ) : 'No information')}
            </FieldValue>
          )}
        </BoxTopLeft>

        <BoxTopRight>
          <FieldButton type={'button'} onClick={() =>  setOpen(!isOpen)}>
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

export default ToggleField;


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
