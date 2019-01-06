import React, { useState, useEffect, useContext } from 'react';
import PageHeader from './PageHeader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MenuStateContext } from './MenuStateContext';
import { convertJSONtoPlainText } from './utils';
import { loadPages } from './api';

function Home() {
  const [pages, setPages] = useState([]);
  const { state } = useContext(MenuStateContext);

  const fetchPages = async id => {
    const response = await loadPages(id);
    setPages(response);
  };

  //fetch new pages everytime the state updates
  useEffect(
    () => {
      fetchPages();
    },
    [state]
  );

  const pagesList = pages.map((page, i) => {
    const { id, title, content, updated_at, space_title, space_id } = page;
    const summary = convertJSONtoPlainText(content);
    return (
      <Link key={i} to={`/${space_title}/${space_id}/${title}/${id}`}>
        <PostContainer>
          <PageTitle>
            {space_title} > {title}
          </PageTitle>
          <Content>{summary}</Content>
          <small>last updated: {updated_at}</small>
        </PostContainer>
      </Link>
    );
  });
  return (
    <Container>
      <PageHeader>
        <h1>RECENT ARTICLES</h1>
      </PageHeader>
      {pagesList}
    </Container>
  );
}
export default Home;

const Container = styled.div`
  padding: 2rem 3rem;
  color: ${({ theme }) => theme.color.text};
  width: 100%;
  height: 100vh;
  overflow-y: auto;
`;

const PageTitle = styled.h3`
  margin-bottom: 0.8rem;
`;

const Content = styled.p`
  margin: 0 0 0.2rem;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-height: 1rem; /* fallback */
  max-height: 3rem; /* fallback */
`;

const PostContainer = styled.article`
  margin-bottom: 2rem;
`;