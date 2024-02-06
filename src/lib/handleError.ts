import axios from "axios";
import { _clearAuth } from "@/state/app/reducer";
import { toast } from "react-toastify";

export function httpErrorHandler(
  error: unknown,
  handler?: (error: unknown) => void
) {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response;
    if (errorMessage === null)
      throw new Error("Unrecoverable error!! Error is null!");
    if (errorMessage?.status === 404) {
      toast.error("The requested resource does not exist or has been deleted");
    } else if (errorMessage?.status === 401) {
      toast.error("Please login to access this resource");
      //redirect user to login
    }
  } else {
    toast.error("Has error");
  }

  console.log(error);
}
