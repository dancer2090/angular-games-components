import { UberApplicationEvent } from "./UberApplicationEvent";
import { SharedProxyWordlist } from '../DataClasses/other/SharedProxyWordlist';
import { ProxyWordlist } from '../DataClasses/other/ProxyWordlist';
import { SearchTextSessionCache } from '../UberDataAccess/SearchTextSessionCache';

export class WordlistSearchEvent extends UberApplicationEvent {
    public static WORDLISTS_SEARCHED: string = "wordlistsSearch";
    public static WORDLISTS_SEARCHED_FAILED: string = "wordlistsSearchFailed";
    public static WORDLISTS_BROWSE: string = "wordlistsBrowse";
    public static WORDLISTS_BROWSE_FAILED: string = "wordlistsBrowseFailed";

    private sharedWordLists: SharedProxyWordlist[];
    public get SharedWordlists(): SharedProxyWordlist[] {
        return this.sharedWordLists;
    }

    private defaultWordLists: ProxyWordlist[];
    public get DefaultWordlists(): ProxyWordlist[] {
        return this.defaultWordLists;
    }

    private userWordlists: ProxyWordlist[];
    public get UserWordlists(): ProxyWordlist[] {
        return this.userWordlists;
    }

    private errorMessage: string;
    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    private numberOfpages: number;
    public get NumberOfPages(): number {
        return this.numberOfpages;
    }

    private searchCache: SearchTextSessionCache;
    public get SearchSession(): SearchTextSessionCache {
        return this.searchCache;
    }

    constructor (type: string, defaultLists: ProxyWordlist[], userLists: ProxyWordlist[], sharedLists: SharedProxyWordlist[], numOfPages: number, searchSession: SearchTextSessionCache = null, errorMessage: string = null) {
        super(type);
        this.errorMessage = errorMessage;
        this.sharedWordLists = sharedLists;
        this.defaultWordLists = defaultLists;
        this.userWordlists = userLists;
        this.numberOfpages = numOfPages;
        this.searchCache = searchSession;
    }

    public clone(): UberApplicationEvent {
        return new WordlistSearchEvent(this.type, this.defaultWordLists, this.userWordlists, this.sharedWordLists, this.numberOfpages, this.searchCache, this.errorMessage);
    }
}