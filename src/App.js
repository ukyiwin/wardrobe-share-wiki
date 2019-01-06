import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from './navigation/Navigation';
import theme from './theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import WikiSpace from './WikiSpace';
import CreateWikipage from './editor/CreateWikipage';
import EditWikipage from './editor/EditWikipage';
import WikiPage from './WikiPage';
import GlobalStyle from './GlobalStyle';
import { MenuStateProvider } from './MenuStateContext';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container>
          <MenuStateProvider>
            <Navigation />
            <Route exact path="/" component={Home} />
            <Switch>
              <Route exact path="/:space" component={WikiSpace} />
              <Route path="/:space/:space_id/new" component={CreateWikipage} />
              <Route
                path="/:space/:space_id/:wikipage_title/:wikipage_id/edit"
                component={EditWikipage}
              />
              <Route
                path="/:space/:space_id/:wikipage_title/:wikipage_id"
                component={WikiPage}
              />
            </Switch>
            <GlobalStyle />
          </MenuStateProvider>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

const Container = styled.div`
  display: flex;
`;

export default App;
