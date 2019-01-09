import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Navigation from './navigation/Navigation';
import Home from './Home';
import CreateWikipage from './editor/CreateWikipage';
import EditWikipage from './editor/EditWikipage';
import WikiPage from './WikiPage';
import GlobalStyle from './GlobalStyle';
import Alert from './common/Alert';

import { MenuStateProvider } from './MenuStateContext';
import theme from './theme';
import { handleError } from './utils';

function App() {
  const [error, setError] = useState(false);

  const HandleErrorAlert = history => {
    handleError(setError, history);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <MenuStateProvider>
            <Navigation />
            <Container>
              {error && <Alert invert>Oh no! An error occured!</Alert>}
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Home {...props} handleError={HandleErrorAlert} />
                  )}
                />
                <Route
                  path="/:space/:space_id/new"
                  render={props => (
                    <CreateWikipage {...props} handleError={HandleErrorAlert} />
                  )}
                />
                <Route
                  path="/:space/:space_id/:wikipage_title/:wikipage_id/edit"
                  render={props => (
                    <EditWikipage {...props} handleError={HandleErrorAlert} />
                  )}
                />
                <Route
                  path="/:space/:space_id/:wikipage_title/:wikipage_id"
                  render={props => (
                    <WikiPage {...props} handleError={HandleErrorAlert} />
                  )}
                />
                <Redirect to="/" />
              </Switch>
            </Container>
            <GlobalStyle />
          </MenuStateProvider>
        </AppContainer>
      </ThemeProvider>
    </Router>
  );
}

const AppContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  padding: 2rem 3rem;
  color: ${({ theme }) => theme.color.text};
  width: 100%;
  height: 100vh;
  overflow-y: auto;
`;

export default App;
