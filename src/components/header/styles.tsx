import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #007bff;
  color: white;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const InfoText = styled.p`
  margin: 0;
  font-size: 18px;
`;

export const StatusText = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: #007bff;
  background-color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;