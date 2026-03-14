export interface ICheckoutPricingResult {
    paymentgateway: string;
    resdata: ICheckOutPagePricingResponseNoGateway | string;
}

export interface ICheckOutPagePricingPorps {
    PaymentGateway: string;
    AddressGuid: string;
    PinCode: string;
    PromoCode: string;
    DeliveryAsGift: string;
    OrderSource: string;
    IsGiftVoucher: boolean;
    PosAdvanceDate: string;
    PosAdvanceTime: string;
    PosOrderType: string;
    PaymentTobeDoneFromWallet: boolean;
    IsPublicPromo: boolean;
}

export interface ICheckOutPagePricingResponseNoGateway {
    statusCode: string;
    message: string;
    checkOutResponse: CheckOutResponse;
}

export interface CheckOutResponse {
    resources: Resources;
    orderDetails: OrderDetails;
    publicPromocodeLists: PublicPromocodeList[];
    giftvoucher: any;
}

export interface Resources {
    CGSTTaxRate: string;
    SGSTTaxRate: string;
    "Order.lable.DeliveryCharges": string;
    "Order.lable.Packingcharges": string;
    "Order.Thankyou.YourSavings": string;
    "Order.Thankyou.Total": string;
    "Order.Labels.ToBePaid": string;
    "Order.Labels.Subtotal": string;
    "Order.Value.OrderLimitForNoDeliveryCharge": string;
    "Order.Labels.ApplyCouponCode": string;
    "Order.Labels.ViewAllOffers": string;
    "Order.Labels.ViewLessOffers": string;
    "Order.Labels.EnterYourCouponCode": string;
    "Order.Labels.Apply": string;
    "Order.Labels.Remove": string;
    "Order.Labels.PromoCodeSuccess": string;
}

export interface OrderDetails {
    quantity: number;
    promoCode: string;
    deliveryCharges: string;
    packingCharges: string;
    tobePaidAmount: string;
    yourSavings: string;
    cgst: string;
    sgst: string;
    subTotal: string;
    dealsDiscountAmount: string;
    promoCodeAlert: string;
    totalAmountInWallet: string;
    amountPaidFromWallet: string;
    remainingAmountTobePaid: string;
    remainingAmountInWallet: string;
    walletCashBackonCartproduct: string;
    subscriptionDiscountAmount: string;
}

export interface PublicPromocodeList {
    webSiteGuid: any;
    languageGuid: any;
    ruleGuid: any;
    ruleName: any;
    description: string;
    status: boolean;
    customerGroupGuids: any;
    userGuids: any;
    fromDate: string;
    toDate: string;
    collectionGuids: any;
    applyDiscountToCollectionGuids: any;
    applyDiscountToProductGuids: any;
    productGuids: any;
    promotionConditionGuid: any;
    shippingMethodGuids: any;
    shippingStateGuids: any;
    discountPercentage: any;
    discountAmount: any;
    discountShipping: any;
    discountShippingPercentage: any;
    discountShippingZipCode: any;
    minimumOrderQuantity: any;
    minimumOrderAmount: any;
    maximumDiscountAmount: any;
    itemPercentage: any;
    maxItemDiscountQuantity: any;
    minimumOrderAmount1: any;
    discountAmount1: any;
    minimumOrderAmount2: any;
    discountAmount2: any;
    minimumOrderAmount3: any;
    discountAmount3: any;
    minimumOrderAmount4: any;
    discountAmount4: any;
    maxLimitPerUser: any;
    isDeleted: boolean;
    isApplyOnProductBasePrice: boolean;
    isApplyOnItemAndChargePrice: boolean;
    isApplyOnBasketPrice: boolean;
    isApplySiteWide: boolean;
    isAllUserSelected: boolean;
    isAllCustomerGroupSelected: boolean;
    isApplyOnFirstTimeBuyer: boolean;
    isPromoCodeApplied: boolean;
    promoCodes: string;
    combinedPromotion: any;
    combinedPromotionGuids: any;
    disallowPromotionCombinationGuids: any;
    priceBreak: any;
    isPublic: boolean;
    isGiftVoucher: boolean;
    orderNumber: string;
    isActive: boolean;
    ipAddress: any;
    createdBy: any;
    createdDateUtc: string;
    modifiedBy: any;
    modifiedDateUtc: string;
}
