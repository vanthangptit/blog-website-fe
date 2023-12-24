import React from 'react';
import Modal, { OnAfterOpenCallback, Styles } from 'react-modal';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

// Documentation: https://reactcommunity.org/react-modal/

const customStyles: Styles = {
  overlay: {
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    overflow: 'auto'
  }
};

Modal.setAppElement('body');

export default ({
  style,
  shouldCloseOnOverlayClick = true,
  modalIsOpen,
  children,
  afterOpenModal,
  onAfterClose,
  closeModal
}: {
  modalIsOpen: boolean,
  shouldCloseOnOverlayClick?: boolean,
  style?: Styles | undefined
  children?: React.ReactNode
  afterOpenModal?: OnAfterOpenCallback | undefined
  onAfterClose?: () => void
  closeModal?: () => void
}) => {
  return (
    <ModelBox
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onAfterClose={onAfterClose}
      onRequestClose={closeModal}
      style={{ ...customStyles, ...style }}
    >
      <ModalContent>
        <IconClose onClick={closeModal}>
          <AiOutlineClose size={20}/>
        </IconClose>

        {children}
      </ModalContent>
    </ModelBox>
  );
};

const IconClose = styled.span`
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 2;
  color: ${({ theme }) => theme.text1};
  cursor: pointer;
`;

const ModalContent = styled.div`
  border: 1px solid rgb(204, 204, 204);
  padding: 30px 35px 35px;
  background-color: ${({ theme }) => theme.bg0};
  width: 100%;
  position: relative;
`;

const ModelBox = styled(Modal)`
  width: 100%;
  max-width: 550px;
  border: none;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  min-height: calc(100% - (1.75rem * 2));
  margin: 1.75rem auto;
`;
