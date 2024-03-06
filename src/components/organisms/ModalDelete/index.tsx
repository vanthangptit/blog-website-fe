import React from 'react';
import Button from '@components/molecules/Buttons/ButtonPrimary';
import { MessageError } from '@components/atoms/MessageError';
import Modal from '@components/molecules/Modal';
import styled from 'styled-components';

const ModalDelete = ({
  isOpenModal,
  setIsOpen,
  onAfterClose,
  submitSuccess,
  handleDelete,
  submitError,
  textSuccess
}: {
  submitSuccess: boolean
  isOpenModal: boolean
  handleDelete: () => void
  setIsOpen: (isOpen: boolean) => void
  onAfterClose?: () => void
  submitError?: string
  textSuccess: string
}) => {
  return (
    <Modal
      modalIsOpen={isOpenModal}
      shouldCloseOnOverlayClick={false}
      onAfterClose={onAfterClose}
      closeModal={() => setIsOpen(false)}
    >
      <SuccessBox>
        <SuccessTitle>
          {submitSuccess ? textSuccess : 'ARE YOU SURE TO DELETE?'}
        </SuccessTitle>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          {submitSuccess ? (
            <Button
              text={'Close'}
              handleClick={() => setIsOpen(false)}
            />
          ) : (
            <>
              <Button
                text={'YES'}
                handleClick={handleDelete}
                isLoading={false}
              />
              <Button
                text={'No'}
                handleClick={() => setIsOpen(false)}
              />
            </>
          )}
        </div>

        {submitError && <MessageError $align={'center'} style={{ marginTop: '15px' }}>{submitError}</MessageError>}
      </SuccessBox>
    </Modal>
  );
};

export default ModalDelete;

const SuccessBox = styled.section`
  height: 270px;
  text-align: center;
  padding: 80px 0 45px;
`;

const SuccessTitle = styled.h4`
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.primary1};
`;
