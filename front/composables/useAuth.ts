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
    AdminSetUserPasswordCommand,
    type AdminSetUserPasswordCommandInput,
    type AdminSetUserPasswordCommandOutput
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
    // サインアップ処理（氏名の使い道は不明）
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

    const adminSignUp = async (email: string) => {

        console.log(config.public.credentials)

        const client = new CognitoIdentityProviderClient({
            region: "ap-northeast-1",
            credentials: config.public.credentials
        });


        const params: AdminCreateUserCommandInput = {
            UserPoolId: config.public.userPoolId,
            Username: email,

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


    // ============================================================================
    // 管理者によるサインアップ(管理者が一括でパスワードも登録したい時）
    // ============================================================================
    const adminCreateUser = async (email: string, temporary_password: string) => {
        const client = new CognitoIdentityProviderClient({
            region: "ap-northeast-1",
            credentials: config.public.credentials,
        });

        const userPoolId = config.public.userPoolId; // 冗長性を排除

        const createParams: AdminCreateUserCommandInput = {
            UserPoolId: userPoolId,
            Username: email,
            TemporaryPassword: temporary_password,
            UserAttributes: [
                {Name: 'email', Value: email},
            ],
            MessageAction: "SUPPRESS",
        };

        const createCommand = new AdminCreateUserCommand(createParams);

        try {
            const createResponse = await client.send(createCommand);
            console.log("Admin creating user succeeded", createResponse);

            const setPasswordParams: AdminSetUserPasswordCommandInput = {
                UserPoolId: userPoolId,
                Username: email,
                Password: temporary_password,
                Permanent: true,
            };

            const setPasswordCommand = new AdminSetUserPasswordCommand(setPasswordParams);
            const setPasswordResponse = await client.send(setPasswordCommand);
            console.log("Admin setting new password succeeded", setPasswordResponse);

        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    return {
        signIn,
        signUp,
        adminSignUp,
        adminCreateUser
    }
}