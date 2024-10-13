import CreateRoom from "@/components/Rooms/CreateRoom";
import JoinRoom from "@/components/Rooms/JoinRoom";

export default function Home() {
  return (
    <div className="">
      <h1>This is the homepage</h1>
      <CreateRoom />
      <JoinRoom />
      <p className="p-2 bg-primary-foreground max-w-[200px] text-center">asd</p>
    </div>
  );
}
