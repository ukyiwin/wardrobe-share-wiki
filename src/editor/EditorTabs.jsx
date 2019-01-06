import React from 'react';
import styled from 'styled-components';

export const EDITOR_TABS = [
  { label: 'Visual', type: 'VISUAL' },
  { label: 'Markdown', type: 'MARKDOWN' }
];

function EditorTabs({ tab, setTab }) {
  const tabs = EDITOR_TABS.map(({ label, type }) => {
    return (
      <Tab key={type} active={tab === type} onClick={() => setTab(type)}>
        {label}
      </Tab>
    );
  });
  return <Container>{tabs}</Container>;
}

const Container = styled.div`
  display: flex;
`;

const Tab = styled.label`
  margin-top: 0.8rem;
  padding: 0.5rem 1rem;
  border: ${({ theme }) => `1px solid ${theme.color.primary}`};
  border-bottom: none;
  background-color: ${({ theme, active }) =>
    active ? theme.color.primary : theme.color.background};
  color: ${({ theme, active }) =>
    active ? theme.color.background : theme.color.primary};
  cursor: pointer;
  transition: 0.2s;
`;

export default EditorTabs;
