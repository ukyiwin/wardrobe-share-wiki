import React from 'react';
import styled from 'styled-components';

function EditorControlIcon({ className }) {
  return <Icon className={className} />;
}

const Icon = styled.i`
  font-size: 1rem;
`;

export default EditorControlIcon;
