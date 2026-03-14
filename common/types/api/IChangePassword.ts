export interface ChangePasswordPorps {
    UserId: string;
    Password: string;
    NewPassword: string;
    ConfirmPassword: string;
    CaptchaResponse: string;
}
export interface ChangePasswordResponse {
    statusCode: string;
    message: string;
}
