import React from 'react';
import { FooterContainer, FooterText, Button } from './styles';


interface FooterProps {
  visitasSelecionadas: number;
  concluirVisitas: () => void;
}

const Footer: React.FC<FooterProps> = ({ visitasSelecionadas, concluirVisitas }) => {
  return (
    <FooterContainer>
      <FooterText>&copy; Teste - React Dev Junior</FooterText>
      <Button
        onClick={concluirVisitas}
        disabled={visitasSelecionadas === 0}
      >
        Concluir Visitas Pendentes
      </Button>
    </FooterContainer>
  );
};


export default Footer;