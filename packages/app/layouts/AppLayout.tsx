import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col max-w-[1200px] p-3 mx-auto">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
