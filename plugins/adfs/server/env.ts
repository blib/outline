import { IsBoolean, IsOptional, IsUrl, MaxLength } from "class-validator";
import { Environment } from "@server/env";
import { Public } from "@server/utils/decorators/Public";
import environment from "@server/utils/environment";
import { CannotUseWithout } from "@server/utils/validators";

class ADFSPluginEnvironment extends Environment {
  /**
   * ADFS client credentials. To enable authentication with any
   * compatible provider.
   */
  @IsOptional()
  @CannotUseWithout("ADFS_CLIENT_SECRET")
  @CannotUseWithout("ADFS_URI")
  @CannotUseWithout("ADFS_DISPLAY_NAME")
  @CannotUseWithout("ADFS_RESOURCE")
  public ADFS_CLIENT_ID = this.toOptionalString(environment.ADFS_CLIENT_ID);

  @IsOptional()
  @CannotUseWithout("ADFS_CLIENT_ID")
  public ADFS_CLIENT_SECRET = this.toOptionalString(
    environment.ADFS_CLIENT_SECRET
  );

  /**
   * The name of the ADFS provider, eg "GitLab" – this will be displayed on the
   * sign-in button and other places in the UI. The default value is:
   * "OpenID Connect".
   */
  @MaxLength(50)
  public ADFS_DISPLAY_NAME = environment.ADFS_DISPLAY_NAME ?? "ADFS Connect";

  /**
   * The ADFS authorization endpoint.
   */
  @Public
  @IsOptional()
  @IsUrl({
    require_tld: false,
    allow_underscores: true,
  })
  public ADFS_URI = this.toOptionalString(environment.ADFS_URI);

  /**
   * The ADFS profile field to use as the username. The default value is
   * "preferred_username".
   */
  public ADFS_USERNAME_CLAIM = environment.ADFS_USERNAME_CLAIM ?? "email";

  /**
   * A space separated list of ADFS scopes to request. Defaults to "openid
   * profile email".
   */
  public ADFS_SCOPES = environment.ADFS_SCOPES ?? "openid profile email";

  /**
   * Disable autoredirect to the ADFS login page if there is only one
   * authentication method and that method is ADFS.
   */
  @Public
  @IsOptional()
  @IsBoolean()
  public ADFS_DISABLE_REDIRECT = this.toOptionalBoolean(
    environment.ADFS_DISABLE_REDIRECT
  );

  /**
   * ADFS resource id
   */
  @IsOptional()
  public ADFS_RESOURCE = environment.ADFS_RESOURCE ?? "outline";
}

export default new ADFSPluginEnvironment();
