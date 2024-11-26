import {
    AuthFlowType,
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    type InitiateAuthCommandInput,
    type InitiateAuthCommandOutput,
    SignUpCommand,
    type SignUpCommandInput,
    type SignUpCommandOutput,
    AdminCreateUserCommand,
    type AdminCreateUserCommandInput,
    type AdminCreateUserCommandOutput,
    RespondToAuthChallengeCommand,
    type RespondToAuthChallengeCommandInput,
    type RespondToAuthChallengeCommandOutput
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

        // ログインパラメータ設定
        const params: InitiateAuthCommandInput = {
            AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
            ClientId: config.public.clientId,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            }
        };

        try {
            const command = new InitiateAuthCommand(params)
            const response: InitiateAuthCommandOutput = await client.send(command);
            console.log(response.ChallengeName)

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

    const adminSignUp = async (email:string) => {

        console.log(config.public.credentials)

        const client = new CognitoIdentityProviderClient({
            region: "ap-northeast-1",
            credentials: config.public.credentials
        });


        const params:AdminCreateUserCommandInput = {
            UserPoolId: config.public.userPoolId,
            Username: email,

            // TemporaryPassword: "Test-marufoy-00!",
            UserAttributes: [
                {
                    "Name": "email",
                    "Value": email
                }
            ]
        }

        try {
            const command = new AdminCreateUserCommand(params);
            const response: AdminCreateUserCommandOutput = await client.send(command);
            console.log(response);
        } catch (error) {
            console.error("Error admin signing up", error);
            throw error;
        }

    };

    const initialSignIn = async (email: string, username: string, temporary_password: string, new_password:string) => {
        const params: InitiateAuthCommandInput = {
            ClientId: config.public.clientId,
            AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: temporary_password
            }
        };

        try {
            const command = new InitiateAuthCommand(params);
            const response:　InitiateAuthCommandOutput = await client.send(command)

            /**
             * 一次的なパスワードで認証する。
             */
            if (response.ChallengeName === "NEW_PASSWORD_REQUIRED") {
                console.log("newpasswordrequired")
                const params: RespondToAuthChallengeCommandInput = {
                    ClientId: config.public.clientId,
                    ChallengeName: "NEW_PASSWORD_REQUIRED",
                    ChallengeResponses: {
                        USERNAME: email,
                        NEW_PASSWORD: new_password
                    }
                }
            }
        }catch(error) {
            console.error("initial signing in is failed", error);
        }
    };

    return {
        signIn,
        signUp,
        adminSignUp
    }
}