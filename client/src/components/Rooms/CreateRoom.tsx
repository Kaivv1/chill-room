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
import { apiCreateUser, apiDeleteUser } from "@/api/user";
import { getErrorObj } from "@/helpers/error";
import { useToast } from "@/hooks/use-toast";
import { apiCreateRoom, apiUserJoinsRoom } from "@/api/room";
import { useNavigate } from "react-router-dom";

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
    isLoading: {
      value: boolean;
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
    isLoading: {
      value: false,
    },
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  function updateState(
    field: "roomName" | "username" | "isLoading",
    key: "value" | "error",
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      updateState("isLoading", "value", true);
      await apiCreateUser(state.username.value)
        .then(async (user) => {
          const room = await apiCreateRoom({
            creator_id: user.id,
            name: state.roomName.value,
          }).catch(async (err) => {
            await apiDeleteUser(user.id);
            throw err;
          });
          return { user_id: user.id, room_id: room.id };
        })
        .then(async (res) => {
          await apiUserJoinsRoom({ ...res }).catch((err) => {
            throw err;
          });
          return { ...res };
        })
        .then(({ room_id, user_id }) => {
          localStorage.setItem("username", state.username.value);
          navigate(`/room?room_id=${room_id}&user_id=${user_id}`);
        });
    } catch (error) {
      const { code, msg } = getErrorObj(error);
      toast({
        title: `${code}`,
        description: msg,
      });
    } finally {
      updateState("isLoading", "value", false);
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
              disabled={state.isLoading.value}
              onChange={(e) => {
                if (e.type) {
                  updateState("username", "error", "");
                }
                updateState("username", "value", e.target.value);
              }}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between h-4">
              <Label htmlFor="room_name">Enter a room name</Label>
              {state.roomName.error && (
                <span className="text-red-600 text-sm">
                  {state.roomName.error}
                </span>
              )}
            </div>
            <Input
              id="room_name"
              value={state.roomName.value}
              disabled={state.isLoading.value}
              onChange={(e) => {
                if (e.type) {
                  updateState("roomName", "error", "");
                }
                updateState("roomName", "value", e.target.value);
              }}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={state.isLoading.value}>
              {state.isLoading.value ? "Creating" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
