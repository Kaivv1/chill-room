import { useToast } from "@/hooks/use-toast";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { getErrorObj } from "@/helpers/error";
import { apiCreateUser, apiDeleteUser } from "@/api/user";
import { apiUserJoinsRoom } from "@/api/room";

export default function JoinRoom() {
  const [state, setState] = useState<{
    roomId: {
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
    roomId: {
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
    field: "roomId" | "username" | "isLoading",
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
      username: "",
      roomId: "",
    };
    if (state.username.value === "") {
      errors.username = "This field is required";
    }
    if (state.roomId.value === "") {
      errors.roomId = "This field is required";
    }
    if (state.username.value.length > 0 && state.username.value.length < 3) {
      errors.username = "Too short";
    }
    updateState("roomId", "error", errors.roomId);
    updateState("username", "error", errors.username);
    return errors.roomId === "" && errors.username === "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      updateState("isLoading", "value", true);
      await apiCreateUser(state.username.value)
        .then(async ({ id }) => {
          await apiUserJoinsRoom({
            room_id: state.roomId.value,
            user_id: id,
          }).catch(async (error) => {
            await apiDeleteUser(id).catch((error) => {
              throw error;
            });
            throw error;
          });
          return id;
        })
        .then((id) => {
          localStorage.setItem("username", state.username.value);
          navigate(`/room?room_id=${state.roomId.value}&user_id=${id}`);
        });
    } catch (error) {
      const err = getErrorObj(error);
      toast({
        title: `${err.code}`,
        description: err.msg,
      });
    } finally {
      updateState("isLoading", "value", false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Join a room</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join a room</DialogTitle>
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
              <Label htmlFor="room_id">Enter the room id</Label>
              {state.roomId.error && (
                <span className="text-red-600 text-sm">
                  {state.roomId.error}
                </span>
              )}
            </div>
            <Input
              id="room_id"
              value={state.roomId.value}
              disabled={state.isLoading.value}
              onChange={(e) => {
                if (e.type) {
                  updateState("roomId", "error", "");
                }
                updateState("roomId", "value", e.target.value);
              }}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={state.isLoading.value}>
              {state.isLoading.value ? "Joining" : "Join"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
