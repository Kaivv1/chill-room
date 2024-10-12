import axios from "axios";

export type ApiUser = {
  id: string;
  created_at: Date;
  username: string;
};

export async function apiCreateUser(username: string) {
  return axios
    .post<ApiUser>("/api/users", { username } as { username: string }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
}

export async function apiDeleteUser(id: string) {
  return axios
    .delete(`/api/users`, {
      params: { id },
    })
    .catch((error) => {
      throw error;
    });
}
