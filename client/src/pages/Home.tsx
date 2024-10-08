import CreateRoom from "@/components/Rooms/CreateRoom";

// import { useNavigate } from "react-router-dom";

export default function Home() {
  // const navigate = useNavigate();
  return (
    <div className="">
      <h1>This is the homepage</h1>
      <CreateRoom />
      <p className="p-2 bg-primary-foreground max-w-[200px] text-center">asd</p>
    </div>
  );
}
