import React from 'react';
import styled from 'styled-components';
import FormularioEndereco from './Formulario/Formulario';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditando: boolean;
  visitaEditando?: any;
  onSave: (novaVisita: any) => void;
}

const ModalContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, isEditando, visitaEditando, onSave }) => {
  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <FormularioEndereco isEditando={isEditando} visitaEditando={visitaEditando} onClose={onClose} onSave={onSave} />
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;