import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout/Layout';

import { Home } from './pages/home/Home';
import { Projects } from './pages/projects/Projects';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<Projects />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
