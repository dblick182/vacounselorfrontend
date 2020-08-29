
import Axios, { AxiosRequestConfig } from "axios";
import { setupCache } from 'axios-cache-adapter';


/**
 * Class to handle calls to server which becomes a base for any API classes
 */
export default class BaseApi {
  // Configure a memory cache
  public static cache = setupCache({
    maxAge: 15 * 60 * 1000,
    exclude: { query: false },
  });

  // Configure an instance of Axios for web requests
  protected static http = Axios.create({
    //adapter: BaseApi.cache.adapter, // TODO: Enable caching after bug bash stabilization
  });

  /**
   * Processes an authenticated request for a Restux EndpointMethod
   *
   * @param config A config of values that are required to complete the web request
   * @param requestConfig Any extra parameters passed through to configure the Axios request object
   */
  public static async request(
    url: string,
    requestConfig?: Partial<AxiosRequestConfig>
  ) {
    return BaseApi.http(url, requestConfig);
  }

}