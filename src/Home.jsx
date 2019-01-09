import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MenuStateContext } from './MenuStateContext';

import PageHeader from './common/PageHeader';

import { convertJSONtoPlainText, convertUTCToReadable } from './utils';
import { loadPages } from './api';

function Home({ handleError }) {
  const [pages, setPages] = useState([]);
  const { state } = useContext(MenuStateContext);

  const fetchPages = async id => {
    try {
      const response = await loadPages(id);
      setPages(response);
    } catch {
      handleError();
    }
  };

  useEffect(
    () => {
      fetchPages();
    },
    //fetch new pages every time the state updates
    [state]
  );

  const pagesList = pages.map((page, i) => {
    const { id, title, content, updated_at, space_title, space_id } = page;
    const summary = convertJSONtoPlainText(content);
    const readableDate = convertUTCToReadable(updated_at);

    return (
      <PostContainer>
        <Link key={i} to={`/${space_title}/${space_id}/${title}/${id}`}>
          <PageTitle>
            {space_title} > {title}
          </PageTitle>
          <Content>{summary}</Content>
        </Link>
        <small>last updated: {readableDate}</small>
      </PostContainer>
    );
  });

  return (
    <>
      <PageHeader>
        <h1>RECENT ARTICLES</h1>
      </PageHeader>
      {pagesList}
    </>
  );
}
export default Home;

const PageTitle = styled.h3`
  margin-bottom: 0.8rem;
`;

const Content = styled.p`
  margin: 0 0 0.2rem;
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
