import { AxiosError } from "axios";

export type CustomError = AxiosError<{ error: string }>;

type ErrorObj = {
  msg: string | undefined;
  code: number | undefined;
};
export function getErrorObj(error: unknown): ErrorObj {
  const err = error as CustomError;
  return { msg: err.response?.data.error, code: err.response?.status };
}
