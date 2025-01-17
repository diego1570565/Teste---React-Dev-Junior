import styled from 'styled-components';

export const ListaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const VisitaItem = styled.div<{ concluida: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => (props.concluida ? '#d4edda' : '#f8d7da')};
  border: 1px solid ${(props) => (props.concluida ? '#c3e6cb' : '#f5c6cb')};
  border-radius: 4px;
`;

export const Checkbox = styled.input`
  margin-right: 10px;
`;

export const VisitaInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const EditButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #0056b3;
  }
`;