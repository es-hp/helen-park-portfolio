import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="app-layout flex flex-col p-4 sm:p-8 h-screen w-screen">
      <Outlet />
    </div>
  );
}
