import React from 'react';

import { Provider } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import {
  Box,
  styled,
} from '@mui/material/index';

import Search from './components/search-bar';
import Table from './components/table/table';
import store from './store/store';

const ContainerWraper = styled(Box)({
  padding: '23px 78px',
});

function App() {
  return <Provider store={store}>
    <Routes>
      <Route path="/" element={<Navigate replace to="/1" />} />
      <Route path="/:page" element={
        <ContainerWraper >
          <Search />
          <Table />
        </ContainerWraper>
      } />
    </Routes>
  </Provider >
}

export default App;
