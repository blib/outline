import * as React from "react";
import { Redirect } from "react-router-dom";
import env from "~/env";
import useStores from "~/hooks/useStores";

const Logout = () => {
  const { auth } = useStores();

  void auth.logout().then(() => {
    if (env.OIDC_LOGOUT_URI) {
      setTimeout(() => {
        window.location.replace(
          `${env.OIDC_LOGOUT_URI}?post_logout_redirect_uri=${encodeURIComponent(
            env.URL
          )}`
        );
      }, 200);
    }
    if (env.ADFS_URI) {
      setTimeout(() => {
        window.location.replace(
          `${
            env.ADFS_URI
          }/adfs/oauth2/logout?post_logout_redirect_uri=${encodeURIComponent(
            env.URL
          )}`
        );
      }, 200);
    }
  });

  if (env.OIDC_LOGOUT_URI) {
    return null; // user will be redirected to logout URI after logout
  }
  if (env.ADFS_URI) {
    return null; // user will be redirected to logout URI after logout
  }

  return <Redirect to="/" />;
};

export default Logout;
