import React from 'react';
import { ListaContainer, VisitaItem, Checkbox, VisitaInfo, EditButton } from './styles';

interface Visita {
  logradouro: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
  ultimaModificacao: string;
  dataConclusao?: string;
  concluida: boolean;
}

interface ListaProps {
  visitas: Visita[];
  onEdit: (visita: Visita) => void;
  onSelect: (visita: Visita, selected: boolean) => void;
  visitasSelecionadas: Visita[];
}

const Lista: React.FC<ListaProps> = ({ visitas, onEdit, onSelect, visitasSelecionadas }) => {
  const formatarData = (data: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(data).toLocaleDateString('pt-BR', options);
  };

  return (
    <ListaContainer>
      {visitas.map((visita, index) => (
        <VisitaItem key={index} concluida={visita.concluida}>
          <Checkbox
            type="checkbox"
            checked={visitasSelecionadas.includes(visita)}
            disabled={visita.concluida}
            onChange={(e) => onSelect(visita, e.target.checked)}
          />
          <VisitaInfo>
            <div>{`${visita.logradouro}, ${visita.numero} - ${visita.cep}`}</div>
            <div>{`${visita.bairro}, ${visita.cidade} - ${visita.uf}`}</div>
            <div>Última modificação: {formatarData(visita.ultimaModificacao)}</div>
            {visita.concluida && <div>Concluída em: {formatarData(visita.dataConclusao!)}</div>}
          </VisitaInfo>
          <EditButton
            onClick={() => onEdit(visita)}
            disabled={visita.concluida}
          >
            Editar
          </EditButton>
        </VisitaItem>
      ))}
    </ListaContainer>
  );
};

export default Lista;