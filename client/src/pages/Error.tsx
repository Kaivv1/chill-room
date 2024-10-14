import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { ErrorResponse, useNavigate, useRouteError } from "react-router-dom";

export default function Error() {
  const { status, data, statusText } = useRouteError() as ErrorResponse;
  const navigate = useNavigate();
  return (
    <div>
      <p>{status}</p>
      <h1 className="text-2xl font-bold">Oops, {data ?? statusText}</h1>
      <Button
        onClick={() => navigate(-1)}
        variant="link"
        className="w-fit h-fit p-0 m-0"
      >
        <ArrowBigLeft /> Go back
      </Button>
    </div>
  );
}
