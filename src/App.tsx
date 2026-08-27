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
              horizPadding={true}
              topPadding={true}
              botPadding={true}
              footer={false}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
        <Route
          element={
            <AppLayout
              horizPadding={true}
              topPadding={true}
              botPadding={true}
              footer={true}
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
