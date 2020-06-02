export class PurchaseData
{
    private static ACTIVATION_CODE_PURCHASE_DATA:number = 0;
    private static APPLE_APP_STORE_PURCHASE_DATA:number = 1;
    private static GOOGLE_PLAY_STORE_PURCHASE_DATA:number = 3;
    private static MICROSOFT_STORE_PURCHASE_DATA:number = 4;
    
    private _purchaseType:number = -1;
    private _offerID: number;
    
    private _activationCodeValue:string;
    
    private _appStoreProductId:string;
    private _appStoreTransactionId:string;
    private _appStoreReceipt:string;
    private _appStoreBundleId:string;

    private _microsoftStoreProductId:string;
    private _microsoftStoreTransactionId:string;
    private _microsoftStoreReceipt:string;
    private _microsoftStoreAppId:string;
    
    private _clientTokenString:string;
    private _nonceString:string;
    private _cvv:string;

    private _playStoreProductId:string;
    private _playStorePurchaseToken:string;
    private _playStorePackageName:string;
    
    public SetActivationCodePurchaseData(activationCodeValue:string):void
    {
        this._purchaseType = PurchaseData.ACTIVATION_CODE_PURCHASE_DATA;
        this._activationCodeValue = activationCodeValue;
    }
    
    public SetAppleInAppPurchaseData(appStoreProductId:string, appStoreTransactionId:string, appStoreReceipt:string, appStoreBundleId?: string):void
    {
        this._purchaseType = PurchaseData.APPLE_APP_STORE_PURCHASE_DATA;
        this._appStoreProductId = appStoreProductId;
        this._appStoreTransactionId = appStoreTransactionId;
        this._appStoreReceipt = appStoreReceipt;
        this._appStoreBundleId = appStoreBundleId;
    }

    public SetMicrosoftStorePurchaseData(microsoftStoreProductId:string, microsoftStoreTransactionId:string, microsoftStoreReceipt:string, microsoftStoreAppId?: string):void
    {
        this._purchaseType = PurchaseData.MICROSOFT_STORE_PURCHASE_DATA;
        this._microsoftStoreAppId = microsoftStoreAppId;
        this._microsoftStoreTransactionId = microsoftStoreTransactionId;
        this._microsoftStoreReceipt = microsoftStoreReceipt;
        this._microsoftStoreProductId = microsoftStoreProductId;
    }

    public SetGoogleInAppPurchaseData(playStoreProductId:string, playStorePurchaseToken:string, playStorePackageName:string):void
    {
        console.log('SetGoogleInAppPurchaseData: ', playStoreProductId, playStorePurchaseToken, playStorePackageName);
        this._purchaseType = PurchaseData.GOOGLE_PLAY_STORE_PURCHASE_DATA;
        this._playStoreProductId = playStoreProductId;
        this._playStorePurchaseToken = playStorePurchaseToken;
        this._playStorePackageName = playStorePackageName;
    }
    
    public toJson():any
    {
        var retVal:any;
        switch (this._purchaseType)
        {
            case PurchaseData.ACTIVATION_CODE_PURCHASE_DATA:
                retVal =
                {
                    purchase_data_type: "Activation_Code",
                    activation_code_value: this._activationCodeValue
                };
                break;
            case PurchaseData.APPLE_APP_STORE_PURCHASE_DATA:
                retVal =
                {
                    purchase_data_type: "Apple_App_Store_Purchase",
                    app_store_product_id: this._appStoreProductId,
                    app_store_transaction_id: this._appStoreTransactionId,
                    app_store_receipt: this._appStoreReceipt,
                    app_store_bundle_id: this._appStoreBundleId
                };
                break;
            case PurchaseData.GOOGLE_PLAY_STORE_PURCHASE_DATA:
                retVal = 
                {
                    purchase_data_type: "Google_Play_Store_Purchase",
                    google_play_store_product_id: this._playStoreProductId,
                    google_play_store_purchase_token: this._playStorePurchaseToken,
                    google_play_store_package_name: this._playStorePackageName
                }
                break;
            case PurchaseData.MICROSOFT_STORE_PURCHASE_DATA:
                retVal = 
                {
                    purchase_data_type: "Microsoft_Store_Purchase",
                    microsoft_store_product_id: this._microsoftStoreProductId,
                    microsoft_store_transaction_id: this._microsoftStoreTransactionId,
                    microsoft_store_receipt: this._microsoftStoreReceipt,
                    microsoft_store_app_id: this._microsoftStoreAppId
                }
                break;
            default:
                throw new Error("Invalid Product Data");
        }
        
        return retVal;
    }
}