import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex h-screen flex-col max-w-[1200px] p-3 mx-auto">
      <main className="flex flex-1 flex-col h-full">
        <Outlet />
      </main>
    </div>
  );
}
