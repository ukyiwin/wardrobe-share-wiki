import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageHeader from './PageHeader';

const space = {
  label: 'Departments',
  pages: ['Tech', 'Marketing', 'HR'],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
};

function WikiSpace() {
  const pages = space.pages.map(page => (
    <PageLink key={page}>
      <Link to={`/${space.label}/${page}`}>{page}</Link>
    </PageLink>
  ));
  return (
    <Container>
      <PageHeader title={space.label} />
      <p>{space.description}</p>
      <section className={'pages'}>
        <PageHeading>Pages</PageHeading>
        <ul>{pages}</ul>
      </section>
      <p>{space.description}</p>

      <p>{space.description}</p>

      <p>{space.description}</p>

      <p>{space.description}</p>

      <p>{space.description}</p>

      <p>{space.description}</p>
    </Container>
  );
}

const Container = styled.div`
  width: 100%
  padding: 1rem 4rem;
  color: ${({ theme }) => theme.color.text};
`;

const PageHeading = styled.h3`
  color: ${({ theme }) => theme.color.primary};
`;

const PageLink = styled.li`
  color: ${({ theme }) => theme.color.secondary};
  text-decoration: underline;
`;

export default WikiSpace;
