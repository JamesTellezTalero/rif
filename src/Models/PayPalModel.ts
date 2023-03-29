import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";

@jsonObject
export class PayPalAuthResponseMetadata {
    @jsonMember
    name: string
    @jsonMember
    display_name: string
    @jsonMember
    logo_uri: string
    @jsonArrayMember(String)
    scopes: string[]
    @jsonMember
    ui_type: string
}

@jsonObject
export class PayPalAuthResponse {
    @jsonMember
    scope: string
    @jsonMember
    access_token: string
    @jsonMember
    token_type: string
    @jsonMember
    app_id: string
    @jsonMember
    expires_in: string
    @jsonArrayMember(String)
    supported_authn_schemes: string[]
    @jsonMember
    nonce: string
    @jsonMember
    client_metadata: PayPalAuthResponseMetadata
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

@jsonObject
export class PayPalOrderReqPurchaseUnitsItemAmount {
    @jsonMember
    currency_code: string
    @jsonMember
    value: string
}

@jsonObject
export class PayPalOrderReqPurchaseUnitsItem {
    @jsonMember
    name: string
    @jsonMember
    description: string
    @jsonMember
    quantity: string
    @jsonMember
    unit_amount: PayPalOrderReqPurchaseUnitsItemAmount
}

@jsonObject
export class PayPalOrderReqPurchaseAmountBreakTotal {
    @jsonMember
    currency_code: string
    @jsonMember
    value: string
}

@jsonObject
export class PayPalOrderReqPurchaseAmountBreak {
    @jsonMember
    item_total: PayPalOrderReqPurchaseAmountBreakTotal
}

@jsonObject
export class PayPalOrderReqPurchaseAmount {
    @jsonMember
    currency_code: string
    @jsonMember
    value: string
    @jsonMember
    breakdown: PayPalOrderReqPurchaseAmountBreak
}

@jsonObject
export class PayPalOrderReqPurchaseUnits {
    @jsonArrayMember(PayPalOrderReqPurchaseUnitsItem)
    items: PayPalOrderReqPurchaseUnitsItem []
    @jsonMember
    amount: PayPalOrderReqPurchaseAmount
}

export class PayPalOrderReqApplicationContext {
    @jsonMember
    return_url: string
    @jsonMember
    cancel_url: string
}

@jsonObject
export class PayPalOrderReq {
    @jsonMember
    intent: string
    @jsonMember
    application_context: PayPalOrderReqApplicationContext
    @jsonArrayMember(PayPalOrderReqPurchaseUnits)
    purchase_units: PayPalOrderReqPurchaseUnits[]
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


@jsonObject
export class PayPalOrderResPurchaseUnitsAmountBreakItem {
    @jsonMember
    currency_code: string
    @jsonMember
    value: string
}

@jsonObject
export class PayPalOrderResPurchaseUnitsAmountBreak {
    @jsonMember
    item_total: PayPalOrderResPurchaseUnitsAmountBreakItem
}

@jsonObject
export class PayPalOrderResPurchaseUnitsAmount {
    @jsonMember
    currency_code: string
    @jsonMember
    value: string
    @jsonMember
    breakdown: PayPalOrderResPurchaseUnitsAmountBreak
}

@jsonObject
export class PayPalOrderResPurchaseUnitsPayee {
    @jsonMember
    email_address: string
    @jsonMember
    merchant_id: string
}

@jsonObject
export class PayPalOrderResPurchaseUnitsItemsAmount {
    @jsonMember
    currency_code: string
    @jsonMember
    value: string
}

@jsonObject
export class PayPalOrderResPurchaseUnitsItems {
    @jsonMember
    name: string
    @jsonMember
    quantity: string
    @jsonMember
    unit_amount: PayPalOrderResPurchaseUnitsItemsAmount
}

@jsonObject
export class PayPalOrderResPurchaseUnits {
    @jsonMember
    reference_id: string
    @jsonMember
    amount: PayPalOrderResPurchaseUnitsAmount
    @jsonMember
    payee: PayPalOrderResPurchaseUnitsPayee
    @jsonArrayMember(PayPalOrderResPurchaseUnitsItems)
    items: PayPalOrderResPurchaseUnitsItems[]
}

@jsonObject
export class PayPalOrderResLinks {
    @jsonMember
    href: string
    @jsonMember
    rel: string
    @jsonMember
    method: string
}

@jsonObject
export class PayPalOrderRes {
    @jsonMember
    id: string
    @jsonMember
    intent: string
    @jsonMember
    status: string
    @jsonArrayMember(PayPalOrderResPurchaseUnits)
    purchase_units: PayPalOrderResPurchaseUnits[]
    @jsonMember
    create_time: string
    @jsonArrayMember(PayPalOrderResLinks)
    links: PayPalOrderResLinks[]
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
