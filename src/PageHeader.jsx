import React from 'react';
import styled from 'styled-components';

function PageHeader({ children }) {
  return (
    <>
      <Container>{children}</Container>
      <HorizontalRule />
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.color.primary};
`;

const HorizontalRule = styled.hr`
  border: 0;
  height: 1px;
  background: ${({ theme }) => theme.color.text};
`;

export default PageHeader;
