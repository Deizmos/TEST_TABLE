import React from 'react';

import { Provider } from 'react-redux';
import {
    Navigate,
    Route,
    Routes
} from 'react-router-dom';

import {
    Box,
    styled
} from '@mui/material/index';

import Search from './components/search-bar';
import Tables from './components/table-box';
import store from './store/store';

const ContainerWraper = styled(Box)({
  width: 1232,
  height: 820,
  margin: 0,
  padding: 0,
});

function App() {
  return <Provider store={store}>
    <Routes>
      <Route path="/" element={<Navigate replace to="/1" />} />
      <Route path="/:page" element={
        <ContainerWraper >
          <Search />
          <Tables />
        </ContainerWraper>
      } />
    </Routes>
  </Provider >
}

export default App;
