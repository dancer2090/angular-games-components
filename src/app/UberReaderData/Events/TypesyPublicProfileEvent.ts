import { UberApplicationEvent } from './UberApplicationEvent';
import { TypesyPublicProfile } from '../DataClasses/db/TypesyPublicProfile';

export class TypesyPublicProfileEvent extends UberApplicationEvent {
    public static TYPESY_PUBLIC_PROFILE_RECEIVED: string = "typesyPublicProfileReceived";
    public static TYPESY_PUBLIC_PROFILE_ERROR: string = "typesyPublicProfileError";

    private typesyPublicProfile: TypesyPublicProfile;
    private errorMessage: string;

    public get Typesy_public_profile(): TypesyPublicProfile {
        return this.typesyPublicProfile;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, typesyPublicProfile: TypesyPublicProfile, errorMessage: string = null) {
        super(type);
        this.typesyPublicProfile = typesyPublicProfile;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new TypesyPublicProfileEvent(this.type, this.typesyPublicProfile, this.errorMessage);
    }
}