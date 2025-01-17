import React, { useState } from 'react';
import Modal from '../form/modal';
import { HeaderContainer, Title, InfoContainer, InfoText, StatusText, Button } from './styles';

interface HeaderProps {
  NumVisitas: number;
  onSave: (novaVisita: any) => void;
}
const Header: React.FC<HeaderProps> = ({ NumVisitas,  onSave }) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Lógica para determinar a cor baseada nas visitas pendentes
  const getStatusColor = () => {
    if (NumVisitas <= 3) return '#6eaa5e';
    if (NumVisitas >= 10) return 'red';
    return 'blue';
  };

  // Função para abrir o modal
  const CriarVisita = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HeaderContainer>
      <Title>Teste - React Dev Junior</Title>
      <InfoContainer>
        <InfoText>
          Visitas pendentes: <StatusText color={getStatusColor()}>{NumVisitas}</StatusText>
        </InfoText>
        <Button onClick={CriarVisita}>Criar nova visita</Button>
      </InfoContainer>
      <Modal isOpen={isModalOpen} isEditando={false} onClose={closeModal} onSave={onSave}  />
    </HeaderContainer>
  );
};

export default Header;