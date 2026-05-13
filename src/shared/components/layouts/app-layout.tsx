import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div>
      {/* Sidebar/Header */}
      <Outlet />
    </div>
  );
}
