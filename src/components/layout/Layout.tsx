import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="main p-4 sm:p-8">
      <Outlet />
    </div>
  );
}
