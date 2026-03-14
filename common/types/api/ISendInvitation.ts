export interface ISendInvitationProps {
    UserGuid: string
    ReferralLink: string
    UserName: string
    PhoneNumber: number
    UserEmail: string
    Message: string
    ReferralUsers: ReferralUser[]
}

export interface ReferralUser {
    Name: string
    EmailID: string
}
