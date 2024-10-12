import axios from "axios";

type ApiCreateRoomArgs = { creator_id: string; name: string };

type ApiRoom = {
  id: string;
  name: string;
};

export async function apiCreateRoom(args: ApiCreateRoomArgs) {
  return axios
    .post<ApiRoom>("/api/rooms", { ...args } as ApiCreateRoomArgs, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
}

type ApiUserJoinsRoomArgs = {
  user_id: string;
  room_id: string;
};

export async function apiUserJoinsRoom(args: ApiUserJoinsRoomArgs) {
  return axios
    .post(
      "/api/join-room",
      { ...args },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .catch((error) => {
      throw error;
    });
}
