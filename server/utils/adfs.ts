import Logger from "@server/logging/Logger";
import { getJWTPayload } from "@server/utils/jwt";
import { AuthenticationError, InvalidRequestError } from "../errors";
import fetch from "./fetch";

export default abstract class ADFSOauthClient {
  private clientId: string;
  private clientSecret: string;

  protected endpoints = {
    url: "",
  };

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  userInfo = async (accessToken: string) => getJWTPayload(accessToken);

  async rotateToken(
    _accessToken: string,
    refreshToken: string,
    endpoint = this.endpoints.url + "/adfs/oauth2/token"
  ): Promise<{
    accessToken: string;
    refreshToken?: string;
    expiresAt: Date;
  }> {
    let data;
    let response;

    try {
      Logger.debug("utils", "Rotating token", { endpoint });

      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      });
      data = await response.json();
    } catch (err) {
      throw InvalidRequestError(err.message);
    }

    const success = response.status >= 200 && response.status < 300;
    if (!success) {
      throw AuthenticationError();
    }

    return {
      refreshToken: data.refresh_token,
      accessToken: data.access_token,
      expiresAt: new Date(Date.now() + data.expires_in * 1000),
    };
  }
}
