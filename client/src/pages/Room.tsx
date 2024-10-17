import { SendMessageArea } from "@/components/Rooms/SendMessageField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Copy, CopyCheck } from "lucide-react";
import { Reducer, useEffect, useReducer, useRef } from "react";
import { useLoaderData } from "react-router-dom";

type RoomLoaderData = {
  user_id: string;
  room_id: string;
};

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

function createWS(userId: string, roomId: string): WebSocket {
  return new WebSocket(
    `ws://${
      import.meta.env.VITE_SERVER
    }/api/ws?room_id=${roomId}&user_id=${userId}`
  );
}

export default function Room() {
  const [{ isCopied }, dispatch] = useReducer(reducer, initialState);
  const copyRef = useRef<HTMLInputElement>(null);
  const { user_id, room_id } = useLoaderData() as RoomLoaderData;
  const wsRef = useRef<WebSocket>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(
    function () {
      wsRef.current = createWS(user_id, room_id);
      const ws = wsRef.current;

      ws.onopen = function () {
        console.log("connection established");
      };

      ws.onmessage = function (e) {
        console.log(e.data);
      };

      ws.onerror = function () {
        console.log("error connection closing...");
      };

      ws.onclose = function () {
        console.log("connection closed");
      };

      return () => {
        ws.close();
      };
    },
    [room_id, user_id]
  );

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

  function sendMessage() {
    if (!textareaRef.current?.value || !wsRef.current) return;
    wsRef.current.send(textareaRef.current?.value);
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
          defaultValue={room_id}
          readOnly
          className="w-[290px]"
        />
      </div>
      <div className="rounded-md border max-h-[600px] h-full p-3 flex flex-col">
        <div className="h-full"></div>
        <SendMessageArea ref={textareaRef} />

        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
