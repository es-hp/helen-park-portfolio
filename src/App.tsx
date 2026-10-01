import { Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/components/layout/Layout';
import { Home } from '@/pages/HomePage';
import { ProjectGallery } from '@/pages/projects/ProjectGallery';
import { Projects } from '@/pages/projects/Projects';

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <AppLayout
              hasHorizPadding={true}
              hasTopPadding={true}
              hasBotPadding={true}
            />
          }
        >
          <Route path="/" element={<Home path={'/'} />} />
          <Route path="/about" element={<Home path={'/about'} />} />
        </Route>
        <Route
          element={
            <AppLayout
              hasHorizPadding={true}
              hasTopPadding={true}
              hasBotPadding={true}
              hasFooter={true}
              hasFixedHeight={true}
            />
          }
        >
          <Route path="/projects" element={<Projects />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/projects/:projectId" element={<ProjectGallery />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
