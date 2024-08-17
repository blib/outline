import invariant from "invariant";
import ADFSOauthClient from "@server/utils/adfs";
import env from "./env";

export default class ADFSClient extends ADFSOauthClient {
  endpoints = {
    url: env.ADFS_URI || "",
  };

  constructor() {
    invariant(env.ADFS_CLIENT_ID, "ADFS_CLIENT_ID is required");
    invariant(env.ADFS_CLIENT_SECRET, "ADFS_CLIENT_SECRET is required");

    super(env.ADFS_CLIENT_ID, env.ADFS_CLIENT_SECRET);
  }
}
