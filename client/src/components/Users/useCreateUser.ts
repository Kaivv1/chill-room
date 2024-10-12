// import { useState } from "react";
// import { getErrorObj } from "@/helpers/error";
// import axios from "axios";
// import { useToast } from "@/hooks/use-toast";

// type ApiUser = {
//   id: string;
//   created_at: Date;
//   username: string;
// };

// export function useCreateUser() {
//   const [state, setState] = useState<{
//     data: ApiUser | null;
//     isLoading: boolean;
//   }>({
//     data: null,
//     isLoading: false,
//   });
//   const { toast } = useToast();

//   function apiCreateUser(username: string) {
//     axios
//       .post<ApiUser>("/api/user", { username } as { username: string }, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => setState((prev) => ({ ...prev, data: res.data })))
//       .catch((error) => {
//         const err = getErrorObj(error);
//         toast({
//           title: `${err.code}`,
//           description: err.msg,
//         });
//       });
//   }

//   return {};
// }
