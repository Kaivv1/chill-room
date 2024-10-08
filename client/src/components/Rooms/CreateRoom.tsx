import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function CreateRoom() {
  const [state, setState] = useState<{
    roomName: {
      value: string;
      error?: string;
    };
    username: {
      value: string;
      error?: string;
    };
    room: {
      isReady: false;
    };
  }>({
    roomName: {
      value: "",
      error: "",
    },
    username: {
      value: "",
      error: "",
    },
    room: {
      isReady: false,
    },
  });

  function updateState(
    field: "roomName" | "username" | "room",
    key: "value" | "error" | "isReady",
    value: string | boolean
  ) {
    setState((prev) => ({
      ...prev,
      [field]: { ...prev[field], [key]: value },
    }));
  }

  function validateForm(): boolean {
    const errors = {
      roomName: "",
      username: "",
    };

    if (state.roomName.value === "") {
      errors.roomName = "This field is required";
    }
    if (state.username.value === "") {
      errors.username = "This field is required";
    }
    if (state.roomName.value.length > 0 && state.roomName.value.length < 3) {
      errors.roomName = "Too short";
    }
    if (state.username.value.length > 0 && state.username.value.length < 3) {
      errors.username = "Too short";
    }

    updateState("roomName", "error", errors.roomName);
    updateState("username", "error", errors.username);

    return errors.roomName === "" && errors.username === "";
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a room</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a room</DialogTitle>
          <DialogDescription>Fill out the required fields 👀</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between h-4">
              <Label htmlFor="username">Enter a room name</Label>
              {state.roomName.error && (
                <span className="text-red-600 text-sm">
                  {state.roomName.error}
                </span>
              )}
            </div>
            <Input
              id="username"
              value={state.roomName.value}
              onChange={(e) => {
                if (e.type) {
                  updateState("roomName", "error", "");
                }
                updateState("roomName", "value", e.target.value);
              }}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between h-4">
              <Label htmlFor="room_name">Choose a username</Label>
              {state.username.error && (
                <span className="text-red-600 text-sm">
                  {state.username.error}
                </span>
              )}
            </div>
            <Input
              id="username"
              value={state.username.value}
              onChange={(e) => {
                if (e.type) {
                  updateState("username", "error", "");
                }
                updateState("username", "value", e.target.value);
              }}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
