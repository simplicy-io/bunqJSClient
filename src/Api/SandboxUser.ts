import ApiAdapter from "../ApiAdapter";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import Session, { URL_ENVIROMENTS } from "../Session";

export default class SandboxUser implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;

    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }

    /**
     * @param options
     * @returns {Promise<{}>}
     */
    public async post(options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/sandbox-user", "POST");

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.post(
                `${URL_ENVIROMENTS.SANDBOX}/v1/sandbox-user`,
                {},
                {},
                {
                    // no signing and no authentication
                    disableSigning: true,
                    disableAuthentication: true,
                    disableVerification: true,
                    skipSessionCheck: true
                },
                axiosClient
            )
        );

        return response.Response[0].ApiKey.api_key;
    }
}
