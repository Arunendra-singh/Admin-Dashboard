export interface IGuestUserRes {
    userGuid: string;
    emailAddress: string;
    firstName: string;
    middleName: string;
    lastName: string;
    lastLogin: "0001-01-01T00:00:00Z";
    loginAttempts: number;
    loginAttemptDate: "0001-01-01T00:00:00";
    isSubScribed: boolean;
    isResetActive: boolean;
    isActive: boolean;
    isApproved: boolean;
    roleId: number;
    userGroupId: number;
    userType: string;
    websiteGuid: string;
    sessionGuid: string;
}
export interface IGuestRegistrationProps {
    EmailAddress: string;
    RegistrationType: string;
}
export interface IGuestRegistrationResponse {
    statuscode: number;
    message: string;
    data: IGuestUserRes;
}
