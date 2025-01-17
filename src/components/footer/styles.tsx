import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #007bff;
  color: white;
`;

export const FooterText = styled.p`
  margin: 0;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #007bff;
  background-color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #e0e0e0;
  }
`;