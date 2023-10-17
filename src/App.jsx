import { Route, Routes } from 'react-router-dom';

import { Main } from '@components/global/Main';
import { Header } from '@components/global/header/Header';

import { Details } from './pages/Details';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/country/:name" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
