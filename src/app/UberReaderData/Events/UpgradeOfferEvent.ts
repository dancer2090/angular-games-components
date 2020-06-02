import { UberApplicationEvent } from './UberApplicationEvent';
import { UpgradeOffer } from '../DataClasses/db/UpgradeOffer';

export class UpgradeOfferEvent extends UberApplicationEvent
{
    public static UPGRADE_OFFERS_RECEIVED:string = "upgradeOffersReceived";
    public static UPGRADE_OFFERS_ERROR:string = "upgradeOffersError";
    
    private _upgradeOffers: UpgradeOffer[];
    public get UpgradeOffers(): UpgradeOffer[] {
        return this._upgradeOffers;
    }
    
    private _error: string;
    public get ErrorMsg():string {
        return this._error;
    }
    
    constructor(type: string, offer: UpgradeOffer[], error: string = null) {
        super(type);
        this._upgradeOffers = offer;
        this._error = error;
    }
    
    public clone(): UberApplicationEvent {
        return new UpgradeOfferEvent(this.type, this._upgradeOffers, this._error);
    }
}