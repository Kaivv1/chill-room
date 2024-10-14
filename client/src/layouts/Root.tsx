import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { Toaster } from "@/components/ui/toaster";
import { Outlet, useNavigation } from "react-router-dom";

export default function Root() {
  const { state } = useNavigation();
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[auto_1fr] min-h-screen">
        <Header />
        <main className="p-2 h-full ">
          {state === "loading" ? (
            <Loader variant="lg" color="primary" />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
      <Toaster />
    </>
  );
}
