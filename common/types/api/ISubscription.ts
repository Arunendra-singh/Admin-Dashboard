export interface ISubscription {
    emailid: string;
    subscribestatus: boolean;
}

export interface ISubscriptionPayload {
    EmailAddress: string;
    Type: string;
    CaptchaResponse: string;
}
