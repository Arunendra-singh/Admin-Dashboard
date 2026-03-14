export interface ResetPasswordPorps {
    UserId: string;
    Action: string;
    Password: string;
    ConfirmPassword: string;
}
export interface ResetPasswordResponse {
    statusCode: string;
    message: string;
}
