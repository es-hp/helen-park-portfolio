import { Route, Routes } from 'react-router-dom';

import { AppLayout } from './components/layout/Layout';
import { Home } from './pages/home/Home';
import { ProjectGallery } from './pages/projects/ProjectGallery';
import { Projects } from './pages/projects/Projects';

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
              hasFooter={false}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
        <Route
          element={
            <AppLayout
              hasHorizPadding={true}
              hasTopPadding={true}
              hasBotPadding={true}
              hasFooter={true}
            />
          }
        >
          <Route path="/projects" element={<Projects />} />
        </Route>
        <Route element={<AppLayout hasFooter={true} />}>
          <Route path="/projects/:projectId" element={<ProjectGallery />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
