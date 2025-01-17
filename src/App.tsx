import React, { useState } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Lista from './components/lista/lista';
import Modal from './components/form/modal';
import styled from 'styled-components';

const App: React.FC = () => {
  const [visitasPendentes, setVisitasPendentes] = useState<number>(0);
  const [visitas, setVisitas] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditando, setIsEditando] = useState(false);
  const [visitaEditando, setVisitaEditando] = useState<any>();
  const [visitasSelecionadas, setVisitasSelecionadas] = useState<any[]>([]);

  const concluirVisitas = () => {
    setVisitas(visitas.map((visita) => 
      visitasSelecionadas.includes(visita)
        ? { ...visita, concluida: true, dataConclusao: new Date().toISOString() }
        : visita
    ));
    setVisitasPendentes(visitasPendentes - visitasSelecionadas.length);
    setVisitasSelecionadas([]);
  };

  const handleEdit = (visita: any) => {
    console.log('Editando visita', visita);
    setIsEditando(true);
    setVisitaEditando(visita);
    setIsModalOpen(true);
  };

  const handleSelect = (visita: any, selected: boolean) => {
    if (selected) {
      setVisitasSelecionadas([...visitasSelecionadas, visita]);
    } else {
      setVisitasSelecionadas(visitasSelecionadas.filter((v) => v !== visita));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditando(false);
    setVisitaEditando(null);
  };

  const salvarVisita = (novaVisita: any) => {
    console.log('Chegou no App.tsx', novaVisita);
    if (isEditando) {
      setVisitas(visitas.map((visita) => (visita === visitaEditando ? novaVisita : visita)));
    } else {
      setVisitas([...visitas, novaVisita]);
      if (!novaVisita.concluida) {
        setVisitasPendentes(visitasPendentes + 1);
      }
    }
    closeModal();
  };
  
  return (
    <Container>
      <HeaderWrapper>
        <Header NumVisitas={visitasPendentes} onSave={salvarVisita} />
      </HeaderWrapper>
      <Main>
        <Lista visitas={visitas} onEdit={handleEdit} onSelect={handleSelect} visitasSelecionadas={visitasSelecionadas} />
      </Main>
      <FooterWrapper>
        <Footer visitasSelecionadas={visitasSelecionadas.length} concluirVisitas={concluirVisitas} />
      </FooterWrapper>
      <Modal isOpen={isModalOpen} isEditando={isEditando} visitaEditando={visitaEditando} onClose={closeModal} onSave={salvarVisita} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderWrapper = styled.header`
  flex-shrink: 0;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
`;

const FooterWrapper = styled.footer`
  flex-shrink: 0;
`;

export default App;