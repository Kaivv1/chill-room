import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Copy, CopyCheck } from "lucide-react";
import { Reducer, useReducer, useRef } from "react";
import { useSearchParams } from "react-router-dom";

type InitialStateProps = {
  isLoading: boolean;
  isCopied: boolean;
};

type Action =
  | { type: "DONE_LOADING" }
  | { type: "NOT_LOADING" }
  | { type: "COPIED" }
  | { type: "NOT_COPIED" };

const initialState: InitialStateProps = {
  isLoading: false,
  isCopied: false,
};

const reducer: Reducer<InitialStateProps, Action> = (state, action) => {
  switch (action.type) {
    case "DONE_LOADING":
      return { ...state, isLoading: true };
    case "NOT_LOADING":
      return { ...state, isLoading: false };
    case "COPIED":
      return { ...state, isCopied: true };
    case "NOT_COPIED":
      return { ...state, isCopied: false };
    default:
      return state;
  }
};

export default function Room() {
  const [{ isCopied }, dispatch] = useReducer(reducer, initialState);
  const [searchParams] = useSearchParams();
  const copyRef = useRef<HTMLInputElement>(null);

  function copyRoomIdToClipboard() {
    const val = copyRef.current?.value;
    if (val === undefined) return;
    navigator.clipboard.writeText(val).then(() => {
      dispatch({ type: "COPIED" });
      setTimeout(() => {
        dispatch({ type: "NOT_COPIED" });
      }, 3000);
      toast({
        title: "Room id copied to clipboard",
      });
    });
  }

  return (
    <div className="h-full">
      <h1 className="text-center">This is a room</h1>
      <p>Send this id to people to join this room</p>
      <div className="flex gap-2 items-center">
        <Button size="icon" onClick={copyRoomIdToClipboard}>
          {isCopied ? <CopyCheck /> : <Copy />}
        </Button>
        <Input
          ref={copyRef}
          value={searchParams.get("room_id") ?? ""}
          className="w-[290px]"
        />
      </div>
      <div className="rounded-md border max-h-[600px] h-full p-3"></div>
    </div>
  );
}
