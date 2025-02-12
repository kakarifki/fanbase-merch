import { redirect } from "react-router-dom";
import { authClient } from "./auth-client";
import type { LoaderFunctionArgs } from "react-router-dom";

export const authLoader = async ({ request }: LoaderFunctionArgs) => {
  const { data, error } = await authClient.getProfile();

  if (error || !data) {
    const url = new URL(request.url);
    return redirect(`/login?from=${url.pathname}`);
  }

  return data;
};
