import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] min-h-screen">
      <Header />
      <main className="p-2 h-full flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
}
