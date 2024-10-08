import { useSearchParams } from "react-router-dom";

export default function Room() {
  const [searchParams] = useSearchParams();

  const username = searchParams.get("username") ?? "me";
  console.log(username);
  return <div>This the room </div>;
}
