import { redirect } from "react-router-dom";
import { authClient } from "./auth-client";

export const authLoader = async ({ request }) => {
  const { data, error } = await authClient.getProfile();

  if (error || !data) {
    const url = new URL(request.url);
    return redirect(`/login?from=${url.pathname}`);
  }

  return data;
};
