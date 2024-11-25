import {
    AuthFlowType,
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    type InitiateAuthCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";



const client = new CognitoIdentityProviderClient({
    region: "ap-northeast-1" // 例: "us-east-1"
});


// ============================================================================
// ログイン処理
// ============================================================================
export const useAuth = () => {
    const signIn = async (email: string, password: string) => {

        try {
            const config = useRuntimeConfig();
            console.log(config.public.clientId)

            // ログインパラメータ設定
            const params = new InitiateAuthCommand({
                AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
                ClientId: config.public.clientId,
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password,
                }
            });
            const response: InitiateAuthCommandOutput = await client.send(params);

            if (response.ChallengeName === undefined) {
                const {AuthenticationResult} = response;
                console.log("AuthenticationResult:", AuthenticationResult);
                if (AuthenticationResult) {
                    sessionStorage.setItem("idToken", AuthenticationResult.IdToken || "");
                    sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || "");
                    sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || "");

                    return AuthenticationResult;
                }
            }
        } catch(error) {
            console.error("Error signing in:" , error);
            throw error;
        }
    };
    return {signIn}
}