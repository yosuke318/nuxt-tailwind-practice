import {
    AuthFlowType,
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    type InitiateAuthCommandInput,
    type InitiateAuthCommandOutput,
    SignUpCommand,
    type SignUpCommandInput,
    type SignUpCommandOutput
} from "@aws-sdk/client-cognito-identity-provider";


const client = new CognitoIdentityProviderClient({
    region: "ap-northeast-1"
});

const config = useRuntimeConfig();


export const useAuth = () => {
    // ============================================================================
    // ログイン処理
    // ============================================================================
    const signIn = async (email: string, password: string) => {

        try {
            // ログインパラメータ設定
            const params: InitiateAuthCommandInput = {
                AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
                ClientId: config.public.clientId,
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password,
                }
            };

            const command = new InitiateAuthCommand(params)
            const response: InitiateAuthCommandOutput = await client.send(command);


            // ローカルでトークンをセット
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
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
    };

    // ============================================================================
    // サインアップ処理
    // ============================================================================
    const signUp = async (email: string, username: string, password: string) => {

        const params: SignUpCommandInput = {
            ClientId: config.public.clientId,

            Username: email,
            Password: password,
            UserAttributes: [
                {
                    Name: "email",
                    Value: email
                },
            ],
        }

        try {
            const command = new SignUpCommand(params);
            const response: SignUpCommandOutput = await client.send(command);
            console.log(response);
        } catch (error) {
            console.error("Error signing up:", error);
            throw error;
        }
    };

    return {
        signIn,
        signUp
    }
}