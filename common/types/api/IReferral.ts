export interface IReferralResponse {
    statusCode: string;
    massage: string;
    data: IReferral;
}

export interface IReferral {
    resources: Resources;
    userpoints: Userpoints;
    tiers: any[];
    userdetails: Userdetails;
}

export interface Resources {
    "reward.label.shareandsave": string;
    "reward.label.mypoints": string;
    "reward.label.myreferrals": string;
    "reward.label.sharereferrallink": string;
    "reward.label.youmaysend": string;
    "reward.label.invitecount": string;
    "reward.label.sendinvitations": string;
    "reward.label.referfriendandreceive": string;
    "reward.label.firstorders": string;
    "reward.label.entercontacts": string;
    "reward.label.name": string;
    "reward.label.email": string;
    "reward.label.hash": string;
    "reward.label.message": string;
    "reward.label.referrals": string;
    "reward.label.status": string;
    "reward.label.points": string;
    "reward.label.showperpage": string;
    "reward.label.history": string;
    "reward.label.id": string;
    "reward.label.comment": string;
    "reward.label.created": string;
    "reward.label.description": string;
    "reward.label.transactionshistory": string;
}

export interface Userpoints {
    websiteguid: string;
    languageguid: string;
    userguid: string;
    referredfrom: any;
    referralusers: Referraluser[];
    transactionhistory: any;
    filters: any;
    isactive: boolean;
    ipaddress: any;
    createdby: any;
    createddateutc: string;
    modifiedby: any;
    modifieddateutc: string;
}

export interface Referraluser {
    name: string;
    emailid: string;
    points: number;
    status: any;
    createddate: string;
}

export interface Userdetails {
    referrallink: any;
    userloyaltypoints: any;
    referalpoint: any;
    refferedpoints: any;
    username: any;
    emailaddress: any;
}
