import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType, Response } from '@angular/http';

import { UberApplication } from '../UberApplication';
import { AppSettings } from '../AppSettings';
import { SearchTextSessionCache } from './SearchTextSessionCache';
import { CachedData } from './CachedData';
import { ISO8601Util } from '../Utils/ISO8601Util';
import { StringUtils } from '../Utils/StringUtils';
import { DictionaryNumber } from '../Utils/Dictionary';;
import { ErrorMessage } from '../Utils/ErrorMessage';
import { UberReaderMd5 } from '../Utils/UberReaderMd5';
import { TreeNode } from '../Utils/TreeNode';
import { EventDispatcher } from '../Events/EventDispatcher';
import { ActivityEvent } from '../Events/ActivityEvent';
import { ActivityIconEvent } from '../Events/ActivityIconEvent';
import { ActivityRecommendEvent } from '../Events/ActivityRecommendEvent';
import { AddCourseEvent } from '../Events/AddCourseEvent';
import { AddPrepProgramEvent } from '../Events/AddPrepProgramEvent';
import { QuestionSyncEvent } from '../Events/QuestionSyncEvent';
import { AddWordToListEvent } from '../Events/AddWordToListEvent';
import { BookCoverEvent } from '../Events/BookCoverEvent';
import { ChartDataEvent } from '../Events/ChartDataEvent';
import { CheckUpdateEvent } from '../Events/CheckUpdateEvent';
import { CourseActivityPreviewEvent } from '../Events/CourseActivityPreviewEvent';
import { CourseCommentEvent } from '../Events/CourseCommentEvent';
import { CourseEvent } from '../Events/CourseEvent';
import { CourseInfoEvent } from '../Events/CourseInfoEvent';
import { ProgramInfoEvent } from '../Events/ProgramInfoEvent';
import { CourseIntroEvent } from '../Events/CourseIntroEvent';
import { CoursePreviewEvent } from '../Events/CoursePreviewEvent';
import { CourseToWishlistEvent } from '../Events/CourseToWishlistEvent';
import { ProgramToWishlistEvent } from '../Events/ProgramToWishlistEvent';
import { DeleteWordEvent } from '../Events/DeleteWordEvent';
import { EventTypes } from '../Events/EventTypes';
import { GetImageEvent } from '../Events/GetImageEvent';
import { ImportTextDocumentEvent } from '../Events/ImportTextDocumentEvent';
import { InvalidTokenEvent } from '../Events/InvalidTokenEvent';
import { MessageEvent } from '../Events/MessageEvent';
import { MultiAddWordEvent } from '../Events/MultiAddWordEvent';
import { NewsItemsEvent } from '../Events/NewsItemsEvent';
import { OnScreenIntroImageEvent } from '../Events/OnScreenIntroImageEvent';
import { ProductDataEvent } from '../Events/ProductDataEvent';
import { ProductInfoEvent } from '../Events/ProductInfoEvent';
import { ProductsEvent } from '../Events/ProductsEvent';
import { ProxyTestsEvent } from '../Events/ProxyTestsEvent';
import { ProxyTextsEvent } from '../Events/ProxyTextsEvent';
import { ProxyWordlistEvent } from '../Events/ProxyWordlistEvent';
import { ProxyWordlistsEvent } from '../Events/ProxyWordlistsEvent';
import { RatingCourseEvent } from '../Events/RatingCourseEvent';
import { SharedObjectEvent } from '../Events/SharedObjectEvent';
import { SharedProxyTextsEvent } from '../Events/SharedProxyTextsEvent';
import { SharedProxyWordlistsEvent } from '../Events/SharedProxyWordlistsEvent';
import { StatusPointsEvent } from '../Events/StatusPointsEvent';
import { TestDataEvent } from '../Events/TestDataEvent';
import { TextShareSettingsEvent } from '../Events/TextShareSettingsEvent';
import { TextSyncEvent } from '../Events/TextSyncEvent';
import { TextsSearchEvent } from '../Events/TextsSearchEvent';
import { TextsTableEvent } from '../Events/TextsTableEvent';
import { UITextEvent } from '../Events/UITextEvent';
import { UberApplicationEvent } from '../Events/UberApplicationEvent';
import { UberApplicationEventTypes } from '../Events/UberApplicationEventTypes';
import { UberReaderTextEvent } from '../Events/UberReaderTextEvent';
import { UberSyncEvent } from '../Events/UberSyncEvent';
import { UserAuthenticatedEvent } from '../Events/UserAuthenticatedEvent';
import { UserProfilePicUpdateEvent } from '../Events/UserProfilePicUpdateEvent';
import { VocabSyncEvent } from '../Events/VocabSyncEvent';
import { WikiServiceEvent } from '../Events/WikiServiceEvent';
import { WordDiscoverEvent } from '../Events/WordDiscoverEvent';
import { WordEvent } from '../Events/WordEvent';
import { WordSenseEvent } from '../Events/WordSenseEvent';
import { WordUsageExampleEvent } from '../Events/WordUsageExampleEvent';
import { WordlistEvent } from '../Events/WordlistEvent';
import { WordlistShareSettingsEvent } from '../Events/WordlistShareSettingsEvent';
import { WordsLookupEvent } from '../Events/WordsLookupEvent';
import { DiscoveryBrowseEvent } from '../Events/DiscoveryBrowseEvent';
import { DiscoverProgramEvent } from '../Events/DiscoverProgramEvent';
import { Author } from '../DataClasses/db/Author';
import { AuthorPicture } from '../DataClasses/other/AuthorPicture';
import { Group_Shared_Object } from '../DataClasses/other/Group_Shared_Object';
import { NewsItem } from '../DataClasses/other/NewsItem';
import { CourseInfo } from '../DataClasses/other/CourseInfo';
import { PrepEdCourseFilter } from '../DataClasses/other/PrepEdCourseFilter';
import { ProxyCourse } from '../DataClasses/other/ProxyCourse';
import { ProxyTest } from '../DataClasses/other/ProxyTest';
import { ProxyText } from '../DataClasses/other/ProxyText';
import { ProxyWordlist } from '../DataClasses/other/ProxyWordlist';
import { PurchaseData } from '../DataClasses/other/PurchaseData';
import { SharedProxyText } from '../DataClasses/other/SharedProxyText';
import { SharedProxyWordlist } from '../DataClasses/other/SharedProxyWordlist';
import { StatusLevel } from '../DataClasses/other/StatusLevel';
import { TestData } from '../DataClasses/other/TestData';
import { UserIdentificationData } from '../DataClasses/other/UserIdentificationData';
import { User_Shared_Object } from '../DataClasses/other/User_Shared_Object';
import { AControl } from '../DataClasses/db/AControl';
import { Activity } from '../DataClasses/db/Activity';
import { Activity_Category } from '../DataClasses/db/Activity_Category';
import { Chart } from '../DataClasses/db/Chart';
import { Chart_Category } from '../DataClasses/db/Chart_Category';
import { Chart_Series } from '../DataClasses/db/Chart_Series';
import { Code } from '../DataClasses/db/Code';
import { Course } from '../DataClasses/db/Course';
import { Prep_Program } from '../DataClasses/db/Prep_Program';
import { Prep_Program_Info } from '../DataClasses/other/Prep_Program_Info';
import { Course_Activity } from '../DataClasses/db/Course_Activity';
import { Course_Category } from '../DataClasses/db/Course_Category';
import { Default } from '../DataClasses/db/Default';
import { Feedback } from '../DataClasses/db/Feedback';
import { Group } from '../DataClasses/db/Group';
import { Language } from '../DataClasses/db/Language';
import { Offer } from '../DataClasses/db/Offer';
import { ProductInfo } from '../DataClasses/db/ProductInfo';
import { Question } from '../DataClasses/db/Question';
import { Question_Group } from '../DataClasses/db/Question_Group';
import { Result } from '../DataClasses/db/Result';
import { Setting } from '../DataClasses/db/Setting';
import { Shared_Object } from '../DataClasses/db/Shared_Object';
import { Text } from '../DataClasses/db/Text';
import { UI_Text } from '../DataClasses/db/UI_Text';
import { User } from '../DataClasses/db/User';
import { UserPref } from '../DataClasses/db/UserPref';
import { User_Course } from '../DataClasses/db/User_Course';
import { User_Prep_Program } from '../DataClasses/db/User_Prep_Program';
import { User_Question } from '../DataClasses/db/User_Question';
import { User_Notes } from '../DataClasses/db/User_Notes';
import { User_Text } from '../DataClasses/db/User_Text';
import { Word } from '../DataClasses/db/Word';
import { WordUsageExample } from '../DataClasses/db/WordUsageExample';
import { Word_Discover } from '../DataClasses/db/Word_Discover';
import { Word_Pos } from '../DataClasses/db/Word_Pos';
import { Word_Sense } from '../DataClasses/db/Word_Sense';
import { Word_User } from '../DataClasses/db/Word_User';
import { Wordlist } from '../DataClasses/db/Wordlist';
import { Wordlist_Category } from '../DataClasses/db/Wordlist_Category';
import { Wordlist_Word } from '../DataClasses/db/Wordlist_Word';
import { User_Comment } from '../DataClasses/db/User_Comment';

import 'rxjs/add/operator/map';
import { UserInfoEvent } from '../Events/UserInfoEvent';
import { BuildSettings } from '../../UberReaderClient/BuildSettings';
import { Subject, Observable } from 'rxjs/Rx';
import { DevUtils } from '../DevUtils';
import { MdlDialogReference } from '@angular-mdl/core';
import { PrepRecommendationEvent } from '../Events/PrepRecommendationEvent';
import { UserAppBgImgUpdateEvent } from '../Events/UserAppBgImgUpdateEvent';
import { ExamInfo } from '../DataClasses/db/ExamInfo';
import { LeaderboardEvent } from '../Events/LeaderboardEvent';
import { UserProfileInfo } from '../DataClasses/other/UserProfileInfo';
import { ProxyLessonPlan } from '../DataClasses/other/ProxyLessonPlan';
import { Lesson_Plan } from '../DataClasses/db/Lesson_Plan';
import { LessonPlanEvent } from '../Events/LessonPlanEvent';
import { Customer } from '../DataClasses/db/Customer';
import { UserSubscription } from '../DataClasses/db/UserSubscription';
import { AdminEvent } from '../Events/AdminEvent';
import { AdminUserEvent } from '../Events/AdminUserEvent';
import { AdminUser } from '../DataClasses/db/AdminUser';
import { UserGroupEvent } from '../Events/UserGroupEvent';
import { User_Group } from '../DataClasses/db/User_Group';
import { AdminGroupEvent } from '../Events/AdminGroupEvent';
import { AdminLiveUserDataEvent } from '../Events/AdminLiveUserDataEvent';
import { Admin_Live_User_Data } from '../DataClasses/db/Admin_Live_User_Data';
import { AdminGroupSettingsEvent } from '../Events/AdminGroupSettingsEvent';
import { NextPrepRecommendationEvent } from '../Events/NextPrepRecommendationEvent';
import { GroupReportDataEvent } from '../Events/GroupReportDataEvent';
import { AdminGroupReportData } from '../DataClasses/other/AdminGroupReportData';
import { AdminDataSyncEvent } from '../Events/AdminDataSyncEvent';
import { AdminUserGoalsEvent } from '../Events/AdminUserGoalsEvent';
import { UberReaderLoadingMessage } from '../../UberReaderClient/UberReaderComponents/Dialogs/UberReaderLoadingMessage';
import { AddPrepProgramsEvent } from '../Events/AddPrepProgramsEvent';
import { NextRecommendedTextEvent } from '../Events/NextRecommendedTextEvent';
import { AdminCleverSyncEvent } from '../Events/AdminCleverSyncEvent';
import { District } from '../DataClasses/db/District';
import { CleverEvent } from '../Events/CleverEvent';
import { Group_Lesson_Plan } from '../DataClasses/db/Group_Lesson_Plan';
import { GroupLessonPlanEvent } from '../Events/GroupLessonPlanEvent';
import { TypingTestEvent } from '../Events/TypingTestEvent';
import { TypingTest } from '../DataClasses/db/Typing_Test';
import { TypingTestResultEvent } from '../Events/TypingTestResultEvent';
import { UserTypingTestResult } from '../DataClasses/db/User_Typing_Test_Result';
import { ProxyTypingTest } from '../DataClasses/other/ProxyTypingTest';
import { TypingTestSyncEvent } from '../Events/TypingTestSyncEvent';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ProgressObjectEvent } from '../Events/ProgressObjectEvent';
import { ProgressObject } from '../DataClasses/db/ProgressObject';
import { TypingTestsDataSyncEvent } from '../Events/TypingTestsDataSyncEvent';
import { School_Trial_Info } from '../DataClasses/db/School_Trial_Info';
import { OrganizationLogoUpdateEvent } from '../Events/OrganizationLogoUpdateEvent';
import { UserSettingSyncEvent } from '../Events/UserSettingSyncEvent';
import { RunningTaskStatusEvent } from '../Events/RunningTaskStatusEvent';
import { TicketEvent } from '../Events/TicketEvent';
import { AdminDistrictSyncEvent } from '../Events/AdminDistrictSyncEvent';
import { RunningTaskEvent } from '../Events/RunningTaskEvent';
import { UploadEvent } from '../Events/UploadEvent';
import { UserNotification } from '../DataClasses/db/UserNotification';
import { TypingTask } from '../DataClasses/db/Typing_Task';
import { TypingTaskEvent } from '../Events/TypingTaskEvent';
import { TypingTaskResultEvent } from '../Events/TypingTaskResultEvent';
import { UserTypingTaskResult } from '../DataClasses/db/User_Typing_Task_Result';
import { ProxyTypingTask } from '../DataClasses/other/ProxyTypingTask';
import { TypingTasksDataSyncEvent } from '../Events/TypingTasksDataSyncEvent';
import { ProxyActivity } from '../DataClasses/other/ProxyActivity';
import { CharacterCompetencyEvent } from '../Events/CharacterCompetencyEvent';
import { CharacterCompetency } from '../DataClasses/db/CharacterCompetency';
import { SurveyReview } from '../DataClasses/db/SurveyReview';
import { SurveyReviewEvent } from '../Events/SurveyReviewEvent';
import { LessonPlanInfoEvent } from '../DataClasses/db/LessonPlanInfoEvent';
import { LessonPlanInfo } from '../DataClasses/db/LessonPlanInfo';
import { Grading_Template } from '../DataClasses/db/Grading_Template';
import { GradingTemplateEvent } from '../Events/GradingTemplateEvent';
import { UserPrefEvent } from '../Events/UserPrefEvent';
import { ReplayEvent } from '../Events/ReplayEvent';
import { TypesyCourseActivityEvent } from '../DataClasses/db/TypesyCourseActivityEvent';
import { TypesyCourseActivity } from '../DataClasses/db/TypesyCourseActivity';
import { TypesyPublicProfileEvent } from '../Events/TypesyPublicProfileEvent';
import { TypesyPublicProfile } from '../DataClasses/db/TypesyPublicProfile';
import { AdminSubscriptionEvent } from '../Events/AdminSubscriptionEvent';
import { WordlistCategoryEvent } from '../Events/WordlistCategoryEvent';
import { WordlistSearchEvent } from '../Events/WordlistSearchEvent';
import { WordlistText } from '../DataClasses/db/WordlistText';
import { UploadPurchaseOrderEvent } from '../Events/UploadPurchaseOrderEvent';
import { LessonPlanSyncEvent } from '../Events/LessonPlanSyncEvent';
import { PrintCertificateEvent } from '../Events/PrintCertificateEvent';
import { ActiveSubscription } from '../DataClasses/db/ActiveSubscription';
import { TypesyStatusLevel } from '../DataClasses/db/Typesy_Status_Level';
import { UserTypingCompetency } from '../DataClasses/db/User_Typing_Competency';
import { UserStatusPoints } from '../DataClasses/db/User_Status_Points';
import { PlacementTest } from '../DataClasses/db/PlacementTest';
import { UpgradeOfferEvent } from '../Events/UpgradeOfferEvent';
import { UpgradeOffer } from '../DataClasses/db/UpgradeOffer';
import { timeout, map, retryWhen, tap, catchError, retry, switchMap, mergeMap, finalize, delay, repeatWhen, distinctUntilChanged } from 'rxjs/operators';
import { ClosePopUpEvent } from '../Events/ClosePopUpEvent';
import { of, throwError, iif, timer, Observer, interval } from 'rxjs';
import { Assignment_Type } from '../DataClasses/db/Assignment_Type';
import { Topic } from '../DataClasses/db/Topic';
import { UserLessonPlan } from '../DataClasses/db/User_Lesson_Plan';

var pako = require('pako');
declare var fbq:Function;

@Injectable()
export class UberDataAccessRemoteService extends EventDispatcher
{
    public callFunction$: Subject<any> = new Subject<any>();

    constructor(private _http:Http, private _cachedData: CachedData)
    {
        super();

        //var injector = Injector.resolveAndCreate([Http]);
        //this._http = injector.get(Http);
        //this._http = http;
        //expect(injector.get(Car) instanceof Car).toBe(true);        
    }

    public sync2$<T>(post$: Observable<T>, timeInterval?: number): Observable<T> {
        timeInterval = timeInterval || UberDataAccessRemoteService.MAX_SYNC_INTERVAL;
        return interval(timeInterval).pipe(
            mergeMap(() => post$),
            //distinctUntilChanged((a, b) => JSON.stringify(a) == JSON.stringify(b))
        );
    }

    public sync$(post$: Observable<any>, interval: number) {
        let delay$ = _ => _.pipe(delay(interval));
        return post$.pipe(
            retryWhen(delay$),
            repeatWhen(delay$)
        );
    }

    public postSync$ = (methodName: string, parameters: any, interval: number) => {
        return this.sync$(this.post$(methodName, parameters, false, true), interval);
        /* let delay$ = _ => _.pipe(delay(interval));
        return this.post$(methodName, parameters, false, true).pipe(
            retryWhen(delay$),
            repeatWhen(delay$)
        ); */
    }

    public post$ = (methodName: string, parameters: any, showTryAgain: boolean=false, isBackgroundCall: boolean = false) => {        
        let headers = new Headers();
        if (this._authenticationUserId && this._authenticationToken)
        {
            headers.append("Authorization", this._authenticationUserId + ":" + this._authenticationToken);
        }

        let requestId:number = this.GetRequestId();
        let jsonObject:any = {
            "jsonrpc": "2.0",
            "params": parameters,
            "method": methodName,
            "id": requestId
        };
        let jsonArgs:string = JSON.stringify(jsonObject);
        let callStart:Date = new Date();

        let errorHandler = (errMsg:string, errObj:any = null, id:number = 0): Observable<any> => {
            if (showTryAgain && !isBackgroundCall) {                
                return Observable.create((observer: Observer<any>) => {
                    let tryAgainHandler = (event: ClosePopUpEvent) => {
                        if (event.detail == ClosePopUpEvent.OK) {
                            if (!isBackgroundCall) {
                                UberReaderLoadingMessage.GetInstance().Show("Loading");
                            }
                            observer.next(ClosePopUpEvent.OK);
                        }
                        else {
                            observer.error(errMsg);
                        }                        
                        observer.complete();
                    };
                    UberApplication.GetInstance().showMdlConfirmDialog(errMsg, '', 'Cancel', 'Try Again', tryAgainHandler);
                    setTimeout(() => document.body.click(), 0);
                });
            }
            else {
                return throwError(errMsg);
            }        
        };

        if (!isBackgroundCall) {
            UberReaderLoadingMessage.GetInstance().Show("Loading");
        }

        return this._http.post(this._remoteDataAccessUrl, jsonArgs, { headers: headers, responseType: ResponseContentType.ArrayBuffer }).pipe(
            timeout(20000),
            tap(() => {
                console.log('fn(' + methodName + ') CALLED! ', parameters, showTryAgain, isBackgroundCall);
                if (!isBackgroundCall) {
                    UberReaderLoadingMessage.GetInstance().removeAllListeners();
                    UberReaderLoadingMessage.GetInstance().Hide();
                }
            }),
            map(data => {
                let callEnd = new Date();
                let timeTaken = callEnd.getTime() - callStart.getTime();
                let responseJSONObject:any;                
                try {
                    let compressedArrayBuffer:ArrayBuffer = data.arrayBuffer();
                    let compressedResponseLength = compressedArrayBuffer.byteLength;
                    let responseJSON:string = pako.inflate(compressedArrayBuffer, { to: 'string' });
                    let uncompressedResponseLength = responseJSON.length;
                    responseJSONObject = JSON.parse(responseJSON);
                    responseJSONObject.RequestId = requestId;
                    responseJSONObject.ResponseSizeCompressed = compressedResponseLength;
                    responseJSONObject.ResponseSizeUncompressed = uncompressedResponseLength;
                    responseJSONObject.TotalTimeTaken = timeTaken;
                    console.log(`responseJSONObject (${methodName}): `, responseJSONObject);
                    if (responseJSONObject.error != null ) {
                        if(responseJSONObject.error.code == 10) {
                            if (responseJSONObject.error.message == "Invalid Token") {this.dispatchEvent(new InvalidTokenEvent(InvalidTokenEvent.INVALID_TOKEN));}
                            else if (responseJSONObject.error.message == "Token Invalidated") {this.dispatchEvent(new InvalidTokenEvent(InvalidTokenEvent.TOKEN_INVALIDATED));}                            
                        }
                        else {                            
                            let errorMsg:string = responseJSONObject.error.message == "Internal Error" ? "Something's not right. Please try again later." : responseJSONObject.error.message;
                            throw errorMsg;
                        }
                    }
                    else {
                        return responseJSONObject;
                    }                    
                }
                catch(error) {
                    throw error ? error : "Something's not right. Please try again later.";
                }                
            }),
            retryWhen(errors => errors.pipe(
                tap((err) => {
                    console.log('TAP ERRRRRRRRRRRR: ', err, err instanceof Response, err ? err.status : '');
                    if (!isBackgroundCall) {
                        UberReaderLoadingMessage.GetInstance().removeAllListeners();
                        UberReaderLoadingMessage.GetInstance().Hide();
                    }
                }),
                map(err => {
                    let internetErrorMsg = "We need an Internet connection to do this. Please check your Internet and try again. We suggest checking your Wi-Fi, Cellular, or other network settings.";
                    if(err != null) {
                        if (err.message == "Timeout has occurred") {
                            err = internetErrorMsg;
                        }
                        else if (err instanceof Response) {
                            err = "Something's not right. Please try again later.";
                        }
                        console.log('err: ', err);
                    }
                    else {
                        err = this.GetUiTextByKey("HTTPSERVICE_FAULT2") == "No translation yet" ? internetErrorMsg : this.GetUiTextByKey("HTTPSERVICE_FAULT2");
                    }
                    return err;
                }),
                mergeMap(err => errorHandler(err))
            ))
        );
    }

    // public keyDownEvent(event:KeyboardEvent):void
    // {
    // 	if (event.keyCode == Keyboard.CAPS_LOCK)
    // 	{
    // 		//Alert.show("test");
    // 		this._remoteDataAccessUrl = "http://localhost:37224/json.rpc";
    // 	}
    // }

    //private _currentUserId:number;    
    private _currentWordlistId:number;
    private _lastSyncTime:Date = new Date();
    private _localServerTimeOffset:number;
    private _paddingTime:number = 10000;

    private _serverCallData:DictionaryNumber<any> = {};

    private static MIN_SYNC_INTERVAL:number = 30000;
    public static MAX_SYNC_INTERVAL:number = 75000;
    private _currentSyncInterval:number = UberDataAccessRemoteService.MIN_SYNC_INTERVAL;
    private get CurrentSyncInterval():number
    {
        return this._currentSyncInterval;
    }
    private set CurrentSyncInterval(value:number)
    {
        this._currentSyncInterval = (value >= UberDataAccessRemoteService.MAX_SYNC_INTERVAL ? UberDataAccessRemoteService.MAX_SYNC_INTERVAL : value);
    }

    public GetCurrentTimeStamp():Date
    {
        let retVal:Date = new Date();
        retVal = new Date(retVal.getTime() + this._localServerTimeOffset + this._paddingTime);
        return retVal;
    }
    //private _syncTimer:Timer = new Timer(this._currentSyncInterval);

    //private _cachedData:CachedData = new CachedData();

    private _authenticationUserId:number;
    private _authenticationToken:string;

    /** FOR LIVE WEB SERVICE */
    //private _remoteDataAccessUrl:string = "https://service.ereflect.com/json.rpc";
    //private _remoteDataAccessUrl:string = "https://service.typesy.com/json.rpc"; //FOR TYPESY ONLY

    /** FOR DEV WEB SERVICE */
    private _remoteDataAccessUrl:string = "https://ereflectdev.azurewebsites.net/json.rpc";

    //private _remoteDataAccessUrl:string = "https://www.ereflect.com/UberDataAccess8/json.rpc";
    //private _remoteDataAccessUrl:string = "https://www.ereflect.com/UberDataAccessStartup/json.rpc";
    //private _remoteDataAccessUrl:string = "http://localhost:37224/json.rpc";

    private _requestId:number = 1;
    private GetRequestId():number
    {
        return this._requestId++;
    }
        
    public CallFunction(methodName:string, parameters:any, responseHandler:Function, faultHandler:Function, isBackgroundCall: boolean = false, successCallback:Function=null, failureCallback:Function=null):number
    {
        //methodName = "ClearCache";
        //parameters = null;
        //responseHandler = null;
        //faultHandler = null;

        if (!isBackgroundCall) {
            UberReaderLoadingMessage.GetInstance().Show("Loading");
        }

        var requestId:number = this.GetRequestId();

        var jsonObject:any = {
            "jsonrpc": "2.0",
            "params": parameters,
            "method": methodName,
            "id": requestId
        };

        var jsonArgs:string = JSON.stringify(jsonObject);
        //httpService.send(jsonArgs);

        let headers = new Headers();
        if (this._authenticationUserId && this._authenticationToken)
        {
            headers.append("Authorization", this._authenticationUserId + ":" + this._authenticationToken);
        }

        let callStart:Date = new Date();
        console.log("CallFunction: ", methodName, parameters);
        let subscription = this._http.post(this._remoteDataAccessUrl, jsonArgs, {headers:headers, responseType: ResponseContentType.ArrayBuffer})
            .timeout(20000)
            .subscribe(
                (data) =>
                {
                    if (!isBackgroundCall) {
                        UberReaderLoadingMessage.GetInstance().removeAllListeners();
                        UberReaderLoadingMessage.GetInstance().Hide();
                    }
                    let callEnd = new Date();
                    let timeTaken = callEnd.getTime() - callStart.getTime();

                    //alert("\"" + methodName + "\" took " + timeTaken + " ms");

                    try
                    {
                        var compressedArrayBuffer:ArrayBuffer = data.arrayBuffer();
                        var compressedResponseLength = compressedArrayBuffer.byteLength;
                        var responseJSON:string = pako.inflate(compressedArrayBuffer, { to: 'string' });
                        var uncompressedResponseLength = responseJSON.length;
                        var responseJSONObject:any = JSON.parse(responseJSON);
                        responseJSONObject.RequestId = requestId;
                        responseJSONObject.ResponseSizeCompressed = compressedResponseLength;
                        responseJSONObject.ResponseSizeUncompressed = uncompressedResponseLength;
                        responseJSONObject.TotalTimeTaken = timeTaken;
                    }
                    catch(error)
                    {
                        DevUtils.DisplayError(error, methodName);
                        if (failureCallback) {
                            failureCallback(faultHandler("Something's not right. Please try again later."));
                        }
                        else {
                            faultHandler("Something's not right. Please try again later.");
                        }
                        return;
                    }

                    if (responseJSONObject.error != null )
                    {
                        if(responseJSONObject.error.code == 10) {
                            if (responseJSONObject.error.message == "Invalid Token") {this.dispatchEvent(new InvalidTokenEvent(InvalidTokenEvent.INVALID_TOKEN));}
                            else if (responseJSONObject.error.message == "Token Invalidated") {this.dispatchEvent(new InvalidTokenEvent(InvalidTokenEvent.TOKEN_INVALIDATED));}
                        }
                        else
                        {
                            DevUtils.DisplayError(responseJSONObject.error, methodName);
                            let errorMsg:string = responseJSONObject.error.message == "Internal Error" ? "Something's not right. Please try again later." : responseJSONObject.error.message;
                            if (failureCallback) {
                                failureCallback(faultHandler(errorMsg, responseJSONObject.error.data, responseJSONObject.id));
                            }
                            else {
                                faultHandler(errorMsg, responseJSONObject.error.data, responseJSONObject.id);
                            }
                        }
                    }
                    else
                    {
                        if (successCallback) {
                            successCallback(responseHandler(responseJSONObject));
                        }
                        else {
                            responseHandler(responseJSONObject);
                        }
                    }
                },
                (err) =>
                {
                    if (!isBackgroundCall) {
                        UberReaderLoadingMessage.GetInstance().removeAllListeners();
                        UberReaderLoadingMessage.GetInstance().Hide();
                    }

                    DevUtils.DisplayError(err, methodName);
                    if(err != null && err.message == "Timeout has occurred")
                    {
                        if (failureCallback) {
                            failureCallback(faultHandler("We need an Internet connection to do this. Please check your Internet and try again. We suggest checking your Wi-Fi, Cellular, or other network settings.", null, -1));
                        }
                        else {
                            faultHandler("We need an Internet connection to do this. Please check your Internet and try again. We suggest checking your Wi-Fi, Cellular, or other network settings.", null, -1);
                        }
                    }
                    else
                    {
                        let errMsg:string = this.GetUiTextByKey("HTTPSERVICE_FAULT2") == "No translation yet" ? "We need an Internet connection to do this. Please check your Internet and try again. We suggest checking your Wi-Fi, Cellular, or other network settings." : this.GetUiTextByKey("HTTPSERVICE_FAULT2");
                        if (failureCallback) {
                            failureCallback(faultHandler(errMsg, null, requestId));
                        }
                        else {
                            faultHandler(errMsg, null, requestId);
                        }
                    }
                });

        if (!isBackgroundCall) {
            UberReaderLoadingMessage.GetInstance().removeAllListeners();
            UberReaderLoadingMessage.GetInstance().addEventListener(UberApplicationEventTypes.CANCEL_LOADING, (event:UberApplicationEvent) => {
                event.target.removeAllListeners();
                faultHandler(ErrorMessage.CANCEL_LOADING, null, -1);
                subscription.unsubscribe();
            });
        }

        /*if(cancelDialog)
        {
            cancelDialog.addEventListener(UberApplicationEventTypes.CANCEL_LOADING, (event:UberApplicationEvent) => {
                event.target.removeAllListeners();
                if (failureCallback) {
                    failureCallback(faultHandler(ErrorMessage.CANCEL_LOADING, null, -1));
                }
                else {
                    faultHandler(ErrorMessage.CANCEL_LOADING, null, -1);
                }
                subscription.unsubscribe();
            });
        }*/

        return requestId;
    }

    public CallFunction2(methodName:string, parameters:any, responseHandler:Function, faultHandler?:Function, showTryAgain: boolean=false, isBackgroundCall: boolean = false)
    {
        if (!isBackgroundCall) {
            UberReaderLoadingMessage.GetInstance().Show("Loading");
        }

        let requestId:number = this.GetRequestId();
        let jsonObject:any = {
            "jsonrpc": "2.0",
            "params": parameters,
            "method": methodName,
            "id": requestId
        };
        let jsonArgs:string = JSON.stringify(jsonObject);
        let headers = new Headers();
        if (this._authenticationUserId && this._authenticationToken)
        {
            headers.append("Authorization", this._authenticationUserId + ":" + this._authenticationToken);
        }
        let callStart:Date = new Date();
        console.log("CallFunction2: ", methodName, parameters);
        let errorHandler = (errMsg:string, errObj:any = null, id:number = 0) => {
            if (showTryAgain && !isBackgroundCall) {
                let tryAgainHandler = (event: ClosePopUpEvent) => {
                    if (event.detail == ClosePopUpEvent.OK) {
                        this.CallFunction2(methodName, parameters, responseHandler, faultHandler, showTryAgain, isBackgroundCall);
                    }
                    else {
                        if (faultHandler) faultHandler(errMsg);
                    }
                };
                UberApplication.GetInstance().showMdlConfirmDialog(errMsg, '', 'Cancel', 'Try Again', tryAgainHandler);
            }                  
            else {
                if (faultHandler) faultHandler(errMsg);                
            }        
        };
        let subscription = this._http.post(this._remoteDataAccessUrl, jsonArgs, {headers:headers, responseType: ResponseContentType.ArrayBuffer})
            .pipe(
                timeout(20000),
                tap(() => {
                    if (!isBackgroundCall) {
                        UberReaderLoadingMessage.GetInstance().removeAllListeners();
                        UberReaderLoadingMessage.GetInstance().Hide();
                    }
                })
            )
            .subscribe(
                (data) =>
                {                    
                    let callEnd = new Date();
                    let timeTaken = callEnd.getTime() - callStart.getTime();
                    let responseJSONObject:any;
                    
                    try
                    {
                        let compressedArrayBuffer:ArrayBuffer = data.arrayBuffer();
                        let compressedResponseLength = compressedArrayBuffer.byteLength;
                        let responseJSON:string = pako.inflate(compressedArrayBuffer, { to: 'string' });
                        let uncompressedResponseLength = responseJSON.length;
                        responseJSONObject = JSON.parse(responseJSON);
                        responseJSONObject.RequestId = requestId;
                        responseJSONObject.ResponseSizeCompressed = compressedResponseLength;
                        responseJSONObject.ResponseSizeUncompressed = uncompressedResponseLength;
                        responseJSONObject.TotalTimeTaken = timeTaken;
                    }
                    catch(error)
                    {
                        DevUtils.DisplayError(error, methodName);
                        errorHandler("Something's not right. Please try again later.");
                        return;
                    }

                    if (responseJSONObject.error != null )
                    {
                        if(responseJSONObject.error.code == 10) {
                            if (responseJSONObject.error.message == "Invalid Token") {this.dispatchEvent(new InvalidTokenEvent(InvalidTokenEvent.INVALID_TOKEN));}
                            else if (responseJSONObject.error.message == "Token Invalidated") {this.dispatchEvent(new InvalidTokenEvent(InvalidTokenEvent.TOKEN_INVALIDATED));}
                        }
                        else
                        {
                            DevUtils.DisplayError(responseJSONObject.error, methodName);
                            let errorMsg:string = responseJSONObject.error.message == "Internal Error" ? "Something's not right. Please try again later." : responseJSONObject.error.message;
                            errorHandler(errorMsg, responseJSONObject.error.data, responseJSONObject.id);                            
                        }
                    }
                    else
                    {
                        responseHandler(responseJSONObject);                        
                    }
                },
                (err) =>
                {
                    if (!isBackgroundCall) {
                        UberReaderLoadingMessage.GetInstance().removeAllListeners();
                        UberReaderLoadingMessage.GetInstance().Hide();
                    }

                    DevUtils.DisplayError(err, methodName);
                    if(err != null && err.message == "Timeout has occurred")
                    {
                        errorHandler("We need an Internet connection to do this. Please check your Internet and try again. We suggest checking your Wi-Fi, Cellular, or other network settings.", null, -1);                        
                    }
                    else
                    {
                        let errMsg:string = this.GetUiTextByKey("HTTPSERVICE_FAULT2") == "No translation yet" ? "We need an Internet connection to do this. Please check your Internet and try again. We suggest checking your Wi-Fi, Cellular, or other network settings." : this.GetUiTextByKey("HTTPSERVICE_FAULT2");
                        errorHandler(errMsg, null, requestId);                        
                    }
                },
                () => {
                    console.log('CALL FUNCTION COMPLETE!');
                    subscription.unsubscribe();
                });

        if (!isBackgroundCall) {
            UberReaderLoadingMessage.GetInstance().removeAllListeners();
            UberReaderLoadingMessage.GetInstance().addEventListener(UberApplicationEventTypes.CANCEL_LOADING, (event:UberApplicationEvent) => {
                event.target.removeAllListeners();
                errorHandler(ErrorMessage.CANCEL_LOADING, null, -1);
                subscription.unsubscribe();
            });
        }

        return requestId;
    }

    /*private tokenValidationCheck(event:ResultEvent):void
    {
        if (event.result.error != null && event.result.error.code == 10)
        {
            if (event.result.error.message)
            dispatchEvent(new UberApplicationEvent());
        }
    }*/

    public Logout():void
    {
    	if (this._authenticationToken != null)
    	{
    		var requestId:number = this.GetRequestId();
    		var jsonObject:any = {
    			"jsonrpc": "2.0",
    			"params": [this._authenticationUserId, this._authenticationToken],
    			"method": "InvalidateToken",
                "id": requestId
    		};

            var jsonArgs:string = JSON.stringify(jsonObject);

            var headers = new Headers();
            if (this._authenticationUserId && this._authenticationToken)
            {
                headers.append("Authorization", this._authenticationUserId + ":" + this._authenticationToken);
            }

            this._http.post(this._remoteDataAccessUrl, jsonArgs, {headers:headers});

    		//clear data
    		// if(this._syncTimer)
    		// {
    		// 	this._syncTimer.removeEventListener(TimerEvent.TIMER, this.SyncData);
    		// 	this._syncTimer.stop();
    		// }            
    		this._currentWordlistId = null;
            this._authenticationUserId = null;

            clearInterval(this.intervalId);
            clearInterval(this.adminSyncIntervalId);
    		this._currentSyncInterval = UberDataAccessRemoteService.MIN_SYNC_INTERVAL;
    		//this._cachedData = new CachedData();
            this._cachedData.Reset();
    		this._requestId = 1;
    		this.getDefaultTexts = true;
    		this.getDefaultWordlists = true;
    		this.wordsToDelete = {};
    		this.wordToDelete = {};
    		this._authenticationToken = null;
            this.preDefaultTextParams = null;
        }
    }

    private intervalId:any;
    public StartSyncing():void
    {
    //    this._syncTimer.delay = UberDataAccessRemote.MIN_SYNC_INTERVAL;
    // 	this._syncTimer.repeatCount = 0;
    // 	this._syncTimer.addEventListener(TimerEvent.TIMER, this.SyncData);
    // 	this._syncTimer.start();
        this.intervalId = setInterval(() => {
            this.SyncData();
        }, this._currentSyncInterval);
    }

    private SyncData():void
    {
            /*if (UberApplication.GetInstance().CurrentProduct.DisplayVocab)
			{
				var currentWordlistId:nullInt = new nullInt();
				if (UberApplication.GetInstance().CurrentWordlist != null)
				{
					currentWordlistId.setNum(UberApplication.GetInstance().CurrentWordlist.Wordlist_id);
				}
				CallFunction("SyncUserDataVocab3", [_authenticationUserId, _currentProductId, ISO8601Util.formatExtendedDateTime(_lastSyncTime), (currentWordlistId.HasValue() ? currentWordlistId.Value() : null)], syncDataReceived, syncDataError);
			}
			else if (UberApplication.GetInstance().CurrentProduct.DisplayText)
			{
				CallFunction("SyncUserDataText2", [_authenticationUserId, _currentProductId, ISO8601Util.formatExtendedDateTime(_lastSyncTime), UberApplication.GetInstance().CurrentUserData.CurrentText.Text_id], syncDataReceived, syncDataError);
				//CallFunction("SyncUserData", [_currentUserId, _currentProductId, ISO8601Util.formatExtendedDateTime(_lastSyncTime)], syncDataReceived, syncDataError);
			}
			else*/

            if(this._lastSyncTime == null)
            {
                this._currentSyncInterval = UberDataAccessRemoteService.MAX_SYNC_INTERVAL;
                this._lastSyncTime = new Date();
            }

            if(UberApplication.GetInstance().CurrentProduct)
            {
                if(UberApplication.GetInstance().CurrentProduct.DisplayQuestion)
                {
                    this.CallFunction("SyncUserDataPrepEd", [this._authenticationUserId, AppSettings.CurrentProductId, ISO8601Util.formatExtendedDateTime(this._lastSyncTime)], this.syncDataReceived, this.syncDataError, true);
                }
                else if (UberApplication.GetInstance().CurrentProduct.DisplayText && UberApplication.GetInstance().CurrentUserData != null)
                {
                    this.CallFunction("SyncUserDataText2", [this._authenticationUserId, AppSettings.CurrentProductId, ISO8601Util.formatExtendedDateTime(this._lastSyncTime), UberApplication.GetInstance().CurrentUserData.CurrentText.Text_id], this.syncDataReceived, this.syncDataError, true);
                }
            }

    }

    private syncDataReceived = (responseJSONObject:any) =>
    {
        DevUtils.LogFunction("ACCESS REMOTE", "syncDataReceived", responseJSONObject);
    	this._lastSyncTime = ISO8601Util.parseDateTimeString(responseJSONObject.result.CurrentTime);
        this._cachedData.AddToLocalStorage("lastSyncTime", responseJSONObject.result.CurrentTime);

        if(BuildSettings.isDevBuild || BuildSettings.isLocalBuild)
        {
            try{
                console.log("syncDataReceived A: ", this._cachedData.GetProductInfo.Product_Data_Version, AppSettings.ProductDataVersion, responseJSONObject.result.CurrentVersion);
            }catch(e){
                console.log("syncDataReceived B: ", this._cachedData.GetProductInfo, AppSettings.ProductDataVersion, responseJSONObject.result.CurrentVersion);
            }
        }

        if((this._cachedData.GetProductInfo != null && AppSettings.ProductDataVersion != null &&
            this._cachedData.GetProductInfo.Product_Data_Version != AppSettings.ProductDataVersion) ||
            (AppSettings.ProductDataVersion != responseJSONObject.result.CurrentVersion))
        {
            //alert(this._cachedData.GetProductInfo.Product_Data_Version + ":" + AppSettings.ProductDataVersion + ":" + responseJSONObject.result.CurrentVersion)
            this.dispatchEvent(new ProductInfoEvent(ProductInfoEvent.UPDATE_REQUIRED, null, null));
        }

        //result goal update/sync
        if(responseJSONObject.result.Results != null && responseJSONObject.result.Results.length > 0)
        {
            for (let JSONresult of responseJSONObject.result.Results ) {
                let result:Result = Result.fromJson(JSONresult);
                this._cachedData.UpdateResult(result, true);
            }
        }

        //user course update
        let userCourseList:User_Course[] = new Array<User_Course>();
        if(responseJSONObject.result.UserCourses != null && responseJSONObject.result.UserCourses.length > 0)
        {
            for (let userCourseJSON of responseJSONObject.result.UserCourses)
            {
                let uc:User_Course = User_Course.fromJson(userCourseJSON);
                userCourseList.push(uc);
            }
        }
        let updatedUserCourses:User_Course[] = this._cachedData.UpdateUserCourses(userCourseList, true);

        let dispatchSettingSync: boolean = false;
        if(responseJSONObject.result.UserPrefs != null && responseJSONObject.result.UserPrefs.length > 0)
        {
            dispatchSettingSync = true;
            for(let userPref of responseJSONObject.result.UserPrefs)
            {
                userPref = UserPref.fromJson(userPref);
                this._cachedData.UpdateUserPref(userPref);
            }
        }

        if(responseJSONObject.result.GroupUserPrefs != null && responseJSONObject.result.GroupUserPrefs.length > 0)
        {
            dispatchSettingSync = true;
            let groupUserPrefs: UserPref[] = [];
            for(let userPref of responseJSONObject.result.GroupUserPrefs)
            {
                groupUserPrefs.push(UserPref.fromJson(userPref));
            }
            this._cachedData.UpdateGroupUserPrefs(groupUserPrefs);
            this.dispatchEvent(new UberApplicationEvent("groupUserPrefsUpdateSuccessful"));
        }

        if(responseJSONObject.result.Settings != null && responseJSONObject.result.Settings.length > 0)
        {
            dispatchSettingSync = true;
            for(let setting of responseJSONObject.result.Settings)
            {
                setting = Setting.fromJson(setting);
                this._cachedData.InsertUserSetting(setting);
                this._cachedData.UpdateUserSetting(setting);
            }
        }

        if(responseJSONObject.result.GroupSettings != null && responseJSONObject.result.GroupSettings.length > 0)
        {
            dispatchSettingSync = true;
            let groupSettings: Setting[] = [];
            for(let groupSetting of responseJSONObject.result.GroupSettings)
            {
                groupSettings.push(Setting.fromJson(groupSetting));
            }
            this._cachedData.UpdateGroupSettings(groupSettings);
        }

        if (dispatchSettingSync) {
            this.dispatchEvent( new UserSettingSyncEvent(UserSettingSyncEvent.USER_SETTING_SYNC) );
        }

        if(responseJSONObject.result.Notifications != null && responseJSONObject.result.Notifications.length > 0)
        {
            let notifications: UserNotification[] = [];
            for (let notification of responseJSONObject.result.Notifications) {
                notifications.push(UserNotification.fromJson(notification));
            }
            this._cachedData.UpdateUserNotifications(notifications);
        }

        if (UberApplication.GetInstance().CurrentProduct.DisplayText)
        {
            let resetText:boolean = false;
            let updatedProxyTexts:ProxyText[] = new Array<ProxyText>();
            for (let proxyTextJSON of responseJSONObject.result.TextSync.UpdatedUserProxyTexts)
            {
                let proxyText:ProxyText = ProxyText.fromJson(proxyTextJSON);
     			updatedProxyTexts.push(proxyText);
            }
            this._cachedData.UpdateProxyTexts(updatedProxyTexts);

            let updatedSharedProxyTexts:SharedProxyText[] = new Array<SharedProxyText>();
            for (let sharedProxyTextJSON of responseJSONObject.result.TextSync.UpdatedSharedProxyTexts)
            {
                let sharedProxyText:SharedProxyText = SharedProxyText.fromJson(sharedProxyTextJSON);
                updatedSharedProxyTexts.push(sharedProxyText);
            }
            this._cachedData.UpdateSharedProxyTexts(updatedSharedProxyTexts);

            for (let syncUserTextJSON of responseJSONObject.result.TextSync.UpdatedUserTexts)
            {
                let updatedSyncUserText:User_Text = User_Text.fromJson(syncUserTextJSON);
                this._cachedData.UpdateUser_Text(updatedSyncUserText);
            }

            let libraryProxyTexts:ProxyText[] = new Array<ProxyText>();
            for (let syncLibraryProxyText of responseJSONObject.result.TextSync.NewLibraryDefaultProxyTexts)
            {
                let updatedSyncLibraryProxyText:ProxyText = ProxyText.fromJson(syncLibraryProxyText);
                libraryProxyTexts.push(updatedSyncLibraryProxyText);
            }
            this._cachedData.InsertLibraryProxyTexts(libraryProxyTexts);

            let typingTests: ProxyTypingTest[] = [];
            for (let test of responseJSONObject.result.TextSync.TypingTests) {
                typingTests.push(ProxyTypingTest.fromJson(test));
            }

            let typingTestResults: UserTypingTestResult[] = [];
            for (let result of responseJSONObject.result.TextSync.UserTypingTestResults) {
                typingTestResults.push(UserTypingTestResult.fromJson(result));
            }
            this._cachedData.SetUserTypingTestResults(typingTestResults);

            let typingTasks: ProxyTypingTask[] = [];
            for (let task of responseJSONObject.result.TextSync.TypingTasks) {
                typingTasks.push(ProxyTypingTask.fromJson(task));
            }
            this._cachedData.SetUserProxyTypingTasks(typingTasks);

            let typingTaskResults: UserTypingTaskResult[] = [];
            for (let result of responseJSONObject.result.TextSync.UserTypingTaskResults) {
                typingTaskResults.push(UserTypingTaskResult.fromJson(result));
            }
            this._cachedData.SetUserTypingTaskResults(typingTaskResults);

            let updatedCurrentText:Text = null;
            if(responseJSONObject.result.TextSync.UpdatedText != null)
            {
                updatedCurrentText = Text.fromJson(responseJSONObject.result.TextSync.UpdatedText);
            }

            if(responseJSONObject.result.TextSync.UpdatedUserText != null)
            {
                let updatedUserText:User_Text = User_Text.fromJson(responseJSONObject.result.TextSync.UpdatedUserText);
                this._cachedData.UpdateUser_Text(updatedUserText);
            }
            
            if (responseJSONObject.result.Lesson_Plans != null && responseJSONObject.result.Lesson_Plans.length > 0) {
                let proxyLessonPlans: ProxyLessonPlan[] = [];
                for (let lessonPlan of responseJSONObject.result.Lesson_Plans) {
                    proxyLessonPlans.push(ProxyLessonPlan.fromJson(lessonPlan));
                }
                this._cachedData.LessonPlans = proxyLessonPlans;
                this.dispatchEvent(new LessonPlanSyncEvent(LessonPlanSyncEvent.LESSON_PLAN_SYNC, proxyLessonPlans))
            }

            let userTypingCompetency = responseJSONObject.result.TextSync.User_Typing_Competency;
            if( userTypingCompetency != null) {
                this._cachedData.UserTypingCompetency = UserTypingCompetency.fromJson(userTypingCompetency);
            }

            resetText = responseJSONObject.result.TextSync.ResetText;

            this.dispatchEvent(new TypingTasksDataSyncEvent(TypingTasksDataSyncEvent.USER_TASKS_DATA_SYNC, typingTasks, typingTaskResults));
            //this.dispatchEvent(new TypingTestSyncEvent(TypingTestSyncEvent.TEST_DATA_SYNC, typingTests, typingTestResults));
            this.dispatchEvent(new TextSyncEvent(TextSyncEvent.TEXT_DATA_SYNC, updatedCurrentText, resetText));
        }
        if(UberApplication.GetInstance().CurrentProduct.DisplayQuestion && responseJSONObject.result.PrepEdSync != null)
        {
            let updateCourses:boolean = false;
            let updatedUserQuestions:User_Question[] = new Array<User_Question>();
            if(responseJSONObject.result.PrepEdSync.User_Questions != null && responseJSONObject.result.PrepEdSync.User_Questions.length > 0)
            {
                for (let userQuestionJSON of responseJSONObject.result.PrepEdSync.User_Questions)
                {
                    updateCourses = true;
                    updatedUserQuestions.push(User_Question.fromJson(userQuestionJSON));
                }
                this._cachedData.UpdateUserQuestions(updatedUserQuestions, true);
            }

            //my courses
            var updatedProxyCourses:ProxyCourse[] = new Array<ProxyCourse>();
            if(responseJSONObject.result.PrepEdSync.proxyCoursesInMyCourses != null && responseJSONObject.result.PrepEdSync.proxyCoursesInMyCourses.length > 0)
            {
                for (let myProxyCourseJSON of responseJSONObject.result.PrepEdSync.proxyCoursesInMyCourses)
                {
                    updateCourses = true;
                    updatedProxyCourses.push(ProxyCourse.fromJson(myProxyCourseJSON));
                }
                this._cachedData.UpdateMyCourses(updatedProxyCourses);
            }

            let userPrepProgramList:User_Prep_Program[] = new Array<User_Prep_Program>();
            if(responseJSONObject.result.PrepEdSync.User_Prep_Programs != null && responseJSONObject.result.PrepEdSync.User_Prep_Programs.length > 0)
            {
                for (let userPrepProgramJSON of responseJSONObject.result.PrepEdSync.User_Prep_Programs)
                {
                    let upp:User_Prep_Program = User_Prep_Program.fromJson(userPrepProgramJSON);
                    userPrepProgramList.push(upp);
                }
            }
            let updatedUserPrepPrograms:User_Prep_Program[] = this._cachedData.UpdateUserPrepPrograms(userPrepProgramList, true);
            //let updatedUserCourses:User_Course[] = this._cachedData.UpdateUserCourses(userCourseList);

            let updatedPrepPrograms:Prep_Program[] = new Array<Prep_Program>();
            if(responseJSONObject.result.PrepEdSync.Prep_Programs != null && responseJSONObject.result.PrepEdSync.Prep_Programs.length > 0)
            {
                for (let prepProgramJSON of responseJSONObject.result.PrepEdSync.Prep_Programs)
                {
                    updateCourses = true;
                    updatedPrepPrograms.push(Prep_Program.fromJson(prepProgramJSON));
                }
                this._cachedData.UpdateMyPrepPrograms(updatedPrepPrograms);
            }

            if(responseJSONObject.result.PrepEdSync.coursesOnWishlist != null && responseJSONObject.result.PrepEdSync.coursesOnWishlist.length > 0)
            {
                var updatedWishlistCourses:ProxyCourse[] = new Array<ProxyCourse>();
                for (var wishlistProxyCourseJSON of responseJSONObject.result.PrepEdSync.coursesOnWishlist)
                {
                    updatedWishlistCourses.push(ProxyCourse.fromJson(wishlistProxyCourseJSON));
                }
                this._cachedData.UpdateMyWishlists(updatedWishlistCourses);
            }

            if(responseJSONObject.result.PrepEdSync.User_Notes != null && responseJSONObject.result.PrepEdSync.User_Notes.length > 0)
            {
                var userNotes:User_Notes[] = new Array<User_Notes>();
                for (var n of responseJSONObject.result.PrepEdSync.User_Notes)
                {
                    userNotes.push(User_Notes.fromJson(n));
                }
                this._cachedData.UpdateUserNotes(userNotes, true);
            }

            updateCourses = updatedUserCourses.length > 0
                            || updatedProxyCourses.length > 0
                            || updatedUserQuestions.length > 0
                            || updatedUserPrepPrograms.length > 0;
            this.dispatchEvent(new QuestionSyncEvent(QuestionSyncEvent.QUESTION_DATA_SYNC, updateCourses));
        }
        else if (UberApplication.GetInstance().CurrentProduct.DisplayVocab)
        {
            /*
            var currentWordlist:Wordlist = UberApplication.GetInstance().CurrentWordlist;
            var currentWordlistUpdated:boolean = false;
            var proxyWordlistsUpdated:boolean = false;
            var vocabSyncData:any = responseJSONObject.result.VocabSync;

            var updatedProxyWordlists:ProxyWordlist[] = new Array<ProxyWordlist>();
            for (var proxyWordlistJSON of vocabSyncData.UpdatedUserProxyWordlists)
            {
                var proxyWordlist:ProxyWordlist = ProxyWordlist.fromJson(proxyWordlistJSON);
                updatedProxyWordlists.push(proxyWordlist);
            }
            proxyWordlistsUpdated = this._cachedData.UpdateProxyWordlists(updatedProxyWordlists);
            for (var newWordJSON of vocabSyncData.NewWords)
            {
                var newWord:Word = Word.fromJson(newWordJSON);
                this._cachedData.InsertWord(newWord);
            }
            var updatedWordlistWords:Wordlist_Word[] = new Array<Wordlist_Word>();
            for (var wordlistWordJSON of vocabSyncData.UpdatedWordlistWords)
            {
                var wlw:Wordlist_Word = Wordlist_Word.fromJson(wordlistWordJSON);
                if (wlw.Wordlist_id == currentWordlist.Wordlist_id)
                {
                    updatedWordlistWords.push(wlw);
                }
            }
            currentWordlistUpdated = currentWordlistUpdated || this._cachedData.UpdateWordlistWords(updatedWordlistWords);
            */
            //TODO
            /*var updatedWordSenses:Word_Sense[] = new Word_Sense[]();
            for (var wordSenseJSON of vocabSyncData.UpdatedWordSenses)
            {
                var ws:Word_Sense = Word_Sense.fromJson(wordSenseJSON);
                updatedWordSenses.push(ws);
            }*/
            /*
            var updatedWordPos:Word_Pos[] = new Array<Word_Pos>();
            for (var wordPosJSON of vocabSyncData.UpdatedWordPoSs)
            {
                var wp:Word_Pos = Word_Pos.fromJson(wordPosJSON);
                updatedWordPos.push(wp);
            }
            currentWordlistUpdated = currentWordlistUpdated || this._cachedData.UpdateWord_MultipleWordPos(updatedWordPos);

            var updatedWordUsers:Word_User[] = new Array<Word_User>();
            for (var wordUserJSON of vocabSyncData.WordUsers)
            {
                var wu:Word_User = Word_User.fromJson(wordUserJSON);
                updatedWordUsers.push(wu);
            }
            var wordUsersUpdated:boolean = this._cachedData.UpdateWordUsers(updatedWordUsers);

            var updatedWordDiscovers:Word_Discover[] = new Array<Word_Discover>();
            for (var wordDiscoverJSON of vocabSyncData.WordDiscovers)
            {
                var wd:Word_Discover = Word_Discover.fromJson(wordDiscoverJSON);
                updatedWordDiscovers.push(wd);
            }
            var wordDiscoversUpdated:boolean = this._cachedData.UpdateWordDiscovers(updatedWordDiscovers);
            currentWordlistUpdated = currentWordlistUpdated || wordUsersUpdated;
            var resetWordlist:boolean = vocabSyncData.ResetWordlist;
            if (proxyWordlistsUpdated)
            {
                this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.USER_WORDLIST_CHANGED));
            }
            this.dispatchEvent(new VocabSyncEvent(VocabSyncEvent.VOCAB_DATA_SYNC, currentWordlistUpdated, resetWordlist, wordDiscoversUpdated) );
            */
        }
     	this.dispatchEvent( new UberSyncEvent(UberSyncEvent.USER_DATA_SYNC, updatedUserCourses) );
    }

    private syncDataError = (errMsg:string, errObj:any=null, id:number=0) =>
    {}

    public GetStartupData(productId:number):void
    {
        var startupDataString = this._cachedData.GetFromLocalStorage("startupData");
        if (startupDataString != null)
        {
            setTimeout(() =>
            {
                let startupData = JSON.parse(startupDataString);
                this.startupCachedData(startupData);
                this.cachedUITextsReceived(startupData.UI_Texts);
            }, 100);
        }
        else
        {
            let dataLocation:string = AppSettings.useCDN ? AppSettings.CDNAssetLocation : './';
            this._http.get( dataLocation + 'assets/product_data_' + AppSettings.CurrentProductId + '.json')
                .map(res => res.json())
                .subscribe(
                    (env_data) =>
                    {
                        if(env_data)
                        {
                            //console.log("Local Data:", env_data, dataLocation + '/assets/product_data_' + AppSettings.CurrentProductId + '.json')
                            this.startupCachedData(env_data);
                            this.cachedUITextsReceived(env_data.UI_Texts);
                        }
                        else
                        {
                            DevUtils.LogFunction("ACCESS REMOTE", "GetStartupData : Error in getting product data. Invalid product data.", null);
                            this.CallFunction("GetStartupData", [productId], this.startupDataSuccess, this.startupDataError);
                        }
                    },
                    (err) =>
                    {
                        DevUtils.LogFunction("ACCESS REMOTE", "GetStartupData : Error in getting product data. Location not found.", null);
                        this.CallFunction("GetStartupData", [productId], this.startupDataSuccess, this.startupDataError);
                    }
                );
        }
    }

    private startupCachedData = (responseJSONObject:any) =>
    {
        //check version
        //responseJSONObject.Version (This is a date string)
        if(responseJSONObject)
        {
            let startupDataString = JSON.stringify(responseJSONObject);
            this._cachedData.AddToLocalStorage("startupData", startupDataString);

            let codes:Code[] = new Array<Code>();
            for (var codeObject of responseJSONObject.Codes)
            {
                codes.push(Code.fromJson(codeObject));
            }
            // TO DO HERE!!!!
            let exam_info:ExamInfo[] = [];

            for (var examInfoObject of responseJSONObject.Exam_info)
            {
                exam_info.push(ExamInfo.fromJson(examInfoObject));
            }


            let productInfo:ProductInfo = ProductInfo.fromJson(responseJSONObject.ProductInfo);
            //this._cachedData.SetLocalProductInfoVersion = productInfo.Product_Data_Version;
            if(this._cachedData.GetProductInfo == null)
            {
                //save it to cache
                this._cachedData.SetExamInfo(exam_info);
                this._cachedData.SetCodes(codes);
                this.dispatchEvent(new ProductInfoEvent(ProductInfoEvent.STARTUP_DATA_RECEIVED, productInfo, null));
            }
        }
    }

    private startupDataSuccess = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new ProductInfoEvent(ProductInfoEvent.STARTUP_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new ProductInfoEvent(ProductInfoEvent.STARTUP_DATA_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            let startupDataString = JSON.stringify(responseJSONObject);
            this._cachedData.AddToLocalStorage("startupData", startupDataString);

            var codes:Code[] = new Array<Code>();
            for (var codeObject of responseJSONObject.result.Codes)
            {
                codes.push(Code.fromJson(codeObject));
            }
            var productInfo:ProductInfo = ProductInfo.fromJson(responseJSONObject.result.ProductInfo);

            //save it to cache
            this._cachedData.SetCodes(codes);

            this.dispatchEvent(new ProductInfoEvent(ProductInfoEvent.STARTUP_DATA_RECEIVED, productInfo, null));
        }
    }
    private startupDataError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ProductInfoEvent(ProductInfoEvent.STARTUP_DATA_ERROR, null, errMsg));
    }
    
    public CheckForUpdate(productId:number):void
    {
        this.CallFunction("CheckForUpdate", [productId], this.updateCheckSuccess, this.updateCheckError);
    }
    
    public CheckForTrialUpdate(productId:number):void
    {
        this.CallFunction("CheckForTrialUpdate", [productId], this.updateCheckSuccess, this.updateCheckError);
    }
    private updateCheckSuccess = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new CheckUpdateEvent(CheckUpdateEvent.UPDATE_DATA_ERROR, null, null, null, null));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new CheckUpdateEvent(CheckUpdateEvent.UPDATE_DATA_ERROR, null, null, null, null));
        }
        else
        {
            if (AppSettings.OsString == AppSettings.OS_WIN)
            {
                this.dispatchEvent(new CheckUpdateEvent(CheckUpdateEvent.UPDATE_DATA_RECEIVED, responseJSONObject.result.Version_number, responseJSONObject.result.Version_label, responseJSONObject.result.Win_update_url, responseJSONObject.result.Update_description));
            }
            else if (AppSettings.OsString == AppSettings.OS_MAC)
            {
                this.dispatchEvent(new CheckUpdateEvent(CheckUpdateEvent.UPDATE_DATA_RECEIVED, responseJSONObject.result.Version_number, responseJSONObject.result.Version_label, responseJSONObject.result.Mac_update_url, responseJSONObject.result.Update_description));
            }
            else
            {
                this.dispatchEvent(new CheckUpdateEvent(CheckUpdateEvent.UPDATE_DATA_ERROR, null, null, null, null));
            }
        }
    }
    private updateCheckError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new CheckUpdateEvent(CheckUpdateEvent.UPDATE_DATA_ERROR, null, null, null, null));
    }

    /*********************************************************************************************************************/
    public SelectAllProductsByUser(userEmail:string):void
    {
        this.CallFunction("GetValidProducts", [userEmail], this.productsReceived, this.productsError);
    }

    private productsReceived = (responseJSONObject:any) =>
    {
        var validProducts:ProductInfo[] = new Array<ProductInfo>();

        for (var JSONproduct of responseJSONObject.result)
        {
            validProducts.push(ProductInfo.fromJson(JSONproduct));
        }

        this.dispatchEvent(new ProductsEvent(ProductsEvent.PRODUCT_DATA_RECEIVED, validProducts, null));
    }
    private productsError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ProductsEvent(ProductsEvent.PRODUCT_CALL_FAILED, null, errMsg));
    }

    /*********************************************************************************************************************/
    public ResetPassword(userString:string, productId:number):void
    {
        this.CallFunction("ResetPassword2", [userString, productId], this.passwordReset, this.passwordResetError);
        //CallFunction("ResetPassword", [userString], passwordReset, passwordResetError);
    }
    private passwordReset = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && typeof responseJSONObject.result === "string")
        {
            var email:string = responseJSONObject.result;
            this.dispatchEvent(new MessageEvent(MessageEvent.PASSWORD_RESET, email));
        }
        else if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new MessageEvent(MessageEvent.PASSWORD_RESET_ERROR, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new MessageEvent(MessageEvent.PASSWORD_RESET_ERROR, responseJSONObject.result.message));
        }
        else
        {
            this.dispatchEvent(new MessageEvent(MessageEvent.PASSWORD_RESET_ERROR, "Error Occured"));
        }
    }
    private passwordResetError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new MessageEvent(MessageEvent.PASSWORD_RESET_ERROR, errMsg));
    }

    private static readonly THREE_DAYS_IN_MILLISECONDS:number = 1000 * 60 * 60 * 24 * 3;
    private static readonly ONE_DAYS_IN_MILLISECONDS:number = 1000 * 60 * 60 * 24;
    public AuthenticateUser(userData:UserIdentificationData, productId:number):void
    {        
        let hasLocalStorageUser = this._cachedData.GetFromLocalStorage("hasUserStored");
        let lastSyncTimeString = this._cachedData.GetFromLocalStorage("lastSyncTime");
        let callServer = true;
        if (hasLocalStorageUser != null && lastSyncTimeString != null)
        {
            let lastSyncTime = ISO8601Util.parseDateTimeString(lastSyncTimeString);
            let currentTime = new Date();
            if (Math.abs(currentTime.getTime() - lastSyncTime.getTime()) < UberDataAccessRemoteService.THREE_DAYS_IN_MILLISECONDS)
            {
                callServer = false;
                //load local data instead of server call
                setTimeout(() => {
                    var userString = this._cachedData.GetFromLocalStorage("user");
                    var userjson = JSON.parse(userString);
                    var user = Object.assign(new User(), userjson);

                    this._authenticationUserId = user.User_id;
                    this._authenticationToken = this._cachedData.GetFromLocalStorage("authenticationToken");
                    var authenticationTokenDateString = this._cachedData.GetFromLocalStorage("authenticationTokenDate");
                    var authenticationTokenDate = ISO8601Util.parseDateTimeString(authenticationTokenDateString);
                    UberApplication.GetInstance().LogUserOn(user);

                    let productDataString = this._cachedData.GetFromLocalStorage("productData");
                    let productData = JSON.parse(productDataString);
                    this.processProductData(productData);

                    this._cachedData.LoadFromLocalStorage();

                    this._localServerTimeOffset = 100;
                    this._lastSyncTime = lastSyncTime;

                    if (Math.abs(currentTime.getTime() - lastSyncTime.getTime()) > UberDataAccessRemoteService.ONE_DAYS_IN_MILLISECONDS)
                    {
                        this.CallFunction("RenewAuthenticationToken", [AppSettings.ClientVersion, AppSettings.GetClientTypeString()], this.renewAuthenticationResponse, this.renewAuthenticationResponseError);
                    }

                    if(this._cachedData.GetProductInfo.Product_Data_Version != AppSettings.ProductDataVersion)
                    {
                        this.dispatchEvent(new ProductInfoEvent(ProductInfoEvent.UPDATE_REQUIRED, null, null));
                    }

                    this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATED, user));
                }, 100);

            }
        }

        if (callServer)
        {
            DevUtils.LogFunction("ACCESS REMOTE", "AuthenticateUser", [userData.toJson()]);
            this.CallFunction("AuthenticateAndGetDataTrial", [userData.toJson(), productId, AppSettings.ClientVersion, AppSettings.GetClientTypeString(), AppSettings.TrialKey], this.authenticateUserResponse, this.authenticateUserError);
        }
        //var loginDataString = localStorage.getItem("prepedLoginData");
        // let loginDataString = null;
        // if (loginDataString != null)
        // {
        //     //let loginData = JSON.parse(loginDataString);
        //     //setTimeout(() => {
        //     //    this.authenticateUserResponse(loginData);
        //     //}, 100);
        // }
        // else
        // {
        //     this.CallFunction("AuthenticateAndGetData", [userData.toJson(), productId, AppSettings.ClientVersion, AppSettings.GetClientTypeString()], this.authenticateUserResponse, this.authenticateUserError);
        // }
    }
    private renewAuthenticationResponse = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, null, responseJSONObject.result.message));
        }
        else
        {
            //var loginDataString = JSON.stringify(responseJSONObject);
            //localStorage.setItem("prepedLoginData", loginDataString);
            this._authenticationToken = responseJSONObject.result.Authentication_Token;
            this._cachedData.AddToLocalStorage("authenticationToken", this._authenticationToken);
            this._cachedData.AddToLocalStorage("authenticationTokenDate", new Date().toUTCString());
        }
    }
    private renewAuthenticationResponseError = (responseJSONObject:any) =>
    {
        // DO SOMETHING IF THIS CALL FAILS
        //this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, user, errMsg, errObj));
    }
    private authenticateUserResponse = (responseJSONObject:any) =>
    {
        DevUtils.LogFunction("ACCESS REMOTE", "authenticateUserResponse", [responseJSONObject]);
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, null, responseJSONObject.result.message));
        }
        else
        {
            //var loginDataString = JSON.stringify(responseJSONObject);
            //localStorage.setItem("prepedLoginData", loginDataString);

            var user:User;
            user = User.fromJson(responseJSONObject.result.Authentication_Data.User);
            this._cachedData.AddToLocalStorage("user", JSON.stringify(user));
            // store user in local storage
            this._authenticationUserId = user.User_id;

            if(responseJSONObject.result.Authentication_Data.Authentication_Token)
            {
                this._authenticationToken = responseJSONObject.result.Authentication_Data.Authentication_Token;
                // store authenticationToken in local storage
                this._cachedData.AddToLocalStorage("authenticationToken", this._authenticationToken);
                this._cachedData.AddToLocalStorage("authenticationTokenDate", new Date().toUTCString());
            }
            if(responseJSONObject.result.Authentication_Data.Password_temp)
            {
                user.Password = UberReaderMd5.hashStr(responseJSONObject.result.Authentication_Data.Password_temp);
            }
            UberApplication.GetInstance().LogUserOn(user);

            if(responseJSONObject.result.Product_Data)
            {
                this.processProductData(responseJSONObject.result.Product_Data);

                let productDataString = JSON.stringify(responseJSONObject.result.Product_Data);
                this._cachedData.AddToLocalStorage("productData", productDataString);
            }

            if(BuildSettings.isDevBuild || BuildSettings.isLocalBuild)
            {
                try{
                    DevUtils.LogFunction("ACCESS REMOTE", "authenticateUserResponse", [this._cachedData.GetProductInfo.Product_Data_Version, AppSettings.ProductDataVersion]);
                }catch(e) {
                    DevUtils.LogFunction("ACCESS REMOTE", "authenticateUserResponse", [this._cachedData.GetProductInfo, AppSettings.ProductDataVersion]);
                }
            }

            if(this._cachedData.GetProductInfo.Product_Data_Version != AppSettings.ProductDataVersion)
            {
                this.dispatchEvent(new ProductInfoEvent(ProductInfoEvent.UPDATE_REQUIRED, null, null));
            }

            if(responseJSONObject.result.User_Data)
            {
                this.userDataReceived({result: responseJSONObject.result.User_Data, School_trial_info: responseJSONObject.result.Authentication_Data.School_trial_info});
            }

            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATED, user));
        }
    }
    private authenticateUserError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        DevUtils.DisplayError(errMsg, "ACCESS REMOTE : authenticateUserError");
        try
        {
            var user:User = User.fromJson(errObj);
        }
        catch(Error){}
        this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, user, errMsg, errObj));
    }
    
    public UseActivationCode(userData:UserIdentificationData, purchaseDate:PurchaseData, productId:number):void
    {        
        this.CallFunction("ApplyUserPurchaseAndGetData", [userData.toJson(), (purchaseDate != null ? purchaseDate.toJson() : null), productId, AppSettings.ClientVersion, AppSettings.GetClientTypeString()], this.activationCodeUsed, this.activationCodeError);
    }
    private activationCodeUsed = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.ACTIVATION_CODE_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.ACTIVATION_CODE_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            //var user:User = User.fromJson(responseJSONObject.result.User);
            //this._authenticationToken = responseJSONObject.result.Authentication_Token;
            //this._authenticationUserId = user.User_id;
            //this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.ACTIVATION_CODE_USED, user));
            var user:User;
				if(responseJSONObject.result.Authentication_Data)
				{
					user = User.fromJson(responseJSONObject.result.Authentication_Data.User);
					this._authenticationUserId = user.User_id;

					if(responseJSONObject.result.Authentication_Data.Authentication_Token)
					{
						this._authenticationToken = responseJSONObject.result.Authentication_Data.Authentication_Token;
					}
					if(responseJSONObject.result.Authentication_Data.Password_temp)
					{
						user.Password = UberReaderMd5.hashStr(responseJSONObject.result.Authentication_Data.Password_temp);
					}
					UberApplication.GetInstance().LogUserOn(user);
				}
					//this is the old way. we are staying away from this soon and use the if above
				else if(responseJSONObject.result.User != null)
				{
					user = User.fromJson(responseJSONObject.result.User);
					if(responseJSONObject.result.Authentication_Token)
					{
						this._authenticationToken = responseJSONObject.result.Authentication_Token;
					}
				}

				if(responseJSONObject.result.Product_Data)
				{
					this.processProductData(responseJSONObject.result.Product_Data);
				}

				if(responseJSONObject.result.User_Data)
				{
					this.userDataReceived({result: responseJSONObject.result.User_Data});
				}

				this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.ACTIVATION_CODE_USED, user));
        }
    }
    private activationCodeError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.ACTIVATION_CODE_ERROR, null, errMsg));
    }
    
    public CreateTrialAccount(userData:UserIdentificationData, trialKey:string, productId:number):void
    {
        this.CallFunction("CreateUserTrialGeneric", [userData.toJson(), trialKey, productId, AppSettings.ClientVersion, AppSettings.GetClientTypeString()], this.activationCodeUsed, this.activationCodeError);
        //CallFunction("CreateTrialAccount", [user.toJson(), displayName, trialKey, productId], userCreated, userCreationError);
    }
    
    public UpgradeTrialAccount(purchaseData:PurchaseData, userId:number, productId:number):void
    {
        this.CallFunction("UpgradeTrialGeneric", [purchaseData.toJson(), userId, productId], this.authenticateTrialUserResponse, this.authenticateTrialUserError);
    }
    private authenticateTrialUserResponse = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, null, responseJSONObject.result.message));
        }
        else
        {
            var user:User = User.fromJson(responseJSONObject.result.User);
            user.FacebookUser = UberApplication.GetInstance().CurrentUser.FacebookUser;
            user.GoogleUser = UberApplication.GetInstance().CurrentUser.GoogleUser;
            this._authenticationUserId = user.User_id;
            if(responseJSONObject.result.Authentication_Token)
            {
                this._authenticationToken = responseJSONObject.result.Authentication_Token;
            }

            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATED, user));
        }
    }
    private authenticateTrialUserError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, null, errMsg, errObj));
    }
    
    /*********************************************************************************************************************/    	
    /*public GetProductData(product:number, user:User):void
    {
        this.tempLoading = loadingDialog;
        this._currentProductId = product;
        this._authenticationUserId = user.User_id;
        //this._currentUserId = user.User_id;

        this.CallFunction("GetProductData2", [this._currentProductId, null], this.productDataReceived, this.productDataError, this.tempLoading);
    }*/

    private productDataReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.RECEIVING_PRODUCT_DATA_FAILED));
        }

        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.RECEIVING_PRODUCT_DATA_FAILED));
        }
        else
        {
            this.processProductData(responseJSONObject.result);
        }
    }
    private productDataError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.RECEIVING_PRODUCT_DATA_FAILED));
    }
    public processProductData(resultJSONObject:any):void
    {
        //DevUtils.LogFunction("ACCESS REMOTE", "processProductData", [resultJSONObject]);
        let courseCategories:Course_Category[] = new Array<Course_Category>();
        for (let courseCategoryObject of resultJSONObject.CourseCategories)
        {
            courseCategories.push(Course_Category.fromJson(courseCategoryObject));
        }
        let activityCategories:Activity_Category[] = new Array<Activity_Category>();
        for (let activityCategoryObject of resultJSONObject.ActivityCategories)
        {
            activityCategories.push(Activity_Category.fromJson(activityCategoryObject));
        }
        let chartCategories:Chart_Category[] = new Array<Chart_Category>();
        for (let chartCategoryObject of resultJSONObject.ChartCategories)
        {
            chartCategories.push(Chart_Category.fromJson(chartCategoryObject));
        }
        /*let activities:Activity[] = new Activity[]();
        for (let activityObject of resultJSONObject.Activities)
        {
            activities.push(Activity.fromJson(activityObject));
        }*/
        let defaultSettings:Setting[] = new Array<Setting>();
        for (let settingObject of resultJSONObject.Settings)
        {
            defaultSettings.push(Setting.fromJson(settingObject));
        }
        let aControls:AControl[] = new Array<AControl>();
        for (let aControlObject of resultJSONObject.AControls)
        {
            aControls.push(AControl.fromJson(aControlObject));
        }
        let codes:Code[] = new Array<Code>();
        for (let codeObject of resultJSONObject.Codes)
        {
            codes.push(Code.fromJson(codeObject));
        }
        let defaults:Default[] = new Array<Default>();
        for (let defaultObject of resultJSONObject.Defaults)
        {
            defaults.push(Default.fromJson(defaultObject));
        }
        /*let defaultText:Text = null;
        if (resultJSONObject.DefaultText != null)
        {
            defaultText = Text.fromJson(resultJSONObject.DefaultText);
        }*/
        /*let wordlistCategories:Wordlist_Category[] = new Wordlist_Category[]();
        for (let wordlistCategoryObject of resultJSONObject.WordlistCategories)
        {
            wordlistCategories.push(Wordlist_Category.fromJson(wordlistCategoryObject));
        }*/
        let languages:Language[] = [];
        for (let languageObject of resultJSONObject.Languages)
        {
            languages.push(Language.fromJson(languageObject));
        }

        let statusLevel:StatusLevel[] = [];
        for (let statusLevelObject of resultJSONObject.StatusLevels)
        {
            statusLevel.push(StatusLevel.fromJson(statusLevelObject));
        }

        let typesyStatusLevels: TypesyStatusLevel[] = [];
        for (let statusLevelObject of resultJSONObject.Typesy_Status_Levels)
        {
            typesyStatusLevels.push(TypesyStatusLevel.fromJson(statusLevelObject));
        }
        let productInfo:ProductInfo = ProductInfo.fromJson(resultJSONObject.ProductInfo);
        productInfo.Product_Data_Version = resultJSONObject.ProductDataVersion;

        /*let lessonPlans:ProxyLessonPlan[];
        if(resultJSONObject.Lesson_Plans) {
            lessonPlans = [];
            for (let lessonPlan of resultJSONObject.Lesson_Plans) {
                lessonPlans.push(ProxyLessonPlan.fromJson(lessonPlan));
            }
        }*/

        let currentLessonPlan: Lesson_Plan;
        if(resultJSONObject.Lesson_Plan) {
            currentLessonPlan = Lesson_Plan.fromJson(resultJSONObject.Lesson_Plan);
        }

        //save it to cache
        this._cachedData.SetProductData(courseCategories, activityCategories, chartCategories, defaultSettings, aControls, codes, defaults/*, defaultText, wordlistCategories*/,productInfo, languages, statusLevel, currentLessonPlan, typesyStatusLevels);
        
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.RECEIVING_PRODUCT_DATA_SUCCESS));
    }

    /*********************************************************************************************************************/
    /*public GetUserData(user:User, product:ProductInfo):void
    {
        this.CallFunction("GetUserData3", [user.User_id, product.ProductId], this.userDataReceived, this.userDataError);
    }*/

    public userDataReceived = (responseJSONObject:any) =>
    {
        DevUtils.LogFunction("ACESS REMOTE", "userDataReceived", [responseJSONObject]);
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, null, responseJSONObject.result.message));
        }
        else
        {
            let currentTime:Date = new Date();

            let userSettings:Setting[] = new Array<Setting>();
            for (let usersettingObject of responseJSONObject.result.UserSettings)
            {
                userSettings.push(Setting.fromJson(usersettingObject));
            }

            let groupSettings:Setting[] = new Array<Setting>();
            for (let groupsettingObject of responseJSONObject.result.GroupSettings)
            {
                groupSettings.push(Setting.fromJson(groupsettingObject));
            }

            let userPrefs:UserPref[] = new Array<UserPref>();
            for (let userPrefObject of responseJSONObject.result.UserPrefs)
            {
                userPrefs.push(UserPref.fromJson(userPrefObject));
            }

            let groupUserPrefs:UserPref[] = new Array<UserPref>();
            for (let groupUserPrefObject of responseJSONObject.result.GroupUserPrefs)
            {
                groupUserPrefs.push(UserPref.fromJson(groupUserPrefObject));
            }

            let userCourses:User_Course[] = new Array<User_Course>();
            for (let userCourseObject of responseJSONObject.result.UserCourses)
            {
                userCourses.push(User_Course.fromJson(userCourseObject));
            }

            let proxyCoursesInMyCourses:ProxyCourse[] = [];
            for (let proxyCourseObject of responseJSONObject.result.proxyCoursesInMyCourses)
            {
                proxyCoursesInMyCourses.push(ProxyCourse.fromJson(proxyCourseObject));
            }

            let proxyCoursesInWishlist:ProxyCourse[] = [];
            for (let proxyWishlistObject of responseJSONObject.result.coursesOnWishlist)
            {
                proxyCoursesInWishlist.push(ProxyCourse.fromJson(proxyWishlistObject));
            }

            let goal1Current:Result;
            if (responseJSONObject.result.Goal1Current != null)
            {
                goal1Current = Result.fromJson(responseJSONObject.result.Goal1Current);
            }
            let goal2Current:Result;
            if (responseJSONObject.result.Goal2Current != null)
            {
                goal2Current = Result.fromJson(responseJSONObject.result.Goal2Current);
            }

            let currentText:Text;
            if (responseJSONObject.result.Current_Text != null)
            {
                currentText = Text.fromJson(responseJSONObject.result.Current_Text);
            }
            let words:Word[] = new Array<Word>();
            for (let wordObject of responseJSONObject.result.Words)
            {
                words.push(Word.fromJson(wordObject));
            }
            let wordUsers:Word_User[] = new Array<Word_User>();
            for (let wordUserObject of responseJSONObject.result.WordUsers)
            {
                wordUsers.push(Word_User.fromJson(wordUserObject));
            }
            let userWordDiscovers:Word_Discover[] = new Array<Word_Discover>();
            for (let wordDiscoverObject of responseJSONObject.result.WordDiscovers)
            {
                userWordDiscovers.push(Word_Discover.fromJson(wordDiscoverObject));
            }
            let userProxyWordlists:ProxyWordlist[] = new Array<ProxyWordlist>();
            for (let proxyWordlistObject of responseJSONObject.result.UserProxyWordlists)
            {
                userProxyWordlists.push(ProxyWordlist.fromJson(proxyWordlistObject));
            }

            let wordlistCategories:Wordlist_Category[] = new Array<Wordlist_Category>();
			for (let wordlistCategoryObject of responseJSONObject.result.WordlistCategories)
			{
				wordlistCategories.push(Wordlist_Category.fromJson(wordlistCategoryObject));
			}
			let sharedProxyWordlists:SharedProxyWordlist[] = new Array<SharedProxyWordlist>();
			for (let swl of responseJSONObject.result.SharedProxyWordlists)
			{
				sharedProxyWordlists.push(SharedProxyWordlist.fromJson(swl));
			}
            let userProxyTexts:ProxyText[] = new Array<ProxyText>();
            for (let proxyTextObject of responseJSONObject.result.UserProxyTexts)
            {
                userProxyTexts.push(ProxyText.fromJson(proxyTextObject));
            }

            let sharedProxyTexts:SharedProxyText[] = new Array<SharedProxyText>();
            for (let sharedProxyTextObject of responseJSONObject.result.SharedProxyTexts)
            {
                sharedProxyTexts.push(SharedProxyText.fromJson(sharedProxyTextObject));
            }

            let userQuestions:User_Question[] = new Array<User_Question>();
            for (let userQuestionObject of responseJSONObject.result.User_Questions)
            {
                userQuestions.push(User_Question.fromJson(userQuestionObject));
            }

            let userNotes:User_Notes[] = new Array<User_Notes>();
            for (let userNoteObject of responseJSONObject.result.User_Notes)
            {
                userNotes.push(User_Notes.fromJson(userNoteObject));
            }

            let userText:User_Text;
            if(responseJSONObject.result.User_Text != null)
            {
                userText = User_Text.fromJson(responseJSONObject.result.User_Text)
            }

            let libraryUserTexts:User_Text[] = new Array<User_Text>();
            for (let userTextObj of responseJSONObject.result.User_Texts)
            {
                libraryUserTexts.push(User_Text.fromJson(userTextObj));
            }

            let libraryDefaultProxyTexts:ProxyText[] = new Array<ProxyText>();
            for (let defaultProxyTextObject of responseJSONObject.result.LibraryDefaultProxyTexts)
            {
                libraryDefaultProxyTexts.push(ProxyText.fromJson(defaultProxyTextObject));
            }

            let currentWordlist:Wordlist = new Wordlist();
            if(responseJSONObject.result.Current_Wordlist)
            {
                currentWordlist = Wordlist.fromJson(responseJSONObject.result.Current_Wordlist);
                UberApplication.GetInstance().CurrentUser.Current_wordlist_id = currentWordlist.Wordlist_id;
            }

            let number_of_texts:number;
            if(responseJSONObject.result.Number_of_texts != null)
            {
                number_of_texts = responseJSONObject.result.Number_of_texts;
            }

            let number_of_wordlists:number;
            if(responseJSONObject.result.Number_of_wordlists != null)
            {
                number_of_wordlists = responseJSONObject.result.Number_of_wordlists;
            }

            let user_comments:User_Comment[] = [];
            for (let commentObject of responseJSONObject.result.User_Comments)
            {
                user_comments.push(User_Comment.fromJson(commentObject));
            }

            let user_prep_programs:User_Prep_Program[] = [];
            for (let userPrepProgram of responseJSONObject.result.User_Prep_Programs)
            {
                user_prep_programs.push(User_Prep_Program.fromJson(userPrepProgram));
            }

            var myPrepPrograms:Prep_Program[] = [];
            for (var prepProgram of responseJSONObject.result.PrepProgramsInMyPrep)
            {
                myPrepPrograms.push(Prep_Program.fromJson(prepProgram));
            }

            var prepProgramsWishlist:Prep_Program[] = [];
            for (var programWishlist of responseJSONObject.result.PrepProgramsOnWishlist)
            {
                prepProgramsWishlist.push(Prep_Program.fromJson(programWishlist));
            }

            var trialParameters:any = null;
            if(UberApplication.GetInstance().CurrentUser.Is_trial)
            {
                trialParameters = responseJSONObject.result.TrialParameters;
            }

            let lessonPlans:ProxyLessonPlan[] = [];
            if(responseJSONObject.result.Lesson_Plans) {
                for (let lessonPlan of responseJSONObject.result.Lesson_Plans) {
                    lessonPlans.push(ProxyLessonPlan.fromJson(lessonPlan));
                }
            }

            if(responseJSONObject.result.Trial_Lesson_Plans) {
                for (let lessonPlan of responseJSONObject.result.Trial_Lesson_Plans) {
                    lessonPlans.push(ProxyLessonPlan.fromJson(lessonPlan));
                }
            }

            let userProxyTypingTests: ProxyTypingTest[] = [];
            for (let test of responseJSONObject.result.Typing_Tests) {
                userProxyTypingTests.push(ProxyTypingTest.fromJson(test));
            }

            let userTypingTestResults: UserTypingTestResult[] = [];
            for (let result of responseJSONObject.result.User_Typing_Test_Results) {
                userTypingTestResults.push(UserTypingTestResult.fromJson(result));
            }

            var statusPoints:number = responseJSONObject.result.StatusPoints;
            var organization_display_name:string = responseJSONObject.result.Organization_display_name;
            var organization_logo_url:string = responseJSONObject.result.Organization_logo_url;
            let school_trial_info: School_Trial_Info;
            if (responseJSONObject.School_trial_info != null)
            {
                school_trial_info = School_Trial_Info.fromJson(responseJSONObject.School_trial_info);
            }

            let notifications: UserNotification[] = [];
            for (let notification of responseJSONObject.result.Notifications) {
                notifications.push(UserNotification.fromJson(notification));
            }

            let userProxyTypingTasks: ProxyTypingTask[] = [];
            for (let task of responseJSONObject.result.TypingTasks) {
                userProxyTypingTasks.push(ProxyTypingTask.fromJson(task));
            }

            let userTypingTaskResults: UserTypingTaskResult[] = [];
            for (let result of responseJSONObject.result.UserTypingTaskResults) {
                userTypingTaskResults.push(UserTypingTaskResult.fromJson(result));
            }
            
            let userTypingCompetency: UserTypingCompetency;
            if(responseJSONObject.result.User_Typing_Competency != null) {
                userTypingCompetency = UserTypingCompetency.fromJson(responseJSONObject.result.User_Typing_Competency);
            }

            let userStatusPoints: UserStatusPoints;
            if(responseJSONObject.result.User_Status_Points != null) {
                userStatusPoints = UserStatusPoints.fromJson(responseJSONObject.result.User_Status_Points);
            }

            let placementTest: PlacementTest;
            if(responseJSONObject.result.Placement_Test != null) {
                placementTest = PlacementTest.fromJson(responseJSONObject.result.Placement_Test);
            }

            let topics: Topic[] = [];
            for (let topic of responseJSONObject.result.Topics) {
                topics.push(Topic.fromJson(topic));
            }

            let userLessonPlans: UserLessonPlan[] = [];
            for (let lessonPlan of responseJSONObject.result.User_Lesson_Plans) {
                userLessonPlans.push(UserLessonPlan.fromJson(lessonPlan))
            }

            //save it to cache
            this._cachedData.SetUserData(userSettings, userPrefs, userCourses, goal1Current, goal2Current, currentText, words,
					wordUsers, userWordDiscovers, userProxyWordlists, sharedProxyWordlists, wordlistCategories, userQuestions, statusPoints, userProxyTexts, currentWordlist,
					organization_display_name, organization_logo_url, userText, sharedProxyTexts, number_of_texts, number_of_wordlists, libraryUserTexts, libraryDefaultProxyTexts,
					groupUserPrefs, groupSettings, proxyCoursesInMyCourses, proxyCoursesInWishlist, user_comments, userNotes, user_prep_programs, myPrepPrograms,
                    prepProgramsWishlist, trialParameters, lessonPlans, userProxyTypingTests, userTypingTestResults, school_trial_info, notifications,
                    userProxyTypingTasks, userTypingTaskResults, userTypingCompetency, userStatusPoints, placementTest, topics, userLessonPlans);
            
            var serverTime:Date = ISO8601Util.parseDateTimeString(responseJSONObject.result.CurrentTime);
            this._localServerTimeOffset = currentTime.getTime() - serverTime.getTime();
            this._lastSyncTime = serverTime;
            this._cachedData.AddToLocalStorage("lastSyncTime", responseJSONObject.result.CurrentTime);
            this._cachedData.AddToLocalStorage("hasUserStored", "true");

            console.log('dispatchhhhhhhhhhhhhh');
            this.dispatchEvent(new TypingTasksDataSyncEvent(TypingTasksDataSyncEvent.USER_TASKS_DATA_SYNC, userProxyTypingTasks, userTypingTaskResults));
            //this.dispatchEvent(new TypingTestSyncEvent(TypingTestSyncEvent.TEST_DATA_SYNC, userProxyTypingTests, userTypingTestResults));
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.RECEIVING_USER_DATA_SUCCESS));
        }
    }

    public GetSchoolTrialInfo(): School_Trial_Info {
        return this._cachedData.GetSchoolTrialInfo();
    }

    private userDataError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.RECEIVING_USER_DATA_FAILED));
    }

    /*********************************************************************************************************************/
    public GetWordlistData(wordlistId:number, userId:number):void
    {
        //CallFunction("GetWordlistData", [wordlistId, userId], wordlistDataReceived, wordlistDataError);
        
        var trialUser:boolean = UberApplication.GetInstance().CurrentUser.Is_trial;

        if(!trialUser ||
            (trialUser && this._cachedData.IsTrialWordlistEnabled(wordlistId)) || //if trialuser and wordlist is part of defaultwordlist and in enabled wordlist
            (trialUser && !this._cachedData.WordlistIsDefaultWordlist(wordlistId))) //if trialuser not in defaultwordlist
        {				
            this.CallFunction("GetWordlistData2", [wordlistId, userId], this.wordlistDataReceived, this.wordlistDataError);
        }
        else
        {
            this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_DATA_ERROR, null, null, ErrorMessage.TRIAL_VERSION_ERROR));
        }
    }

    public GetPublicWordlistData(wordlistId:number):void
    {        
        this.CallFunction("GetPublicWordlistData", [wordlistId], this.wordlistDataReceived, this.wordlistDataError);
    }

    private wordlistDataReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_DATA_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            DevUtils.LogFunction("ACCESS REMOTE", "wordlistDataReceived", [responseJSONObject]);
            var wordlist:Wordlist = Wordlist.fromJson(responseJSONObject.result.Wordlist);
            var words:Word[] = new Array<Word>();
            for (var wordObject of responseJSONObject.result.Words)
            {
                words.push(Word.fromJson(wordObject));
            }
            this._cachedData.SetWordlistData(wordlist, words);

            var wordUsers:Word_User[] = new Array<Word_User>();
            for (var wu of responseJSONObject.result.WordUsers)
            {
                var wordUser:Word_User = Word_User.fromJson(wu);
                wordUsers.push(wordUser);
            }
            this._cachedData.UpdateWordUsers(wordUsers);

            this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_DATA_RECEIVED, wordlist));
        }
    }
    private wordlistDataError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_DATA_ERROR, null, null, errMsg));
    }

    /*********************************************************************************************************************/
    public UpdateText(text:Text, isUpdated:boolean):void
    {
        text._Date = this.GetCurrentTimeStamp();
        this._cachedData.UpdateProxyTextByText(text);
        this.CallFunction("UpdateText3", [text.toJson(), isUpdated], this.textUpdated, this.textUpdateError);
    }
    private textUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null || responseJSONObject.result == "textUpdatedSuccessful")
        {

            if(responseJSONObject.result.Proxy_Text != null)
            {
                var isUserText:boolean = responseJSONObject.result.Proxy_Text.User_id == UberApplication.GetInstance().CurrentUser.User_id;
                if(isUserText)
                {
                    var pText:ProxyText[] = new Array<ProxyText>();
                    pText.push(ProxyText.fromJson(responseJSONObject.result.Proxy_Text));
                    this._cachedData.UpdateProxyTexts(pText);
                }
                else
                {
                    var sText:SharedProxyText[] = new Array<SharedProxyText>();
                    var oldShareProxyText:SharedProxyText;
                    var currentSharedProxyText:SharedProxyText[] = this.GetSharedProxyTexts();

                    for (var spt of currentSharedProxyText)
                    {
                        if(spt.Text_id == responseJSONObject.result.Proxy_Text.Text_id)
                        {
                            oldShareProxyText = spt;
                        }
                    }

                    if(oldShareProxyText)
                    {
                        oldShareProxyText.Genre =  StringUtils.DecodeFromJSONUri(responseJSONObject.result.Proxy_Text.Genre);
                        oldShareProxyText.Author = StringUtils.DecodeFromJSONUri(responseJSONObject.result.Proxy_Text.Author);
                        oldShareProxyText.Last_updated = ISO8601Util.parseDateTimeString(responseJSONObject.result.Proxy_Text.Date);
                        sText.push(oldShareProxyText);
                    }

                    this._cachedData.UpdateSharedProxyTexts(sText);
                }
            }

            if(responseJSONObject.result.User_Text)
            {
                var updatedUserText:User_Text = User_Text.fromJson(responseJSONObject.result.User_Text);
                this._cachedData.UpdateUser_Text(updatedUserText);
            }

            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.TEXT_UPDATE_SUCCESS));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.TEXT_UPDATE_FAILED));
        }
    }

    private textUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.TEXT_UPDATE_FAILED));
    }

    /*********************************************************************************************************************/
    public DeleteText(textId:number, userId:number):void
    {
        this.CallFunction("DeleteText2", [textId, userId], this.textDeleted, this.textDeleteError);
    }
    private textDeleted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null || responseJSONObject.result == "textDeleteSuccessful")
        {
            this._cachedData.DeleteUserText(responseJSONObject.result);
            this.dispatchEvent(new ProxyTextsEvent(ProxyTextsEvent.PROXY_TEXT_DELETED, null));
        }
        else
        {
            this.dispatchEvent(new ProxyTextsEvent(ProxyTextsEvent.PROXY_TEXT_DELETE_FAILED, null));
        }
    }
    private textDeleteError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ProxyTextsEvent(ProxyTextsEvent.PROXY_TEXT_DELETE_FAILED, null));
    }

    /*********************************************************************************************************************/
    public DeleteWordDiscover(wordDiscoverId:number, userID:number):void
    {
        this.CallFunction("DeleteWordDiscover2", [wordDiscoverId, userID], this.wordDiscoverDeleted, this.wordDiscoverDeleteError);
        this._cachedData.DeleteWordDiscover(wordDiscoverId);
    }
    private wordDiscoverDeleted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "wordDiscoverDeleteSuccessful")
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORD_DISCOVER_DELETE_SUCCESS));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORD_DISCOVER_DELETE_FAILED));
        }
    }
    private wordDiscoverDeleteError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORD_DISCOVER_DELETE_FAILED));
    }

    /*********************************************************************************************************************/
    public InsertText(text:Text):void
    {
        this.CallFunction("InsertText", [text.toJson()], this.textInserted, this.textInsertError);
        //_cachedData.UpdateTextsTable = true;
    }
    private textInserted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_INSERT_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_INSERT_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var text:Text = Text.fromJson(responseJSONObject.result);
            var proxyText:ProxyText = ProxyText.fromJson(responseJSONObject.result);
            this._cachedData.InsertUserText(proxyText);
            this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_INSERTED, text));
        }
    }
    //private textInsertError(errMsg:string="Error inserting text on server"):void
    private textInsertError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_INSERT_ERROR, null, errMsg));
    }
    /*********************************************************************************************************************/
	public UpdateWordlist(wordlist:Wordlist):void
	{
		wordlist.Last_updated = this.GetCurrentTimeStamp();
		this._cachedData.UpdateWordlist(wordlist);
		this.CallFunction("UpdateWordlist", [wordlist.toJson()], this.UpdateWordlistSuccess, this.UpdateWordlistFailed);
	}

	private UpdateWordlistSuccess = (responseJSONObject:any) =>
	{
		if (responseJSONObject.error != null)
		{
			this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORDLIST_UPDATE_FAILED));
		}
		else if (responseJSONObject.result.code != null)
		{
			this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORDLIST_UPDATE_FAILED));
		}
		else
		{
			var proxyWordlist:ProxyWordlist = ProxyWordlist.fromJson(responseJSONObject.result);
			var pWordlist:ProxyWordlist[] = new Array<ProxyWordlist>();
			pWordlist.push(proxyWordlist);

			this._cachedData.UpdateProxyWordlists(pWordlist);
			this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORDLIST_UPDATE_SUCCESS));
		}
	}

	private UpdateWordlistFailed = (errMsg:string, errObj:any=null, id:number=0) =>
	{
		this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORDLIST_UPDATE_FAILED));
	}
    /*********************************************************************************************************************/
    public InsertWordlist(wordlist:Wordlist):void
    {
        this.CallFunction("InsertWordlist", [wordlist.toJson()], this.wordlistInserted, this.wordlistInsertError);
        //_cachedData.UpdateProxyWordlistsTable = true;
    }
    private wordlistInserted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_CREATION_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_CREATION_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var wordlist:Wordlist = Wordlist.fromJson(responseJSONObject.result);
            this._cachedData.InsertWordlist(wordlist);
            this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_CREATED, wordlist));
        }
    }
    private wordlistInsertError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_CREATION_ERROR, null, null, errMsg));
    }

    /*********************************************************************************************************************/
    /*public InsertWordSense(wordSense:Word_Sense):void
    {
        CallFunction("InsertWordSense2", [wordSense.toJson()], wordSenseInserted, wordSenseInsertError);
    }
    private wordSenseInserted(responseJSONObject:any):void
    {
        if (responseJSONObject.error != null && responseJSONObject.error.message == "Validation Error")
        {
            dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERT_ERROR, WordSenseEvent.WORD_SENSE_VALIDATION_ERROR, responseJSONObject.error.data));
        }
        else if (responseJSONObject.error != null)
        {
            dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERT_ERROR));
        }
        else if (responseJSONObject.result.code != null)
        {
            dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERT_ERROR));
        }
        else
        {
            var wordSense:Word_Sense = Word_Sense.fromJson(responseJSONObject.result);
            _cachedData.InsertWordSense(wordSense);
            dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERTED));
        }
    }

    private wordSenseInsertError(errMsg:string, errObj:any=null, id:number=0):void
    {
            if (errMsg == "Validation Error")
            {
                dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERT_ERROR, WordSenseEvent.WORD_SENSE_VALIDATION_ERROR, errObj));
            }
            else
            {
                dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERT_ERROR));
            }
    }*/
    
    public InsertWordSense2(wordSense:Word_Sense, word_Id:number, pos:string):void
    {
        this.CallFunction("InsertWordSense2", [wordSense.toJson(), word_Id, pos], this.wordSenseInserted, this.wordSenseInsertError);
    }
    private wordSenseInserted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null && responseJSONObject.error.message == "Validation Error")
        {
            this.dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERT_ERROR, WordSenseEvent.WORD_SENSE_VALIDATION_ERROR, responseJSONObject.error.data));
        }
        else if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERT_ERROR));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERT_ERROR));
        }
        else
        {
            /*var wordSense:Word_Sense = Word_Sense.fromJson(responseJSONObject.result);
            _cachedData.InsertWordSense(wordSense);
            dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERTED));*/

            var wordPosFromServer:Word_Pos = Word_Pos.fromJson(responseJSONObject.result);
            //var wordPosVector:Word_Pos[] = new Word_Pos[]();
            //wordPosVector.push(wordPosFromServer);

            this._cachedData.UpdateWord_SingleWordPos(wordPosFromServer);
            this.dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERTED));
        }
    }

    private wordSenseInsertError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        if (errMsg == "Validation Error")
        {
            this.dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERT_ERROR, WordSenseEvent.WORD_SENSE_VALIDATION_ERROR, errObj));
        }
        else
        {
            this.dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_INSERT_ERROR));
        }
    }

    /*********************************************************************************************************************/
    public InsertMultipleWordsToWordlist(wordlistId:number, wordIds:number[], userId:number, wordsStringsAdded:string[]):void
    {
        var wordlist:Wordlist = this._cachedData.GetWordlist(wordlistId);
        var trialUser:boolean = UberApplication.GetInstance().CurrentUser.Is_trial;
        if(trialUser && this._cachedData.GetTrialWordlistLimit() != null &&
            (this._cachedData.GetTrialWordlistLimit()) < (wordlist.WordlistWords.length + wordIds.length))
        {
            this.dispatchEvent(new WordEvent(WordEvent.WORD_INSERT_FAILED, null, ErrorMessage.TRIAL_VERSION_ERROR));
            return;
        }

        if (wordlist != null)
        {
            for (var i = wordIds.length - 1; i >= 0; i --)
            {
                for (var wlw of wordlist.WordlistWords)
                {
                    if (wlw.Word_id == wordIds[i] && wlw.Word_added == wordsStringsAdded[i])
                    {
                        //wordIds.removeAt(i);
                        wordIds.splice(i, 1);
                        wordsStringsAdded.splice(i, 1);
                        break;
                    }
                }
            }
            for (var j = 0; j < wordIds.length; j ++)
            {
                var newWordlistWord:Wordlist_Word = new Wordlist_Word();
                newWordlistWord.Wordlist_id = wordlistId;
                newWordlistWord.Word_id = wordIds[j];
                newWordlistWord.Word_added = wordsStringsAdded[j];
                newWordlistWord.Last_updated = this.GetCurrentTimeStamp();
                this._cachedData.InsertWordlistWord(newWordlistWord);
                //Need to Identify by ID somehow
            }
        }
        var wordStringsToAdd:string[] = new Array<string>();
        for (var wordString of wordsStringsAdded)
        {
            wordStringsToAdd.push(StringUtils.EncodeToJSONUri(wordString));
        }
        this.CallFunction("InsertWordlistWordsWithStrings", [wordlistId, wordIds, userId, wordStringsToAdd], this.wordlistWordsInserted, this.wordlistWordsInsertError);
    }
    private wordlistWordsInserted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "wordlistWordsInsertSuccessful")
        {
            this.dispatchEvent(new AddWordToListEvent(AddWordToListEvent.WORD_INSERT_SUCCESS, null));
        }
        else
        {
            this.dispatchEvent(new AddWordToListEvent(AddWordToListEvent.WORD_INSERT_FAILED, null));
        }
    }
    private wordlistWordsInsertError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new AddWordToListEvent(AddWordToListEvent.WORD_INSERT_FAILED, null, errMsg));
    }

    /*********************************************************************************************************************/
    public InsertMultipleWordStringToWordlist(wordlist:Wordlist, wordStrings:string[], userId:number):void
    {
        //wait for the wordfound
        var trialUser:boolean = UberApplication.GetInstance().CurrentUser.Is_trial;
        if(trialUser && this._cachedData.GetTrialWordlistLimit() != null &&
            (this._cachedData.GetTrialWordlistLimit() < (wordlist.WordlistWords.length + wordStrings.length)))
        {
            this.dispatchEvent(new MultiAddWordEvent(MultiAddWordEvent.MULTI_ADD_WORD_ERROR, null, ErrorMessage.TRIAL_VERSION_ERROR));
            return;
        }

        //wordStrings = wordStrings.map(encodeURI);
        var encodedWordStrings:string[] = new Array<string>();
        for (var wordString of wordStrings)
        {
            encodedWordStrings.push(StringUtils.EncodeToJSONUri(wordString));
        }
        this.CallFunction("InsertWordlistWordStrings2", [wordlist.Wordlist_id, encodedWordStrings, userId], this.wordlistWordStringsInserted, this.wordlistWordStringsInsertError);
    }

    public InsertMultipleWordStringToWordlistId(wordlistId:number, wordStrings:string[], userId:number):void
	{
		var encodedWordStrings:string[] = [];
		for (var wordString of wordStrings)
		{
			encodedWordStrings.push(StringUtils.EncodeToJSONUri(wordString));
		}
		this.CallFunction("InsertWordlistWordStrings2", [wordlistId, encodedWordStrings, userId], this.wordlistWordStringsInserted, this.wordlistWordStringsInsertError);
	}

    private wordlistWordStringsInserted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new MultiAddWordEvent(MultiAddWordEvent.MULTI_ADD_WORD_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new MultiAddWordEvent(MultiAddWordEvent.MULTI_ADD_WORD_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var insertResults:any[] = new Array<Object>();
            for (var insertResult of responseJSONObject.result)
            {
                if (insertResult.Status == "Word added")
                {
                    var word:Word = Word.fromJson(insertResult.Word);
                    this._cachedData.InsertWord(word);
                    var wordlistWord:Wordlist_Word = Wordlist_Word.fromJson(insertResult.Wordlist_Word);
                    this._cachedData.InsertWordlistWord(wordlistWord);
                    if(insertResult.WordUser)
                    {
                        var wordUser:Word_User = Word_User.fromJson(insertResult.WordUser);
                        this._cachedData.UpdateWordUser(wordUser);
                    }
                }
                insertResult.WordString = StringUtils.DecodeFromJSONUri(insertResult.WordString);
                insertResults.push(insertResult);
            }
            this.dispatchEvent(new MultiAddWordEvent(MultiAddWordEvent.WORDS_ADDED, insertResults));
        }
    }
    private wordlistWordStringsInsertError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new MultiAddWordEvent(MultiAddWordEvent.MULTI_ADD_WORD_ERROR, null, errMsg));
    }

    /*********************************************************************************************************************/
    public GetText(textId:number, userId:number):void
    {
        var text:Text = this._cachedData.GetText(textId);
        var trialUser:boolean = UberApplication.GetInstance().CurrentUser.Is_trial;

        if(text == null)
        {
            var currentText:Text = UberApplication.GetInstance().CurrentUserData.CurrentText;
            if(currentText && currentText.Text_id == textId)
            {
                text = UberApplication.GetInstance().CurrentUserData.CurrentText;
            }
        }

        if((!trialUser && text == null) || (trialUser && this._cachedData.IsTrialTextEnabled(textId)))
        {				
            this.CallFunction("GetText3", [textId],this.textReceived, this.textError);
        }
        else
        {
            if(!trialUser)
            {
                this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVED, text));
            }
            else
            {
                this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, null, ErrorMessage.TRIAL_VERSION_ERROR));
            }
        }
    }

    private textReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var text:Text = Text.fromJson(responseJSONObject.result.Text);
            this._cachedData.InsertText(text);

            if(responseJSONObject.result.User_Text)
            {
                var ut:User_Text = User_Text.fromJson(responseJSONObject.result.User_Text);
                this.InsertUserText(ut);
            }

            this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVED, text));
        }
    }

    private textError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, null, errMsg));
    }

    /*********************************************************************************************************************/
    /*public SelectDefaultText():Text
    {
        return _cachedData.DefaultText;
    }*/

    /*public SelectDefaultWordlist():Wordlist
    {
        return _cachedData.DefaultWordlist;
    }*/

    public GetProductInfo():ProductInfo
    {
        return this._cachedData.GetProductInfo;
    }

    public GetCurrentText():Text
    {
        return this._cachedData.CurrentText;
    }

    public SetCurrentText(text:Text):void
    {
        this._cachedData.CurrentText = text;
    }

    /*public GetCurrentWordlist():Wordlist
    {
        return _cachedData.CurrentWordlist;
    }*/

    public SelectWordUserByUserWord(wordId:number, userId:number=null):Word_User
    {
        return this._cachedData.GetWordUser(wordId);
    }

    /*********************************************************************************************************************/
    public InsertResults(results:Result[]):void
    {
        let resultJsonObjects:any[] = new Array<Object>();
        let timestamp:Date = this.GetCurrentTimeStamp();
        for (let result of results)
        {
            result._Date = timestamp;
            if (result.Tag1 == null)
            {
                this._cachedData.UpdateResult(result);
            }
            resultJsonObjects.push(result.toJson());
        }
        this.CallFunction("InsertResults", [resultJsonObjects], this.resultInserted, this.resultInsertError, true);
    }

    public InsertResult(result:Result):void
    {
        result._Date = this.GetCurrentTimeStamp();
        this.CallFunction("InsertResult", [result.toJson()], this.resultInserted, this.resultInsertError, true);
        if (result.Tag1 == null)
        {
            this._cachedData.UpdateResult(result);
        }
    }
    private resultInserted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.INSERT_RESULT_FAILED));
        }
        else if (responseJSONObject.result != null || responseJSONObject.result == "resultInsertedSuccessfully" || responseJSONObject.result == "resultsInsertedSuccessfuly")
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.INSERT_RESULT_SUCCESS));
        }
    }
    private resultInsertError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.INSERT_RESULT_FAILED));
    }

    /*********************************************************************************************************************/
    public SelectLastResultByUserKey(key:string, userId:number, productId:number):Result
    {
        return this._cachedData.GetResult(key);
    }

    public CountTextsWithTitleAuthorUserProducts(title:string, author:string, userId:number, productIds:number[]):number
    {
        return this._cachedData.CountTextsWithTitleAuthor(title, author);
    }
    
    public GetChartData3(charts:Chart[], grouping:string, currentWordlist:Wordlist, userId:number, productId:number, type:string, isBackgroundCall:boolean = false):void
    {
        var requireWordlist:boolean = false;
        var chartIds:number[] = new Array<number>();
        for (var chart of charts)
        {
            requireWordlist = false; //need to improve condition for this
            chartIds.push(chart.Chart_id);
        }

        var groupArray:string[] = grouping.split(",");
        if(type == "default")
        {
            this.CallFunction("GetChartData3", [chartIds, userId, productId, parseInt(groupArray[0]), groupArray[1], new Date().getTimezoneOffset(), (requireWordlist ? currentWordlist.Wordlist_id : null)], this.chartDataReceived, this.chartDataError, isBackgroundCall);
        }
        else if(type == "mini")
        {
            this.CallFunction("GetChartData3", [chartIds, userId, productId, parseInt(groupArray[0]), groupArray[1], new Date().getTimezoneOffset(), (requireWordlist ? currentWordlist.Wordlist_id : null)], this.chartMiniDataReceived, this.chartMiniDataError, true);
        }
    }

    public GetChartDataDateRange(charts: Chart[], userId: number, productId: number, grouping: string, startDate: Date, endDate: Date, wordlistId?: number){
        let chartIds = charts.map(chart => chart.Chart_id);
        this.CallFunction("GetChartDataDateRange", [chartIds, userId, productId, grouping, new Date().getTimezoneOffset(), wordlistId, ISO8601Util.formatExtendedDateTime(startDate), ISO8601Util.formatExtendedDateTime(endDate)], this.chartDataReceived, this.chartDataError, null);
    }

    private chartDataReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new ChartDataEvent(ChartDataEvent.CHART_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new ChartDataEvent(ChartDataEvent.CHART_DATA_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var chartData:DictionaryNumber<any> = {};
            for (var chartResults of responseJSONObject.result)
            {
                var results:Result[] = new Array<Result>();
                for (var resultObject of chartResults.Results)
                {
                    results.push(Result.fromJson(resultObject));
                }
                var seriesData:any = {Name: chartResults.Name, Results: results};
                chartData[chartResults.Series_id] = seriesData;
            }
            this.dispatchEvent(new ChartDataEvent(ChartDataEvent.CHART_DATA_RECEIVED, chartData));
        }
    }
    //private chartDataError(errMsg:string="Error getting chart data from server"):void
    private chartDataError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ChartDataEvent(ChartDataEvent.CHART_DATA_ERROR, null, errMsg));
    }

    /*********************************************************************************************************************/

    private chartMiniDataReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new ChartDataEvent(ChartDataEvent.MINI_CHART_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new ChartDataEvent(ChartDataEvent.MINI_CHART_DATA_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var chartData:DictionaryNumber<any> = {};
            for (var chartResults of responseJSONObject.result)
            {
                var results:Result[] = new Array<Result>();
                for (var resultObject of chartResults.Results)
                {
                    results.push(Result.fromJson(resultObject));
                }
                var seriesData:any = {Name: chartResults.Name, Results: results};
                chartData[chartResults.Series_id] = seriesData;
            }
            this.dispatchEvent(new ChartDataEvent(ChartDataEvent.MINI_CHART_DATA_RECEIVED, chartData));
        }
    }
    //private chartDataError(errMsg:string="Error getting chart data from server"):void
    private chartMiniDataError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ChartDataEvent(ChartDataEvent.MINI_CHART_DATA_ERROR, null, errMsg));
    }

    /*********************************************************************************************************************/
    public GetUserProxyTexts():ProxyText[]
    {
        return this._cachedData.GetUserProxyTexts();
    }

    public GetSharedProxyTexts():SharedProxyText[]
    {
        return this._cachedData.GetSharedProxyTexts();
    }
    /*
    private userProxyTextReceived(responseJSONObject:any):void
    {
        if (responseJSONObject.error != null)
        {
            dispatchEvent(new ProxyTextsEvent(ProxyTextsEvent.PROXY_TEXTS_RETRIEVAL_FAILED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            dispatchEvent(new ProxyTextsEvent(ProxyTextsEvent.PROXY_TEXTS_RETRIEVAL_FAILED, null, responseJSONObject.error.message));
        }
        else
        {
            _cachedData.UpdateUserTextsTable = false;
            var texts:ProxyText[] = new ProxyText[]();
            for (var proxyTextObject of responseJSONObject.result)
            {
                texts.push(ProxyText.fromJson(proxyTextObject));
            }
            _cachedData.SetUserProxyTexts(texts);
            dispatchEvent(new ProxyTextsEvent(ProxyTextsEvent.PROXY_TEXTS_RETRIEVED,texts));
        }
    }

    private userProxyTextError(errMsg:string, errObj:any=null, id:number=0):void
    {
        dispatchEvent(new ProxyTextsEvent(ProxyTextsEvent.PROXY_TEXTS_RETRIEVAL_FAILED, null));
    }
    */
    /*********************************************************************************************************************/
    /*
    public DeleteUserText(textId:number, userId:number):void
    {
        CallFunction("DeleteText2", [textId, userId], userTextDeleted, userTextDeleteError);
        _cachedData.DeleteUserText(textId);
    }

    private userTextDeleted(responseJSONObject:any):void
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "textDeleteSuccessful")
        {
            //_cachedData.DeleteUserText(responseJSONObject.result.Text_id); //assuming the id of the deleted text is returned to update the cache proxy text list
            dispatchEvent(new ProxyTextsEvent(ProxyTextsEvent.PROXY_TEXT_DELETED, _cachedData.GetUserProxyTexts()));
        }
        else
        {
            dispatchEvent(new ProxyTextsEvent(ProxyTextsEvent.PROXY_TEXT_DELETE_FAILED, null, responseJSONObject.error.message));
        }
    }

    private userTextDeleteError(errMsg:string, errObj:any=null, id:number=0):void
    {
        dispatchEvent(new ProxyTextsEvent(ProxyTextsEvent.PROXY_TEXT_DELETE_FAILED, null, errMsg));
    }
    */
    /*********************************************************************************************************************/
    public GetTextShareSettings(userId:number, textId:number, productId:number):void
    {
        this.CallFunction("GetTextShareSettings", [textId, userId, productId], this.textSharedSettingsReceived, this.textSharedSettingsError);
    }

    private textSharedSettingsReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new TextShareSettingsEvent(TextShareSettingsEvent.TEXT_SHARE_SETTINGS_ERROR, -1, null, null, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new TextShareSettingsEvent(TextShareSettingsEvent.TEXT_SHARE_SETTINGS_ERROR, -1, null, null, null, responseJSONObject.error.message));
        }
        else
        {
            var textId:number = responseJSONObject.result.TextId;
            var usersShared:User_Shared_Object[] = new Array<User_Shared_Object>();
            for (var sharedUsers of responseJSONObject.result.UsersShared)
            {
                var us:User_Shared_Object = User_Shared_Object.fromJson(sharedUsers);
                usersShared.push(us);
            }

            var groupsShared:Group_Shared_Object[] = new Array<Group_Shared_Object>();
            for (var sharedGroup of responseJSONObject.result.GroupsShared)
            {
                var gs:Group_Shared_Object = Group_Shared_Object.fromJson(sharedGroup);
                groupsShared.push(gs);
            }

            var groupsCanShareWith:Group[] = new Array<Group>();
            for (var groupCanShareWithObject of responseJSONObject.result.GroupsCanShare)
            {
                var g:Group = Group.fromJson(groupCanShareWithObject);
                groupsCanShareWith.push(g);
            }
            this.dispatchEvent(new TextShareSettingsEvent(TextShareSettingsEvent.TEXT_SHARE_SETTINGS_SUCCESS, textId, usersShared, groupsShared, groupsCanShareWith));
        }
    }
    private textSharedSettingsError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new TextShareSettingsEvent(TextShareSettingsEvent.TEXT_SHARE_SETTINGS_ERROR, -1, null, null, null, errMsg));
    }

    /*********************************************************************************************************************/
    /*<*//*!*//*--*/ /*deprecated*/ /*--*//*>*/
    public SelectAllProxyTextsByProductsUser(productIds:number[], userId:number):void
    {
        if(!this.getDefaultTexts)
        {
            this.CallFunction("GetDefaultTexts", [productIds], this.textsReceived, this.textsError);
        }
        else
        {
            this.dispatchEvent(new TextsTableEvent(TextsTableEvent.TEXTS_RETRIEVED, null));
        }
    }
    private textsReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new TextsTableEvent(TextsTableEvent.TEXT_RETRIEVAL_FAILED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new TextsTableEvent(TextsTableEvent.TEXT_RETRIEVAL_FAILED, null, responseJSONObject.result.message));
        }
        else
        {
            if(this.getDefaultTexts)
            {
                var texts:ProxyText[] = new Array<ProxyText>();
                for (var proxyTextObject of responseJSONObject.result.DefaultTexts)
                {
                    texts.push(ProxyText.fromJson(proxyTextObject));
                }
                this._cachedData.SetTextsTable(texts);
                this.getDefaultTexts = false;
            }

            /*var sharedTexts:SharedProxyText[] = new SharedProxyText[]();
            for (var sharedProxyTextObject of responseJSONObject.result.SharedTexts)
            {
                sharedTexts.push(SharedProxyText.fromJson(sharedProxyTextObject));
            }*/

            //dispatchEvent(new TextsTableEvent(TextsTableEvent.TEXTS_RETRIEVED, sharedTexts));
            this.dispatchEvent(new TextsTableEvent(TextsTableEvent.TEXTS_RETRIEVED, null));
        }
    }
    private textsError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new TextsTableEvent(TextsTableEvent.TEXT_RETRIEVAL_FAILED, null));
    }

    /*private basicTextsReceived(responseJSONObject:any):void
    {
        if (responseJSONObject.error != null)
        {
            dispatchEvent(new TextsTableEvent(TextsTableEvent.TEXT_RETRIEVAL_FAILED, null, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            dispatchEvent(new TextsTableEvent(TextsTableEvent.TEXT_RETRIEVAL_FAILED, null, null, responseJSONObject.result.message));
        }
        else
        {
            if(getDefaultTexts)
            {
                var texts:ProxyText[] = new ProxyText[]();
                for (var proxyTextObject of responseJSONObject.result.DefaultTexts)
                {
                    texts.push(ProxyText.fromJson(proxyTextObject));
                }
                _cachedData.SetTextsTable(texts);
                getDefaultTexts = false;
            }

            var sharedTexts:SharedProxyText[] = new SharedProxyText[]();
            for (var sharedProxyTextObject of responseJSONObject.result.SharedTexts)
            {
                sharedTexts.push(SharedProxyText.fromJson(sharedProxyTextObject));
            }

            var textsTable:ProxyText[] = _cachedData.GetTextsTable(false);
            dispatchEvent(new TextsTableEvent(TextsTableEvent.TEXTS_RETRIEVED, textsTable, sharedTexts));
        }
    }

    private textsErrorBasic(errMsg:string, errObj:any=null, id:number=0):void
    {
        var textsTable:ProxyText[] = _cachedData.GetTextsTable(false);
        dispatchEvent(new TextsTableEvent(TextsTableEvent.TEXT_RETRIEVAL_FAILED, textsTable, null));
    }*/

    /*********************************************************************************************************************/
    public SelectAllProxyTests():void
    {
        var tests:ProxyTest[] = this._cachedData.ProxyTests;
        if (tests == null)
        {
            this.CallFunction("GetProxyTests", [], this.testsReceived, this.testRetrivalError);
        }
        else
        {
            this.dispatchEvent(new ProxyTestsEvent(ProxyTestsEvent.PROXY_TESTS_RETRIEVED, tests));
        }
    }
    private testsReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new ProxyTestsEvent(ProxyTestsEvent.PROXY_TEST_RETRIEVAL_FAILED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new ProxyTestsEvent(ProxyTestsEvent.PROXY_TEST_RETRIEVAL_FAILED, null, responseJSONObject.result.message));
        }
        else
        {
            var proxyTests:ProxyTest[] = new Array<ProxyTest>();
            for (var proxyTestObject of responseJSONObject.result)
            {
                proxyTests.push(ProxyTest.fromJson(proxyTestObject));
            }
            this._cachedData.ProxyTests = proxyTests;
            this.dispatchEvent(new ProxyTestsEvent(ProxyTestsEvent.PROXY_TESTS_RETRIEVED, proxyTests));
        }
    }
    private testRetrivalError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ProxyTestsEvent(ProxyTestsEvent.PROXY_TEST_RETRIEVAL_FAILED, null));
    }

    public SelectAllProxyWordlistsSynchronous(userId:number):ProxyWordlist[]
    {
        var wordlists:ProxyWordlist[] = this._cachedData.UserProxyWordlists;
        /*if (_cachedData.UpdateProxyWordlistsTable)
        {
            CallFunction("GetProxyWordlists", [userId], proxyWordlistsReceived, proxyWordlistsError);
        }*/
        return wordlists;
    }
    /*********************************************************************************************************************/
    private getDefaultWordlists:boolean = true;
    public GetAllSharedProxyWordlistsByUser(userId:number, productId:number):void
    {
        this.CallFunction("GetProxyWordlists2", [userId, productId, this.getDefaultWordlists], this.sharedProxyWordlistsReceived, this.sharedProxyWordlistsError);
    }

    private sharedProxyWordlistsReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var sharedProxyWordlists:SharedProxyWordlist[] = new Array<SharedProxyWordlist>();
            // get default wordlists then shared wordlists
            if (this.getDefaultWordlists)
            {
                var wordlistCategories:Wordlist_Category[] = new Array<Wordlist_Category>();
                for (var wordlistCategoryObject of responseJSONObject.result.WordlistCategories)
                {
                    wordlistCategories.push(Wordlist_Category.fromJson(wordlistCategoryObject));
                }
                this._cachedData.SetWordlistCategories(wordlistCategories);
                this.getDefaultWordlists = false;
            }

            for (var swl of responseJSONObject.result.SharedWordlists)
            {
                //var proxyWordlist:Shared_Object = SharedProxyWordlist.fromJson(swl);
                var proxyWordlist:SharedProxyWordlist = SharedProxyWordlist.fromJson(swl);
                sharedProxyWordlists.push(proxyWordlist);
            }

            this.dispatchEvent(new SharedProxyWordlistsEvent(SharedProxyWordlistsEvent.SHARED_PROXY_WORDLISTS_RECEIEVED_SUCCESS, sharedProxyWordlists));
        }
        else
        {
            this.dispatchEvent(new SharedProxyWordlistsEvent(SharedProxyWordlistsEvent.SHARED_PROXY_WORDLISTS_RECEIEVED_FAILED, null));
        }
    }

    private sharedProxyWordlistsError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new SharedProxyWordlistsEvent(SharedProxyWordlistsEvent.SHARED_PROXY_WORDLISTS_RECEIEVED_FAILED, null));
    }
    /*********************************************************************************************************************/
    
    public GetActivity(activityId:number):void
    {
        var activity:Activity = this._cachedData.GetActivity(activityId);
        var trialUser:boolean = UberApplication.GetInstance().CurrentUser.Is_trial;

        if((trialUser && activity == null && this._cachedData.IsTrialActivityEnabled(activityId)) ||
            (!trialUser && activity == null))
        {
            this.CallFunction("GetActivity", [activityId], this.activityReceived, this.activityError);
        }
        else
        {
            if(trialUser && !this._cachedData.IsTrialActivityEnabled(activityId))
            {
                this.dispatchEvent(new ActivityEvent(ActivityEvent.ACTVITY_DATA_ERROR, null, ErrorMessage.TRIAL_VERSION_ERROR));
            }
            else
            {
                this.dispatchEvent(new ActivityEvent(ActivityEvent.ACTVITY_DATA_RECEIVED, activity, ""));
            }
        }

        /*var activity:Activity = _cachedData.GetActivity(activityId);
        if(UberApplication.GetInstance().CurrentUser.Is_trial)
        {
            if(_cachedData.IsTrialActivityAvailable(activityId) && )
            {					
                CallFunction("GetActivity", [activityId], activityReceived, activityError);
            }
            else
            {
                dispatchEvent(new ActivityEvent(ActivityEvent.ACTVITY_DATA_ERROR, null, ErrorMessage.TRIAL_VERSION_ERROR));
            }
        }
        else
        {
            if (activity == null)
            {
                CallFunction("GetActivity", [activityId], activityReceived, activityError);
            }
            else
            {
                dispatchEvent(new ActivityEvent(ActivityEvent.ACTVITY_DATA_RECEIVED, activity, ""));
            }
        }*/
    }
    private activityReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new ActivityEvent(ActivityEvent.ACTVITY_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new ActivityEvent(ActivityEvent.ACTVITY_DATA_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var activity:Activity = Activity.fromJson(responseJSONObject.result);
            this._cachedData.InsertActivity(activity);
            this.dispatchEvent(new ActivityEvent(ActivityEvent.ACTVITY_DATA_RECEIVED, activity, ""));
        }
    }
    private activityError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ActivityEvent(ActivityEvent.ACTVITY_DATA_ERROR, null, errMsg));
    }

    /*********************************************************************************************************************/
    
    public GetCourseData(courseId:number):void
    {		
        let course:Course = this._cachedData.GetCourse(courseId);
        let trialUser:boolean = UberApplication.GetInstance().CurrentUser.Is_trial;
        if((trialUser && course == null && (this._cachedData.IsTrialCourseEnabled(courseId) || this._cachedData.IfTrialCourseStep1Locked(courseId))) ||
            (!trialUser && course == null))
        {
            this.CallFunction("GetCourseData3", [courseId], this.courseReceived, this.courseError);
        }
        else
        {
            if(course != null)
            {
                this.dispatchEvent(new CourseEvent(CourseEvent.COURSE_DATA_RECEIVED, course, ""));
            }
            if(trialUser && !this._cachedData.IsTrialCourseEnabled(courseId))
            {
                this.dispatchEvent(new CourseEvent(CourseEvent.COURSE_DATA_ERROR, null, ErrorMessage.TRIAL_VERSION_ERROR));
            }
            else
            {
                this.dispatchEvent(new CourseEvent(CourseEvent.COURSE_DATA_RECEIVED, course, ""));
            }
        }
    }
    private courseReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new CourseEvent(CourseEvent.COURSE_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new CourseEvent(CourseEvent.COURSE_DATA_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var userQuestions:User_Question[] = new Array<User_Question>();
			for (var q of responseJSONObject.result.User_Questions)
			{
				userQuestions.push(User_Question.fromJson(q));
			}
			this._cachedData.UpdateUserQuestions(userQuestions);

            var userNotes:User_Notes[] = new Array<User_Notes>();
			for (var n of responseJSONObject.result.User_Notes)
			{
				userNotes.push(User_Notes.fromJson(n));
			}
			this._cachedData.UpdateUserNotes(userNotes);

            var course:Course;
			if(responseJSONObject.result.Course_Data)
			{
                var activities:Activity[] = new Array<Activity>();
				for (var a of responseJSONObject.result.Course_Data.Activities)
				{
					activities.push(Activity.fromJson(a));
				}
				this._cachedData.InsertActivities(activities);

                var questionGroups:Question_Group[] = new Array<Question_Group>();
				for (var g of responseJSONObject.result.Course_Data.Question_Groups)
				{
					questionGroups.push(Question_Group.fromJson(g));
				}
				this._cachedData.InsertQuestionGroup(questionGroups);

                for (var t of responseJSONObject.result.Course_Data.Texts)
				{
					var text:Text = Text.fromJson(t);
					this._cachedData.InsertText(text);
				}

                course = Course.fromJson(responseJSONObject.result.Course_Data.Course);
				this._cachedData.InsertCourse(course);
            }
            this.dispatchEvent(new CourseEvent(CourseEvent.COURSE_DATA_RECEIVED, course, ""));
        }
    }
    private courseError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new CourseEvent(CourseEvent.COURSE_DATA_ERROR, null, errMsg));
    }

    public GetCourseActivityPreview(courseActivityId:number):void
    {			
        //var course:Course = this._cachedData.GetCourse(courseId);
        //var trialUser:boolean = UberApplication.GetInstance().CurrentUser.Is_trial;

        // if((trialUser && course == null && (this._cachedData.IsTrialCourseEnabled(courseId) || this._cachedData.IfTrialCourseStep1Locked(courseId))) ||
        //     (!trialUser && course == null))
        // {            
            this.CallFunction("GetCourseActivityPreview", [courseActivityId], this.courseActivityPreviewReceived, this.courseActivityPreviewError);
        // }
        // else
        // {
        //     if(course != null)
        //     {
        //         this.dispatchEvent(new CourseEvent(CourseEvent.COURSE_DATA_RECEIVED, course, ""));
        //     }
        //     if(trialUser && !this._cachedData.IsTrialCourseEnabled(courseId))
        //     {
        //         this.dispatchEvent(new CourseEvent(CourseEvent.COURSE_DATA_ERROR, null, ErrorMessage.TRIAL_VERSION_ERROR));
        //     }
        //     else
        //     {
        //         this.dispatchEvent(new CourseEvent(CourseEvent.COURSE_DATA_RECEIVED, course, ""));
        //     }
        // }
    }
    private courseActivityPreviewReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new CourseActivityPreviewEvent(CourseActivityPreviewEvent.COURSE_ACTIVITY_PREVIEW_ERROR, null, null, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new CourseActivityPreviewEvent(CourseActivityPreviewEvent.COURSE_ACTIVITY_PREVIEW_ERROR, null, null, null, responseJSONObject.result.message));
        }
        else
        {
            // var activities:Activity[] = new Array<Activity>();
            // activities.push(Activity.fromJson(responseJSONObject.result.Activity));
            // this._cachedData.InsertActivities(activities);

            // if (responseJSONObject.result.Question_Group != null)
            // {
            //     var questionGroups:Question_Group[] = new Array<Question_Group>();
            //     questionGroups.push(Question_Group.fromJson(g));
            //     this._cachedData.InsertQuestionGroup(questionGroups);
            // }

            var codes:Code[] = new Array<Code>();
            for (var codeObject of responseJSONObject.result.Codes)
            {
                codes.push(Code.fromJson(codeObject));
            }
            this._cachedData.SetCodes(codes);

            var courseActivity:Course_Activity = Course_Activity.fromJson(responseJSONObject.result.Course_Activity);
            var proxyCourse:ProxyCourse = ProxyCourse.fromJson(responseJSONObject.result.ProxyCourse);
            this._cachedData.UpdateDiscoverProxyCourses([proxyCourse]);
            //this._cachedData.InsertP(testData);
            var activities:Activity[] = new Array<Activity>();
            activities.push(Activity.fromJson(responseJSONObject.result.Activity));
            this._cachedData.InsertActivities(activities);

            var stepNumber:number = responseJSONObject.result.Step_number;

            if (responseJSONObject.result.Question_Group != null)
            {
                var questionGroups:Question_Group[] = new Array<Question_Group>();
				questionGroups.push(Question_Group.fromJson(responseJSONObject.result.Question_Group));
				this._cachedData.InsertQuestionGroup(questionGroups);
            }
            this.dispatchEvent(new CourseActivityPreviewEvent(CourseActivityPreviewEvent.COURSE_ACTIVITY_PREVIEW_RECEIVED, courseActivity, proxyCourse, stepNumber, ""));
        }
    }
    private courseActivityPreviewError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new CourseActivityPreviewEvent(CourseActivityPreviewEvent.COURSE_ACTIVITY_PREVIEW_ERROR, null, null, null, errMsg));
    }
    
    public GetTestData(testId:number):void
    {
        var testData:TestData = this._cachedData.GetTestData(testId);
        if (testData == null)
        {
            this.CallFunction("GetTestData", [testId], this.testDataReceived, this.testDataError);
        }
        else
        {
            this.dispatchEvent(new TestDataEvent(TestDataEvent.TEST_DATA_RECEIVED, testData));
        }
    }
    
    public GetRandomTest(productId:number, readingLevel:string):void
    {
        this.CallFunction("GetRandomTest", [productId, readingLevel], this.testDataReceived, this.testDataError);
    }

    private testDataReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new TestDataEvent(TestDataEvent.TEST_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new TestDataEvent(TestDataEvent.TEST_DATA_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var testData:TestData = TestData.fromJson(responseJSONObject.result);
            this._cachedData.UpdateTestData(testData);
            this.dispatchEvent(new TestDataEvent(TestDataEvent.TEST_DATA_RECEIVED, testData));
        }
    }
    private testDataError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new TestDataEvent(TestDataEvent.TEST_DATA_ERROR, null));
    }

    /*********************************************************************************************************************/
    public UpdateUserCoursesPrepProgramsSeen(userCourseIds:number[], prepProgramCourseIds:number[], seen:boolean=true):void
    {
        if(userCourseIds && userCourseIds.length > 0)
        {
            for(let id of userCourseIds)
            {
                let userCourse:User_Course = this._cachedData.GetUserCourse(id);
                if(userCourse)
                {
                    userCourse.Seen = seen;
                    this._cachedData.UpdateUserCourse(userCourse);
                }
            }
        }

        if(prepProgramCourseIds && prepProgramCourseIds.length > 0)
        {
            for(let id of prepProgramCourseIds)
            {
                let userPrepProgram:User_Prep_Program = this._cachedData.GetUserPrepProgramByProgramId(id);
                if(userPrepProgram)
                {
                    userPrepProgram.Seen = seen;
                    this._cachedData.UpdateUserPrepProgram(userPrepProgram);
                }
            }
        }

        this.CallFunction("UpdateUserCoursesPrepProgramsSeen", [(userCourseIds == null ? [] : userCourseIds), (prepProgramCourseIds == null ? [] : prepProgramCourseIds)], this.userCoursePrepProgramUpdated, this.userCoursePrepProgramFailed);
    }

    private userCoursePrepProgramUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UberApplicationEvent("userCourseUpdateFailed"));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UberApplicationEvent("userCourseUpdateFailed"));
        }
        else
        {
            /*
            this.dispatchEvent(new UberApplicationEvent("userCourseUpdateSuccessful"));

            var userCourse:User_Course = User_Course.fromJson(responseJSONObject.result);
            this._cachedData.UpdateUserCourse(userCourse);
            */
            //console.log(responseJSONObject);
        }
    }
    private userCoursePrepProgramFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("userCourseUpdateFailed"));
    }

    public InsertUserCourse(userCourse:User_Course):void
    {
        userCourse._Date = this.GetCurrentTimeStamp();
        this._cachedData.UpdateUserCourse(userCourse);
        this.CallFunction("UpdateUserCourse", [userCourse.toJson()], this.userCourseUpdated, this.userCourseInsertError, true);
    }
    public UpdateUserCourse(userCourse:User_Course):void
    {
        userCourse._Date = this.GetCurrentTimeStamp();
        this._cachedData.UpdateUserCourse(userCourse);
        this.CallFunction("UpdateUserCourse", [userCourse.toJson()], this.userCourseUpdated, this.userCourseUpdateError, true);
    }
    private userCourseUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UberApplicationEvent("userCourseUpdateFailed"));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UberApplicationEvent("userCourseUpdateFailed"));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent("userCourseUpdateSuccessful"));

            let userCourse:User_Course = User_Course.fromJson(responseJSONObject.result);
            userCourse._Date = this.GetCurrentTimeStamp();
            this._cachedData.UpdateUserCourse(userCourse);
        }
    }
    private userCourseInsertError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("userCourseUpdateFailed"));
    }
    private userCourseUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("userCourseUpdateFailed"));
    }

    public UpdateUserQuestion(userQuestion:User_Question):void
    {
        userQuestion.Last_updated = this.GetCurrentTimeStamp();
        this._cachedData.UpdateUserQuestion(userQuestion);
        if (userQuestion.User_id != null)
        {
            this.CallFunction("UpdateUserQuestion", [userQuestion.toJson()], this.userQuestionUpdated, this.userQuestionUpdateError);
        }
    }

    private userQuestionUpdated = (responseJSONObject:any) =>
    {
        this.dispatchEvent(new UberApplicationEvent("userQuestionUpdateSuccessfull"));
    }
    private userQuestionUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("userQuestionUpdateFailed"));
    }
    /*
    public UpdateUserQuestionNotes(userQuestion:User_Question):void
    {
        userQuestion.Last_updated = this.GetCurrentTimeStamp();
        this._cachedData.UpdateUserQuestion(userQuestion);
        this.CallFunction("UpdateUserQuestionNotes", [userQuestion.toJson()], this.userQuestionNotesUpdated, this.userQuestionNotesUpdateError);
    }
    */

    public UpdateUserNotesSeen(user_notes:User_Notes[]):void {
        if(user_notes && user_notes.length > 0)
        {
            for(let user_note of user_notes)
            {
                if(user_note)
                {
                    user_note.Seen = true;
                    user_note.Last_updated = this.GetCurrentTimeStamp();
                    //this.UpdateUserNotes(user_note);
                }
            }
        }
        this.UpdateUserNotesBulk(user_notes);
    }

    public UpdateUserNotes(userNotes:User_Notes):void
    {
        userNotes.Last_updated = this.GetCurrentTimeStamp();
        this._cachedData.UpdateUserNote(userNotes);
        this.CallFunction("UpdateUserNotes", [userNotes.toJson()], this.userQuestionNotesUpdated, this.userQuestionNotesUpdateError);
    }

    public UpdateUserNotesBulk(user_notes:User_Notes[]):void
    {
        var userNotesJsonObjects:any[] = new Array<Object>();
        for(let user_note of user_notes)
        {
            if(user_note)
            {
                this._cachedData.UpdateUserNote(user_note);
                userNotesJsonObjects.push(user_note.toJson());
            }
        }
        this.CallFunction("UpdateUserNotesBulk", [userNotesJsonObjects], this.userQuestionNotesUpdated, this.userQuestionNotesUpdateError);
    }

    private userQuestionNotesUpdated = (responseJSONObject:any) =>
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.QUESTION_NOTES_SAVED));
    }
    private userQuestionNotesUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.QUESTION_NOTES_FAILED));
    }

    public UpdateUserQuestions(userQuestions:User_Question[]):void
    {
        var userQuestionJsonObjects:any[] = new Array<Object>();
        var timestamp:Date = this.GetCurrentTimeStamp();
        for (var userQuestion of userQuestions)
        {
            userQuestion.Last_updated = timestamp;
            this._cachedData.UpdateUserQuestion(userQuestion);
            userQuestionJsonObjects.push(userQuestion.toJson());
        }
        this.CallFunction("UpdateUserQuestions", [userQuestionJsonObjects], this.userQuestionsUpdated, this.userQuestionsUpdateError);
    }
    private userQuestionsUpdated = (responseJSONObject:any) =>
    {
        this.dispatchEvent(new UberApplicationEvent("userQuestionsUpdateSuccessfull"));
    }
    private userQuestionsUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("userQuestionsUpdateFailed"));
    }

    /*********************************************************************************************************************/
    public ClearPrepProgramProgress(programId:number):void
    {
        this.CallFunction("ClearPrepProgramProgress", [programId], this.programProgressCleared, this.programProgressClearError);
        let userPrepProgram:User_Prep_Program = this._cachedData.GetUserPrepProgramByProgramId(programId);
        if (userPrepProgram != null)
        {
            userPrepProgram.Last_updated = this.GetCurrentTimeStamp();
            this._cachedData.UpdateUserPrepProgram(userPrepProgram);

            let courses:ProxyCourse[] = this.GetMyProxyCoursesByProgramId(userPrepProgram.Prep_program_id);
            for(let course of courses)
            {
                let userCourse:User_Course = this._cachedData.GetUserCourse(course.Course_id);
                if(userCourse != null)
                {
                    userCourse._Date = this.GetCurrentTimeStamp();
                    userCourse.Date_finished = null;
                    userCourse.Finished = false;
                    userCourse.Sequence_upto = 0;
                    userCourse.Questions_answered = 0;
                    this._cachedData.UpdateUserCourse(userCourse);
                }
                this._cachedData.ClearCourseProgress(course.Course_id);
            }
        }
    }

    private programProgressCleared = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null)
        {
            if(responseJSONObject.result.User_Questions != null && responseJSONObject.result.User_Questions.length > 0)
            {
                let updatedUserQuestions:User_Question[] = new Array<User_Question>();
    			for (let userQuestionJSON of responseJSONObject.result.User_Questions)
    			{
                    updatedUserQuestions.push(User_Question.fromJson(userQuestionJSON));
    			}
    			this._cachedData.UpdateUserQuestions(updatedUserQuestions);
            }

            if(responseJSONObject.result.User_Courses != null && responseJSONObject.result.User_Courses.length > 0)
            {
                let userCourseVector:User_Course[] = [];
                for (let userCourseObject of responseJSONObject.result.User_Courses)
                {
                    userCourseVector.push(User_Course.fromJson(userCourseObject));
                }
                this._cachedData.UpdateUserCourses(userCourseVector);
            }

        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent("userCourseDeleteFailed"));
        }
    }
    private programProgressClearError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("clearCourseProgressFailed"));
    }

    /*********************************************************************************************************************/
    public ClearCourseProgress(courseId:number, userId:number, curriculumId: number):void
    {
        if (userId != null) {
            this.CallFunction("ClearCourseProgress", [courseId, userId], this.courseProgressCleared, this.courseProgressClearError);
        }

        let userCourse: User_Course = this._cachedData.GetUserCourse(courseId);
        let userCurriculumData: UserLessonPlan = this._cachedData.getUserLessonPlanByID(curriculumId);        

        if (userCourse != null) {
            if (userCurriculumData != null) {
                userCurriculumData.LastUpdated = this.GetCurrentTimeStamp();
                userCurriculumData.StepsCompleted -= userCourse.Sequence_upto;
                let userCurriculumJson = userCurriculumData.toJson();
                this.post$("UpdateUserLessonPlan", [userCurriculumJson], true);
                this._cachedData.updateUserLessonPlan(userCurriculumData);
            }

            userCourse._Date = this.GetCurrentTimeStamp();
            userCourse.Date_finished = null;
            userCourse.Finished = false;
            userCourse.Sequence_upto = 0;
            userCourse.Questions_answered = 0;
            this._cachedData.UpdateUserCourse(userCourse);
        }
        this._cachedData.ClearCourseProgress(courseId);
    }

    private courseProgressCleared = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "userCourseDeletedSuccessfully")
        {
            this.dispatchEvent(new UberApplicationEvent("clearCourseProgressSuccessful"));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent("userCourseDeleteFailed"));
        }
    }
    private courseProgressClearError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("clearCourseProgressFailed"));
    }

    /*********************************************************************************************************************/
    public GetConfirmationPin(activationCode:string, email:string, productId:number):void
    {
        this.CallFunction("GetConfirmationPin", [activationCode, email, productId], this.confirmationPinSent, this.confirmationPinError);
    }
    private confirmationPinSent = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result == "Confirmation Email Sent")
        {
            this.dispatchEvent(new MessageEvent(MessageEvent.CONFIRMATION_PIN_SENT, "Confirmation Pin Sent Successfully"));
        }
        else
        {
            this.dispatchEvent(new MessageEvent(MessageEvent.CONFIRMATION_PIN_ERROR, responseJSONObject.error.message));
        }
    }
    private confirmationPinError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new MessageEvent(MessageEvent.CONFIRMATION_PIN_ERROR, errMsg));
    }
    
    public CheckEmailUsername(user:User):void
    {
        this.CallFunction("CheckEmailUsername", [user.toJson()], this.userDetailsAvailable, this.userDetailsError);
    }
    private userDetailsAvailable = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "usernameEmailAvailable")
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_DETAILS_AVAILABLE, null));
        }
        else if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_DETAILS_UNAVAILABLE, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_DETAILS_UNAVAILABLE, null, responseJSONObject.result.message));
        }
        else
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_DETAILS_UNAVAILABLE, null, "Error Occured"));
        }
    }
    private userDetailsError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_DETAILS_UNAVAILABLE, null, errMsg));
    }
    
    public UpdateUser(user:User):void
    {
        this.CallFunction("UpdateUser", [user.toJson()], this.userUpdated, this.userUpdateError);
    }
    private userUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_UPDATE_FAILED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_UPDATE_FAILED, null, responseJSONObject.result.message));
        }
        else
        {
            var user:User = User.fromJson(responseJSONObject.result);
            this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_UPDATED, user));
        }
    }
    private userUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.USER_UPDATE_FAILED, null, errMsg));
    }
    
    public UpdateUserProfilePic(profilePicString:string, userId:number):void
    {
        this.CallFunction("UpdateUserProfilePic", [profilePicString, userId], this.profilePicUplaoded, this.profilePicUplaodError);
    }
    private profilePicUplaoded = (responseJSONObject:any) =>
    {
        this.dispatchEvent(new UserProfilePicUpdateEvent(UserProfilePicUpdateEvent.PROFILE_PIC_UPDATED, responseJSONObject.result));
    }
    private profilePicUplaodError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        DevUtils.DisplayError(errObj, "profilePicUplaodError");
        this.dispatchEvent(new UserProfilePicUpdateEvent(UserProfilePicUpdateEvent.PROFILE_PIC_UPDATE_ERROR, null));
    }

    public AdminCreateHelpDeskTicket(firstName: string, lastName: string, email: string, schoolName: string, subject: string, description: string, fileName: string, base64Attachment: string):void
    {
        this.CallFunction("AdminCreateHelpDeskTicket", [firstName, lastName, email, schoolName, subject, description, fileName, base64Attachment], this.createHelpDeskTicketSuccess, this.createHelpDeskTicketFailed);
    }
    private createHelpDeskTicketSuccess = (responseJSONObject:any) =>
    {
        this.dispatchEvent(new TicketEvent(TicketEvent.TICKET_CREATED));
    }
    private createHelpDeskTicketFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new TicketEvent(TicketEvent.TICKET_ERROR));
    }

    public UpdateUserAppBackgroundImg(bgImageString:string, fileName:string, productId:number):void
    {
        this.CallFunction("UpdateUserAppBackgroundImage", [bgImageString, fileName, productId], this.bgImageUploaded, this.bgImageUploadError);
    }

    private bgImageUploaded = (responseJSONObject:any) =>
    {
        this.dispatchEvent(new UserAppBgImgUpdateEvent(UserAppBgImgUpdateEvent.BG_IMG_UPDATED, responseJSONObject.result));
    }

    private bgImageUploadError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UserAppBgImgUpdateEvent(UserAppBgImgUpdateEvent.BG_IMG_UPDATE_ERROR, null));
    }

    /*******************************************************************************************************************************/
    public GetImage(url:string, userId:number):void
    {
        this.CallFunction("GetImage", [userId, url], this.getImageSuccess, this.getImageFailed);
    }
    private getImageSuccess = (responseJSONObject:any) =>
    {
        this.dispatchEvent(new GetImageEvent(GetImageEvent.GET_IMAGE_SUCCESS, responseJSONObject.result.Image_Data));
    }
    private getImageFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new GetImageEvent(GetImageEvent.GET_IMAGE_FAILED, null));
    }

    /*******************************************************************************************************************************/
    public GetProfImage(url:string, userId:number):void
    {
        this.CallFunction("GetImage", [userId, url], this.getProfImageSuccess, this.getProfImageFailed);
    }
    private getProfImageSuccess = (responseJSONObject:any) =>
    {
        this.dispatchEvent(new GetImageEvent(GetImageEvent.GET_PROF_IMAGE_SUCCESS, responseJSONObject.result.Image_Data));
    }
    private getProfImageFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new GetImageEvent(GetImageEvent.GET_PROF_IMAGE_FAILED, null));
    }
    /*******************************************************************************************************************************/
    
    public ImportTextDoc(textDocString:string, fileName:string, userId:number, productId:number):void
    {
        this.CallFunction("ImportTextDoc2", [textDocString, fileName, userId, productId], this.textDocImported, this.textDocImportError);
    }
    public GetHtmlText(urlString:string):void
    {
        this.CallFunction("GetHtmlText", [urlString], this.textDocImported, this.textDocImportError);
    }
    private textDocImported = (responseJSONObject:any) =>
    {
        var text:Text = Text.fromJson(responseJSONObject.result);
        this.dispatchEvent(new ImportTextDocumentEvent(ImportTextDocumentEvent.TEXT_IMPORTED, text));
    }
    private textDocImportError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ImportTextDocumentEvent(ImportTextDocumentEvent.TEXT_IMPORT_FAILED, null));
    }
    
    public UpdateUserWordImage(wordImageString:string, wordString:string, userId:number):void
    {
        this.CallFunction("UpdateUserWordImage", [wordImageString, wordString, userId], this.wordImageUploaded, this.wordImageUpdateError);
    }
    private wordImageUploaded = (responseJSONObject:any) =>
    {
        this.dispatchEvent(new UberApplicationEvent(EventTypes.WORD_IMAGE_UPLOADED));
    }
    private wordImageUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent(EventTypes.WORD_IMAGE_UPLOAD_ERROR));
    }

    public DeleteUserWordImage(wordString:string, userId:number):void
    {
        this.CallFunction("DeleteUserWordImage", [wordString, userId], this.wordImageDeleted, this.wordImageDeleteError);
    }
    private wordImageDeleted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "wordImageDeleted")
        {
            this.dispatchEvent(new UberApplicationEvent("wordImageDeleted"));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent("wordImageDeleteError"));
        }
    }
    private wordImageDeleteError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("wordImageDeleteError"));
    }
    /*********************************************************************************************************************/
    //Local Cache calls
    public SelectAllActivityCategories():Activity_Category[]
    {
        return this._cachedData.ActivityCategories;
    }

    public SelectAllChartCategories():Chart_Category[]
    {
        return this._cachedData.ChartCategories;
    }

    public GetCourseCategoriesByLessonPlanId(lessonPlanId:number): Course_Category[] {
        return this._cachedData.getCourseCategoryByLessonPlanId(lessonPlanId);
    }

    public GetLessonPlanById(lessonPlanId:number): Lesson_Plan {
        return this._cachedData.getLessonPlanById(lessonPlanId);
    }

    public SelectAllLessonPlans(): ProxyLessonPlan[] {
        return this._cachedData.LessonPlans;
    }

    public SelectAllCourseCategories():Course_Category[]
    {
        return this._cachedData.CourseCategories;
    }

    public SelectAllDefaultSetting():Setting[]
    {
        return this._cachedData.DefaultSettings;
    }

    public SelectAllUserSettings():Setting[]
    {
        return this._cachedData.UserSettings;
    }

    public SelectAllGroupSettings():Setting[]
    {
        return this._cachedData.GroupSettings;
    }
    /*********************************************************************************************************************/
    public InsertSetting(setting:Setting):void
    {
        this._cachedData.InsertUserSetting(setting);
        this.CallFunction("UpdateSetting", [setting.toJson()], this.settingUpdated, this.settingInsertError, true);
    }

    public UpdateSetting(setting:Setting):void
    {
        this._cachedData.UpdateUserSetting(setting);
        this.CallFunction("UpdateSetting", [setting.toJson()], this.settingUpdated, this.settingUpdateError, true);
    }

    public UpdateSettings(settings:Setting[]):void
    {
        let JsonSettings = [];
        for(let setting of settings) {
            JsonSettings.push(setting.toJson());
            this._cachedData.InsertUserSetting(setting);
            this._cachedData.UpdateUserSetting(setting);
        }        
        this.CallFunction("UpdateSettings", [JsonSettings], this.settingUpdated, this.settingUpdateError, true);
    }

    private settingUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new UberApplicationEvent("settingUpdateFailed"));
        }
        else if (responseJSONObject.result != null || responseJSONObject.result == "settingUpdatedSuccessfully")
        {
            this.dispatchEvent(new UberApplicationEvent("settingUpdateSuccessful"));
        }
    }
    private settingInsertError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("settingInsertFailed"));
    }
    private settingUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("settingUpdateFailed"));
    }

    /*********************************************************************************************************************/
    /*public InsertWordUser(wordUser:Word_User):void
    {
        wordUser.Last_updated = GetCurrentTimeStamp();
        _cachedData.UpdateWordUser(wordUser);
        CallFunction("UpdateWordUser", [wordUser.toJson()], wordUserUpdated, wordUserInsertError);
    }*/
    public UpdateWordUsers(wordUsers:Word_User[]):void
    {
        var wordUserJsonObjects:any[] = new Array<Object>();
        var timestamp:Date = this.GetCurrentTimeStamp();
        for (var wordUser of wordUsers)
        {
            wordUser.Last_updated = timestamp;
            this._cachedData.UpdateWordUser(wordUser);
            wordUserJsonObjects.push(wordUser.toJson());
        }
        this.CallFunction("UpdateWordUsers", [wordUserJsonObjects], this.wordUsersUpdated, this.wordUsersUpdateError);
    }
    private wordUsersUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "wordUserUpdateSuccessful")
        {
            this.dispatchEvent(new UberApplicationEvent("wordUserUpdateSuccessful"));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent("wordUserUpdateFailed"));
        }
    }
    /*private wordUsersInsertError(errMsg:string):void
    {
        dispatchEvent(new UberApplicationEvent("wordUserInsertFailed"));
    }*/
    private wordUsersUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("wordUserUpdateFailed"));
    }

    /*********************************************************************************************************************/
    public InsertWordDiscover(wordDiscover:Word_Discover, userId:number):void
    {
        this.CallFunction("InsertWordDiscover2", [wordDiscover.toJson(), userId], this.wordDiscoverInserted, this.wordDiscoverInsertError);
    }
    private wordDiscoverInserted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WordDiscoverEvent(WordDiscoverEvent.WORD_DISCOVER_INSERT_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new WordDiscoverEvent(WordDiscoverEvent.WORD_DISCOVER_INSERT_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var wordDiscover:Word_Discover = Word_Discover.fromJson(responseJSONObject.result);
            this._cachedData.InsertWordDiscover(wordDiscover);
            this.dispatchEvent(new WordDiscoverEvent(WordDiscoverEvent.WORD_DISCOVER_INSERTED, wordDiscover));
        }
    }
    //private wordDiscoverInsertError(errMsg:string="Error inserting word discover on server"):void
    private wordDiscoverInsertError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WordDiscoverEvent(WordDiscoverEvent.WORD_DISCOVER_INSERT_ERROR, null, errMsg));
    }

    /*********************************************************************************************************************/
    public UpdateWordDiscover(wordDiscover:Word_Discover, userID:number):void
    {
        wordDiscover.Last_updated = this.GetCurrentTimeStamp();
        this._cachedData.UpdateWordDiscover(wordDiscover);
        this.CallFunction("UpdateWordDiscoverDetails2", [wordDiscover.toJson(), userID], this.wordDiscoverUpdated, this.wordDiscoverUpdateError);
    }
    private wordDiscoverUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "wordDiscoverUpdateSuccessful")
        {
            this.dispatchEvent(new UberApplicationEvent("wordDiscoverUpdateSuccessful"));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent("wordDiscoverUpdateFailed"));
        }
    }
    private wordDiscoverUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("wordDiscoverUpdateFailed"));
    }

    /*********************************************************************************************************************/
    public UpdateWordDiscoversTable(userId:number):void
    {
        var wordDiscoverStatusList:any[] = new Array<Object>();
        for (var wd of this._cachedData.WordDiscovers)
        {
            wordDiscoverStatusList.push(wd.GetStatusData());
        }
        this.CallFunction("UpdateWordDiscoversTable2", [wordDiscoverStatusList, userId], this.wordDiscoversTableUpdated, this.wordDiscoversTableUpdateError);
    }
    private wordDiscoversTableUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "wordDiscoverTableUpdateSuccessful")
        {
            this.dispatchEvent(new UberApplicationEvent("wordDiscoverTableUpdateSuccessful"));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent("wordDiscoverTableUpdateFailed"));
        }
    }
    private wordDiscoversTableUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("wordDiscoverTableUpdateFailed"));
    }

    /*********************************************************************************************************************/
    public InsertUserPref(userPref:UserPref):void
    {
        this._cachedData.UpdateUserPref(userPref);
        this.CallFunction("UpdateUserPref", [userPref.toJson()], this.userPrefUpdated, this.userPrefInsertError, true);
    }
    public UpdateUserPref(userPref:UserPref):void
    {
        userPref.Last_updated = this.GetCurrentTimeStamp();
        this._cachedData.UpdateUserPref(userPref);
        this.CallFunction("UpdateUserPref", [userPref.toJson()], this.userPrefUpdated, this.userPrefUpdateError, true);
    }

    public UpdateUserPrefs(userPrefs:UserPref[]):void
    {
        var userPrefArray:any[] = new Array<Object>();
        for (var up of userPrefs)
        {
            up.Last_updated = this.GetCurrentTimeStamp();
            this._cachedData.UpdateUserPref(up);
            userPrefArray.push(up.toJson());
        }
        
        this.CallFunction("UpdateUserPrefs", [userPrefArray], this.userPrefUpdated, this.userPrefUpdateError, true);
    }
    private userPrefUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "userPrefUpdateSuccessful")
        {
            this.dispatchEvent(new UberApplicationEvent("userPrefUpdateSuccessful"));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent("userPrefUpdateFailed"));
        }
    }
    private userPrefInsertError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("userPrefInsertFailed"));
    }
    private userPrefUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("userPrefUpdateFailed"));
    }
    
    public GetUserStatusPoints(userId:number, productId:number):void
    {
        this.CallFunction("GetUserStatusPoints", [userId, productId], this.userStatusPointsReceived, this.userStatusPointsReceiveError, true);
    }
    private userStatusPointsReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR));
        }
        else
        {   
            let userStatusPoints: UserStatusPoints = UserStatusPoints.fromJson(responseJSONObject.result.User_Status_Points);
            this._cachedData.UserStatusPoints = userStatusPoints;
            this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_RECEIVED, userStatusPoints.Total));
        }
    }
    private userStatusPointsReceiveError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR));
    }

    //DEPRECATED STARTING AUGUST 2019 VERSION:
    public GetTotalStatusPoints(userId:number, productId:number):void
    {
        this.CallFunction("GetTotalStatusPoints", [userId, productId], this.statusPointsReceived, this.statusPointsReceiveError, true);
    }
    private statusPointsReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && typeof responseJSONObject.result === "number")
        {
            this._cachedData.StatusPoints = responseJSONObject.result;
            this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_RECEIVED, this._cachedData.StatusPoints));
        }
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR, 0));
        }
        else
        {
            this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR, 0));
        }
    }
    private statusPointsReceiveError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR, 0));
    }
    
    //DEPRECATED STARTING AUGUST 2019 VERSION:
    public AddStatusPoints(statusPoints:number, userId:number, productId:number):number
    {
        this.CallFunction("AddStatusPoints", [statusPoints, userId, productId], this.statusPointsAdded, this.statusPointsAddError, true);
        return this._cachedData.StatusPoints;
    }
    private statusPointsAdded = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && typeof responseJSONObject.result === "number")
        {
            DevUtils.LogFunction("ACCESS REMOTE", "statusPointsAdded", [responseJSONObject]);
            this._cachedData.StatusPoints = responseJSONObject.result;
            this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_ADDED, this._cachedData.StatusPoints));
        }
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_ADD_ERROR, 0));
        }
        else
        {
            this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_ADD_ERROR, 0));
        }
    }
    private statusPointsAddError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_ADD_ERROR, 0));
    }

    public AddStatusPoints2(statusPoints:number, userId:number, productId:number): void
    {
        this.CallFunction("AddStatusPoints2", [statusPoints, userId, productId], this.statusPointsAdded2, this.statusPointsAddError2, true);
    }
    private statusPointsAdded2 = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null && typeof responseJSONObject.result === "number")
        {
            this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_ADD_ERROR));
            
        }
        else
        {
            DevUtils.LogFunction("ACCESS REMOTE", "statusPointsAdded", [responseJSONObject]);
            let userStatusPoints: UserStatusPoints = UserStatusPoints.fromJson(responseJSONObject.result.User_Status_Points);
            this._cachedData.UserStatusPoints = userStatusPoints;
            this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_ADDED, userStatusPoints.Total));
        }
    }
    private statusPointsAddError2 = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new StatusPointsEvent(StatusPointsEvent.STATUS_POINTS_ADD_ERROR));
    }
    
    
    public SendFeedback(feedback:Feedback):void
    {
        this.CallFunction("SendFeedback", [feedback.toJson()], this.feedbackSent, this.feedbackSendError);
    }
    private feedbackSent = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "feedbackInserted")
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.FEEDBACK_SENT));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.FEEDBACK_SEND_ERROR));
        }
    }

    private feedbackSendError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.FEEDBACK_SEND_ERROR));
    }
    /*********************************************************************************************************************/
    public WikiSearch(keyword:string, limit:number, user:string, password:string, site:string):void
    {
        var encodedKeyword:string = StringUtils.EncodeToJSONUri(keyword);
        var encodedUser:string = StringUtils.EncodeToJSONUri(user);
        var encodedPassword:string = StringUtils.EncodeToJSONUri(password);
        var encodedSite:string = StringUtils.EncodeToJSONUri(site);
        this.CallFunction("WikiSearch", [encodedKeyword, limit, encodedUser, encodedPassword, encodedSite], this.wikiSearchReceived, this.wikiSearchError);
    }
    private wikiSearchReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WikiServiceEvent(WikiServiceEvent.WIKI_SEARCH_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new WikiServiceEvent(WikiServiceEvent.WIKI_SEARCH_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var resultsList:string[] = new Array<string>();
            for (var encodedWikiResult of responseJSONObject.result)
            {
                var wikiResult:string = StringUtils.DecodeFromJSONUri(encodedWikiResult);
                resultsList.push(wikiResult);
            }
            this.dispatchEvent(new WikiServiceEvent(WikiServiceEvent.WIKI_SEARCH_RESULTS, resultsList));
        }
    }
    private wikiSearchError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WikiServiceEvent(WikiServiceEvent.WIKI_SEARCH_ERROR, null, "Unable to connect to wiki service"));
    }

    public WikiGetArticle(title:string, user:string, password:string, site:string):void
    {
        var encodedTitle:string = StringUtils.EncodeToJSONUri(title);
        var encodedUser:string = StringUtils.EncodeToJSONUri(user);
        var encodedPassword:string = StringUtils.EncodeToJSONUri(password);
        var encodedSite:string = StringUtils.EncodeToJSONUri(site);
        this.CallFunction("WikiGetArticle", [encodedTitle, encodedUser, encodedPassword, encodedSite], this.wikiArticleReceived, this.wikiArticleError);
    }
    private wikiArticleReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WikiServiceEvent(WikiServiceEvent.WIKI_SEARCH_ERROR, null, responseJSONObject.error.message));
        }
        else if ((typeof responseJSONObject.result === "string") == false)
        {
            this.dispatchEvent(new WikiServiceEvent(WikiServiceEvent.WIKI_SEARCH_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var wikiArticle:string = StringUtils.DecodeFromJSONUri(responseJSONObject.result);
            this.dispatchEvent(new WikiServiceEvent(WikiServiceEvent.WIKI_ARTICLE_RESULT, wikiArticle));
        }
    }
    private wikiArticleError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WikiServiceEvent(WikiServiceEvent.WIKI_ARTICLE_ERROR, null, "Error connecting to wiki service"));
    }

    /*********************************************************************************************************************/
    public DeleteUserPreferences(userId:number, controlRefs:string[]):void
    {
        this._cachedData.DeleteUserPreferences(controlRefs);
        this.CallFunction("DeleteUserPreferences", [controlRefs, userId], this.userPreferencesDeleted, this.userPreferencesDeleteError);
    }
    private userPreferencesDeleted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "userPreferencesDeletedSuccessfully")
        {
            this.dispatchEvent(new UberApplicationEvent("userPreferenceDeleteSuccessful"));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent("userPreferenceDeleteError"));
        }
    }
    private userPreferencesDeleteError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("userPreferenceDeleteError"));
    }

    /*********************************************************************************************************************/
    public DeleteWordlist(wordlistId:number, userId:number):void
    {
        this.CallFunction("DeleteWordlist", [wordlistId, userId], this.wordlistDeleted, this.wordlistDeleteError);
    }
    private wordlistDeleted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORDLIST_DELETED));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORDLIST_DELETED));
        }
        else
        {
            var proxyWordlist:ProxyWordlist = ProxyWordlist.fromJson(responseJSONObject.result);
            this._cachedData.DeleteWordlist(proxyWordlist.Wordlist_id);
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORDLIST_DELETED));
        }
    }
    private wordlistDeleteError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new MessageEvent(UberApplicationEventTypes.WORDLIST_DELETE_ERROR, errMsg));
    }
    
    public RenameWordlist(wordlistId:number, userId:number, name:string):void
    {
        this.CallFunction("RenameWordlist", [wordlistId, userId, name], this.wordlistRenamed, this.wordlistRenameError);
    }
    private wordlistRenamed = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORDLIST_DELETED));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORDLIST_DELETED));
        }
        else
        {
            var proxyWordlist:ProxyWordlist = ProxyWordlist.fromJson(responseJSONObject.result);
            this._cachedData.RenameWordlist(proxyWordlist);
            this.dispatchEvent(new ProxyWordlistEvent(ProxyWordlistEvent.WORDLIST_RENAMED, proxyWordlist));
        }
    }
    private wordlistRenameError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ProxyWordlistEvent(ProxyWordlistEvent.WORDLIST_RENAME_ERROR, null, errMsg));
    }

    /*********************************************************************************************************************/
    private wordsToDelete:DictionaryNumber<number[]> = {};
    public DeleteWordlistWordsByWord_Wordlist(wordlistId:number, wordIds:number[], userId:number):void
    {
        this.wordsToDelete[this.CallFunction("DeleteWordlistWords2", [wordlistId, wordIds, userId], this.wordlistWordsDeleted, this.wordlistWordsDeleteError)] = wordIds;//{WordlistId: wordlistId, WordIds: wordIds};
        //_cachedData.DeleteWordlistWords(wordlistId, wordIds);
    }
    private wordlistWordsDeleted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null)
        {
            var id:number = responseJSONObject.id;

            var wordIds:number[] = new Array<number>();
            //var wordIds:number[] = wordsToDelete[id].WordIds;
            var wordlistId:number;// = wordsToDelete[id].WordlistId;
            for (var word of responseJSONObject.result)
            {
                wordIds.push(word.Word_id);
                wordlistId = word.Wordlist_id;
            }

            this._cachedData.DeleteWordlistWords(wordlistId, wordIds);

            this.wordsToDelete[id] = null;
            this.dispatchEvent(new DeleteWordEvent(DeleteWordEvent.WORDLIST_WORD_DELETE_SUCCESS));
        }
        else
        {
            for (var wordId of this.wordsToDelete[id])
            {
                this._cachedData.GetWord(wordId).ToBeDeleted = false;
            }
            this.wordsToDelete[id] = null;
            this.dispatchEvent(new DeleteWordEvent(DeleteWordEvent.WORDLIST_WORD_DELETE_ERROR));
        }
    }
    private wordlistWordsDeleteError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        if(id > 0)
        {
            for (var wordId of this.wordsToDelete[id])
            {
                this._cachedData.GetWord(wordId).ToBeDeleted = false;
            }
            this.wordsToDelete[id] = null;
        }
        this.dispatchEvent(new DeleteWordEvent(DeleteWordEvent.WORDLIST_WORD_DELETE_ERROR));
    }

    /*********************************************************************************************************************/
    /*public UpdateWordSense(wordSense:Word_Sense):void
    {
        CallFunction("UpdateWordSense", [wordSense.toJson()], wordSenseUpdated, wordSenseUpdateError);
    }
    private wordSenseUpdated(responseJSONObject:any):void
    {
        if (responseJSONObject.error != null && responseJSONObject.error.message == "Validation Error")
        {
            dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_UPDATE_ERROR, WordSenseEvent.WORD_SENSE_VALIDATION_ERROR, responseJSONObject.error.data));
        }
        else if (responseJSONObject.error != null)
        {
            dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_UPDATE_ERROR));
        }
        else if (responseJSONObject.result.code != null)
        {
            dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_UPDATE_ERROR));
        }
        else
        {
            var wordSense:Word_Sense = Word_Sense.fromJson(responseJSONObject.result);
            _cachedData.UpdateWordSense(wordSense);
            dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_UPDATED));
        }
    }
    private wordSenseUpdateError(errMsg:string, errObj:any=null, id:number=0):void
    {
        dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_UPDATE_ERROR));
    }*/
    
    public UpdateWordSense2(wordSense:Word_Sense, word_Id:number, pos:string):void
    {
        this.CallFunction("UpdateWordSense2", [wordSense.toJson(), word_Id, pos], this.wordSenseUpdated, this.wordSenseUpdateError);
    }
    private wordSenseUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null && responseJSONObject.error.message == "Validation Error")
        {
            this.dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_UPDATE_ERROR, WordSenseEvent.WORD_SENSE_VALIDATION_ERROR, responseJSONObject.error.data));
        }
        else if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_UPDATE_ERROR));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_UPDATE_ERROR));
        }
        else
        {
            /*var wordSense:Word_Sense = Word_Sense.fromJson(responseJSONObject.result);
            _cachedData.UpdateWordSense(wordSense);*/
            var wordPosFromServer:Word_Pos = Word_Pos.fromJson(responseJSONObject.result.Word_pos);
            //var wordPosVector:Word_Pos[] = new Word_Pos[]();
            //wordPosVector.push(wordPosFromServer);
            var oldWordPosId:number;
            if(responseJSONObject.result.Old_word_pos_id != null)
            {
                oldWordPosId = responseJSONObject.result.Old_word_pos_id;
            }
            this._cachedData.UpdateWord_SingleWordPos(wordPosFromServer, oldWordPosId);
            this.dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_UPDATED));
        }
    }
    private wordSenseUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WordSenseEvent(WordSenseEvent.WORD_SENSE_UPDATE_ERROR));
    }

    /*********************************************************************************************************************/
    public DeleteWordSense(wordSense:Word_Sense):void
    {
        this.CallFunction("DeleteWordSense", [wordSense.Word_sense_id], this.wordSenseDeleted, this.wordSenseDeleteError);
        this._cachedData.DeleteWordSense(wordSense);
    }
    private wordSenseDeleted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "wordSenseDeleted")
        {
            this.dispatchEvent(new UberApplicationEvent("wordSenseDeleted"));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent("wordSenseDeleteError"));
        }
    }
    private wordSenseDeleteError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent("wordSenseDeleteError"));
    }

    /*********************************************************************************************************************/
    public CreateWord(wordText:string, userId:number):void
    {
        this.CallFunction("CreateWord", [wordText, userId], this.wordCreated, this.wordCreationFailed);
    }
    private wordCreated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null && responseJSONObject.error.message == "Word already exists")
        {
            var existingWord:Word = Word.fromJson(responseJSONObject.error.data);
            this._cachedData.InsertWord(existingWord);
            this.dispatchEvent(new WordEvent(WordEvent.WORD_CREATION_ERROR, existingWord, "wordExists"));
        }
        else if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WordEvent(WordEvent.WORD_CREATION_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new WordEvent(WordEvent.WORD_CREATION_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var word:Word = Word.fromJson(responseJSONObject.result);
            this._cachedData.InsertWord(word);
            this.dispatchEvent(new WordEvent(WordEvent.WORD_CREATED, word));
        }
    }
    //private wordCreationFailed(errMsg:string="Error creating word on server"):void
    private wordCreationFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WordEvent(WordEvent.WORD_CREATION_ERROR, null, errMsg));
    }

    /*********************************************************************************************************************/
    public SearchWordByText(wordText:string, wordlistId:number, userId:number):void
    {
        //can't add trial condition here since we need the response object of the word

        this.CallFunction("GetWord3", [wordText, userId, (wordlistId != null ? wordlistId : null)], this.wordFound, this.WordLookupError);
    }

    //private SearchWordByText2Subject:Subject<WordEvent> = new Subject<WordEvent>();
    public SearchWordByText2(wordText:string, successCallback:Function=null, failureCallback:Function=null):Observable<WordEvent>
    {        
        this.CallFunction("GetWord4", [wordText], this.wordFound, this.WordLookupError, false, successCallback, failureCallback);
        return null;
        //return this.SearchWordByText2Subject;
    }

    private wordFound = (responseJSONObject:any):WordEvent =>
    {
        if (responseJSONObject.error != null && responseJSONObject.error.message == "Word Not Found")
        {
            this.dispatchEvent(new WordEvent(WordEvent.WORD_LOOKUP_ERROR, null, WordEvent.WORD_NOT_FOUND));
            return new WordEvent(WordEvent.WORD_LOOKUP_ERROR, null, WordEvent.WORD_NOT_FOUND);
        }
        else if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WordEvent(WordEvent.WORD_LOOKUP_ERROR, null, responseJSONObject.error.message));
            return new WordEvent(WordEvent.WORD_LOOKUP_ERROR, null, responseJSONObject.error.message);
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new WordEvent(WordEvent.WORD_LOOKUP_ERROR, null, responseJSONObject.result.message));
            return new WordEvent(WordEvent.WORD_LOOKUP_ERROR, null, responseJSONObject.result.message);
        }
        else
        {
            var word:Word = Word.fromJson(responseJSONObject.result.Word);
            var errMsg:string = responseJSONObject.result.InsertResult ? responseJSONObject.result.InsertResult.Status : "";
            this._cachedData.InsertWord(word);

            if(responseJSONObject.result.WordUser)
            {
                var wordUser:Word_User = Word_User.fromJson(responseJSONObject.result.WordUser);
                wordUser.Last_updated = this.GetCurrentTimeStamp();
                this._cachedData.UpdateWordUser(wordUser);
            }

            if(responseJSONObject.result.InsertResult && responseJSONObject.result.InsertResult.Status == "Word added")
            {
                if(responseJSONObject.result.InsertResult.Wordlist_Word)
                {
                    var wordlistWord:Wordlist_Word = Wordlist_Word.fromJson(responseJSONObject.result.InsertResult.Wordlist_Word);

                    if(wordlistWord.Wordlist_id == UberApplication.GetInstance().CurrentWordlist.Wordlist_id)
                    {
                        this._cachedData.InsertWordlistWord(wordlistWord);
                    }
                }
            }

            var wordToSearch:string = responseJSONObject.result.Search_word ? responseJSONObject.result.Search_word : "";
            this.dispatchEvent(new WordEvent(WordEvent.WORD_FOUND, word, errMsg, wordToSearch));
            //this.SearchWordByText2Subject.next(new WordEvent(WordEvent.WORD_FOUND, word, errMsg, wordToSearch));
            return new WordEvent(WordEvent.WORD_FOUND, word, errMsg, wordToSearch);
        }
    }

    private WordLookupError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WordEvent(WordEvent.WORD_LOOKUP_ERROR, null, errMsg));
        return new WordEvent(WordEvent.WORD_LOOKUP_ERROR, null, errMsg);
    }

    /*********************************************************************************************************************/
    private wordToDelete:DictionaryNumber<number> = {};
    public DeleteWord(word:Word):void
    {
        this.wordToDelete[this.CallFunction("DeleteWord", [word.Word_id, word.User_id], this.wordDeleted, this.wordDeleteError)] = word.Word_id;
        //_cachedData.DeleteWord(word.Word_id);
    }
    private wordDeleted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null)
        {
            this._cachedData.DeleteWord(this.wordToDelete[responseJSONObject.id]);
            this.wordToDelete[responseJSONObject.id] = null;
            this.dispatchEvent(new DeleteWordEvent(DeleteWordEvent.WORDLIST_WORD_DELETE_SUCCESS));
        }
        else
        {
            this._cachedData.GetWord(this.wordToDelete[responseJSONObject.id]).ToBeDeleted = false;
            this.wordToDelete[responseJSONObject.id] = null;
            this.dispatchEvent(new DeleteWordEvent(DeleteWordEvent.WORDLIST_WORD_DELETE_ERROR));
        }
    }
    private wordDeleteError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        if(id > 0)
        {
            this._cachedData.GetWord(this.wordToDelete[id]).ToBeDeleted = false;
            this.wordToDelete[id] = null;
        }
        this.dispatchEvent(new DeleteWordEvent(DeleteWordEvent.WORDLIST_WORD_DELETE_ERROR));
    }

    /*********************************************************************************************************************/
    public SelectAllWordsByText(wordText:string, userId:number):void
    {
        this.CallFunction("GetWordsStartingWith", [wordText, userId], this.wordsFound, this.wordLookupError);
    }
    private wordsFound = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null && responseJSONObject.error.message == "No Words Found")
        {
            this.dispatchEvent(new WordsLookupEvent(WordsLookupEvent.WORDS_LOOKUP_ERROR, responseJSONObject.error.data, null, WordsLookupEvent.NO_WORDS_FOUND_ERROR));
        }
        else if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WordsLookupEvent(WordsLookupEvent.WORDS_LOOKUP_ERROR, null, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new WordsLookupEvent(WordsLookupEvent.WORDS_LOOKUP_ERROR, null, null, responseJSONObject.result.message));
        }
        else
        {
            var words:string[] = new Array<string>();
            for (var word of responseJSONObject.result.Words)
            {
                words.push(StringUtils.DecodeFromJSONUri(word));
                /*var word:Word = Word.fromJson(wordJson);
                words.push(word);
                _cachedData.InsertWord(word);*/
            }
            this.dispatchEvent(new WordsLookupEvent(WordsLookupEvent.WORDS_FOUND, StringUtils.DecodeFromJSONUri(responseJSONObject.result.LookupString), words));
        }
    }
    private wordLookupError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WordsLookupEvent(WordsLookupEvent.WORDS_LOOKUP_ERROR, null, null, errMsg));
    }

    /*********************************************************************************************************************/
    public GetWordlistShareSettings(userId:number, wordlistId:number):void
    {
        this.CallFunction("GetWordlistShareSettings", [wordlistId, userId], this.wordlistSharedSettingsReceived, this.wordlistSharedSettingsError);
    }
    private wordlistSharedSettingsReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WordlistShareSettingsEvent(WordlistShareSettingsEvent.WORDLIST_SHARE_SETTINGS_ERROR, -1, null, null, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new WordlistShareSettingsEvent(WordlistShareSettingsEvent.WORDLIST_SHARE_SETTINGS_ERROR, -1, null, null, null, responseJSONObject.result.message));
        }
        else
        {
            var wordlistId:number = responseJSONObject.result.WordlistId;
            var usersShared:User_Shared_Object[] = new Array<User_Shared_Object>();
            for (var sharedUsers of responseJSONObject.result.UsersShared)
            {
                var us:User_Shared_Object = User_Shared_Object.fromJson(sharedUsers);
                usersShared.push(us);
            }

            var groupsShared:Group_Shared_Object[] = new Array<Group_Shared_Object>();
            for (var sharedGroup of responseJSONObject.result.GroupsShared)
            {
                var gs:Group_Shared_Object = Group_Shared_Object.fromJson(sharedGroup);
                groupsShared.push(gs);
            }

            var groupsCanShareWith:Group[] = new Array<Group>();
            for (var groupCanShareWithObject of responseJSONObject.result.GroupsCanShare)
            {
                var g:Group = Group.fromJson(groupCanShareWithObject);
                groupsCanShareWith.push(g);
            }
            this.dispatchEvent(new WordlistShareSettingsEvent(WordlistShareSettingsEvent.WORDLIST_SHARE_SETTINGS_SUCCESS, wordlistId, usersShared, groupsShared, groupsCanShareWith));
        }
    }
    private wordlistSharedSettingsError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WordlistShareSettingsEvent(WordlistShareSettingsEvent.WORDLIST_SHARE_SETTINGS_ERROR, -1, null, null, null, errMsg));
    }
    
    public ShareText(textId:number, userId:number, userStrings:string[], groupIds:number[], canEdit:boolean, productId:number):void
    {
        this.CallFunction("ShareText", [textId, userId, userStrings, groupIds, canEdit, productId], this.textShared, this.textShareError);
    }
    private textShared = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new TextShareSettingsEvent(TextShareSettingsEvent.TEXT_SHARE_ERROR, -1, null, null, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new TextShareSettingsEvent(TextShareSettingsEvent.TEXT_SHARE_ERROR, -1, null, null, null, responseJSONObject.result.message));
        }
        else
        {
            var textId:number = responseJSONObject.result.TextId;
            var usersShared:User_Shared_Object[] = new Array<User_Shared_Object>();
            for (var sharedUsers of responseJSONObject.result.UsersShared)
            {
                var us:User_Shared_Object = User_Shared_Object.fromJson(sharedUsers);
                usersShared.push(us);
            }

            var groupsShared:Group_Shared_Object[] = new Array<Group_Shared_Object>();
            for (var sharedGroup of responseJSONObject.result.GroupsShared)
            {
                var gs:Group_Shared_Object = Group_Shared_Object.fromJson(sharedGroup);
                groupsShared.push(gs);
            }

            var groupsCanShareWith:Group[] = new Array<Group>();
            for (var groupCanShareWithObject of responseJSONObject.result.GroupsCanShare)
            {
                var g:Group = Group.fromJson(groupCanShareWithObject);
                groupsCanShareWith.push(g);
            }

            var userShareErrors:string[] = new Array<string>();
            for (var userString of responseJSONObject.result.UserErrors)
            {
                userShareErrors.push(userString);
            }

            this.dispatchEvent(new TextShareSettingsEvent(TextShareSettingsEvent.TEXT_SHARE_SUCCESS, textId, usersShared, groupsShared, groupsCanShareWith, null, userShareErrors/*, groupShareErrors*/));
        }
    }
    private textShareError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new TextShareSettingsEvent(TextShareSettingsEvent.TEXT_SHARE_ERROR, -1, null, null, null, errMsg));
    }
    
    
    public ShareWordlist(wordlistId:number, userId:number, userStrings:string[], groupIds:number[], canEdit:boolean):void
    {
        this.CallFunction("ShareWordlist", [wordlistId, userId, userStrings, groupIds, canEdit], this.wordlistShared, this.wordlistShareError);
    }
    private wordlistShared = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new WordlistShareSettingsEvent(WordlistShareSettingsEvent.WORDLIST_SHARE_ERROR, -1, null, null, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new WordlistShareSettingsEvent(WordlistShareSettingsEvent.WORDLIST_SHARE_ERROR, -1, null, null, null, responseJSONObject.result.message));
        }
        else
        {
            var wordlistId:number = responseJSONObject.result.WordlistId;
            var usersShared:User_Shared_Object[] = new Array<User_Shared_Object>();
            for (var sharedUsers of responseJSONObject.result.UsersShared)
            {
                var us:User_Shared_Object = User_Shared_Object.fromJson(sharedUsers);
                usersShared.push(us);
            }

            var groupsShared:Group_Shared_Object[] = new Array<Group_Shared_Object>();
            for (var sharedGroup of responseJSONObject.result.GroupsShared)
            {
                var gs:Group_Shared_Object = Group_Shared_Object.fromJson(sharedGroup);
                groupsShared.push(gs);
            }

            var groupsCanShareWith:Group[] = new Array<Group>();
            for (var groupCanShareWithObject of responseJSONObject.result.GroupsCanShare)
            {
                var g:Group = Group.fromJson(groupCanShareWithObject);
                groupsCanShareWith.push(g);
            }

            var userShareErrors:string[] = new Array<string>();
            for (var userString of responseJSONObject.result.UserErrors)
            {
                userShareErrors.push(userString);
            }
            /*var groupShareErrors:Dictionary = {};
            for (var groupShareError of responseJSONObject.result.GroupErrors)
            {
                groupShareErrors[groupShareError.GroupId] = groupShareError.Message;
                //groupShareErrors.push(groupShareError);
            }*/

            this.dispatchEvent(new WordlistShareSettingsEvent(WordlistShareSettingsEvent.WORDLIST_SHARE_SUCCESS, wordlistId, usersShared, groupsShared, groupsCanShareWith, null, userShareErrors/*, groupShareErrors*/));
        }
    }
    private wordlistShareError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WordlistShareSettingsEvent(WordlistShareSettingsEvent.WORDLIST_SHARE_ERROR, -1, null, null, null, errMsg));
    }
    
    public DeleteSharedObject(sharedObjectId:number, userId:number):void
    {
        this._cachedData.DeleteSharedText(sharedObjectId);
        this.CallFunction("DeleteSharedObject", [sharedObjectId, userId], this.sharedObjectDeleted, this.sharedObjectDeleteError);
    }
    private sharedObjectDeleted = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "sharedObjectDeleted")
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.SHARED_OBJECT_DELETED));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.SHARED_OBJECT_DELETE_ERROR));
        }
    }
    private sharedObjectDeleteError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.SHARED_OBJECT_DELETE_ERROR));
    }
    
    public UpdateObjectShareSettings(sharedObjectId:number, userId:number, canEdit:boolean):void
    {
        this.CallFunction("UpdateObjectShareSettings", [sharedObjectId, userId, canEdit], this.sharedObjectUpdated, this.sharedObjectUpdateError);
    }
    private sharedObjectUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new SharedObjectEvent(SharedObjectEvent.SHARED_OBJECT_UPDATE_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new SharedObjectEvent(SharedObjectEvent.SHARED_OBJECT_UPDATE_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var sharedObject:Shared_Object = Shared_Object.fromJson(responseJSONObject.result);
            this.dispatchEvent(new SharedObjectEvent(SharedObjectEvent.SHARED_OBJECT_UPDATED, sharedObject));
        }
    }
    private sharedObjectUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new SharedObjectEvent(SharedObjectEvent.SHARED_OBJECT_UPDATE_ERROR, null, errMsg));
    }

    public GetNews(userId:number, productId:number):void
    {
        this.CallFunction("GetNews", [userId, productId], this.newsReceived, this.newsError);
    }
    private newsReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new NewsItemsEvent(NewsItemsEvent.NEWS_ITEMS_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new NewsItemsEvent(NewsItemsEvent.NEWS_ITEMS_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var newsItems:NewsItem[] = new Array<NewsItem>();
            for (var newsItemJSON of responseJSONObject.result)
            {
                //var newsItem:NewsItem = NewsItem.fromJson(newsItemJSON);
                newsItems.push(NewsItem.fromJson(newsItemJSON));
            }
            this.dispatchEvent(new NewsItemsEvent(NewsItemsEvent.NEWS_ITEMS_RECEIVED, newsItems));
        }
    }
    private newsError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new NewsItemsEvent(NewsItemsEvent.NEWS_ITEMS_ERROR, null, errMsg));
    }

    public GetUITexts(productId:number):void
    {
        this.GetStartupData(productId);

        if(this._cachedData.UiTextLoaded())
        {
            this.dispatchEvent(new UITextEvent(UITextEvent.UI_TEXT_RECEIVED));
        }
        else
        {
            /*let dataLocation:string = AppSettings.useCDN ? 'https://resources.ereflect.com/PrepEd/webApp' : '.';
            this._http.get(dataLocation + '/assets/ui_text_' + AppSettings.CurrentProductId + '.json')
                .map(res => res.json())
                .subscribe(
                    (env_data) =>
                    {
                        if(env_data)
                        {
                            //console.log("Local UI Text:", env_data)
                            this.cachedUITextsReceived(env_data);
                        }
                        else
                        {
                            console.log("Error in getting UI Text data. Invalid UI text.")
                            this.CallFunction("GetUITexts", [1], this.uiTextsReceived, this.uiTextsError);
                        }
                    },
                    (err) =>
                    {
                        console.log("Error in getting UI Text data. Location not found.")
                        this.CallFunction("GetUITexts", [1], this.uiTextsReceived, this.uiTextsError);
                    }
                );*/
        }
    }
    private cachedUITextsReceived = (responseJSONObject:any) =>
    {
        var uiText:UI_Text[] = [];
        for (var uiTextObject of responseJSONObject)
        {
            uiText.push(UI_Text.fromJson(uiTextObject));
        }

        this._cachedData.SetUITextOnStartUp(uiText);
        this.dispatchEvent(new UITextEvent(UITextEvent.UI_TEXT_RECEIVED));
    }

    private uiTextsReceived = (responseJSONObject:any) =>
    {
        var uiText:UI_Text[] = [];
        for (var uiTextObject of responseJSONObject.result)
        {
            uiText.push(UI_Text.fromJson(uiTextObject));
        }

        this._cachedData.SetUITextOnStartUp(uiText);

        this.dispatchEvent(new UITextEvent(UITextEvent.UI_TEXT_RECEIVED));
    }
    private uiTextsError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UITextEvent(UITextEvent.UI_TEXT_ERROR));
    }

    public SelectAllUsers():User[]{throw new Error("Method not implemented");}

    public CountUsers():number{throw new Error("Method not implemented");}
    public CountUsersWithEmail(email:string):number{throw new Error("Method not implemented");}

    public InsertUser(user:User):number{throw new Error("Method not implemented");}

    public DeleteUser(userId:number):void{throw new Error("Method not implemented");}

    public ClearUserHistory(userId:number):void{throw new Error("Method not implemented");}
    public DeleteUserData(userId:number):void{throw new Error("Method not implemented");}

    public GetProxyCourseById(id:number):ProxyCourse
    {
        return this._cachedData.GetProxyCourseById(id);
    }

    public GetAllProxyCourses(): ProxyCourse[] {
        return this._cachedData.GetAllProxyCourses();
    }
    
    public GetCourseById(courseId:number):Course
    {
        return this._cachedData.GetCourse(courseId);
    }

    public GetOrganizationDisplayName():string
    {
        return this._cachedData.GetOrganizationDisplayName();
    }

    public SetOrganizationLogoUrl(value: string)
    {
        this._cachedData.SetOrganizationLogoUrl(value);
    }

    public GetOrganizationLogoUrl():string
    {
        return this._cachedData.GetOrganizationLogoUrl();
    }

    public GetUserText(textId:number):User_Text
    {
        return this._cachedData.GetUserText(textId);
    }

    public UpdateUserText(userText:User_Text, isBackgroundCall: boolean = false):void
    {
        userText.Last_updated = this.GetCurrentTimeStamp();
        this._cachedData.UpdateUser_Text(userText);
        if (UberApplication.GetInstance().CurrentProduct.DoPreprocessing) {
            this.CallFunction("UpdateUserText", [userText.toJson()], this.UpdateUserTextSuccess, this.UpdateUserTextFailed, isBackgroundCall);
        }        
    }

    public InsertUserText(ut:User_Text):void
    {
        this._cachedData.InsertUser_Text(ut);
    }

    private UpdateUserTextSuccess = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null)
        {
            //var userText:User_Text = User_Text.fromJson(responseJSONObject.result);
            //_cachedData.UpdateUser_Text(userText);
            DevUtils.LogFunction("ACCESS REMOTE", "UpdateUserTextSuccess", responseJSONObject);
        }
    }

    private UpdateUserTextFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        DevUtils.DisplayError(errMsg, "UpdateUserTextFailed");
        //don't know what to do yet
        //add this so that the faulthandler calls in CallFunction won't throw an error
    }

    public GetTrialWordlistLimit():number
    {
        return this._cachedData.GetTrialWordlistLimit();
    }

    public GetUserPrepProgramByProgramId(programId:number):User_Prep_Program
    {
        return this._cachedData.GetUserPrepProgramByProgramId(programId);
    }

    /****************** MOBILE **************************/
    private getDefaultTexts:boolean = true;
    private preDefaultTextParams:any;
    public SearchTexts(productId:number, userId:number, searchString:string, pageNumber:number, pageSize:number, searchCodeString:string, isInit:boolean, searchSession:SearchTextSessionCache, doPreprocessing:boolean = false):void
    {
        if(UberApplication.GetInstance().CurrentProduct.DoPreprocessing || doPreprocessing)
        {
            this.CallFunction("SearchTexts", [productId, userId, searchString, pageNumber, pageSize, searchCodeString],this.searchTextReceived, this.searchTextFailed);
        }
        else
        {
            if(this.getDefaultTexts)
            {
                this.preDefaultTextParams = {SearchString: searchString, PageNumber: pageNumber, PageSize: pageSize, SearchCode: searchCodeString, IsInit: isInit, UserId: userId, SearchSession: searchSession};
                var productIds:number[] = new Array<number>();
                productIds.push(productId);
                this.CallFunction("GetDefaultTexts", [productIds], this.defaultTextForSearchReceived, this.searchTextFailed);
            }
            else
            {
                var searchTexts:any = this._cachedData.SearchTexts(searchString, pageNumber, pageSize, searchCodeString, isInit, userId, searchSession);
                this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXTS_SEARCHED, searchTexts.DefaultTexts, searchTexts.UserTexts, searchTexts.SharedTexts, searchTexts.Number_of_pages, searchTexts.SessionCache));
            }
        }
    }

    private defaultTextForSearchReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXT_SEARCHED_FAILED, null, null, null, -1, null, responseJSONObject.result.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXT_SEARCHED_FAILED, null, null, null, -1, null, responseJSONObject.result.message));
        }
        else
        {
            if(this.getDefaultTexts)
            {
                var texts:ProxyText[] = new Array<ProxyText>();
                for (var proxyTextObject of responseJSONObject.result)
                {
                    texts.push(ProxyText.fromJson(proxyTextObject));
                }
                this._cachedData.SetTextsTable(texts);
                this.getDefaultTexts = false;
            }

            var searchTexts:any = this._cachedData.SearchTexts(this.preDefaultTextParams.SearchString, this.preDefaultTextParams.PageNumber, this.preDefaultTextParams.PageSize,
                this.preDefaultTextParams.SearchCode, this.preDefaultTextParams.IsInit, this.preDefaultTextParams.UserId, this.preDefaultTextParams.SearchSession);
            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXTS_SEARCHED, searchTexts.DefaultTexts, searchTexts.UserTexts, searchTexts.SharedTexts, searchTexts.Number_of_pages, searchTexts.SessionCache));
        }
    }

    private searchTextReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXT_SEARCHED_FAILED, null, null, null, -1, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXT_SEARCHED_FAILED, null, null, null, -1, responseJSONObject.result.message));
        }
        else
        {
            var defaultTexts:ProxyText[] = new Array<ProxyText>();
            for (var defaultProxyTextObject of responseJSONObject.result.DefaultTexts)
            {
                defaultTexts.push(ProxyText.fromJson(defaultProxyTextObject));
            }

            var userTexts:ProxyText[] = new Array<ProxyText>();
            for (var userProxyTextObject of responseJSONObject.result.UserTexts)
            {
                userTexts.push(ProxyText.fromJson(userProxyTextObject));
            }

            var sharedTexts:SharedProxyText[] = new Array<SharedProxyText>();
            for (var sharedProxyTextObject of responseJSONObject.result.SharedTexts)
            {
                sharedTexts.push(SharedProxyText.fromJson(sharedProxyTextObject));
            }

            var authorPics:AuthorPicture[] = new Array<AuthorPicture>();
            for (var pic of responseJSONObject.result.SharedTextOwners)
            {
                authorPics.push(AuthorPicture.fromJson(pic));
            }
            this._cachedData.AddAuthorPictures(authorPics);

            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXTS_SEARCHED, defaultTexts, userTexts, sharedTexts, responseJSONObject.result.Number_of_pages));
        }
    }

    private searchTextFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXT_SEARCHED_FAILED, null, null, null, -1, null, errMsg));
    }

    public SearchWordlists(productId:number, userId:number, searchString:string, pageNumber:number, pageSize:number, searchCodeString:string, isInit:boolean, searchSession:SearchTextSessionCache): void {
        this.CallFunction("SearchWordlists", [productId, userId, searchString, pageNumber, pageSize, searchCodeString], this.searchWordlistReceived, this.searchWordlistFailed);
    }

    private searchWordlistReceived = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new WordlistSearchEvent(WordlistSearchEvent.WORDLISTS_SEARCHED_FAILED, null, null, null, -1, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null) {
            this.dispatchEvent(new WordlistSearchEvent(WordlistSearchEvent.WORDLISTS_SEARCHED_FAILED, null, null, null, -1, null, responseJSONObject.result.message));
        }
        else {
            let defaultWordlists: ProxyWordlist[] = [];
            for (let defaultWordlist of responseJSONObject.result.DefaultWordlists) {
                defaultWordlists.push(ProxyWordlist.fromJson(defaultWordlist));
            }

            let userCreatedWordlists:ProxyWordlist[] = [];
            for (let userWordlist of responseJSONObject.result.UserCreatedWordlists) {
                userCreatedWordlists.push(ProxyWordlist.fromJson(userWordlist));
            }

            let sharedWordlists:SharedProxyWordlist[] = [];
            for (let sharedWordlist of responseJSONObject.result.SharedWordlists) {
                sharedWordlists.push(SharedProxyWordlist.fromJson(sharedWordlists));
            }

            let authorPics: AuthorPicture[] = [];
            for (let pic of responseJSONObject.result.SharedWordlistOwners) {
                authorPics.push(AuthorPicture.fromJson(pic));
            }
            this._cachedData.AddAuthorPictures(authorPics);

            this.dispatchEvent(new WordlistSearchEvent(WordlistSearchEvent.WORDLISTS_SEARCHED, defaultWordlists, userCreatedWordlists, sharedWordlists, responseJSONObject.result.Number_of_pages));
        }
    }

    private searchWordlistFailed = (errMsg: string, errObj: any = null, id: number = 0) => {
        this.dispatchEvent(new WordlistSearchEvent(WordlistSearchEvent.WORDLISTS_SEARCHED_FAILED, null, null, null, -1, null, errMsg));
    }

    public BrowseWordlistsByCategory(productId: number, pageNumber: number, pageSize: number, categoryId: number): void {
        this.CallFunction("BrowseWordlistsByCategory", [productId, pageNumber, pageSize, categoryId], this.browseWordlistsReceived, this.browseWordlistsFailed);
    }

    private browseWordlistsReceived = (responseJSONObject: any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new WordlistSearchEvent(WordlistSearchEvent.WORDLISTS_BROWSE_FAILED, null, null, null, -1, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null) {
            this.dispatchEvent(new WordlistSearchEvent(WordlistSearchEvent.WORDLISTS_BROWSE_FAILED, null, null, null, -1, null, responseJSONObject.result.message));
        }
        else {
            let wordlists:ProxyWordlist[] = [];
            for (let proxyWordlist of responseJSONObject.result.Wordlists) {
                wordlists.push(ProxyWordlist.fromJson(proxyWordlist));
            }

            // for (let userWordlist of responseJSONObject.result.User_Wordlists) {
            //     let browseUserWordlist: User_Wordlist = User_Wordlist.fromJson(userWordlistObj);
            //     this._cachedData.UpdateUser_Wordlist(browseUserWordlist);
            // }

            this.dispatchEvent(new WordlistSearchEvent(WordlistSearchEvent.WORDLISTS_BROWSE, wordlists, null, null, responseJSONObject.result.Number_of_pages));
        }
    }

    private browseWordlistsFailed = (errMsg: string, errObj: any = null, id: number = 0) => {
        this.dispatchEvent(new WordlistSearchEvent(WordlistSearchEvent.WORDLISTS_BROWSE_FAILED, null, null, null, -1, null, errMsg));
    }

    public GetTextCovers(ids:number[]):void
    {
        this.CallFunction("GetTextCovers", [ids], this.bookCoverLoaded, this.bookCoverFailed);
    }

    private bookCoverLoaded = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var results:any[] = new Array<Object>();
            for (var obj of responseJSONObject.result)
            {
                results.push(obj);
            }

            if(results.length > 0)
            {
                this._cachedData.SetBookCover(results);
            }

            this.dispatchEvent(new BookCoverEvent(BookCoverEvent.IMAGE_LOADED, null));
        }
    }

    private bookCoverFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new BookCoverEvent(BookCoverEvent.IMAGE_FAILED, null, errMsg));
    }

    public GetBookCoverByTextId(id:number):string
    {
        return this._cachedData.GetBookCoverByTextId(id);
    }

    public GetAuthorPictureById(id:number):AuthorPicture
    {
        return this._cachedData.GetAuthorPictureById(id);
    }

    //activity icons
    public GetActivityIcons(productId:number, dpi:number):void
    {
        this.CallFunction("GetActivityIcons", [productId, dpi], this.activityIconsLoaded, this.activityIconsFailed);
    }

    private activityIconsLoaded = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var results:any[] = new Array<Object>();
            for (var obj of responseJSONObject.result)
            {
                results.push(obj);
            }

            if(results.length > 0)
            {
                this._cachedData.SetActivityIcons(results);
            }

            this.dispatchEvent(new ActivityIconEvent(ActivityIconEvent.IMAGE_LOADED, null));
        }
    }

    private activityIconsFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ActivityIconEvent(ActivityIconEvent.IMAGE_FAILED, null, errMsg));
    }

    public GetActivityIconById(id:number):string
    {
        return this._cachedData.GetActivityIconById(id);
    }

    //course icons
    public GetCourseIcons(productId:number, dpi:number):void
    {
        this.CallFunction("GetCourseIcons", [productId, dpi], this.courseIconsLoaded, this.courseIconsFailed);
    }

    private courseIconsLoaded = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var results:any[] = new Array<Object>();
            for (var obj of responseJSONObject.result)
            {
                results.push(obj);
            }

            if(results.length > 0)
            {
                this._cachedData.SetCourseIcons(results);
            }

            this.dispatchEvent(new CourseIntroEvent(CourseIntroEvent.IMAGE_LOADED, null));
        }
    }

    private courseIconsFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new CourseIntroEvent(CourseIntroEvent.IMAGE_FAILED, null, errMsg));
    }

    public GetCourseIconById(id:number):string
    {
        return this._cachedData.GetCourseIconById(id);
    }

    public GetWordPosByIds(pos_id:number):Word_Pos
    {
        return this._cachedData.GetWordPosByIds(pos_id);
    }
    
    public GetWordPosExamples(pos_id:number, /*code:string,*/):void
    {
        this.CallFunction("GetWordPosExamples", [pos_id/*, code*/], this.posExampleReceived, this.posExampleFailed);
    }

    private posExampleReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var examples:WordUsageExample[] = new Array<WordUsageExample>();
            for (var example of responseJSONObject.result)
            {
                examples.push(WordUsageExample.fromJson(example));
            }
            this.dispatchEvent(new WordUsageExampleEvent(WordUsageExampleEvent.WORD_USAGE_RETRIEVED, examples));
        }
    }

    private posExampleFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new WordUsageExampleEvent(WordUsageExampleEvent.WORD_USAGE_FAILED, null));
    }

    /*public GetCourseIntroScreensByProduct(productId:number, dpi:number):void
    {
        CallFunction("GetIntroScreensByProduct", [productId, dpi], courseIntroImagesReceived, courseIntroImagesFailed);
    }*/

    private courseIntroImagesReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var introImages:any[] = new Array<Object>();
            if(responseJSONObject.result instanceof Array)
            {
                for (var intro of responseJSONObject.result)
                {
                    introImages.push(intro);
                }
            }
            else
            {
                introImages.push(responseJSONObject.result);
            }

            this._cachedData.AddIntroImages(introImages);

            this.dispatchEvent(new OnScreenIntroImageEvent(OnScreenIntroImageEvent.INTRO_IMAGE_LOADED));
        }
    }

    private courseIntroImagesFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new OnScreenIntroImageEvent(OnScreenIntroImageEvent.INTRO_IMAGE_FAILED));
    }

    public GetIntroImagesById(id:number):string
    {
        return this._cachedData.GetIntroImagesById(id);
    }

    /*public GetIntroScreensByCourse(id:number, dpi:number):void
    {
        CallFunction("GetIntroScreensByCourse", [id, dpi], courseIntroImagesReceived, courseIntroImagesFailed);
    }*/

    public GetIntroScreensByActivity(id:number, dpi:number):void
    {
        this.CallFunction("GetIntroScreensByActivity", [id, dpi], this.courseIntroImagesReceived, this.courseIntroImagesFailed);
    }
    
    public BrowseTexts(productId:number, pageNumber:number, pageSize:number, browseParameter:number, browseType:string, doPreprocessing:boolean = false):void
    {
        if(UberApplication.GetInstance().CurrentProduct.DoPreprocessing || doPreprocessing)
        {
            this.CallFunction("BrowseTexts", [productId, pageNumber, pageSize, browseParameter, browseType], this.browseTextReceived, this.browseTextFailed);
        }
        else
        {
            if(this.getDefaultTexts)
            {
                this.preDefaultTextParams = {BrowseParam: browseParameter, PageNumber: pageNumber, PageSize: pageSize, BrowseType: browseType};
                var productIds:number[] = new Array<number>();
                productIds.push(productId);
                this.CallFunction("GetDefaultTexts", [productIds], this.defaultTextForBrowseReceived, this.browseTextFailed);
            }
            else
            {
                var browseTexts:any = this._cachedData.BrowseText(pageNumber, pageSize, browseParameter, browseType);
                this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXTS_BROWSE, browseTexts.Texts, null, null, browseTexts.Number_of_pages));
            }
        }
    }

    private defaultTextForBrowseReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXTS_BROWSE_FAILED, null, null, null, -1, responseJSONObject.result.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXTS_BROWSE_FAILED, null, null, null, -1, responseJSONObject.result.message));
        }
        else
        {
            if(this.getDefaultTexts)
            {
                var texts:ProxyText[] = new Array<ProxyText>();
                for (var proxyTextObject of responseJSONObject.result)
                {
                    texts.push(ProxyText.fromJson(proxyTextObject));
                }
                this._cachedData.SetTextsTable(texts);
                this.getDefaultTexts = false;
            }

            var browseTexts:any = this._cachedData.BrowseText(this.preDefaultTextParams.PageNumber, this.preDefaultTextParams.PageSize, this.preDefaultTextParams.BrowseParam, this.preDefaultTextParams.BrowseType);
            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXTS_BROWSE, browseTexts.Texts, null, null, browseTexts.Number_of_pages));
        }
    }

    private browseTextReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXTS_BROWSE_FAILED, null, null, null, -1, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXTS_BROWSE_FAILED, null, null, null, -1, responseJSONObject.result.message));
        }
        else
        {
            var texts:ProxyText[] = new Array<ProxyText>();
            for (var proxyTexts of responseJSONObject.result.Texts)
            {
                texts.push(ProxyText.fromJson(proxyTexts));
            }

            for (var userTextObj of responseJSONObject.result.User_Texts)
            {
                var browseUserText:User_Text = User_Text.fromJson(userTextObj);
                this._cachedData.UpdateUser_Text(browseUserText);
            }

            this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXTS_BROWSE, texts, null, null, responseJSONObject.result.Number_of_pages));
        }
    }

    private browseTextFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new TextsSearchEvent(TextsSearchEvent.TEXTS_BROWSE_FAILED, null, null, null, -1, null, errMsg));
    }
    
    public GetTextPreview(textId:number):void
    {
        this.CallFunction("GetTextPreview", [textId], this.previewTextReceived, this.previewTextError);	
    }

    private previewTextReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var text:Text = Text.fromJson(responseJSONObject.result.Text);
            //_cachedData.InsertText(text);

            this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVED, text));
        }
    }

    private previewTextError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, null, errMsg));
    }

    public GetNumberOfTexts():number
    {
        return this._cachedData.GetNumberOfTexts();
    }

    public GetNumberOfWordlists():number
    {
        return this._cachedData.GetNumberOfWordlists();
    }

    public GetNextRecommendedActivity(productId:number, activityId:number):void
    {
        this.CallFunction("GetNextRecommendedActivity", [productId, activityId], this.recommendedActivityReceived, this.recommendedActivityFailed, true);
    }

    private recommendedActivityReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            this.dispatchEvent(new ActivityRecommendEvent(ActivityRecommendEvent.ACTVITY_RECOMMEND_RECEIVED, responseJSONObject.result));
        }
        else
        {
            this.dispatchEvent(new ActivityRecommendEvent(ActivityRecommendEvent.ACTVITY_RECOMMEND_FAILED, -1, responseJSONObject.result.message));
        }
    }

    private recommendedActivityFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ActivityRecommendEvent(ActivityRecommendEvent.ACTVITY_RECOMMEND_FAILED, -1, errMsg));
    }

    public IsTrialActivityEnabled(activityId:number):boolean
    {
        return this._cachedData.IsTrialActivityEnabled(activityId);
    }

    public IsTrialCourseEnabled(courseId:number):boolean
    {
        return this._cachedData.IsTrialCourseEnabled(courseId);
    }

    public IsTrialTextEnabled(textId:number):boolean
    {
        return this._cachedData.IsTrialTextEnabled(textId);
    }

    public IsTrialChartEnabled(chartId:number):boolean
    {
        return this._cachedData.IsTrialChartEnabled(chartId);
    }

    public GetEnablePrintCertificates():boolean
    {
        return this._cachedData.GetEnablePrintCertificates();
    }

    public GetInAppOfferByProductId(id:string):Offer
    {
        return this._cachedData.GetInAppOfferByProductId(id);
    }

    public GetInAppOfferByCourseId(id:number):Offer
    {
        return this._cachedData.GetInAppOfferByCourseId(id);
    }

    public GetInAppOfferByProgramId(id:number):Offer
    {
        return this._cachedData.GetInAppOfferByProgramId(id);
    }

    public GetInAppOffersByProgramId(id:number):Offer[]
    {
        return this._cachedData.GetInAppOffersByProgramId(id);
    }

    public LibraryDefaultProxyTexts():ProxyText[]
    {
        return this._cachedData.GetLibraryProxyTexts();
    }

    public IfTrialCourseStep1Locked(courseId:number):boolean
    {
        return this._cachedData.IfTrialCourseStep1Locked(courseId);
    }
    
    public GetPrepPrograms(examType:string):void
    {
        let programs:Prep_Program[] = this._cachedData.GetDiscoverPrepProgramByExamType(examType);
        if(programs == null)
        {            
            this.CallFunction("GetPrepPrograms", [AppSettings.CurrentProductId, examType], this.discoverProgramSucceeded, this.discoverProgramFailed);
        }        
        else
        {
            this.dispatchEvent(new DiscoverProgramEvent(DiscoverProgramEvent.PROGRAMS_RECEIVED, programs));
        }
    }

    private discoverProgramSucceeded = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            let programs:Prep_Program[] = new Array<Prep_Program>();
            for(let p of responseJSONObject.result.Prep_Programs)
            {
                programs.push(Prep_Program.fromJson(p));
            }
            this._cachedData.UpdateDiscoverPrepPrograms(programs);
            //offers set in cache data
            /*
            var offersList:Offer[] = [];
            for (var program of programs)
            {
                offersList.push(program.Offer);
            }
            this._cachedData.SetInAppOffers(offersList);
            */
            /*
            var offersList:Offer[] = [];
            for (var offerJSON of responseJSONObject.result.Offers)
            {
                var offer:Offer = Offer.fromJson(offerJSON);
                offersList.push(offer);
            }
            this._cachedData.SetInAppOffers(offersList);
            */

            this.dispatchEvent(new DiscoverProgramEvent(DiscoverProgramEvent.PROGRAMS_RECEIVED, programs));
        }
        else
        {
            this.dispatchEvent(new DiscoverProgramEvent(DiscoverProgramEvent.PROGRAMS_FAILED, null));
        }
    }

    private discoverProgramFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new DiscoverProgramEvent(DiscoverProgramEvent.PROGRAMS_FAILED, null));
    }

    //private firstBrowseExamCall:boolean = true;
    public BrowseFilterCourses(productId:number, prepEdProduct:string, browse:TreeNode, filter:PrepEdCourseFilter, pageNumber:number, pageSize:number, refresh:boolean):void
    {
        // var discoveryCourses:ProxyCourse[] = this.GetDiscoverProxyCourses();
        // if(refresh == false && (discoveryCourses && discoveryCourses.length > 0))
        // {
        //     this.dispatchEvent(new DiscoveryBrowseEvent(DiscoveryBrowseEvent.COURSES_RECEIVED, discoveryCourses, 1, 1));
        // }
        // else
        // {
        //     this.CallFunction("BrowseCoursesByExam", [productId, prepEdProduct, pageNumber, pageSize], this.discoverCourseSucceeded, this.discoverCourseFailed);
        // }


        var parentNodeId:number = null;
        var childNodeId:number = null;
        if(browse && browse.Data)
        {
            if(browse.ParentNode != null)//if child
            {
                parentNodeId = (browse.ParentNode.Data as Code).Code_id;
                childNodeId = (browse.Data as Code).Code_id;
            }
            else//if parent
            {
                parentNodeId = (browse.Data as Code).Code_id;
            }
        }
        this.CallFunction("BrowseFilterCourses", [productId, prepEdProduct, parentNodeId, childNodeId, filter.toJson(), pageNumber, pageSize], this.discoverCourseSucceeded, this.discoverCourseFailed);
    }

    private discoverCourseSucceeded = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var proxyCourseVector:ProxyCourse[] = [];
            for (var proxyCourseObject of responseJSONObject.result.ProxyCourses)
            {
                proxyCourseVector.push(ProxyCourse.fromJson(proxyCourseObject));
            }
            this._cachedData.UpdateDiscoverProxyCourses(proxyCourseVector);

            var userCourseVector:User_Course[] = [];
            for (var userCourseObject of responseJSONObject.result.User_Courses)
            {
                userCourseVector.push(User_Course.fromJson(userCourseObject));
            }
            this._cachedData.UpdateUserCourses(userCourseVector);

            this.dispatchEvent(new DiscoveryBrowseEvent(DiscoveryBrowseEvent.COURSES_RECEIVED, proxyCourseVector, responseJSONObject.result.Page_num, responseJSONObject.result.Number_of_pages));
        }
        else
        {
            this.dispatchEvent(new DiscoveryBrowseEvent(DiscoveryBrowseEvent.COURSES_FAILED, null, 0, 0, responseJSONObject.result.message));
        }
    }

    private discoverCourseFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new DiscoveryBrowseEvent(DiscoveryBrowseEvent.COURSES_FAILED, null, 0, 0, errMsg));
    }

    public GetNextRecommendedCourses(course_id: number, loggedIn:boolean):void
    {
        DevUtils.LogFunction("ACCESS REMOTE", "GetNextRecommendedCourses", [course_id]);
        this.CallFunction("GetNextRecommendedCourses", [course_id], this.nextRecommendedCoursesSucceeded, this.nextRecommendedCoursesFailed);
    }

    private nextRecommendedCoursesSucceeded = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            DevUtils.LogFunction("ACCESS REMOTE", "nextRecommendedCoursesSucceeded", [responseJSONObject]);
            var nextRecommendations:ProxyCourse[] = [];
            if (responseJSONObject.result.Recommended_courses)
            {
                for (var proxyCourseObject of responseJSONObject.result.Recommended_courses)
                {
                    let proxyCourse = ProxyCourse.fromJson(proxyCourseObject);
                    nextRecommendations.push(proxyCourse);
                }
            }

            this.dispatchEvent(new NextPrepRecommendationEvent(PrepRecommendationEvent.PREP_RECOMMENDATIONS_RECEIVED, nextRecommendations));
        }
        else
        {
            this.dispatchEvent(new NextPrepRecommendationEvent(PrepRecommendationEvent.PREP_RECOMMENDATIONS_FAILED, null, responseJSONObject.result.message));
        }
    }
    private nextRecommendedCoursesFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new NextPrepRecommendationEvent(PrepRecommendationEvent.PREP_RECOMMENDATIONS_FAILED, null, errMsg));
    }

    public GetPrepRecommendations(exam:string, loggedIn:boolean):void
    {
        var personalRecommendations = this._cachedData.GetPersonalRecommendations(exam);
        var courseRecommendations = this._cachedData.GetCourseRecommendations(exam);
        var popularRecommendations = this._cachedData.GetPopularRecommendations(exam);
        var callServer = popularRecommendations == null || (loggedIn && personalRecommendations == null);
        if (callServer)
        {
            this.CallFunction("GetPrepRecommendations", [exam], this.prepRecommendationsSucceeded, this.prepRecommendationsFailed);
        }
        else
        {
            if (personalRecommendations == null)
            {
                personalRecommendations = [];
            }

            this.dispatchEvent(new PrepRecommendationEvent(PrepRecommendationEvent.PREP_RECOMMENDATIONS_RECEIVED, personalRecommendations, courseRecommendations, popularRecommendations));
        }
    }
    private prepRecommendationsSucceeded = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {

            var exam:string = responseJSONObject.result.Exam;
            var personalRecommendations:ProxyCourse[] = [];
            if (responseJSONObject.result.Personal_recommendations)
            {
                for (var proxyCourseObject of responseJSONObject.result.Personal_recommendations)
                {
                    let proxyCourse = ProxyCourse.fromJson(proxyCourseObject);
                    personalRecommendations.push(proxyCourse);
                }
                this._cachedData.SetPersonalRecommendations(exam, personalRecommendations);
            }

            var courseRecommendations:ProxyCourse[] = [];
            for (var proxyCourseObject of responseJSONObject.result.Preped_recommendations)
            {
                let proxyCourse = ProxyCourse.fromJson(proxyCourseObject);
                courseRecommendations.push(proxyCourse);
            }
            this._cachedData.SetCourseRecommendations(exam, courseRecommendations);

            var popularRecommendations:ProxyCourse[] = [];
            for (var proxyCourseObject of responseJSONObject.result.Popular_recommendations)
            {
                let proxyCourse = ProxyCourse.fromJson(proxyCourseObject);
                popularRecommendations.push(proxyCourse);
            }
            this._cachedData.SetPopularRecommendations(exam, popularRecommendations);

            this.dispatchEvent(new PrepRecommendationEvent(PrepRecommendationEvent.PREP_RECOMMENDATIONS_RECEIVED, personalRecommendations, popularRecommendations, courseRecommendations));
        }
        else
        {
            this.dispatchEvent(new PrepRecommendationEvent(PrepRecommendationEvent.PREP_RECOMMENDATIONS_FAILED, null, null, null, responseJSONObject.result.message));
        }
    }
    private prepRecommendationsFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new PrepRecommendationEvent(PrepRecommendationEvent.PREP_RECOMMENDATIONS_FAILED, null, null, null, errMsg));
    }

    public GetDiscoverProxyCourses():ProxyCourse[]
    {
        return this._cachedData.GetDiscoveryProxyCourses();
    }

    public GetDiscoverProxyCoursesById(id:number):ProxyCourse
    {
        return this._cachedData.GetDiscoveryProxyCoursesById(id);
    }

    /*********************************************************************************************************************/
    public GetPrepProgramInfoDataByWebUrl(webUrl:string):void
    {			
        let programInfo:Prep_Program_Info = this._cachedData.GetProgramInfoByWebUrl(webUrl);
        DevUtils.LogFunction("ACCESS REMOTE", "GetPrepProgramInfoDataByWebUrl", [webUrl, programInfo]);
        if(programInfo != null)
        {
            let proxyCourses:ProxyCourse[] = [];
            for(let c of programInfo.Prep_Program_Courses)
            {
                proxyCourses.push(this._cachedData.GetDiscoveryProxyCoursesById(c.Course_id));
            }

            this.dispatchEvent(new ProgramInfoEvent(ProgramInfoEvent.INFO_RECEIVED, programInfo, proxyCourses));
        }
        else
        {
            //this.CallFunction("ClearCache", [], this.startupDataSuccess, this.startupDataError);
            //console.log("ClearCache called.");
            this.CallFunction("GetPrepProgramInfoDataByWebUrl", [webUrl], this.programInfoReceived, this.programInfoFailed);
        }
    }

    private programInfoReceived = (responseJSONObject:any) =>
    {
        DevUtils.LogFunction("ACCESS REMOTE", "programInfoReceived", [responseJSONObject]);
        if(responseJSONObject.result != null)
        {
            let programInfo:Prep_Program_Info = Prep_Program_Info.fromJson(responseJSONObject.result.Prep_Program_Info);
            this._cachedData.InsertProgramInfo(programInfo);

            let courses:ProxyCourse[] = new Array<ProxyCourse>();
            for (var course of responseJSONObject.result.ProxyCourses)
            {
                courses.push(ProxyCourse.fromJson(course));
            }
            this._cachedData.UpdateDiscoverProxyCourses(courses);

            if(responseJSONObject.result.Prep_Program != null)
            {
                let programs:Prep_Program[] = [];
                programs.push(Prep_Program.fromJson(responseJSONObject.result.Prep_Program));
                this._cachedData.UpdateDiscoverPrepPrograms(programs);
                //offers set in cache data
                /*
                var offersList:Offer[] = [];
                for (var program of programs)
                {
                    offersList.push(program.Offer);
                }
                this._cachedData.SetInAppOffers(offersList);
                */
            }

            /*
            var offersList:Offer[] = [];
            for (var offerJSON of responseJSONObject.result.Offers)
            {
                var offer:Offer = Offer.fromJson(offerJSON);
                offersList.push(offer);
            }
            this._cachedData.SetInAppOffers(offersList);
            */
            this.dispatchEvent(new ProgramInfoEvent(ProgramInfoEvent.INFO_RECEIVED, programInfo, courses));
        }
        else
        {
            this.dispatchEvent(new ProgramInfoEvent(ProgramInfoEvent.INFO_FAILED, null, null));
        }
    }

    private programInfoFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        DevUtils.LogFunction("ACCESS REMOTE", "programInfoFailed", [errMsg, errObj, id]);
        this.dispatchEvent(new ProgramInfoEvent(ProgramInfoEvent.INFO_FAILED, null, null, errMsg));
    }

    public GetPrepProgramUserData(programId:number):void
    {
        let userPrepProgram:User_Prep_Program = this._cachedData.GetUserPrepProgramByProgramId(programId);
        if(userPrepProgram != null)
        {
            this.dispatchEvent(new ProgramInfoEvent(ProgramInfoEvent.INFO_USER_DATA_RECEIVED, null, null));
        }
        else
        {
            this.CallFunction("GetPrepProgramUserData", [programId], this.programInfoUserDataReceived, this.programInfouserDataFailed);
        }
    }

    private programInfoUserDataReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            if(responseJSONObject.result.User_Prep_Program != null)
            {
                var userPrepProgram:User_Prep_Program = User_Prep_Program.fromJson(responseJSONObject.result.User_Prep_Program);
                this._cachedData.UpdateUserPrepProgram(userPrepProgram);
            }

            if(responseJSONObject.result.User_Courses != null)
            {
                for(let uc of responseJSONObject.result.User_Courses)
                {
                    var userCourse:User_Course = User_Course.fromJson(uc);
                    this._cachedData.UpdateUserCourse(userCourse);
                }
            }

            if(responseJSONObject.result.User_Comment != null)
            {
                var userComment:User_Comment = User_Comment.fromJson(responseJSONObject.result.User_Comment);
                this._cachedData.UpdateUserComment(userComment);
            }
            this.dispatchEvent(new ProgramInfoEvent(ProgramInfoEvent.INFO_USER_DATA_RECEIVED, null, null));
        }
        else
        {
            this.dispatchEvent(new ProgramInfoEvent(ProgramInfoEvent.INFO_USER_DATA_FAILED, null, null));
        }
    }

    private programInfouserDataFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ProgramInfoEvent(ProgramInfoEvent.INFO_USER_DATA_FAILED, null, null, errMsg));
    }

    /*********************************************************************************************************************/
    public GetCourseInfo(courseId:number):void
    {			
        var courseInfo:CourseInfo = this._cachedData.GetCourseInfoById(courseId);			
        if(courseInfo != null)
        {
            this.dispatchEvent(new CourseInfoEvent(CourseInfoEvent.INFO_RECEIVED, courseInfo));
        }
        else
        {
            this.CallFunction("GetCourseInfo", [courseId], this.courseInfoReceived, this.courseInfoFailed);
        }
    }

    public GetCourseInfoByWebUrl(webUrl:string):void
    {			
        var courseInfo:CourseInfo = this._cachedData.GetCourseInfoByWebUrl(webUrl);			
        if(courseInfo != null)
        {
            this.dispatchEvent(new CourseInfoEvent(CourseInfoEvent.INFO_RECEIVED, courseInfo));
        }
        else
        {
            //this.CallFunction("GetCourseInfoByWebUrl", [webUrl], this.courseInfoReceived, this.courseInfoFailed);
            this.CallFunction("GetCourseInfoDataByWebUrl", [webUrl], this.courseInfoReceived, this.courseInfoFailed);
        }
    }

    private courseInfoReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var courseInfo:CourseInfo = CourseInfo.fromJson(responseJSONObject.result.Course_Info);
            this._cachedData.InsertCourseInfo(courseInfo);
            /*
            if(responseJSONObject.result.User_Course != null)
            {
                var userCourse:User_Course = User_Course.fromJson(responseJSONObject.result.User_Course);
                this._cachedData.UpdateUserCourse(userCourse);
            }
            */

            if(responseJSONObject.result.ProxyCourse != null)
            {
                let courses:ProxyCourse[] = [];
                courses.push(ProxyCourse.fromJson(responseJSONObject.result.ProxyCourse));
                this._cachedData.UpdateDiscoverProxyCourses(courses);
            }

            var offersList:Offer[] = [];
            for (var offerJSON of responseJSONObject.result.Offers)
            {
                var offer:Offer = Offer.fromJson(offerJSON);
                offersList.push(offer);
            }
            this._cachedData.SetInAppOffers(offersList);
            /*
            if(responseJSONObject.result.User_Comment != null)
            {
                var userComment:User_Comment = User_Comment.fromJson(responseJSONObject.result.User_Comment);
                this._cachedData.UpdateUserComment(userComment);
            }
            */
            this.dispatchEvent(new CourseInfoEvent(CourseInfoEvent.INFO_RECEIVED, courseInfo));
        }
        else
        {
            this.dispatchEvent(new CourseInfoEvent(CourseInfoEvent.INFO_FAILED, null));
        }
    }

    private courseInfoFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new CourseInfoEvent(CourseInfoEvent.INFO_FAILED, null, errMsg));
    }

    public GetCourseInfoUserData(courseId:number):void
    {
        let userCourse:User_Course = this._cachedData.GetUserCourse(courseId);
        if(userCourse != null)
        {
            this.dispatchEvent(new CourseInfoEvent(CourseInfoEvent.INFO_USER_DATA_RECEIVED, null));
        }
        else
        {
            this.CallFunction("GetCourseInfoUserData", [courseId], this.courseInfoUserDataReceived, this.courseInfouserDataFailed);
        }
    }

    private courseInfoUserDataReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            if(responseJSONObject.result.User_Course != null)
            {
                var userCourse:User_Course = User_Course.fromJson(responseJSONObject.result.User_Course);
                this._cachedData.UpdateUserCourse(userCourse);
            }

            if(responseJSONObject.result.User_Comment != null)
            {
                var userComment:User_Comment = User_Comment.fromJson(responseJSONObject.result.User_Comment);
                this._cachedData.UpdateUserComment(userComment);
            }
            this.dispatchEvent(new CourseInfoEvent(CourseInfoEvent.INFO_USER_DATA_RECEIVED, null));
        }
        else
        {
            this.dispatchEvent(new CourseInfoEvent(CourseInfoEvent.INFO_USER_DATA_FAILED, null));
        }
    }

    private courseInfouserDataFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new CourseInfoEvent(CourseInfoEvent.INFO_USER_DATA_FAILED, null, errMsg));
    }

    public GetCourseInfoById(courseId:number):CourseInfo
    {
        return this._cachedData.GetCourseInfoById(courseId);
    }

    /*********************************************************************************************************************/
    public GetPublicUserProfileByWebUrl(webUrl:string):void
    {	
        let author:Author = this._cachedData.GetAuthorByWebUrl(webUrl);
        if(author != null)
        {
            let proxyCourses = this._cachedData.GetProxyCoursebyAuthorId(author.Author_id);
            this.dispatchEvent(new UserInfoEvent(UserInfoEvent.USER_INFO_RECEIVED, null, null, author, proxyCourses, null));
            //this.dispatchEvent(new AuthorInfoEvent(AuthorInfoEvent.AUTHOR_INFO_RECEIVED, author, proxyCourses, null));
        }
        else
        {
             this.CallFunction("GetPublicUserProfileByWebUrl", [webUrl], this.userInfoReceived, this.userInfoFailed);
        }	
        //this.CallFunction("GetPublicUserProfileByWebUrl", [webUrl], this.userInfoReceived, this.userInfoFailed);
    }
    private userInfoReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            //COMPLETE HERE
            DevUtils.LogFunction("ACCESS REMOTE", "userInfoReceived", [responseJSONObject]);
            if (responseJSONObject.result.User != null)
            {
                let user:User = User.fromJson(responseJSONObject.result.User);
                //this._cachedData.InsertWebUser(user);

                let wordlists:ProxyWordlist[] = [];
                for (let wordlistJSON of responseJSONObject.result.Public_wordlists)
                {
                    let wordlist:ProxyWordlist = ProxyWordlist.fromJson(wordlistJSON);
                    wordlists.push(wordlist);
                }
                //this._cachedData.InsertPublicWordlists(wordlists);

                this.dispatchEvent(new UserInfoEvent(UserInfoEvent.USER_INFO_RECEIVED, user, wordlists, null, null, null));
            }
            else
            {
                let author:Author = Author.fromJson(responseJSONObject.result.Author);
                this._cachedData.InsertAuthor(author);

                let proxyCourses:Array<ProxyCourse> = new Array<ProxyCourse>();
                for (let proxyCourseJson of responseJSONObject.result.Proxy_courses)
                {
                    let proxyCourse:ProxyCourse = ProxyCourse.fromJson(proxyCourseJson);
                    proxyCourses.push(proxyCourse);
                }
                this._cachedData.UpdateDiscoverProxyCourses(proxyCourses);
                let userCourses:Array<User_Course> = new Array<User_Course>();
                for (let userCourseJson of responseJSONObject.result.User_Courses)
                {
                    let userCourse:User_Course = User_Course.fromJson(userCourseJson);
                    this._cachedData.UpdateUserCourse(userCourse);
                }

                this.dispatchEvent(new UserInfoEvent(UserInfoEvent.USER_INFO_RECEIVED, null, null, author, proxyCourses, null));
            }
        }
        else
        {
            this.dispatchEvent(new UserInfoEvent(UserInfoEvent.USER_INFO_FAILED, null, null, null, null, null));
        }
    }
    private userInfoFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UserInfoEvent(UserInfoEvent.USER_INFO_FAILED, null, null, null, null, errMsg));
    }
    /*********************************************************************************************************************/
    // public GetAuthorInfoByWebUrl(webUrl:string):void
    // {			
    //     let author:Author = this._cachedData.GetAuthorByWebUrl(webUrl);
    //     if(author != null)
    //     {
    //         let proxyCourses = this._cachedData.GetProxyCoursebyAuthorId(author.Author_id);
    //         this.dispatchEvent(new AuthorInfoEvent(AuthorInfoEvent.AUTHOR_INFO_RECEIVED, author, proxyCourses, null));
    //     }
    //     else
    //     {
    //         this.CallFunction("GetAuthorInfoByWebUrl", [webUrl], this.authorInfoReceived, this.authorInfoFailed);
    //     }
    // }
    // private authorInfoReceived = (responseJSONObject:any) =>
    // {
    //     if(responseJSONObject.result != null)
    //     {
    //         let author:Author = Author.fromJson(responseJSONObject.result.Author);
    //         this._cachedData.InsertAuthor(author);

    //         let proxyCourses:Array<ProxyCourse> = new Array<ProxyCourse>();
    //         for (let proxyCourseJson of responseJSONObject.result.Proxy_courses)
    //         {
    //             let proxyCourse:ProxyCourse = ProxyCourse.fromJson(proxyCourseJson);
    //             proxyCourses.push(proxyCourse);
    //         }
    //         this._cachedData.UpdateDiscoverProxyCourses(proxyCourses);
    //         let userCourses:Array<User_Course> = new Array<User_Course>();
    //         for (let userCourseJson of responseJSONObject.result.User_Courses)
    //         {
    //             let userCourse:User_Course = User_Course.fromJson(userCourseJson);
    //             this._cachedData.UpdateUserCourse(userCourse);
    //         }

    //         this.dispatchEvent(new AuthorInfoEvent(AuthorInfoEvent.AUTHOR_INFO_RECEIVED, author, proxyCourses, null));
    //     }
    //     else
    //     {
    //         this.dispatchEvent(new AuthorInfoEvent(AuthorInfoEvent.AUTHOR_INFO_FAILED, null, null, null));
    //     }
    // }
    // private authorInfoFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    // {
    //     this.dispatchEvent(new AuthorInfoEvent(AuthorInfoEvent.AUTHOR_INFO_FAILED, null, null, errMsg));
    // }
    /*********************************************************************************************************************/
    public PurchasePrepProgram(prepProgramId:number, purchaseData:PurchaseData):void	
    {
        if(purchaseData)
        {
            this.CallFunction("PurchasePrepProgram", [prepProgramId, purchaseData.toJson()], this.addPrepProgramReceived, this.addPrepProgramFailed);	
        }
        else
        {
            this.dispatchEvent(new AddPrepProgramEvent(AddPrepProgramEvent.ADD_PROGRAM_FAILED, null));
        }
    }

    private addPrepProgramReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new AddPrepProgramEvent(AddPrepProgramEvent.ADD_PROGRAM_FAILED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new AddPrepProgramEvent(AddPrepProgramEvent.ADD_PROGRAM_FAILED, null, responseJSONObject.error.message));
        }
        else
        {
            /*
            if(responseJSONObject.result.Course_Datas != null && responseJSONObject.result.Course_Datas.length > 0)
            {
                var course:Course;
                for(let jsonObject of responseJSONObject.result.Course_Datas)
                {
                    var activities:Activity[] = [];
                    for (let a of jsonObject.Activities)
                    {
                        activities.push(Activity.fromJson(a));
                    }
                    this._cachedData.InsertActivities(activities);

                    var questionGroups:Question_Group[] = [];
                    for (let g of jsonObject.Question_Groups)
                    {
                        questionGroups.push(Question_Group.fromJson(g));
                    }
                    this._cachedData.InsertQuestionGroup(questionGroups);

                    course = Course.fromJson(jsonObject.Course);
                    this._cachedData.InsertCourse(course);
                }
            }
            */
            let program:Prep_Program;
            if(responseJSONObject.result.Prep_Program != null)
            {
                program = Prep_Program.fromJson(responseJSONObject.result.Prep_Program);
                this._cachedData.UpdateMyPrepProgram(program);
            }

            let proxyCourses:ProxyCourse[] = [];
            for(let c of responseJSONObject.result.ProxyCourses)
            {
                proxyCourses.push(ProxyCourse.fromJson(c));
            }
            this._cachedData.UpdateMyCourses(proxyCourses);

            for(let uc of responseJSONObject.result.User_Courses)
            {
                this._cachedData.UpdateUserCourse(User_Course.fromJson(uc));
            }
            /*
            for(let un of responseJSONObject.result.User_Notes)
            {
                this._cachedData.UpdateUserNote(User_Notes.fromJson(un));
            }
            */
            if(responseJSONObject.result.User_Prep_Program != null)
            {
                this._cachedData.UpdateUserPrepProgram(User_Prep_Program.fromJson(responseJSONObject.result.User_Prep_Program));
            }

            /*
            var userQuestions:User_Question[] = [];
            for (let q of responseJSONObject.result.User_Questions)
            {
                userQuestions.push(User_Question.fromJson(q));
            }
            this._cachedData.UpdateUserQuestions(userQuestions);
            */
            this.dispatchEvent(new AddPrepProgramEvent(AddPrepProgramEvent.ADD_PROGRAM_SUCCESS, program));
        }
    }
    private addPrepProgramFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new AddPrepProgramEvent(AddPrepProgramEvent.ADD_PROGRAM_FAILED, null,errMsg));
    }
    /*********************************************************************************************************************/
    public PurchaseCourse(courseId:number, purchaseData:PurchaseData):void	
    {
        if(purchaseData)
        {            
            this.CallFunction("PurchaseCourse", [courseId, purchaseData.toJson()], this.addCourseReceived, this.addCourseFailed);	
        }
        else
        {            
            this.CallFunction("AddCourseToMyCourses", [courseId], this.addCourseReceived, this.addCourseFailed);
        }
    }

    private addCourseReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new AddCourseEvent(AddCourseEvent.ADD_COURSE_FAILED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new AddCourseEvent(AddCourseEvent.ADD_COURSE_FAILED, null, responseJSONObject.error.message));
        }
        else
        {
            if(responseJSONObject.result.User_Questions != null)
            {
                var userQuestions:User_Question[] = [];
                for (let q of responseJSONObject.result.User_Questions)
                {
                    userQuestions.push(User_Question.fromJson(q));
                }
                this._cachedData.UpdateUserQuestions(userQuestions);
            }

            if(responseJSONObject.result.User_Notes != null)
            {
                var userNotes:User_Notes[] = new Array<User_Notes>();
                for (var n of responseJSONObject.result.User_Notes)
                {
                    userNotes.push(User_Notes.fromJson(n));
                }
                this._cachedData.UpdateUserNotes(userNotes);
            }

            var course:Course;// = Course.fromJson(responseJSONObject.result.Course);
            if(responseJSONObject.result.Course_Data != null)
            {
                var activities:Activity[] = [];
                for (let a of responseJSONObject.result.Course_Data.Activities)
                {
                    activities.push(Activity.fromJson(a));
                }
                this._cachedData.InsertActivities(activities);

                var questionGroups:Question_Group[] = [];
                for (let g of responseJSONObject.result.Course_Data.Question_Groups)
                {
                    questionGroups.push(Question_Group.fromJson(g));
                }
                this._cachedData.InsertQuestionGroup(questionGroups);

                course = Course.fromJson(responseJSONObject.result.Course_Data.Course);
                this._cachedData.InsertCourse(course);
            }

            if(responseJSONObject.result.User_Course != null)
            {
                var userCourse:User_Course = User_Course.fromJson(responseJSONObject.result.User_Course);
                userCourse._Date = this.GetCurrentTimeStamp();
                this._cachedData.UpdateUserCourse(userCourse);
            }

            var proxyCourse:ProxyCourse = this.GetDiscoverProxyCoursesById(course.Course_id);
            if(proxyCourse)
            {
                this._cachedData.UpdateMyCourse(proxyCourse);
                fbq('track', 'Purchase', {value: proxyCourse.Price + '', currency: 'USD'});
            }

            //this._cachedData.RemoveDiscoverProxyCourse(course.Course_id);
            this.dispatchEvent(new AddCourseEvent(AddCourseEvent.ADD_COURSE_SUCCESS, proxyCourse));
        }
    }
    private addCourseFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new AddCourseEvent(AddCourseEvent.ADD_COURSE_FAILED, null,errMsg));
    }
    /*********************************************************************************************************************/
    public GetMyPrepProgram():Prep_Program[]
    {
        return this._cachedData.GetMyPrepProgram();
    }

    public GetMyCourses():ProxyCourse[]
    {
        return this._cachedData.GetMyCourses();
    }

    public GetMyCoursesByPage(pageNumber:number, pageSize:number, sortBy:string, filters:string[]):ProxyCourse[]
    {
        return this._cachedData.GetMyCoursesByPage(pageNumber, pageSize, sortBy, filters);
    }

    public GetMyCourseWishlist():ProxyCourse[]
    {
        return this._cachedData.GetMyCourseWishlist();
    }

    public GetMyPrepProgramWishlist():Prep_Program[]
    {
        return this._cachedData.GetMyPrepProgramWishlist();
    }
    /*********************************************************************************************************************/
    public AddPrepProgramToWishlist(programId:number):void
    {
        var prepProgram = this._cachedData.GetDiscoverPrepProgramById(programId);
        this._cachedData.UpdateMyWishlist(prepProgram);        
        this.CallFunction("AddPrepProgramToWishlist", [programId], this.addProgramToWishlistReceived, this.addProgramToWishlistFailed);
    }

    private addProgramToWishlistReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            let userProgram:User_Prep_Program  = User_Prep_Program .fromJson(responseJSONObject.result);
            this._cachedData.UpdateUserPrepProgram(userProgram);

            this.dispatchEvent(new ProgramToWishlistEvent(ProgramToWishlistEvent.PROGRAM_ADDED, null));
        }
        else
        {
            this.dispatchEvent(new ProgramToWishlistEvent(ProgramToWishlistEvent.PROGRAM_NOT_ADDED, null));
        }
    }
    private addProgramToWishlistFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ProgramToWishlistEvent(ProgramToWishlistEvent.PROGRAM_NOT_ADDED, null, errMsg));
    }

    public RemovePrepProgramFromWishlist(programId:number):void
    {
        var prepProgram = this._cachedData.GetDiscoverPrepProgramById(programId);
        this._cachedData.UpdateMyWishlist(prepProgram);
        this.CallFunction("RemovePrepProgramFromWishlist", [programId], this.removeProgramFromWishlistReceived, this.removeProgramFromWishlistFailed);
    }

    private removeProgramFromWishlistReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            let userProgram:User_Prep_Program  = User_Prep_Program .fromJson(responseJSONObject.result);
            this._cachedData.UpdateUserPrepProgram(userProgram);

            this.dispatchEvent(new ProgramToWishlistEvent(ProgramToWishlistEvent.PROGRAM_REMOVED, null));
        }
        else
        {
            this.dispatchEvent(new ProgramToWishlistEvent(ProgramToWishlistEvent.PROGRAM_NOT_REMOVED, null));
        }
    }
    private removeProgramFromWishlistFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ProgramToWishlistEvent(ProgramToWishlistEvent.PROGRAM_NOT_REMOVED, null, errMsg));
    }
    /*********************************************************************************************************************/
    public AddCourseToWishlist(courseId:number):void
    {
        var proxyCourse = this._cachedData.GetDiscoveryProxyCoursesById(courseId);
        this._cachedData.UpdateMyWishlist(proxyCourse);
        this.CallFunction("AddCourseToWishlist", [courseId], this.addToWishlistReceived, this.addToWishlistFailed);
    }

    private addToWishlistReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var userCourse:User_Course = User_Course.fromJson(responseJSONObject.result);
            this._cachedData.UpdateUserCourse(userCourse);

            //var course:ProxyCourse = ProxyCourse.fromJson(responseJSONObject.result);
            //_cachedData.UpdateMyWishlist(course);
            this.dispatchEvent(new CourseToWishlistEvent(CourseToWishlistEvent.COURSE_ADDED, null));
        }
        else
        {
            this.dispatchEvent(new CourseToWishlistEvent(CourseToWishlistEvent.COURSE_NOT_ADDED, null));
        }
    }
    private addToWishlistFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new CourseToWishlistEvent(CourseToWishlistEvent.COURSE_NOT_ADDED, null, errMsg));
    }
    
    public RemoveCourseFromWishlist(courseId:number):void
    {
        var proxyCourse = this._cachedData.GetProxyCourseById(courseId);
        this._cachedData.UpdateMyWishlist(proxyCourse);
        this.CallFunction("RemoveCourseFromWishlist", [courseId], this.removeFromWishlistReceived, this.removeFromWishlistFailed);
    }

    private removeFromWishlistReceived = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var userCourse:User_Course = User_Course.fromJson(responseJSONObject.result);
            this._cachedData.UpdateUserCourse(userCourse);

            this.dispatchEvent(new CourseToWishlistEvent(CourseToWishlistEvent.COURSE_REMOVED, null));
        }
        else
        {
            this.dispatchEvent(new CourseToWishlistEvent(CourseToWishlistEvent.COURSE_NOT_REMOVED, null));
        }
    }
    private removeFromWishlistFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new CourseToWishlistEvent(CourseToWishlistEvent.COURSE_NOT_REMOVED, null, errMsg));
    }
    /*********************************************************************************************************************/
    public RateCourse(courseId:number, rating:number, review:string):void
    {
        this.CallFunction("RateCourse", [courseId, rating, review], this.rateSuccessful, this.rateFailed);
    }

    private rateSuccessful = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var userComment:User_Comment = User_Comment.fromJson(responseJSONObject.result);
            this._cachedData.UpdateUserComment(userComment);

            this.dispatchEvent(new RatingCourseEvent(RatingCourseEvent.RATING_SUCCESSFUL, null));
            UberApplication.GetInstance().showSnackbar("Thank you, your review has been submitted.");
        }
        else
        {
            this.dispatchEvent(new RatingCourseEvent(RatingCourseEvent.RATING_FAILED, null));
        }
    }
    private rateFailed = (errMsg:string, errObj:any=null, id:number=0):void =>
    {
        this.dispatchEvent(new RatingCourseEvent(RatingCourseEvent.RATING_FAILED, errMsg));
        UberApplication.GetInstance().showMdlAlertDialog(errMsg, "Error occurred", true);
    }

    public GetUserCommentByCourseId(id:number):User_Comment
    {
        return this._cachedData.GetUserCommentByCourseId(id);
    }
    public GetUserCommentByPrepProgramId(id:number):User_Comment
    {
        return this._cachedData.GetUserCommentByPrepProgramId(id);
    }

    public GetTrialMaxNumTexts():number
    {
        return this._cachedData.GetTrialMaxNumTexts();
    }

    public GetCourseComments(courseId:number, pageNumber:number, pageSize:number):void
    {
        this.CallFunction("GetCourseComments", [courseId, pageNumber, pageSize], this.getCourseCommentSuccess, this.getCourseCommentFailed);
    }

    public GetPrepProgramComments(programId:number, pageNumber:number, pageSize:number):void
    {
        this.CallFunction("GetPrepProgramComments", [programId, pageNumber, pageSize], this.getCourseCommentSuccess, this.getCourseCommentFailed);
    }

    private getCourseCommentSuccess = (responseJSONObject:any) =>
    {
        if(responseJSONObject.result != null)
        {
            var userComments:User_Comment[] = [];
            for (var commentObj of responseJSONObject.result.User_Comments)
            {
                userComments.push(User_Comment.fromJson(commentObj));
            }
            this.dispatchEvent(new CourseCommentEvent(CourseCommentEvent.COMMENTS_LOADED, userComments, responseJSONObject.result.Number_of_pages));
        }
        else
        {
            this.dispatchEvent(new CourseCommentEvent(CourseCommentEvent.COMMENTS_FAILED, null, 0, ""));
        }
    }
    private getCourseCommentFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new CourseCommentEvent(CourseCommentEvent.COMMENTS_FAILED, null, 0, errMsg));
    }

    public GetQuestionGroupById(id:number):Question_Group
    {
        return this._cachedData.GetQuestionGroupById(id);
    }

    public GetQuestionGroupByCourseId(id:number):Question_Group[]
    {
        return this._cachedData.GetQuestionGroupByCourseId(id);
    }

    public GetMyCourseById(id:number):ProxyCourse
    {
        return this._cachedData.GetMyCourseById(id);
    }
    
    public GetCoursePreview(courseId:number):void
    {
        var course:Course = this._cachedData.GetPreviewCourse(courseId);
        if(course == null)
        {            
            this.CallFunction("GetCoursePreview", [courseId], this.coursePreviewResponseHandler, this.coursePreviewFaultHandler);
        }
        else
        {
            this.dispatchEvent(new CoursePreviewEvent(CoursePreviewEvent.PREVIEW_LOADED, course, ""));
        }
    }
    private coursePreviewResponseHandler = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new CoursePreviewEvent(CoursePreviewEvent.PREVIEW_ERROR, null, responseJSONObject.result.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new CoursePreviewEvent(CoursePreviewEvent.PREVIEW_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var userQuestions:User_Question[] = [];
            for (var q of responseJSONObject.result.User_Questions)
            {
                userQuestions.push(User_Question.fromJson(q));
            }
            this._cachedData.UpdateUserQuestions(userQuestions);

            var userNotes:User_Notes[] = new Array<User_Notes>();
			for (var n of responseJSONObject.result.User_Notes)
			{
				userNotes.push(User_Notes.fromJson(n));
			}
			this._cachedData.UpdateUserNotes(userNotes);

            var course:Course;
            if(responseJSONObject.result.Course_Preview_Data)
            {
                var activities:Activity[] = [];
                for(var a of responseJSONObject.result.Course_Preview_Data.Activities)
                {
                    activities.push(Activity.fromJson(a));
                }
                this._cachedData.InsertActivities(activities);

                var questionGroups:Question_Group[] = [];
                for (var g of responseJSONObject.result.Course_Preview_Data.Question_Groups)
                {
                    questionGroups.push(Question_Group.fromJson(g));
                }
                this._cachedData.InsertQuestionGroup(questionGroups);

                course = Course.fromJson(responseJSONObject.result.Course_Preview_Data.Course);
                this._cachedData.InsertPreviewCourse(course);
            }

            this.dispatchEvent(new CoursePreviewEvent(CoursePreviewEvent.PREVIEW_LOADED, course, ""));
        }
    }
    private coursePreviewFaultHandler = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new CoursePreviewEvent(CoursePreviewEvent.PREVIEW_ERROR, null, errMsg));
    }
    
    public CreateAnonymousAccount(productId:number, clientVersion:string, clientType:string, trialKey:string):void
    {
        this.CallFunction("CreateAnonymousUser", [productId, clientVersion, clientType, trialKey], this.authenticateUserResponse, this.authenticateUserError);
    }

    public CreateUserAndGetData(userData:UserIdentificationData, productId:number, trialKey:string):void
	{		
		this.CallFunction("CreateUserAndGetData", [userData.toJson(), productId, trialKey, AppSettings.ClientVersion, AppSettings.GetClientTypeString()], this.authenticateUserResponse, this.authenticateUserError);
	}
    
    public FlagCourseActivity(activityId:number, reason:string):void
    {
        this.CallFunction("FlagCourseActivity", [activityId, reason], this.questionFlagSuccessful, this.questionFlagFailed);
    }

    private questionFlagSuccessful = (responseJSONObject:any) =>
    {
        if (responseJSONObject.result != null && responseJSONObject.result == "courseActivityFlagSuccessful")
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.FEEDBACK_SENT));
        }
        else
        {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.FEEDBACK_SEND_ERROR));
        }
    }
    private questionFlagFailed = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.FEEDBACK_SEND_ERROR));
    }

    public CompletePrepEdProfileInfo(profile_info: UserProfileInfo):void
    {
        DevUtils.LogFunction("ACCESS REMOTE", "CompletePrepEdProfileInfo", [profile_info.toJson()]);
        this.CallFunction("StorePrepEdProfileInfo", [profile_info.toJson()], this.storePrepEdProfileInfoResponse, this.storePrepEdProfileInfoError);
    }
    private storePrepEdProfileInfoResponse = (responseJSONObject:any) =>
    {
        DevUtils.LogFunction("ACCESS REMOTE", "storePrepEdProfileInfoResponse", [responseJSONObject]);
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.COMPLETE_PREPED_PROFILE_INFO_SUCCESS));
    }
    private storePrepEdProfileInfoError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        DevUtils.DisplayError(errMsg, "storePrepEdProfileInfoError");
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.COMPLETE_PREPED_PROFILE_INFO_FAILED));
    }

    /*********************************************************************************************************************/
    public PurchasePrepProgramActivationCode(code:string):void
    {
        this.CallFunction("PurchasePrepProgramActivationCode", [code], this.addPrepProgramReceived, this.addPrepProgramFailed);
    }

    public PrepEdUseActivationCode(code:string):void
    {
        this.CallFunction("PrepEdUseActivationCode", [code], this.prepedUseActivationCodeResponse, this.prepedUseActivationCodeError);
    }

    private prepedUseActivationCodeResponse = (responseJSONObject:any) =>
    {
        DevUtils.LogFunction("ACCESS REMOTE", "prepedUseActivationCodeResponse", [responseJSONObject]);
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new AddPrepProgramsEvent(AddPrepProgramsEvent.ADD_PROGRAMS_FAILED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new AddPrepProgramsEvent(AddPrepProgramsEvent.ADD_PROGRAMS_FAILED, null, responseJSONObject.error.message));
        }
        else
        {
            let programs:Prep_Program[] = [];
            for(let program of responseJSONObject.result.Prep_Programs)
            {
                programs.push(Prep_Program.fromJson(program));
            }
            this._cachedData.UpdateMyPrepPrograms(programs);

            let proxyCourses:ProxyCourse[] = [];
            for(let c of responseJSONObject.result.ProxyCourses)
            {
                proxyCourses.push(ProxyCourse.fromJson(c));
            }
            this._cachedData.UpdateMyCourses(proxyCourses);

            for(let uc of responseJSONObject.result.User_Courses)
            {
                this._cachedData.UpdateUserCourse(User_Course.fromJson(uc));
            }

            let user_prep_programs:User_Prep_Program[] = [];
            for(let user_prep_program of responseJSONObject.result.User_Prep_Programs)
            {
                user_prep_programs.push(User_Prep_Program.fromJson(user_prep_program));
            }
            this._cachedData.UpdateUserPrepPrograms(user_prep_programs);

            this.dispatchEvent(new AddPrepProgramsEvent(AddPrepProgramsEvent.ADD_PROGRAMS_SUCCESS, programs));
        }
    }
    private prepedUseActivationCodeError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        DevUtils.DisplayError(errMsg, "prepedUseActivationCodeError");
        this.dispatchEvent(new AddPrepProgramsEvent(AddPrepProgramsEvent.ADD_PROGRAMS_FAILED, null,errMsg));
    }
    /*********************************************************************************************************************/

    public SelectUserCourseByCourseUser(courseId:number, userId:number):User_Course
    {
        return this._cachedData.GetUserCourse(courseId);
    }

    public SelectSettingByControlRefFunctionName(controlRef:string, functionName:string):Setting
    {
        return this._cachedData.GetUserSettingByControlRefFunctionName(controlRef, functionName);
    }

    public SelectAllActivitiesByCategory(categoryId:number):Activity[]
    {
        return this._cachedData.GetActivitiesByActivityCategory(categoryId);
    }

    public SelectUserPrefByKey(key:string):UserPref
    {
        return this._cachedData.GetUserPref(key);
    }

    //Start of SELECT by ID functions
    public SelectAControlById(aControlId:number):AControl
    {
        return this._cachedData.GetAControl(aControlId);
    }

    public SelectAllUserAControls():AControl[]
    {
        return this._cachedData.SelectAllUserAControls();
    }

    public SelectActivityById(activityId:number):Activity
    {
        return this._cachedData.GetActivity(activityId);
    }

    public SelectCodeById(codeId:number):Code
    {
        return this._cachedData.GetCode(codeId);
    }

    public SelectCodeByText(codeText:string):Code
    {
        return this._cachedData.GetCodeByText(codeText);
    }

    public SelectCodesByParentId(parentId:number):Code[]
    {
        return this._cachedData.GetCodesByParent(parentId);
    }

    public GetExamInfoByExamName(exam_name: string):ExamInfo {
        return this._cachedData.GetExamInfoByExamName(exam_name);
    }

    public SelectUserQuestionByQuestion(questionId:number):User_Question
    {
        return this._cachedData.GetUserQuestion(questionId);
    }

    public SelectUserNotesByCourseActivity(id:number):User_Notes
    {
        return this._cachedData.GetUserNotes(id);
    }

    public GetAllUserNotes():User_Notes[]
    {
        return this._cachedData.GetAllUserNotes();
    }

    public HasUserNotes(course_id: number):boolean
    {
        return this._cachedData.HasUserNotes(course_id);
    }

    public SelectQuestionAnswerByQuestion(questionId:number):string
    {
        return this._cachedData.GetQuestionAnswer(questionId);
    }

    public SelectAllWordDiscovers():Word_Discover[]
    {
        return this._cachedData.WordDiscovers;
    }

    public GetNextWordDiscoverSeq(userId:number, productId:number):number
    {
        return this._cachedData.GetNextWordDiscoverSeq();
    }

    public WordDiscoverExists(name:string):boolean
    {
        return this._cachedData.WordDiscoverExists(name);
    }

    public SwapWordDiscoverRecords(wordDiscover1:Word_Discover, wordDiscover2:Word_Discover):void
    {
        this._cachedData.SwapWordDiscoverRecords(wordDiscover1, wordDiscover2);
    }

    public UpdateWordDiscover_Activated(wordDiscover:Word_Discover):void
    {
        this._cachedData.UpdateWordDiscover(wordDiscover);
    }

    public SelectAllTopLevelWordlistCategories():Wordlist_Category[]
    {
        return this._cachedData.WordlistCategories;
    }

    public SelectAllDefaultTexts(includeComplexTexts:boolean):ProxyText[]
    {
        return this._cachedData.GetTextsTable(includeComplexTexts);
    }

    public SelectWordById(wordId:number):Word
    {
        return this._cachedData.GetWord(wordId);
    }

    public SelectWordlistById(wordlistId:number):Wordlist
    {
        return this._cachedData.GetWordlist(wordlistId);
    }

    public SelectDefaultByKey(key:string):Default
    {
        return this._cachedData.GetDefault(key);
    }

    public SelectDefaultWordSenseByWord(wordId:number):Word_Sense
    {
        return this._cachedData.GetDefaultWordSense(wordId);
    }

    public GetUiTextByKey(key:string):string
    {
        return this._cachedData.GetUiTextByKey(key);
    }

    public UiTextLoaded():boolean
    {
        return this._cachedData.UiTextLoaded();
    }

    public GetAllLanguages():Language[]
    {
        return this._cachedData.Languages;
    }

    public GetStatusLevels():StatusLevel[]
    {
        return this._cachedData.StatusLevel;
    }

    public GetStatusPoints():number
    {
        return this._cachedData.StatusPoints;
    }

    public GetCourseText(textId:number):Text
    {
        return this._cachedData.GetText(textId);
    }

    public GetMyProxyCoursesByProgramId(programId):ProxyCourse[]
    {
        return this._cachedData.GetMyProxyCoursesByProgramId(programId);
    }

    public UpdateDiscoverProxyCourses(courses:ProxyCourse[]):void
    {
        this._cachedData.UpdateDiscoverProxyCourses(courses);
    }

    public GetUnseenCourses():number
    {
        return this._cachedData.GetUnseenCourses();
    }

    public GetUnseenWishlistCourses():number
    {
        return this._cachedData.GetUnseenWishlistCourses();
    }

    public GetUnseenNotes():number
    {
        return this._cachedData.GetUnseenNotes();
    }

    public GetUnseenPrepProgram():number
    {
        return this._cachedData.GetUnseenPrepProgram();
    }

    public GetUnseenWords(wordlist_id:number):number
    {
        return this._cachedData.GetUnseenWords(wordlist_id);
    }

    public UpdateWordsSeen(wordlist_id:number):void {
        this._cachedData.UpdateWordsSeen(wordlist_id);
    }

    public GetWordUsageExamples(wordId:number, wordPosId:number, genresSelected:string[]): WordUsageExample[]
    {
        return this._cachedData.GetWordUsageExamples(wordId, wordPosId, genresSelected);
    }

    public SetWordUsageExamples(wordId:number, wordPosId:number, examples:WordUsageExample[]):void
    {
        this._cachedData.SetWordUsageExamples(wordId, wordPosId, examples);
    }

    public ClearLocalStorage():void
    {
        this._cachedData.ClearLocalStorage();
    }

    //NON-EDU USERS
    public GetCurrentHomeLeaderboards(productId:number): void {
        this.CallFunction("GetLeaderboardsHome", [productId], this.getLeaderboardsResponse, this.getLeaderboardsResponseError);
    }

    public GetPastHomeLeaderboards(productId:number): void {
        this.CallFunction("GetPastLeaderboardsHome", [productId], this.getLeaderboardsResponse, this.getLeaderboardsResponseError);
    }

    //EDU USERS
    public GetCurrentEDULeaderboards(productId:number): void {
        this.CallFunction("GetLeaderboardsEdu", [productId], this.getLeaderboardsResponse, this.getLeaderboardsResponseError);
    }

    public GetPastEDULeaderboards(productId:number): void {
        this.CallFunction("GetPastLeaderboardsEdu", [productId], this.getLeaderboardsResponse, this.getLeaderboardsResponseError);
    }

    public GetLeaderboardsEduByGroup(productId:number): void {
        this.CallFunction("GetLeaderboardsEduByGroup", [productId], this.getLeaderboardsResponse, this.getLeaderboardsResponseError);
    }

    public GetPastLeaderboardsEduByGroup(productId:number): void {
        this.CallFunction("GetPastLeaderboardsEduByGroup", [productId], this.getLeaderboardsResponse, this.getLeaderboardsResponseError);
    }

    private getLeaderboardsResponse = (responseJSONObject:any) => {
		console.log("TCL: privategetLeaderboardsResponse -> responseJSONObject", responseJSONObject)
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new LeaderboardEvent(LeaderboardEvent.LEADERBOARDS_ERROR, null));
        }
        else {
            this.dispatchEvent(new LeaderboardEvent(LeaderboardEvent.LEADERBOARDS_RECEIVED, responseJSONObject.result));
        }
    }

    private getLeaderboardsResponseError = (errMsg:string, errObj:any = null, id:number = 0) => {
		console.log("TCL: privategetLeaderboardsResponseError -> errMsg", errMsg)
        this.dispatchEvent(new LeaderboardEvent(LeaderboardEvent.LEADERBOARDS_ERROR, null));
    }

    public get CurrentLessonPlan(): Lesson_Plan {
        return this._cachedData.CurrentLessonPlan;
    }

    public set CurrentLessonPlan(lessonPlan: Lesson_Plan) {
        this._cachedData.CurrentLessonPlan = lessonPlan;
    }

    public GetLessonPlan(lessonPlanId:number): void {
        let lessonPlan = this._cachedData.getLessonPlanById(lessonPlanId);
        if (lessonPlan == null) {
            this.CallFunction("GetLessonPlan", [lessonPlanId], this.getLessonPlanResponse, this.getLessonPlanResponseError);
        }
        else {
            this.dispatchEvent(new LessonPlanEvent(LessonPlanEvent.LESSONPLAN_RECEIVED, lessonPlan, null));
        }
    }

    private getLessonPlanResponse = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new LessonPlanEvent(LessonPlanEvent.LESSONPLAN_ERROR, null, null));
        }
        else {
            let lessonPlan: Lesson_Plan = Lesson_Plan.fromJson(responseJSONObject.result.Lesson_Plan);
            let courseCategories: Course_Category[] = [];
            for (let courseCategory of responseJSONObject.result.Course_Categories) {
                courseCategories.push(Course_Category.fromJson(courseCategory));
            }
            this._cachedData.addLessonPlan(lessonPlan);
            this._cachedData.addUserCourseCategory(lessonPlan.Lesson_plan_id, courseCategories);
            this.dispatchEvent(new LessonPlanEvent(LessonPlanEvent.LESSONPLAN_RECEIVED, lessonPlan, courseCategories));
        }
    }

    private getLessonPlanResponseError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new LessonPlanEvent(LessonPlanEvent.LESSONPLAN_ERROR, null, null));
    }

    public set CurrentCourseCategories(categories:Course_Category[]) {
        this._cachedData.CurrentCourseCategories = categories;
    }

    public get UpgradeURL(): string {
        return this._cachedData.UpgradeURL;
    }



    /** ADMIN INTERFACE FUNCTIONS  **/
    public HasAdminData(): boolean {
        return this._cachedData.HasAdminData();
    }

    public GetAdminInterfaceData(customerId?:number): void {

        if (this._cachedData.HasAdminData() && this._cachedData.GetAdminCustomer().Customer_id == customerId)
        {
            let district = this._cachedData.GetAdminDistrict();
            let subscription = this._cachedData.GetAdminSubscription();
            let subscriptionInfo = this._cachedData.GetAdminSubscriptionInfo();
            let customer = this._cachedData.GetAdminCustomer();
            let customers = this._cachedData.GetEreflectAdminCustomers();
            let groups = this._cachedData.GetAdminGroups();
            let gradingTemplates = this._cachedData.GetGradingTemplates();
            let assignmentTypes = this._cachedData.GetAssignmentTypes();

            let userIds:number[] = [];
            for (let group of groups)
            {
                for (let userGroup of group.User_Groups)
                {
                    if (userIds.indexOf(userGroup.User_id) < 0)
                    {
                        userIds.push(userGroup.User_id);
                    }
                }
            }
            subscription.Licenses_used = userIds.length;
            DevUtils.LogFunction("ACCESS REMOTE", "GetAdminInterfaceData : CACHE", [customer, customers, groups, subscription, district, gradingTemplates]);
            this.dispatchEvent(new AdminEvent(AdminEvent.ADMIN_DATA_RECEIVED, customer, customers, groups, subscription, subscriptionInfo, district, "", gradingTemplates, assignmentTypes));
        }
        else
        {
            DevUtils.LogFunction("ACCESS REMOTE", "GetAdminInterfaceData : SERVER", null);
            this.CallFunction("GetAdminInterfaceData", [customerId], this.adminDataReceived, this.adminDataError);
        }
    }

    public GetAdminInterfaceData2(customerId: number, districtId: number): void {
        //clever district admin
        //userId = 766159;
        //userId = 795183;

        //clever school admin
        //userId = 834790;
        //userId = 834791;

        //clever teacher admin
        //userId = 795108;
        //userId = 766155;

        //this.GetAdminInterfaceData(this._cachedData.CurrentCustomerId);

        if (this._cachedData.HasAdminData() && this._cachedData.GetAdminCustomer().Customer_id == customerId)
        {
            let district = this._cachedData.GetAdminDistrict();
            let subscription = this._cachedData.GetAdminSubscription();
            let subscriptionInfo = this._cachedData.GetAdminSubscriptionInfo();
            let customer = this._cachedData.GetAdminCustomer();
            let customers = this._cachedData.GetEreflectAdminCustomers();
            let groups = this._cachedData.GetAdminGroups();
            let adminUserType = this._cachedData.CurrentAdminUserType;
            let gradingTemplates = this._cachedData.GetGradingTemplates();
            let assignmentTypes = this._cachedData.GetAssignmentTypes();

            let userIds:number[] = [];
            for (let group of groups)
            {
                for (let userGroup of group.User_Groups)
                {
                    if (userIds.indexOf(userGroup.User_id) < 0)
                    {
                        userIds.push(userGroup.User_id);
                    }
                }
            }
            subscription.Licenses_used = userIds.length;
            DevUtils.LogFunction("ACCESS REMOTE", "GetAdminInterfaceData2 : CACHE", [customer, customers, groups, subscription, subscriptionInfo, district, adminUserType]);
            this.dispatchEvent(new AdminEvent(AdminEvent.ADMIN_DATA_RECEIVED, customer, customers, groups, subscription, subscriptionInfo, district, adminUserType, gradingTemplates, assignmentTypes));
        }
        else
        {
            DevUtils.LogFunction("ACCESS REMOTE", "GetAdminInterfaceData2 : SERVER", null);
            this.CallFunction("GetAdminInterfaceData2", [customerId, districtId], this.adminDataReceived, this.adminDataError);
        }
    }

    private adminDataReceived = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminEvent(AdminEvent.ADMIN_DATA_ERROR, null, null, null, null, null, null, null, null, null, responseJSONObject.error.message));
        }
        else {
            DevUtils.LogFunction("ACCESS REMOTE", "adminDataReceived", [responseJSONObject]);
            let admin_data = responseJSONObject.result;
            let userType = admin_data.Current_user_type;
            let customer;// = Customer.fromJson(admin_data.Customer);
            let subscription = UserSubscription.fromJson(admin_data.Subscription);
            let subscriptionInfo: ActiveSubscription;
            if (admin_data.Subscription_Info) {
                subscriptionInfo = ActiveSubscription.fromJson(admin_data.Subscription_Info);
            }
            else if (admin_data.Active_Subscription) {
                subscriptionInfo = ActiveSubscription.fromJson(admin_data.Active_Subscription);
            }

            let groups: Group[] = [];
            let userIds:number[] = [];

            for(let group of admin_data.Groups) {
                groups.push(Group.fromJson(group));
                for (let userGroup of group.User_Groups)
                {
                    if (userIds.indexOf(userGroup.User_id) < 0)
                    {
                        userIds.push(userGroup.User_id);
                    }
                }
            }
            subscription.Licenses_used = userIds.length;
            let users: AdminUser[] = [];
            for(let user of admin_data.Users) {
                users.push(AdminUser.fromJson(user));
            }

            let userChartCategories:Chart_Category[] = new Array<Chart_Category>();
            for (let chartCategoryObject of admin_data.User_chart_categories)
            {
                userChartCategories.push(Chart_Category.fromJson(chartCategoryObject));
            }

            let groupChartCategories:Chart_Category[] = new Array<Chart_Category>();
            for (let chartCategoryObject of admin_data.Group_chart_categories)
            {
                groupChartCategories.push(Chart_Category.fromJson(chartCategoryObject));
            }

            let customerChartCategories:Chart_Category[] = new Array<Chart_Category>();
            for (let chartCategoryObject of admin_data.Customer_chart_categories)
            {
                customerChartCategories.push(Chart_Category.fromJson(chartCategoryObject));
            }

            let customers: Customer[] = [];
            for (let _customer of admin_data.Customers) {
                customers.push(Customer.fromJson(_customer));
            }

            if(customers.length > 1) {
                this._cachedData.SetEreflectAdminCustomers(customers);
            }
            customer = customers[0];

            let lessonPlans:ProxyLessonPlan[] = [];
            if(admin_data.Lesson_Plans) {
                for (let lessonPlan of admin_data.Lesson_Plans) {
                    lessonPlans.push(ProxyLessonPlan.fromJson(lessonPlan));
                }
            }

            let district: District;
            if (admin_data.District) {
                district = new District(admin_data.District);
            }

            let gradingTemplates: Grading_Template[] = [];
            for (let template of admin_data.Grading_Templates) {
                gradingTemplates.push(Grading_Template.fromJson(template));
            }

            let assignmentTypes: Assignment_Type[] = [];
            for (let type of admin_data.Assignment_Types) {
                assignmentTypes.push(Assignment_Type.fromJson(type));
            }

            this._cachedData.CurrentCustomerId = customer.Customer_id;
            this._cachedData.SetAdminData(customer, district, subscription, subscriptionInfo, groups, users, userChartCategories, groupChartCategories, customerChartCategories, lessonPlans, userType, gradingTemplates, assignmentTypes);
            this.dispatchEvent(new AdminEvent(AdminEvent.ADMIN_DATA_RECEIVED, customer, customers, groups, subscription, subscriptionInfo, district, userType, gradingTemplates, assignmentTypes));
        }
    }
    private adminDataError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new AdminEvent(AdminEvent.ADMIN_DATA_ERROR, null, null, null, null, null, null, null, null, null, errMsg));
    }

    public GetAdminGroups(): Group[] {
        return this._cachedData.GetAdminGroups();
    }
    public GetAdminUsersCache(): AdminUser[] {
        return this._cachedData.GetAdminUsers();
    }

    /**
     * gets all user chart categories including user reports
     */
    public GetAdminUserChartCategories(): Chart_Category[] {
        return this._cachedData.GetAdminUserChartCategories();
    }
    /**
     * gets all group chart categories
     */
    public GetAdminGroupChartCategories(): Chart_Category[] {
        return this._cachedData.GetAdminGroupChartCategories();
    }

    /**
     * returns all group charts and/or reports from cache
     * based on isReport parameter, function will return reports if true, charts if false or both if null
     * @param isReport boolean indicating wether to return charts, reports or both.
     */
    public GetAdminGroupCharts(isReport:boolean):Chart[]
    {
        return this._cachedData.GetAdminGroupCharts(isReport);
    }

    /**
     * gets all students and/or instructors from a particular group
     * @param groupId   the id of the group to get the users from
     * @param isLeader  boolean indicating if the call is to retreive students, instructors or both
     *                  funciton will return reports if true, charts if false or both if null
     */
    public GetAdminUsersByGroupIsLeader(groupId:number, isLeader:boolean): AdminUser[] {
        return this._cachedData.GetAdminUsersByGroupIsLeader(groupId, isLeader);
    }

    public GetGroupByUserID(userID: number): Group {
        return this._cachedData.GetGroupByUserID(userID);
    }

    public GetGroupsByUserID(userID: number): Group[] {
        return this._cachedData.GetGroupsByUserID(userID);
    }

    public GetAdminUsersByClassName(groupName: string): AdminUser[] {
        return this._cachedData.GetAdminUsersByClassName(groupName);
    }

    /**
     * gets all users that are not in a particular group
     * @param groupId the id of the group
     */
    public GetAdminUsersNotInGroup(groupId:number): AdminUser[] {
        return this._cachedData.GetAdminUsersNotInGroup(groupId);
    }

    public GetUsersNotInAnyGroup(): AdminUser[] {
        return this._cachedData.GetUsersNotInAnyGroup();
    }

    public GetAdminUsers(): void {
        this.CallFunction("AdminGetUsers", null, this.adminUsersReceived, this.adminUsersError);
    }
    private adminUsersReceived = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let adminUsersJson = responseJSONObject.result.Users;
            let adminUsers: AdminUser[] = [];
            for(let user of adminUsersJson) {
                adminUsers.push(AdminUser.fromJson(user));
            }
            this._cachedData.SetAdminUsers(adminUsers);
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_RECEIVED, adminUsers));
        }
    }
    private adminUsersError = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "adminUsersError");
        this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_ERROR, null, errMsg));
    }

    public EditAdminUser(user: AdminUser): void {
        this.CallFunction("AdminEditUser", [user.toJson()], this.adminUserUpdated, this.adminUsersError);
    }

    private adminUserUpdated = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let user = AdminUser.fromJson(responseJSONObject.result.User);
            this._cachedData.UpdateAdminUser(user);
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USER_UPDATED, [user]));
        }
    }

    /* public AdminCreateUser(user: AdminUser, generateUsername: boolean, generatePassword: boolean, groupID?: number, customerId?: number): void {
        this.CallFunction("AdminCreateUser", [user.toJson(), generateUsername, generatePassword, groupID, customerId], this.adminUserCreated, this.adminUsersError);
    }

    private adminUserCreated = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let user = AdminUser.fromJson(responseJSONObject.result.User);
            this._cachedData.UpdateAdminUser(user);
            if (responseJSONObject.result.User_Group)
            {
                let userGroup = User_Group.fromJson(responseJSONObject.result.User_Group);
                this._cachedData.AddUserGroups([userGroup]);
            }
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USER_CREATED, [user]));
        }
    } */

    public AdminResetUserPasswords(userIDs: number[]): void {
        this.CallFunction("AdminResetUserPasswords", [userIDs], this.adminUserPasswordReset, this.adminUsersError);
    }

    private adminUserPasswordReset = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let adminUsers: AdminUser[] = [];
            let users = responseJSONObject.result.Users;
            for(let user of users) {
                let adminUser: AdminUser = AdminUser.fromJson(user);
                adminUsers.push(adminUser);
                this._cachedData.UpdateAdminUser(adminUser);
            }
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USER_PASSWORD_RESET, adminUsers));
        }
    }

    /* public AdminDeleteUsers(userIDs: number[]): void {
        this.CallFunction("AdminDeleteUsers", [userIDs], this.adminUsersDeleted, this.adminUsersError);
    }

    private adminUsersDeleted = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let idOfUsersDeleted: number[] = responseJSONObject.result.User_ids;
            for (let userId of idOfUsersDeleted) {
                this._cachedData.DeleteAdminUser(userId);
            }
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_DELETED, null));
        }
    } */

    public GetRunningTaskStatus(runningTaskId: number): Observable<AdminUserEvent> {
        return Observable.create(observer => {
            let success = (responseJSONObject:any) => {
                if (responseJSONObject.error != null) {
                    observer.error(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORT_ERROR, null, responseJSONObject.error.message, responseJSONObject.result.Running_task_id));
                }
                else {
                    console.log('GetRunningTaskStatusSuccess: ', responseJSONObject);
                    let progress = responseJSONObject.result.Progress;
                    let running_task_id = responseJSONObject.result.Running_task_id;
                    if (progress != null && progress < 100) {
                        observer.next(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORTED, null, "", running_task_id, progress));
                        setTimeout(() => {
                            this.CallFunction("GetRunningTaskStatus", [runningTaskId],
                                success,
                                (errMsg:string, errObj:any = null, id:number = 0) => {
                                    observer.error(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORT_ERROR, null, errMsg));
                                }, true);
                        }, 200);
                    }
                    else {
                        let users:AdminUser[] = [];
                        for (let userJson of responseJSONObject.result.Users)
                        {
                            users.push(AdminUser.fromJson(userJson));
                        }
                        this._cachedData.SetAdminUsers(users);

                        if (responseJSONObject.result.User_Groups && responseJSONObject.result.User_Groups.length > 0)
                        {
                            let userGroups:User_Group[] = [];
                            for (let userGroup of responseJSONObject.result.User_Groups)
                            {
                                userGroups.push(User_Group.fromJson(userGroup));
                            }
                            this._cachedData.AddUserGroups(userGroups);
                        }
                        observer.next(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORTED, users, "", running_task_id, progress));
                    }
                }
            };
            this.CallFunction("GetRunningTaskStatus", [runningTaskId],
                success,
                (errMsg:string, errObj:any = null, id:number = 0) => {
                    observer.error(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORT_ERROR, null, errMsg));
                }, true);
        });        
    }

    private GetRunningTaskStatusSuccess = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            // this.dispatchEvent(new RunningTaskStatusEvent(RunningTaskStatusEvent.TASK_ERROR, null, responseJSONObject.error.message));
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORT_ERROR, null, responseJSONObject.error.message, responseJSONObject.result.Running_task_id));
        }
        else {
            console.log('GetRunningTaskStatusSuccess: ', responseJSONObject);
            let progress = responseJSONObject.result.Progress;
            let running_task_id = responseJSONObject.result.Running_task_id;
            if (progress != null) {
                // this.dispatchEvent(new RunningTaskStatusEvent(RunningTaskStatusEvent.TASK_SUCESS, progress));
                this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORTED, null, "", running_task_id, progress));
            }
            else {
                let users:AdminUser[] = [];
                for (let userJson of responseJSONObject.result.Users)
                {
                    users.push(AdminUser.fromJson(userJson));
                }
                this._cachedData.SetAdminUsers(users);

                if (responseJSONObject.result.User_Groups.length > 0)
                {
                    let userGroups:User_Group[] = [];
                    for (let userGroup of responseJSONObject.result.User_Groups)
                    {
                        userGroups.push(User_Group.fromJson(userGroup));
                    }
                    this._cachedData.AddUserGroups(userGroups);
                }
                this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORTED, users, "", running_task_id));
            }
        }
    }

    private GetRunningTaskStatusError = (errMsg:string, errObj:any = null, id:number = 0) => {
        // this.dispatchEvent(new RunningTaskStatusEvent(RunningTaskStatusEvent.TASK_ERROR, null, errMsg));
        this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORT_ERROR, null, errMsg));
    }

    public GetRunningTaskStatusByID(runningTaskId: number): Observable<RunningTaskEvent> {
        return Observable.create(observer => {
            let success = (responseJSONObject:any) => {
                if (responseJSONObject.error != null) {
                    observer.error(new RunningTaskEvent(RunningTaskEvent.RUNNING_TASK_ERROR, responseJSONObject.result.Running_task_id, null, null, responseJSONObject.error.message));
                }
                else {
                    console.log('GetRunningTaskStatusSuccess: ', responseJSONObject);
                    let progress = responseJSONObject.result.Progress;
                    let running_task_id = responseJSONObject.result.Running_task_id;
                    if (progress != null && progress < 100) {
                        observer.next(new RunningTaskEvent(RunningTaskEvent.RUNNING_TASK_IN_PROGRESS, running_task_id, progress));
                        setTimeout(() => {
                            this.CallFunction("GetRunningTaskStatus", [runningTaskId],
                                success,
                                (errMsg:string, errObj:any = null, id:number = 0) => {
                                    observer.error(new RunningTaskEvent(RunningTaskEvent.RUNNING_TASK_ERROR, responseJSONObject.result.Running_task_id, null, null, errMsg));
                                }, true);
                        }, 200);
                    }
                    else {
                        observer.next(new RunningTaskEvent(RunningTaskEvent.RUNNING_TASK_FINISHED, running_task_id, progress, responseJSONObject));
                    }
                }
            };
            this.CallFunction("GetRunningTaskStatus", [runningTaskId],
                success,
                (errMsg:string, errObj:any = null, id:number = 0) => {
                    observer.error(new RunningTaskEvent(RunningTaskEvent.RUNNING_TASK_ERROR, runningTaskId, null, null, errMsg));
                }, true);
        });        
    }

    public AdminStartImportUsers(file: string, fixNameCapitalization: boolean, groupId?: number, customerId?: number): void {
        this.CallFunction("AdminStartImportUsers", [file, fixNameCapitalization, groupId, customerId], this.AdminStartImportUsersSuccess, this.AdminStartImportUsersError, true);
    }

    private AdminStartImportUsersSuccess = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORT_ERROR, null, responseJSONObject.error.message));
        }
        else {
            console.log('AdminStartImportUsersSuccess: ', responseJSONObject);
            let running_task_id = responseJSONObject.result.Running_task_id;
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORTED, null, "", running_task_id));
        }
    }
    private AdminStartImportUsersError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORT_ERROR, null, errMsg));
    }

    public AdminImportUsers(file: string, fixNameCapitalization: boolean, groupId?: number, customerId?: number): void {
        this.CallFunction("AdminImportUsers", [file, fixNameCapitalization, groupId, customerId], this.usersImported, this.userImportError);
    }

    private usersImported = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORT_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let taskID = responseJSONObject.result.Running_task_id;
            let users:AdminUser[] = [];
            for (let userJson of responseJSONObject.result.Users)
            {
                users.push(AdminUser.fromJson(userJson));
            }
            this._cachedData.SetAdminUsers(users);

            if (responseJSONObject.result.User_Groups.length > 0)
            {
                let userGroups:User_Group[] = [];
                for (let userGroup of responseJSONObject.result.User_Groups)
                {
                    userGroups.push(User_Group.fromJson(userGroup));
                }
                this._cachedData.AddUserGroups(userGroups);
            }
            this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORTED, users));
            this._cachedData.RemoveTask(taskID);
        }
    }
    private userImportError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new AdminUserEvent(AdminUserEvent.ADMIN_USERS_IMPORT_ERROR, null, errMsg));
    }

    public AdminAddUsersToGroup(groupId:number, userIds:number[], asLeaders: boolean): void {
        this.CallFunction("AdminAddUsersToGroup2", [groupId, userIds, asLeaders], this.adminUsersAddedToGroup, this.adminUsersAddError);
    }
    private adminUsersAddedToGroup = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new UserGroupEvent(UserGroupEvent.USERS_ADD_TO_GROUP_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let userGroups: User_Group[] = [];
            for (let ug of responseJSONObject.result.User_Groups)
            {
                userGroups.push(User_Group.fromJson(ug));
            }

            this._cachedData.AddUserGroups(userGroups);

            this.dispatchEvent(new UserGroupEvent(UserGroupEvent.USERS_ADDED_TO_GROUP, userGroups));
        }
    }
    private adminUsersAddError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new UserGroupEvent(UserGroupEvent.USERS_ADD_TO_GROUP_ERROR, null, errMsg));
    }

    public AdminAddInstructorToGroup(groupId:number, userIds:number[]): void {
        this.CallFunction("AdminAddLeadersToGroup", [groupId, userIds], this.adminInstructorAddedToGroup, this.adminInstructorAddError);
    }
    private adminInstructorAddedToGroup = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new UserGroupEvent(UserGroupEvent.INSTRUCTORS_ADD_TO_GROUP_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let userGroups: User_Group[] = [];
            for (var ug of responseJSONObject.result.User_Groups)
            {
                userGroups.push(User_Group.fromJson(ug));
            }

            this._cachedData.AddUserGroups(userGroups);

            this.dispatchEvent(new UserGroupEvent(UserGroupEvent.INSTRUCTORS_ADDED_TO_GROUP, userGroups));
        }
    }
    private adminInstructorAddError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new UserGroupEvent(UserGroupEvent.INSTRUCTORS_ADD_TO_GROUP_ERROR, null, errMsg));
    }

    public AdminRemoveUsersFromGroup(groupId:number, userIds:number[]): void {
        let requestId = this.CallFunction("AdminRemoveUsersFromGroup", [groupId, userIds], this.adminUsersRemovedFromGroup, this.adminUsersRemoveFromGroupError);

        this._serverCallData[requestId] = {data: [groupId, userIds]};
    }
    private adminUsersRemovedFromGroup = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new UserGroupEvent(UserGroupEvent.USERS_REMOVE_FROM_GROUP_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let requestId:number = responseJSONObject.RequestId;
            var requestData:any = this._serverCallData[requestId];
            let groupId:number = requestData.data[0];
            let userIds:number[] = requestData.data[1];

            this._cachedData.RemoveUserGroups(groupId, userIds);
            this._serverCallData[requestId] = null;

            this.dispatchEvent(new UserGroupEvent(UserGroupEvent.USERS_REMOVED_FROM_GROUP, []));
        }
    }
    private adminUsersRemoveFromGroupError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this._serverCallData[id] = null;
        this.dispatchEvent(new UserGroupEvent(UserGroupEvent.USERS_REMOVE_FROM_GROUP_ERROR, null, errMsg));
    }

    public AdminCreateGroup(group: Group): void {
        this.CallFunction("AdminCreateGroup", [group.toJson()], this.adminGroupCreated, this.adminGroupCreateError);
    }
    private adminGroupCreated = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_CREATION_ERROR, null, responseJSONObject.error.message));
        }
        else {
            console.log("ADMIN GROUP CREATED: ", responseJSONObject.result);
            let group = Group.fromJson(responseJSONObject.result.Group);
            this._cachedData.UpdateAdminGroup(group);
            this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_CREATED, group));
        }
    }
    private adminGroupCreateError = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "adminGroupCreateError");
        this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_CREATION_ERROR, null, errMsg));
    }

    public AdminEditGroup(group: Group, isBackgroundCall: boolean = false): void {
        this.CallFunction("AdminEditGroup", [group.toJson()], this.adminGroupEdited, this.adminGroupEditError, isBackgroundCall);
    }
    private adminGroupEdited = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_UPDATE_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let group = Group.fromJson(responseJSONObject.result.Group);
            this._cachedData.UpdateAdminGroup(group);
            this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_UPDATED, group));
        }
    }
    private adminGroupEditError = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "adminGroupEditError");
        this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_UPDATE_ERROR, null, errMsg));
    }

    public AdminResetGroupSettings(groupId:number)
    {
        this.CallFunction("AdminResetGroupSettings", [groupId], this.adminGroupSettingsReset, this.adminGroupSettingsResetError);
    }
    private adminGroupSettingsReset = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminGroupSettingsEvent(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_RESET_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            //responseJSONObject.result.Group_Settings
            this.dispatchEvent(new AdminGroupSettingsEvent(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_RESET, [], []));
        }
    }
    private adminGroupSettingsResetError = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "adminGroupSettingsResetError");
        this.dispatchEvent(new AdminGroupSettingsEvent(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_RESET_ERROR, null, null, errMsg));
    }

    public AdminSaveGroupSettings(groupId:number, groupSettings:Setting[], groupUserPrefs:UserPref[]): void {
        let settingsJson:any[] = [];
        for (let setting of groupSettings)
        {
            settingsJson.push(setting.toJson());
        }
        let userPrefsJson:any[] = [];
        for (let userPref of groupUserPrefs)
        {
            userPrefsJson.push(userPref.toJson());
        }
        this.CallFunction("AdminSaveGroupSettings", [groupId, userPrefsJson, settingsJson], this.adminGroupSettingsSaved, this.adminGroupSettingsUpdateError, true);
    }
    private adminGroupSettingsSaved = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminGroupSettingsEvent(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_UPDATE_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            let settings:Setting[] = [];
            for (var settingJson of responseJSONObject.result.Group_Settings)
            {
                settings.push(Setting.fromJson(settingJson));
            }
            let userPrefs:UserPref[] = [];
            for (var userPrefJson of responseJSONObject.result.Group_UserPrefs)
            {
                userPrefs.push(UserPref.fromJson(userPrefJson));
            }
            this._cachedData.UpdateGroupUserPrefs(userPrefs);
            this.dispatchEvent(new AdminGroupSettingsEvent(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_UPDATED, settings, userPrefs));
        }
    }
    private adminGroupSettingsUpdateError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new AdminGroupSettingsEvent(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_UPDATE_ERROR, null, null, errMsg));
    }

    public AdminBulkUpdateGroupSettings(groupIds: number[], groupSettings:Setting[], groupUserPrefs:UserPref[]): void {
        let settingsJson:any[] = [];
        for (let setting of groupSettings) {
            settingsJson.push(setting.toJson());
        }

        let userPrefsJson:any[] = [];
        for (let userPref of groupUserPrefs) {
            userPrefsJson.push(userPref.toJson());
        }
        this.CallFunction("AdminBulkUpdateGroupSettings", [groupIds, userPrefsJson, settingsJson], this.adminBulkUpdateSuccessful, this.adminGroupSettingsUpdateError, true);
    }

    private adminBulkUpdateSuccessful = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminGroupSettingsEvent(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_UPDATE_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            this.dispatchEvent(new AdminGroupSettingsEvent(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_UPDATED, null, null));
        }
    }

    public AdminGetLiveUserData(userId:number): void {
        this.CallFunction("AdminGetLiveUserData", [userId], this.adminLiveUserDataReceived, this.adminLiveUserDataError, true);
    }
    private adminLiveUserDataReceived = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACCESS REMOTE", "adminLiveUserDataReceived", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminLiveUserDataEvent(AdminLiveUserDataEvent.ADMIN_LIVE_USER_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let adminLiveUserDataJson = responseJSONObject.result.Live_User_Data;
            let adminLiveUserData: Admin_Live_User_Data;
            adminLiveUserData = adminLiveUserDataJson ? Admin_Live_User_Data.fromJson(adminLiveUserDataJson) : null;

            let groupUserprefsJson = responseJSONObject.result.Group_UserPrefs;
            let groupUserprefs: UserPref[] = [];
            for(let userpref of groupUserprefsJson) {
                groupUserprefs.push(UserPref.fromJson(userpref));
            }
            this.dispatchEvent(new AdminLiveUserDataEvent(AdminLiveUserDataEvent.ADMIN_LIVE_USER_DATA_RECEIVED, [adminLiveUserData], groupUserprefs));
        }
    }
    private adminLiveUserDataError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new AdminLiveUserDataEvent(AdminLiveUserDataEvent.ADMIN_LIVE_USER_DATA_ERROR, null, null, errMsg));
    }

    public AdminGetLiveGroupData(groupId:number): void {
        this.CallFunction("AdminGetLiveGroupData", [groupId], this.adminLiveGroupDataReceived, this.adminLiveGroupDataError, true);
    }
    private adminLiveGroupDataReceived = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACCESS REMOTE", "adminLiveGroupDataReceived", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminLiveUserDataEvent(AdminLiveUserDataEvent.ADMIN_LIVE_GROUP_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let adminLiveUserDatasJson = responseJSONObject.result.Live_User_Datas;
            let groupUserprefsJson = responseJSONObject.result.Group_UserPrefs;

            let adminLiveUserData: Admin_Live_User_Data[] = [];
            for(let liveUserDataJson of adminLiveUserDatasJson) {
                adminLiveUserData.push(Admin_Live_User_Data.fromJson(liveUserDataJson));
            }

            let groupUserprefs: UserPref[] = [];
            for(let userpref of groupUserprefsJson) {
                groupUserprefs.push(UserPref.fromJson(userpref));
            }
            this.dispatchEvent(new AdminLiveUserDataEvent(AdminLiveUserDataEvent.ADMIN_LIVE_GROUP_DATA_RECEIVED, adminLiveUserData, groupUserprefs));
        }
    }
    private adminLiveGroupDataError = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.LogFunction("ACCESS REMOTE", "adminLiveGroupDataError", [errMsg, errObj, id]);
        this.dispatchEvent(new AdminLiveUserDataEvent(AdminLiveUserDataEvent.ADMIN_LIVE_GROUP_DATA_ERROR, null, null, errMsg));
    }

    public AdminGetGroupSettings(groupId:number): void {
        this.CallFunction("AdminGetGroupSettings", [groupId], this.adminGroupSettingsReceived, this.adminGetGroupSettingsError);
    }
    private adminGroupSettingsReceived = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminGroupSettingsEvent(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            var groupSettings:Setting[] = [];
            for (let groupSettingJson of responseJSONObject.result.Group_Settings)
            {
                groupSettings.push(Setting.fromJson(groupSettingJson));
            }

            var groupUserPrefs:UserPref[] = [];
            for (let groupUserPrefJson of responseJSONObject.result.Group_UserPrefs)
            {
                groupUserPrefs.push(UserPref.fromJson(groupUserPrefJson));
            }

            // group settings
            // group userprefs
            // default settings

            this.dispatchEvent(new AdminGroupSettingsEvent(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_RECEIVED, groupSettings, groupUserPrefs));
        }
    }
    private adminGetGroupSettingsError = (errMsg:string, errObj:any = null, id:number = 0) => {
        //console.log("ADMIN ERROR ", errMsg, errObj)
        this.dispatchEvent(new AdminGroupSettingsEvent(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_ERROR, null, null, errMsg));
    }


    public GetAdminGroup(groupId:number):Group
    {
        return this._cachedData.GetAdminGroup(groupId);
    }
    
    public AdminGetGroupChartDataByID(chartId:number, grouping:string, groupId:number, productId:number): void
    {
        let groupArray:string[] = grouping.split(",");
        this.CallFunction("AdminGetGroupChartData", [[chartId], groupId, productId, parseInt(groupArray[0]), groupArray[1], new Date().getTimezoneOffset()], this.adminGroupChartDataReceived, this.adminGroupChartDataError, true);
    }

    public AdminGetGroupChartData(charts:Chart[], grouping:string, groupId:number, productId:number):void
    {
        let chartIds: number[] = [];
        for (let chart of charts) {
            chartIds.push(chart.Chart_id);
        }
        var groupArray:string[] = grouping.split(",");
        this.CallFunction("AdminGetGroupChartData", [chartIds, groupId, productId, parseInt(groupArray[0]), groupArray[1], new Date().getTimezoneOffset()], this.adminGroupChartDataReceived, this.adminGroupChartDataError, true);
    }

    public AdminGetGroupChartDataDateRange(charts: Chart[], groupId:number, productId:number, grouping:string, startDate: Date, endDate: Date): void
    {
        let chartIds = charts.map(chart => chart.Chart_id);
        this.CallFunction("AdminGetGroupChartDataDateRange", [chartIds, groupId, productId, grouping, new Date().getTimezoneOffset(), ISO8601Util.formatExtendedDateTime(startDate), ISO8601Util.formatExtendedDateTime(endDate)], this.adminGroupChartDataReceived, this.adminGroupChartDataError, true);
    }

    private adminGroupChartDataReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new ChartDataEvent(ChartDataEvent.GROUP_CHART_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else
        {
            var chartData:DictionaryNumber<any> = {};
            for (var chartResults of responseJSONObject.result)
            {
                var results:Result[] = new Array<Result>();
                for (var resultObject of chartResults.Results)
                {
                    results.push(Result.fromJson(resultObject));
                }
                var seriesData:any = {Name: chartResults.Name, Results: results};
                chartData[chartResults.Series_id] = seriesData;
            }
            this.dispatchEvent(new ChartDataEvent(ChartDataEvent.GROUP_CHART_DATA_RECEIVED, chartData));
        }
    }
    private adminGroupChartDataError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ChartDataEvent(ChartDataEvent.GROUP_CHART_DATA_ERROR, null, errMsg));
    }

    public AdminGetGroupReportData(chart:Chart, grouping:string, groupId:number, productId:number):void
    {
        var groupArray:string[] = grouping.split(",");
        this.CallFunction("AdminGetGroupReportData", [chart.Chart_id, groupId, productId, parseInt(groupArray[0]), groupArray[1], new Date().getTimezoneOffset()], this.adminGroupReportDataReceived, this.adminGroupReportDataError, true);
    }

    public AdminGetGroupReportDataDateRange(chart:Chart, groupId:number, productId:number, grouping:string, startDate: Date, endDate: Date):void
    {
        this.CallFunction("AdminGetGroupReportDataDateRange", [chart.Chart_id, groupId, productId, grouping, new Date().getTimezoneOffset(), ISO8601Util.formatExtendedDateTime(startDate), ISO8601Util.formatExtendedDateTime(endDate)], this.adminGroupReportDataReceived, this.adminGroupReportDataError, true);
    }

    private adminGroupReportDataReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new GroupReportDataEvent(GroupReportDataEvent.GROUP_REPORT_DATA_ERROR, null, null, null, responseJSONObject.error.message));
        }
        else
        {
            //Report_Data = reportData,
            //Report_columns = valueNames,
            let groupReportData:AdminGroupReportData[] = [];
            for (let groupReportDataJson of responseJSONObject.result.Report_Data)
            {
                groupReportData.push(AdminGroupReportData.fromJson(groupReportDataJson));
            }
            let reportColumns:string[] = responseJSONObject.result.Report_columns;
            let curriculums:string[] = responseJSONObject.result.Curriculum_names;
            this.dispatchEvent(new GroupReportDataEvent(GroupReportDataEvent.GROUP_REPORT_DATA_RECEIVED, groupReportData, reportColumns, curriculums));
        }
    }
    private adminGroupReportDataError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new GroupReportDataEvent(GroupReportDataEvent.GROUP_REPORT_DATA_ERROR, null, null, null, errMsg));
    }

    public AdminGetUserReportData(chart:Chart, userId:number, productId:number):void
    {
        this.CallFunction("AdminGetUserReportData", [chart.Chart_id, userId, productId], this.adminUserReportDataReceived, this.adminUserReportDataError);
    }
    private adminUserReportDataReceived = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new ChartDataEvent(ChartDataEvent.CHART_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new ChartDataEvent(ChartDataEvent.CHART_DATA_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            var chartData:DictionaryNumber<any> = {};
            for (var chartResults of responseJSONObject.result)
            {
                var results:Result[] = new Array<Result>();
                for (var resultObject of chartResults.Results)
                {
                    results.push(Result.fromJson(resultObject));
                }
                var seriesData:any = {Name: chartResults.Name, Results: results};
                chartData[chartResults.Series_id] = seriesData;
            }
            this.dispatchEvent(new ChartDataEvent(ChartDataEvent.USER_REPORT_DATA_RECEIVED, chartData));
        }
    }
    private adminUserReportDataError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new ChartDataEvent(ChartDataEvent.USER_REPORT_DATA_ERROR, null, errMsg));
    }

    public AdminDeleteGroup(groupId:number):void
    {
        let requestId = this.CallFunction("AdminDeleteGroup", [groupId], this.adminGroupDeleted, this.adminGroupDeleteError);
        this._serverCallData[requestId] = {data: [groupId]};
    }

    public AdminDeleteGroups(groupIds:number[]):void
    {
        let requestId = this.CallFunction("AdminDeleteGroups", [groupIds], this.adminGroupDeleted, this.adminGroupDeleteError);
        //this._serverCallData[requestId] = {data: [groupId]};
    }

    private adminGroupDeleted = (responseJSONObject:any) =>
    {
        DevUtils.LogFunction("ACCESS REMOTE", "adminGroupDeleted", [responseJSONObject]);
        if (responseJSONObject.error != null)
        {
            this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_DELETED, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.code != null)
        {
            this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_DELETE_ERROR, null, responseJSONObject.result.message));
        }
        else
        {
            /*let requestId:number = responseJSONObject.RequestId;
            var requestData:any = this._serverCallData[requestId];
            let groupId:number = requestData.data[0];*/

            let groupId:number = responseJSONObject.result.Group_id;
            if (groupId != null) {
                this._cachedData.DeleteAdminGroup(groupId);
                this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_DELETED, null, null, [groupId]));
            }

            let groupIds:number[] = responseJSONObject.result.Group_ids;
            if (groupIds != null) {
                this._cachedData.DeleteAdminGroups(groupIds);
                this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_DELETED, null, null, groupIds));
            }

            //this._serverCallData[requestId] = null;
            //this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_DELETED, null));
        }
    }
    private adminGroupDeleteError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        this.dispatchEvent(new AdminGroupEvent(AdminGroupEvent.ADMIN_GROUP_DELETE_ERROR, null, errMsg));
    }

    public UpdateUserWorkingOn(currentActivity: string): void {
        this.CallFunction("UpdateWorkingOn", [currentActivity], this.adminUserWorkingOnUpdated, this.adminUserWorkingOnError, true);
        //this.CallFunction("ClearCache", [], this.startupDataSuccess, this.startupDataError);
        //console.log("ClearCache called.");
    }

    private adminUserWorkingOnUpdated = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null)
        {
            DevUtils.DisplayError(responseJSONObject, "adminUserWorkingOnUpdated");
        }
        else
        {
            DevUtils.LogFunction("ACCESS REMOTE", "adminUserWorkingOnUpdated", [responseJSONObject]);
        }
    }
    private adminUserWorkingOnError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        DevUtils.DisplayError(errMsg, "adminUserWorkingOnError");
    }

    private adminSyncIntervalId:any;
    public StartAdminDataSync(purchaseId: number, customerId?:number): void {
        console.log('StartAdminDataSync StartAdminDataSync StartAdminDataSync...');
        this.adminSyncIntervalId = setInterval( () => {
            this.CallFunction("AdminInterfaceSyncData", [purchaseId, customerId], this.syncAdminDataReceived, this.syncAdminDataError, true);
        }, UberDataAccessRemoteService.MAX_SYNC_INTERVAL);
    }

    public StopSyncingAdminData(): void {
        console.log('StopSyncingAdminData StopSyncingAdminData StopSyncingAdminData...');
        clearInterval(this.adminSyncIntervalId);
    }

    private syncAdminDataReceived = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminDataSyncEvent(AdminDataSyncEvent.ADMIN_DATA_SYNC_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            let admin_data = responseJSONObject.result;
            if(admin_data.Customer_id != this._cachedData.CurrentCustomerId) {
                DevUtils.LogFunction("ACCESS REMOTE", "syncAdminDataReceived : reject sync from previous customer data", [admin_data, this._cachedData.CurrentCustomerId]);
                return;
            }

            DevUtils.LogFunction("ACCESS REMOTE", "syncAdminDataReceived : sync successful", [admin_data]);
            let users: AdminUser[] = [];
            let groups: Group[] = [];
            let userIds:number[] = [];

            for(let group of admin_data.Groups) {
                groups.push(Group.fromJson(group));
            }

            for(let user of admin_data.Users) {
                users.push(AdminUser.fromJson(user));
            }

            this._cachedData.SetAdminGroups(groups);
            this._cachedData.SetAdminUsers(users);
            this.dispatchEvent(new AdminDataSyncEvent(AdminDataSyncEvent.ADMIN_DATA_SYNCED, users, groups));
        }
    }
    private syncAdminDataError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new AdminDataSyncEvent(AdminDataSyncEvent.ADMIN_DATA_SYNC_ERROR, null, null, errMsg));
    }

    public AdminCleverResync(customerId:number): void {
        this.CallFunction("AdminCleverResync", [customerId], this.adminCleverResynced, this.adminCleverResyncError, false);
    }

    private adminCleverResynced = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            DevUtils.DisplayError(responseJSONObject.error.message, "adminCleverResynced");
            this.dispatchEvent(new AdminCleverSyncEvent(AdminCleverSyncEvent.ADMIN_CLEVER_SYNC_ERROR, null, null, null, responseJSONObject.error.message));
        }
        else {
            DevUtils.LogFunction("ACESS REMOTE", "adminCleverResynced", [responseJSONObject]);
            let clever_data = responseJSONObject.result;
            if(clever_data.Customer_id != this._cachedData.CurrentCustomerId) {
                DevUtils.LogFunction("ACCESS REMOTE", "adminCleverResynced : reject sync from previous customer data", [clever_data, this._cachedData.CurrentCustomerId]);
                return;
            }

            DevUtils.LogFunction("ACCESS REMOTE", "adminCleverResynced : sync successful", [clever_data]);
            let users: AdminUser[] = [];
            let groups: Group[] = [];
            let userIds:number[] = [];

            for(let group of clever_data.Groups) {
                groups.push(Group.fromJson(group));
            }

            for(let user of clever_data.Users) {
                users.push(AdminUser.fromJson(user));
            }

            this._cachedData.SetAdminGroups(groups);
            this._cachedData.SetAdminUsers(users);
            this.dispatchEvent(new AdminCleverSyncEvent(AdminCleverSyncEvent.ADMIN_CLEVER_SYNCED, users, groups));
        }
    }

    private adminCleverResyncError = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "adminCleverResyncError");
        this.dispatchEvent(new AdminCleverSyncEvent(AdminCleverSyncEvent.ADMIN_CLEVER_SYNC_ERROR, null, null, null, errMsg));
    }

    public StartATask(taskName: string, taskSuccessHandler: string, functionName: string, params?: any[], isBlockingTask: boolean = false): void {
        let _taskSuccessHandler = this[taskSuccessHandler];

        this.CallFunction(functionName, params, (responseJSONObject:any) => {
            if (responseJSONObject.error != null) {
                this.dispatchEvent(new RunningTaskEvent(RunningTaskEvent.RUNNING_TASK_ERROR, responseJSONObject.result.Running_task_id, null, null, responseJSONObject.error.message));
            }
            else {
                let runningTaskID = responseJSONObject.result.Running_task_id;
                this._cachedData.AddRunningTask(runningTaskID, _taskSuccessHandler);

                if (isBlockingTask) {
                    UberReaderLoadingMessage.GetInstance().loadingDescription = taskName;
                    UberReaderLoadingMessage.GetInstance().loadingPercentage = 0;
                    UberReaderLoadingMessage.GetInstance().Show("");
                }
                else {
                    this.dispatchEvent(new UploadEvent(UploadEvent.UPLOAD_START, 0, runningTaskID, taskName));
                }

                let runningTaskSubscriber = this.GetRunningTaskStatusByID(runningTaskID).subscribe( (event: RunningTaskEvent) => {
                    if (event.RunningTaskProgress != null && event.RunningTaskProgress < 100) {
                        if (isBlockingTask) {
                            UberReaderLoadingMessage.GetInstance().loadingPercentage = Math.ceil(event.RunningTaskProgress);
                        }
                        else {
                            this.dispatchEvent(new UploadEvent(UploadEvent.UPLOAD_PROGRESS, event.RunningTaskProgress, event.RunningTaskID));
                        }
                    }
                    else if (event.TaskResult != null) {
                        runningTaskSubscriber.unsubscribe();
                        if (isBlockingTask) {
                            UberReaderLoadingMessage.GetInstance().Hide();
                        }
                        else {
                            this.dispatchEvent(new UploadEvent(UploadEvent.UPLOAD_END, 100, event.RunningTaskID));
                        }
                        this._cachedData.GetRunningTask(event.RunningTaskID)(event.TaskResult);
                    }
                }, (event: RunningTaskEvent) => {
                    console.log("TASK FAILED 1", event.ErrorMessage);
                    if (isBlockingTask) {
                        UberReaderLoadingMessage.GetInstance().Hide();
                    }
                    else {
                        this.dispatchEvent(new UploadEvent(UploadEvent.UPLOAD_ERROR, null, event.RunningTaskID, '', event.ErrorMessage));
                    }
                });
            }
        }, this.startingTaskFailed, true);
    }

    private startingTaskFailed = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("TASK FAILED 2", errMsg);
        //this.dispatchEvent(new AdminDistrictSyncEvent(AdminDistrictSyncEvent.ADMIN_DISTRICT_SYNC_ERROR, null, null, null, null, null, errMsg));
    }

    public CallRunningTaskHandler(taskID: number, responseJSONObject:any): void {
        this._cachedData.GetRunningTask(taskID)(responseJSONObject);
    }

    public AdminDistrictResync(districID?:number): void {
        this.CallFunction("AdminDistrictResync", [districID], this.adminDistrictStartResyncSuccess, this.adminDistrictStartResyncError, true);
    }

    private adminDistrictStartResyncSuccess = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminDistrictSyncEvent(AdminDistrictSyncEvent.ADMIN_DISTRICT_SYNC_ERROR, null, null, null, null, responseJSONObject.result.Running_task_id, responseJSONObject.error.message));
        }
        else {
            console.log('adminDistrictStartResyncSuccess: ', responseJSONObject);
            let running_task_id = responseJSONObject.result.Running_task_id;
            this._cachedData.AddRunningTask(running_task_id, this.adminDistrictDataSynced);
            this.dispatchEvent(new AdminDistrictSyncEvent(AdminDistrictSyncEvent.ADMIN_DISTRICT_SYNC_IN_PROGRESS, null, null, null, null, running_task_id));
        }
    }

    private adminDistrictStartResyncError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new AdminDistrictSyncEvent(AdminDistrictSyncEvent.ADMIN_DISTRICT_SYNC_ERROR, null, null, null, null, null, errMsg));
    }

    private adminDistrictDataSynced = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            DevUtils.DisplayError(responseJSONObject.error.message, "adminCleverResynced");
            this.dispatchEvent(new AdminDistrictSyncEvent(AdminDistrictSyncEvent.ADMIN_DISTRICT_SYNC_ERROR, null, null, null, null, null, responseJSONObject.error.message));
        }
        else {
            DevUtils.LogFunction("ACESS REMOTE", "adminDistrictDataSynced", [responseJSONObject]);

            let district = responseJSONObject.result.District != null ? new District(responseJSONObject.result.District) : null;
            let customers: Customer[] = [];
            let groups: Group[] = [];
            let users: AdminUser[] = [];
            let taskID: number = responseJSONObject.result.Running_task_id;

            for (let customer of responseJSONObject.result.Customers) {
                customers.push(Customer.fromJson(customer));
            }

            for (let group of responseJSONObject.result.Groups) {
                groups.push(Group.fromJson(group));
            }

            for (let user of responseJSONObject.result.Users) {
                users.push(AdminUser.fromJson(user));
            }

            if(customers.length > 1) {
                this._cachedData.SetEreflectAdminCustomers(customers);
            }

            this._cachedData.SetAdminDistrict(district);
            this._cachedData.SetAdminCustomer(customers[0]);
            this._cachedData.SetAdminGroups(groups);
            this._cachedData.SetAdminUsers(users);
            this.dispatchEvent(new AdminDistrictSyncEvent(AdminDistrictSyncEvent.ADMIN_DISTRICT_SYNC_FINISHED, district, customers, groups, users, taskID ));
            this._cachedData.RemoveTask(taskID);
        }
    }

    public AdminGetUserGoals(userId: number): void {
        this.CallFunction("AdminGetUserGoals", [userId], this.adminUserGoalsReceived, this.adminUserGoalsError, true);
    }

    private adminUserGoalsReceived = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminUserGoalsEvent(AdminUserGoalsEvent.ADMIN_USER_GOALS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            DevUtils.LogFunction("ACESS REMOTE", "adminUserGoalsReceived", [responseJSONObject]);
            let goalUserPrefs: UserPref[] = [];
            let userPrefs = responseJSONObject.result.UserPrefs;
            for(let userPref of userPrefs) {
                goalUserPrefs.push(UserPref.fromJson(userPref));
            }
            this.dispatchEvent(new AdminUserGoalsEvent(AdminUserGoalsEvent.ADMIN_USER_GOALS_RECEIVED, goalUserPrefs));
        }
    }

    private adminUserGoalsError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new AdminUserGoalsEvent(AdminUserGoalsEvent.ADMIN_USER_GOALS_ERROR, null, errMsg));
    }

    public GetEreflectAdminCustomers():Customer[] {
        return this._cachedData.GetEreflectAdminCustomers();
    }

    public GetCurrentCustomerId(): number {
        return this._cachedData.CurrentCustomerId;
    }

    public SetCurrentCustomerId(id: number): void {
        this._cachedData.CurrentCustomerId = id;
    }

    public GetNextRecommendedText(currentTextId: number): void {
        this.CallFunction("GetNextRecommendedText", [currentTextId], this.nextRecommendedTextReceived, this.nextRecommendedTextError, true);
    }

    public GetNextRecommendedText2(currentTextId: number): void {
        this.CallFunction("GetNextRecommendedText2", [currentTextId], this.nextRecommendedTextReceived, this.nextRecommendedTextError, true);
    }

    private nextRecommendedTextReceived = (responseJSONObject:any) => {      //! FIXME:
        DevUtils.LogFunction("ACESS REMOTE", "nextRecommendedTextReceived", [responseJSONObject]);
        // responseJSONObject.result.Recommended_text = null; // TODO
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new NextRecommendedTextEvent(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_ERROR, null, responseJSONObject.error.message));
        }
        else if (responseJSONObject.result.Recommended_text == null) {
            this.dispatchEvent(new NextRecommendedTextEvent(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_ERROR, null, "No Recommended Text"));
        }
        else {
            let recommendedText: Text = Text.fromJson(responseJSONObject.result.Recommended_text)
            this.dispatchEvent(new NextRecommendedTextEvent(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_RECEIVED, recommendedText));
        }
    }

    private nextRecommendedTextError = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "nextRecommendedTextError");
        this.dispatchEvent(new NextRecommendedTextEvent(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_ERROR, null, errMsg));
    }

    public UpgradeCleverTrialAccount(activationCode: string, districtID: number): void {
        this.CallFunction("AdminUseActivationCodeWithCleverTrial", [activationCode, districtID], this.cleverTrialAccountUpgraded, this.cleverTrialAccountUpgradeFailed, false);
    }

    private cleverTrialAccountUpgraded = (responseJSONObject:any) =>
    {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new CleverEvent(CleverEvent.CLEVER_TRIAL_UPGRADE_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            let groups = this._cachedData.GetAdminGroups();
            let subscription = UserSubscription.fromJson(responseJSONObject.result.Subscription);
            let userIds:number[] = [];

            for(let group of groups) {
                for (let userGroup of group.User_Groups) {
                    if (userIds.indexOf(userGroup.User_id) < 0) {
                        userIds.push(userGroup.User_id);
                    }
                }
            }
            subscription.Licenses_used = userIds.length;
            this._cachedData.SetAdminSubscription(subscription);
            this.dispatchEvent(new CleverEvent(CleverEvent.CLEVER_TRIAL_UPGRADED, subscription, null));
        }
    }

    private cleverTrialAccountUpgradeFailed = (errMsg:string, errObj:any=null, id:number=0) => {
        this.dispatchEvent(new CleverEvent(CleverEvent.CLEVER_TRIAL_UPGRADE_ERROR, null, null, errMsg));
    }

    public AdminUpdateOrganizationName(organizationID: number, newOrganizationName: string, isDistrict: boolean): void {
        if (isDistrict) {
            this.CallFunction("AdminUpdateDistrictName", [organizationID, newOrganizationName], this.districtNameUpdated, this.organizationNameUpdateError, false);
        }
        else {
            this.CallFunction("AdminUpdateOrganizationName", [organizationID, newOrganizationName], this.schoolNameUpdated, this.organizationNameUpdateError, false);
        }
    }

    private districtNameUpdated = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminEvent(AdminEvent.ORGANIZATION_NAME_UPDATE_ERROR, null, null, null, null, null, null, null, null, null, responseJSONObject.error.message));
        }
        else {
            let district = new District(responseJSONObject.result.District);
            this._cachedData.SetAdminDistrict(district);
            this.dispatchEvent(new AdminEvent(AdminEvent.ORGANIZATION_NAME_UPDATED, null, null, null, null, null, district, null, null, null));
        }
    }

    private schoolNameUpdated = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminEvent(AdminEvent.ORGANIZATION_NAME_UPDATE_ERROR, null, null, null, null, null, null, null, null, null, responseJSONObject.error.message));
        }
        else {
            let customer = Customer.fromJson(responseJSONObject.result.Customer);
            this._cachedData.SetAdminCustomer(customer);
            this.dispatchEvent(new AdminEvent(AdminEvent.ORGANIZATION_NAME_UPDATED, customer, null, null, null, null, null, null, null, null));
        }
    }

    private organizationNameUpdateError = (errMsg:string, errObj:any=null, id:number=0) => {
        this.dispatchEvent(new AdminEvent(AdminEvent.ORGANIZATION_NAME_UPDATE_ERROR, null, null, null, null, null, null, null, null, null, errMsg));
    }

    public AdminUpdateOrganizationLogo(customerID: number, organizationLogo: string): void {
        this.CallFunction("AdminUpdateOrganizationLogo", [customerID, organizationLogo], this.organizationLogoUpdated, this.organizationLogoUpdateError, false);
    }

    private organizationLogoUpdated = (responseJSONObject:any) =>
    {
        DevUtils.LogFunction("ACESS REMOTE", "organizationLogoUpdated", [responseJSONObject]);
        this.dispatchEvent(new OrganizationLogoUpdateEvent(OrganizationLogoUpdateEvent.ORGRANIZATION_LOGO_UPDATED, responseJSONObject.result.Customer));
    }
    private organizationLogoUpdateError = (errMsg:string, errObj:any=null, id:number=0) =>
    {
        DevUtils.DisplayError(errMsg, "organizationLogoUpdateError");
        this.dispatchEvent(new OrganizationLogoUpdateEvent(OrganizationLogoUpdateEvent.ORGRANIZATION_LOGO_UPDATE_ERROR, null));
    }

    public AdminGetGroupLessonPlans(groupId: number): void {
        let groupLessonPlans = this._cachedData.GetGroupLessonPlans(groupId);
        if (groupLessonPlans) {
            this.dispatchEvent(new GroupLessonPlanEvent(GroupLessonPlanEvent.GROUP_LESSON_PLANS_RECEIVED, groupLessonPlans));
        }
        else {
            this.CallFunction("AdminGetGroupLessonPlans", [groupId], this.groupLessonPlansReceived, this.groupLessonPlansError, true);
        }
    }

    public AdminUpdateGroupLessonPlans(groupId: number, lessonPlanIds: number[]) {
        this.CallFunction("AdminUpdateGroupLessonPlans", [groupId, lessonPlanIds], this.groupLessonPlansReceived, this.groupLessonPlansError, true);
    }

    private groupLessonPlansReceived = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACESS REMOTE", "groupLessonPlansReceived", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new GroupLessonPlanEvent(GroupLessonPlanEvent.GROUP_LESSON_PLANS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let groupId: number = responseJSONObject.result.Group_id;
            let groupLessonPlans: Group_Lesson_Plan[] = [];
            for(let groupLessonPlan of responseJSONObject.result.Group_Lesson_Plans) {
                groupLessonPlans.push(Group_Lesson_Plan.fromJson(groupLessonPlan));
            }
            this._cachedData.SetGroupLessonPlans(groupId, groupLessonPlans);
            this.dispatchEvent(new GroupLessonPlanEvent(GroupLessonPlanEvent.GROUP_LESSON_PLANS_RECEIVED, groupLessonPlans));
        }
    }

    private groupLessonPlansError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new GroupLessonPlanEvent(GroupLessonPlanEvent.GROUP_LESSON_PLANS_ERROR, null, errMsg));
    }

    public AdminGetTypingTestResults(typingTestId: number): void {
        this.CallFunction("AdminGetTypingTestResults", [typingTestId], this.typingTestResultsReceived, this.typingTestResultsError, true);
    }

    private typingTestResultsReceived = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACESS REMOTE", "typingTestResultsReceived", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypingTestResultEvent(TypingTestResultEvent.TYPING_TEST_RESULTS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let typingTestResults: UserTypingTestResult[];
            if (responseJSONObject.result.Typing_Test_Results != null) {
                typingTestResults = [];
                for (let typingTestResult of responseJSONObject.result.Typing_Test_Results) {
                    typingTestResults.push(UserTypingTestResult.fromJson(typingTestResult));
                }
            }

            this.dispatchEvent(new TypingTestResultEvent(TypingTestResultEvent.TYPING_TEST_RESULTS_RECEIVED, typingTestResults));
        }
    }

    private typingTestResultsError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new TypingTestResultEvent(TypingTestResultEvent.TYPING_TEST_RESULTS_ERROR, null, errMsg));
    }

    public AdminGetTypingTaskResults(typingTaskId: number): void {
        this.CallFunction("AdminGetTypingTaskResults", [typingTaskId], this.typingTaskResultsReceived, this.typingTaskResultsError);
    }

    private typingTaskResultsReceived = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACESS REMOTE", "typingTaskResultsReceived", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypingTaskResultEvent(TypingTaskResultEvent.TYPING_TASK_RESULTS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let typingTaskResults: UserTypingTaskResult[];
            if (responseJSONObject.result.Typing_Task_Results != null) {
                typingTaskResults = [];
                for (let typingTaskResult of responseJSONObject.result.Typing_Task_Results) {
                    typingTaskResults.push(UserTypingTaskResult.fromJson(typingTaskResult));
                }
            }

            this.dispatchEvent(new TypingTaskResultEvent(TypingTaskResultEvent.TYPING_TASK_RESULTS_RECEIVED, typingTaskResults));
        }
    }

    private typingTaskResultsError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new TypingTestResultEvent(TypingTestResultEvent.TYPING_TEST_RESULTS_ERROR, null, errMsg));
    }

    private adminTasksDataSyncID:any;
    public StartAdminTasksDataSync(groupId: number):void
    {
        this.CallFunction("AdminGetGroupTypingTasks", [groupId], this.tasksDataSyncReceived, this.tasksDataSyncError, false);
        this.adminTasksDataSyncID = setInterval( () => {
            this.CallFunction("AdminGetGroupTypingTasks", [groupId], this.tasksDataSyncReceived, this.tasksDataSyncError, true);
        }, UberDataAccessRemoteService.MAX_SYNC_INTERVAL);
    }

    public StopAdminTasksDataSync():void
    {
        clearInterval(this.adminTasksDataSyncID);
    }

    private tasksDataSyncReceived = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACESS REMOTE", "tasksDataSyncReceived", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypingTasksDataSyncEvent(TypingTasksDataSyncEvent.TASKS_DATA_SYNC_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            let typingTaskResults: UserTypingTaskResult[];
            if (responseJSONObject.result.User_Typing_Task_Results != null) {
                typingTaskResults = [];
                for (let typingTaskResult of responseJSONObject.result.User_Typing_Task_Results) {
                    typingTaskResults.push(UserTypingTaskResult.fromJson(typingTaskResult));
                }
            }

            let groupTypingTasks: TypingTask[];
            if (responseJSONObject.result.Typing_Tasks != null) {
                groupTypingTasks = [];
                for (let task of responseJSONObject.result.Typing_Tasks) {
                    groupTypingTasks.push(TypingTask.fromJson(task));
                }
                if(groupTypingTasks.length > 0)
                    this._cachedData.SetGroupTypingTasks(groupTypingTasks);

                this.dispatchEvent(new TypingTasksDataSyncEvent(TypingTasksDataSyncEvent.TASKS_DATA_SYNC_SUCCESS, groupTypingTasks, typingTaskResults));
            }

            /* let typingTest: TypingTest;
            if (responseJSONObject.result.Typing_Test != null) {
                typingTest = TypingTest.fromJson(responseJSONObject.result.Typing_Test);
                this._cachedData.AddOrUpdateTypingTest(typingTest);
                this.dispatchEvent(new TypingTestsDataSyncEvent(TypingTestsDataSyncEvent.TESTS_DATA_SYNC_SUCCESS, [typingTest], typingTestResults));
            } */
        }
    }

    private tasksDataSyncError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new TypingTestsDataSyncEvent(TypingTestsDataSyncEvent.TESTS_DATA_SYNC_ERROR, null, null, errMsg));
    }

    public AdminGetGroupTypingTestsFromCache(groupId: number): TypingTest[] {
        return this._cachedData.GetGroupTypingTests(groupId);
    }

    public AdminGetGroupTypingTests(groupId: number): void {
        if(this._cachedData.GetGroupTypingTests[groupId]) {
            DevUtils.LogFunction("ACESS REMOTE", "AdminGetGroupTypingTests : CACHE", [groupId]);
            this.dispatchEvent(new TypingTestEvent(TypingTestEvent.TYPING_TEST_RECEIVED, this._cachedData.GetGroupTypingTests[groupId], null));
        }
        else {
            DevUtils.LogFunction("ACESS REMOTE", "AdminGetGroupTypingTests : SERVER", [groupId]);
            this.CallFunction("AdminGetGroupTypingTests", [groupId], this.typingTestsReceived, this.typingTestsError, false);
        }
    }

    public AdminGetGroupTypingTasks(groupId: number): void {
        if(this._cachedData.GetGroupTypingTasks[groupId]) {
            DevUtils.LogFunction("ACESS REMOTE", "AdminGetGroupTypingTasks : CACHE", [groupId]);
            this.dispatchEvent(new TypingTaskEvent(TypingTaskEvent.TYPING_TASKS_RECEIVED, this._cachedData.GetGroupTypingTests[groupId], null));
        }
        else {
            DevUtils.LogFunction("ACESS REMOTE", "AdminGetGroupTypingTasks : SERVER", [groupId]);
            this.CallFunction("AdminGetGroupTypingTasks", [groupId], this.typingTasksReceived, this.typingTasksError, false);
        }
    }

    private typingTestsReceived = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypingTestEvent(TypingTestEvent.TYPING_TEST_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            /* let typingTestResults: UserTypingTestResult[];
            if (responseJSONObject.result.User_Typing_Test_Results != null) {
                typingTestResults = [];
                for (let typingTestResult of responseJSONObject.result.User_Typing_Test_Results) {
                    typingTestResults.push(UserTypingTestResult.fromJson(typingTestResult));
                }
            } */

            let groupTypingTests: TypingTest[];
            if (responseJSONObject.result.Typing_Tests != null) {
                groupTypingTests = [];
                for (let test of responseJSONObject.result.Typing_Tests) {
                    groupTypingTests.push(TypingTest.fromJson(test));
                }
                if(groupTypingTests.length > 0)
                    this._cachedData.SetGroupTypingTests(groupTypingTests);

                this.dispatchEvent(new TypingTestEvent(TypingTestEvent.TYPING_TESTS_RECEIVED, groupTypingTests, null));
            }

            let typingTest: TypingTest;
            if (responseJSONObject.result.Typing_Test != null) {
                typingTest = TypingTest.fromJson(responseJSONObject.result.Typing_Test);
                this._cachedData.AddOrUpdateTypingTest(typingTest);
                this.dispatchEvent(new TypingTestEvent(TypingTestEvent.TYPING_TEST_RECEIVED, null, typingTest));
            }
        }
    }

    private typingTestsError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new TypingTestEvent(TypingTestEvent.TYPING_TEST_ERROR, null, null, errMsg));
    }

    public AdminCreateTypingTest(typingTest: TypingTest): void {
        DevUtils.LogFunction("ACESS REMOTE", "AdminCreateTypingTest", [typingTest.toJson()]);
        this.CallFunction("AdminCreateTypingTest", [typingTest.toJson()], this.typingTestsReceived, this.typingTestsError, false);
    }

    public AdminUpdateTypingTest(typingTest: TypingTest, isBackgroundCall: boolean = false): void {
        DevUtils.LogFunction("ACESS REMOTE", "AdminUpdateTypingTest", [typingTest.toJson()]);
        this.CallFunction("AdminUpdateTypingTest", [typingTest.toJson()], this.typingTestsReceived, this.typingTestsError, isBackgroundCall);
    }

    public AdminCreateTypingTask(typingTask: TypingTask): void {
        DevUtils.LogFunction("ACESS REMOTE", "AdminCreateTypingTask", [typingTask.toJson()]);
        this.CallFunction("AdminCreateTypingTask", [typingTask.toJson()], this.typingTasksReceived, this.typingTasksError, false);
    }

    public AdminUpdateTypingTask(typingTask: TypingTask): void {
        DevUtils.LogFunction("ACESS REMOTE", "AdminUpdateTypingTask", [typingTask.toJson()]);
        this.CallFunction("AdminUpdateTypingTask", [typingTask.toJson()], this.typingTasksReceived, this.typingTasksError, false);
    }

    private typingTasksReceived = (responseJSONObject:any) => {
        console.log("typingTasksReceived", responseJSONObject);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypingTaskEvent(TypingTaskEvent.TYPING_TASK_ERROR, null, null, null, responseJSONObject.error.message));
        }
        else {
            /* let typingTestResults: UserTypingTestResult[];
            if (responseJSONObject.result.User_Typing_Test_Results != null) {
                typingTestResults = [];
                for (let typingTestResult of responseJSONObject.result.User_Typing_Test_Results) {
                    typingTestResults.push(UserTypingTestResult.fromJson(typingTestResult));
                }
            } */

            let groupTypingTasks: TypingTask[];
            if (responseJSONObject.result.Typing_Tasks != null) {
                groupTypingTasks = [];
                for (let task of responseJSONObject.result.Typing_Tasks) {
                    groupTypingTasks.push(TypingTask.fromJson(task));
                }
                if(groupTypingTasks.length > 0)
                    this._cachedData.SetGroupTypingTasks(groupTypingTasks);

                this.dispatchEvent(new TypingTaskEvent(TypingTaskEvent.TYPING_TASKS_RECEIVED, groupTypingTasks));
            }

            let typingTask: TypingTask;
            if (responseJSONObject.result.Typing_Task != null) {
                typingTask = TypingTask.fromJson(responseJSONObject.result.Typing_Task);
                this._cachedData.AddOrUpdateTypingTask(typingTask);
                this.dispatchEvent(new TypingTaskEvent(TypingTaskEvent.TYPING_TASK_RECEIVED, null, typingTask));
            }
        }
    }

    private typingTasksError = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("typingTasksError", errMsg);
        this.dispatchEvent(new TypingTaskEvent(TypingTaskEvent.TYPING_TASK_ERROR, null, null, null, errMsg));
    }

    public AdminDeleteTypingTest(typingTestId: number): void {
        this.CallFunction("AdminDeleteTypingTest", [typingTestId], this.typingTestDeleted, this.typingTestsError, false);
    }

    private typingTestDeleted = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypingTestEvent(TypingTestEvent.TYPING_TEST_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            this._cachedData.DeleteTypingTest(responseJSONObject.result);
            this.dispatchEvent(new TypingTestEvent(TypingTestEvent.TYPING_TEST_DELETED, null, null, responseJSONObject.result));
        }
    }

    public AdminDeleteTypingTask(typingTaskId: number): void {
        this.CallFunction("AdminDeleteTypingTask", [typingTaskId], this.typingTaskDeleted, this.typingTasksError, false);
    }

    private typingTaskDeleted = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypingTaskEvent(TypingTaskEvent.TYPING_TASK_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            this._cachedData.DeleteTypingTask(responseJSONObject.result);
            this.dispatchEvent(new TypingTaskEvent(TypingTaskEvent.TYPING_TASK_DELETED, null, null, responseJSONObject.result));
        }
    }

    public StoreUserTypingTestAttempt(taskId: number): void {
        this.CallFunction("StoreUserTypingTestAttempt", [taskId], this.typingTaskResultReceived, this.typingTaskResultError, true);
    }

    public StoreUserTypingTestResult(taskId: number, speed: number, accuracy: number, score: number): void {
        DevUtils.LogFunction("ACESS REMOTE", "StoreUserTypingTestResult", [taskId, speed, accuracy, score]);
        this.CallFunction("StoreUserTypingTaskResult", [taskId, speed, accuracy, score], this.typingTaskResultReceived, this.typingTaskResultError, false);
    }

    public StoreUserTypingTaskResult2(taskId: number, speed: number, accuracy: number, score: number, errorCount: number): void {
        DevUtils.LogFunction("ACESS REMOTE", "StoreUserTypingTaskResult2", [taskId, speed, accuracy, score]);
        this.CallFunction("StoreUserTypingTaskResult2", [taskId, speed, accuracy, score, errorCount], this.typingTaskResultReceived, this.typingTaskResultError, false);
    }

    public StoreUserTypingTaskResult3(taskId: number, speed: number, accuracy: number, score: number, errorCount: number, textPercentage: number): void {
        DevUtils.LogFunction("ACESS REMOTE", "StoreUserTypingTaskResult2", [taskId, speed, accuracy, score]);
        this.CallFunction("StoreUserTypingTaskResult3", [taskId, speed, accuracy, score, errorCount, textPercentage], this.typingTaskResultReceived, this.typingTaskResultError, false);
    }

    private typingTaskResultReceived = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACESS REMOTE", "typingTaskResultReceived", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypingTaskResultEvent(TypingTaskResultEvent.TYPING_TASK_RESULTS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let typingTaskResult: UserTypingTaskResult[] = [];
            typingTaskResult.push(UserTypingTaskResult.fromJson(responseJSONObject.result));
            this._cachedData.AddUserTypingTaskResult(typingTaskResult[0]);
            this.dispatchEvent(new TypingTaskResultEvent(TypingTaskResultEvent.TYPING_TASK_RESULTS_RECEIVED, typingTaskResult));
        }
    }

    private typingTaskResultError = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "ACESS REMOTE - typingTaskResultError");
        this.dispatchEvent(new TypingTaskResultEvent(TypingTaskResultEvent.TYPING_TASK_RESULTS_ERROR, null, errMsg));
    }

    public StoreUserTypingReplayData(replayData: any[], courseActivityId?: number, typingTaskId?: number): void {
        DevUtils.LogFunction("ACESS REMOTE", "StoreUserTypingReplayData", [courseActivityId, typingTaskId, replayData]);
        this.CallFunction("StoreUserTypingReplayData", [courseActivityId, typingTaskId, replayData], this.resultInserted, this.resultInsertError, true);
    }

    public StoreUserTypingReplayData2(replayData: any[], courseActivityId?: number, typingTaskId?: number, startingPos?: number, speed?: number, accuracy?: number): void {
        DevUtils.LogFunction("ACESS REMOTE", "StoreUserTypingReplayData2", [courseActivityId, typingTaskId, replayData]);
        this.CallFunction("StoreUserTypingReplayData2", [courseActivityId, typingTaskId, replayData, startingPos, speed, accuracy], this.resultInserted, this.resultInsertError, true);
    }

    public GetUserTypingReplayData(userId: number, courseActivityId: number, typingTaskId: number): void {
        DevUtils.LogFunction("ACESS REMOTE", "GetUserTypingReplayData", [userId, courseActivityId, typingTaskId]);
        this.CallFunction("GetUserTypingReplayData", [userId, courseActivityId, typingTaskId], this.replayDataReceived, this.errorRetrievingReplayData, false);
    }

    public GetUserCourseActivityTypingReplay(userId: number, courseActivityId: number): void {
        DevUtils.LogFunction("ACESS REMOTE", "GetUserCourseActivityTypingReplay", [userId, courseActivityId]);
        this.CallFunction("GetUserCourseActivityTypingReplay", [userId, courseActivityId], this.replayDataReceived, this.errorRetrievingReplayData, false);
    }

    public GetUserTypingTaskReplay(userId: number, typingTaskId: number): void {
        DevUtils.LogFunction("ACESS REMOTE", "GetUserTypingTaskReplay", [userId, typingTaskId]);
        this.CallFunction("GetUserTypingTaskReplay", [userId, typingTaskId], this.replayDataReceived, this.errorRetrievingReplayData, false);
    }

    private replayDataReceived= (responseJSONObject:any) => {
        DevUtils.LogFunction("ACESS REMOTE", "replayDataReceived", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new ReplayEvent(ReplayEvent.REPLAY_DATA_ERROR, null, responseJSONObject.error.message));
        }
        else {
            this.dispatchEvent(new ReplayEvent(ReplayEvent.REPLAY_DATA_RECEIVED, responseJSONObject.result));
        }
    }

    private errorRetrievingReplayData = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "ACESS REMOTE - errorRetrievingReplayData");
        this.dispatchEvent(new ReplayEvent(ReplayEvent.REPLAY_DATA_ERROR, null, errMsg));
    }

    /* public GetTypingTaskById(typingTaskId: number): void { 
        this.CallFunction("GetTypingTaskData", [typingTaskId], this.typingTaskReceived, this.typingTasksError);
    }

    public GetTypingTaskData(proxyTypingTask: ProxyTypingTask): void {
        let typingTask = this._cachedData.GetTypingTask(proxyTypingTask);
        if (typingTask) {
            this.dispatchEvent(new TypingTaskEvent(TypingTaskEvent.TYPING_TASK_RECEIVED, null, typingTask));
        }
        else {
            this.CallFunction("GetTypingTaskData", [proxyTypingTask.TypingTaskId], this.typingTaskReceived, this.typingTasksError, true);
        }
    }

    private typingTaskReceived = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypingTaskEvent(TypingTaskEvent.TYPING_TASK_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            let typingTask: TypingTask = TypingTask.fromJson(responseJSONObject.result);
            this._cachedData.AddOrUpdateTypingTask(typingTask);
            this.dispatchEvent(new TypingTaskEvent(TypingTaskEvent.TYPING_TASK_RECEIVED, null, typingTask));
        }
    } */

    public GetTypingTest(proxyTypingTest: ProxyTypingTest): void {
        let typingTest = this._cachedData.GetTypingTest(proxyTypingTest);
        if (typingTest) {
            this.dispatchEvent(new TypingTestEvent(TypingTestEvent.TYPING_TEST_RECEIVED, null, typingTest));
        }
        else {
            this.CallFunction("GetTypingTestData", [proxyTypingTest.TypingTestId], this.typingTestReceived, this.typingTestsError, true);
        }
    }

    private typingTestReceived = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypingTestEvent(TypingTestEvent.TYPING_TEST_ERROR, null, null, responseJSONObject.error.message));
        }
        else {
            let typingTest: TypingTest = TypingTest.fromJson(responseJSONObject.result);
            this._cachedData.AddOrUpdateTypingTest(typingTest);
            this.dispatchEvent(new TypingTestEvent(TypingTestEvent.TYPING_TEST_RECEIVED, null, typingTest));
        }
    }

    public GetTypingTestFromCache(proxyTypingTest: ProxyTypingTest): TypingTest {
        return this._cachedData.GetTypingTest(proxyTypingTest);
    }

    public GetCurrentTypingTest(): TypingTest {
        return this._cachedData.CurrentTypingTest;
    }

    public SetCurrentTypingTest(test: TypingTest): void {
        this._cachedData.CurrentTypingTest = test;
    }

    public GetResultByID(testId: number): UserTypingTestResult {
        return this._cachedData.GetResultByID(testId);
    }

    public GetTaskResultByID(taskId: number): UserTypingTaskResult {
        return this._cachedData.GetTaskResultByID(taskId);
    }

    public AdminGetUserProgressReportData(userId: number, productId: number) {
        this.CallFunction("AdminGetUserProgressReportData", [userId, productId], this.userProgressReportReceived, this.userProgressReportError, false);
    }

    private userProgressReportReceived = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACESS REMOTE", "userProgressReportReceived", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new ProgressObjectEvent(ProgressObjectEvent.USER_PROGRESS_REPORT_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let progressObjects: ProgressObject[] = [];
            for (let obj of responseJSONObject.result.Curriculums_progress) {
                progressObjects.push(ProgressObject.fromJson(obj));
            }

            this.dispatchEvent(new ProgressObjectEvent(ProgressObjectEvent.USER_PROGRESS_REPORT_RECEIVED, progressObjects));
        }
    }

    private userProgressReportError = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "userProgressReportError");
        this.dispatchEvent(new ProgressObjectEvent(ProgressObjectEvent.USER_PROGRESS_REPORT_ERROR, null, errMsg));
    }

    public get AuthenticationToken(): string {
        return this._authenticationToken;
    }

    public set AuthenticationToken(token: string) {
        this._authenticationToken = token;
    }

    public get AuthenticationUserID(): number {
        return this._authenticationUserId;
    }

    public set AuthenticationUserID(userId: number) {
        this._authenticationUserId = userId;
    }

    public AdminGoogleClassroomSync(googleToken: string, purchaseId: number, customerId: number, classroomCourseIds: number[]) {
        this.CallFunction("AdminGoogleClassroomSync", [googleToken, purchaseId, customerId, classroomCourseIds], this.clasroomDataSynced, this.classroomSyncError, false);
    }

    private clasroomDataSynced = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACESS REMOTE", "AdminGoogleClassroomSync", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.GOOGLE_CLASSROOM_SYNC_FAILED));
        }
        else {
            let _groups: Group[] = [];
            let _users: AdminUser[] = [];
            let JsonGroups = responseJSONObject.result.Groups;
            let JsonUsers = responseJSONObject.result.Users;

            for (let group of JsonGroups) {
                _groups.push(Group.fromJson(group));
            }
            this._cachedData.UpdateAdminGroups(_groups);

            for (let user of JsonUsers) {
                _users.push(AdminUser.fromJson(user));
            }
            this._cachedData.SetAdminUsers(_users);
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.GOOGLE_CLASSROOM_SYNCED));
        }
    }

    private classroomSyncError = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "classroomSyncError");
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.GOOGLE_CLASSROOM_SYNC_FAILED));
    }

    public GetCleverSyncStatus() {
        this.CallFunction("GetCleverSyncStatus", [], this.cleverSyncStatusReceived, this.cleverSyncStatusFailed, true);
    }

    private cleverSyncStatusReceived = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACESS REMOTE", "cleverSyncStatusReceived", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminCleverSyncEvent(AdminCleverSyncEvent.CLEVER_SYNC_STATUS_UPDATE_ERROR, null, null, null, responseJSONObject.error.message));
        }
        else {
            this.dispatchEvent(new AdminCleverSyncEvent(AdminCleverSyncEvent.CLEVER_SYNC_STATUS_UPDATE, null, null, responseJSONObject.result.Sync_progress));
        }
    }

    private cleverSyncStatusFailed = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "gettingCleverSyncStatusFailed");
        this.dispatchEvent(new AdminCleverSyncEvent(AdminCleverSyncEvent.CLEVER_SYNC_STATUS_UPDATE_ERROR, null, null, null, errMsg));
    }

    public AdminBulkUpdateGroupLessonPlans(groupIds: number[], lessonPlanIds: number[]): void {
        this.CallFunction("AdminBulkUpdateGroupLessonPlans", [groupIds, lessonPlanIds], this.bulkUpdateLessonPlansSuccessful, this.groupLessonPlansError, true);
    }

    private bulkUpdateLessonPlansSuccessful = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACESS REMOTE", "bulkUpdateLessonPlansSuccessful", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new GroupLessonPlanEvent(GroupLessonPlanEvent.GROUP_LESSON_PLANS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let groupIDs: number[] = responseJSONObject.result.Group_ids;
            let groupLessonPlansJson = responseJSONObject.result.Group_Lesson_Plans;
            groupLessonPlansJson.map(lessonPlanJson => Group_Lesson_Plan.fromJson(lessonPlanJson));

            for (let groupID of groupIDs) {
                let groupLessonPlans = groupLessonPlansJson.filter(lessonPlan => lessonPlan.Group_id == groupID);
                this._cachedData.SetGroupLessonPlans(groupID, groupLessonPlans);
            }
            this.dispatchEvent(new GroupLessonPlanEvent(GroupLessonPlanEvent.GROUP_LESSON_PLANS_RECEIVED, groupLessonPlansJson));
        }
    }

    public AdminGetSchoolsList(): void {
        this.CallFunction("AdminGetSchoolsList", [], this.schoolsListReceived, this.getSchoolsListFailed, false);
    }

    private schoolsListReceived = (responseJSONObject:any) => {
        DevUtils.LogFunction("ACESS REMOTE", "schoolsListReceived", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminEvent(AdminEvent.ADMIN_DATA_ERROR, null, null, null, null, null, null, null, null, null, responseJSONObject.error.message));
        }
        else {
            //let districts = responseJSONObject.result.Districts;
            let customers = responseJSONObject.result.Customers;
            customers.forEach(customer => Customer.fromJson(customer));
            this.dispatchEvent(new AdminEvent(AdminEvent.ADMIN_DATA_RECEIVED, null, customers, null, null, null, null, null, null, null));
        }
    }

    private getSchoolsListFailed = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "getSchoolsListFailed");
        this.dispatchEvent(new AdminEvent(AdminEvent.ADMIN_DATA_ERROR, null, null, null, null, null, null, null, null, null, errMsg));
    }

    public get UserNotifications(): UserNotification[] {
        return this._cachedData.UserNotifications;
    }

    public get UserTypingTaskResults(): UserTypingTaskResult[] {
        return this._cachedData.UserTypingTaskResults;
    }

    public get UserProxyTypingTasks(): ProxyTypingTask[] {
        return this._cachedData.UserProxyTypingTasks;
    }

    public GetProxyActivityById(id: number): ProxyActivity {
        return this._cachedData.GetProxyActivityById(id);
    }

    public GetAllProxyActivities(): ProxyActivity[] {
        return this._cachedData.GetAllProxyActivities();
    }

    public GetKeyboardCompetency(userId: number): void { 
        this.CallFunction("GetKeyboardCompetency", [userId], this.keyboardCompetencyReceived, this.keyboardCompetencyError, null);
    }

    private keyboardCompetencyReceived = (responseJSONObject:any) => {
        console.log("keyboardCompetencyReceived", responseJSONObject);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new CharacterCompetencyEvent(CharacterCompetencyEvent.CHARACTER_COMPETENCY_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let characterCompetencies: CharacterCompetency[];
            if (responseJSONObject.result.Character_Competencies != null) {
                characterCompetencies = [];
                for (let cc of responseJSONObject.result.Character_Competencies) {
                    characterCompetencies.push(CharacterCompetency.fromJson(cc));
                }
                this.dispatchEvent(new CharacterCompetencyEvent(CharacterCompetencyEvent.CHARACTER_COMPETENCY_RECEIVED, characterCompetencies));
            }
        }
    }

    private keyboardCompetencyError = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("keyboardCompetencyError", errMsg);
        this.dispatchEvent(new CharacterCompetencyEvent(CharacterCompetencyEvent.CHARACTER_COMPETENCY_ERROR, null, errMsg));
    }

    public StoreReview(surveyReview: SurveyReview): void {
        console.log('StoreReview called... ', surveyReview);
        this.CallFunction("StoreReview", [surveyReview.toJson()], this.StoreReviewReceived, this.StoreReviewError, null);
    }

    private StoreReviewReceived = (responseJSONObject:any) => {
        console.log("StoreReviewReceived", responseJSONObject);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new SurveyReviewEvent(SurveyReviewEvent.STORE_REVIEW_ERROR, responseJSONObject.error.message));
        }
        else {
            this.dispatchEvent(new SurveyReviewEvent(SurveyReviewEvent.STORE_REVIEW_SUCCESS));
        }
    }

    private StoreReviewError = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("StoreReviewError", errMsg);
        this.dispatchEvent(new SurveyReviewEvent(SurveyReviewEvent.STORE_REVIEW_ERROR, errMsg));
    }

    public GetLessonPlanInfo(lessonPlanId: number): void {
        console.log('GetLessonPlanInfo called... ', lessonPlanId);
        this.CallFunction("GetLessonPlanInfo", [lessonPlanId], this.GetLessonPlanInfoReceived, this.GetLessonPlanInfoError, null);
    }

    private GetLessonPlanInfoReceived = (responseJSONObject:any) => {
        console.log("GetLessonPlanInfoReceived", responseJSONObject);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new LessonPlanInfoEvent(LessonPlanInfoEvent.LESSON_PLAN_INFO_ERROR, responseJSONObject.error.message));
        }
        else {
            let lessonPlanInfo: LessonPlanInfo = LessonPlanInfo.fromJson(responseJSONObject.result.Lesson_Plan_Info);
            this.dispatchEvent(new LessonPlanInfoEvent(LessonPlanInfoEvent.LESSON_PLAN_INFO_RECEIVED, lessonPlanInfo));
        }
    }

    private GetLessonPlanInfoError = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("GetLessonPlanInfoError", errMsg);
        this.dispatchEvent(new LessonPlanInfoEvent(LessonPlanInfoEvent.LESSON_PLAN_INFO_ERROR, null, errMsg));
    }

    public AdminCreateGradingTemplate(gradingTemplate: Grading_Template): void {
        this.CallFunction("AdminCreateGradingTemplate", [gradingTemplate.toJson()], this.gradingTemplateCreated, this.gradingTemplateError, false);
    }

    public AdminEditGradingTemplate(gradingTemplate: Grading_Template): void {
        this.CallFunction("AdminEditGradingTemplate", [gradingTemplate.toJson()], this.gradingTemplateCreated, this.gradingTemplateError, false);
    }

    public AdminDeleteGradingTemplate(gradingTemplateID: number): void {
        this.CallFunction("AdminDeleteGradingTemplate", [gradingTemplateID], this.gradingTemplateDeleted, this.gradingTemplateError, false);
    }

    private gradingTemplateCreated = (responseJSONObject: any) => {
        DevUtils.LogFunction("ACESS REMOTE", "gradingTemplateCreated", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new GradingTemplateEvent(GradingTemplateEvent.GRADING_TEMPLATE_ERROR, null, null, null, responseJSONObject.error.message));
        }
        else {
            let gradingTemplate: Grading_Template = Grading_Template.fromJson(responseJSONObject.result.Grading_Template);
            this.dispatchEvent(new GradingTemplateEvent(GradingTemplateEvent.GRADING_TEMPLATE_CREATED, gradingTemplate, null, null));
        }
    }

    private gradingTemplateDeleted = (responseJSONObject: any) => {
        DevUtils.LogFunction("ACESS REMOTE", "gradingTemplateCreated", [responseJSONObject]);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new GradingTemplateEvent(GradingTemplateEvent.GRADING_TEMPLATE_ERROR, null, null, null, responseJSONObject.error.message));
        }
        else {
            let gradingTemplateID: number = responseJSONObject.result.Grading_template_id;
            let customerID: number = responseJSONObject.result.Customer_id;
            this.dispatchEvent(new GradingTemplateEvent(GradingTemplateEvent.GRADING_TEMPLATE_DELETED, null, gradingTemplateID, customerID));
        }
    }

    private gradingTemplateError = (errMsg:string, errObj:any = null, id:number = 0) => {
        DevUtils.DisplayError(errMsg, "gradingTemplateError");
        this.dispatchEvent(new GradingTemplateEvent(GradingTemplateEvent.GRADING_TEMPLATE_ERROR, null, null, null, errMsg));
    }

    public AdminGetGroupUserPref(groupID: number, key: string): void {
        this.CallFunction("AdminGetGroupUserPref", [groupID, key], this.userPrefReceived, this.userPrefError, true);
    }

    private userPrefReceived = (responseJSONObject: any) => {
        if (responseJSONObject.result.Group_UserPref != null) {
            let userPref: UserPref = UserPref.fromJson(responseJSONObject.result.Group_UserPref);
            this.dispatchEvent(new UserPrefEvent(UserPrefEvent.USER_PREF_RECEIVED, userPref));
        }
    }

    private userPrefError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new UserPrefEvent(UserPrefEvent.USER_PREF_ERROR, null, errMsg));
    }

    public GetTypesyCourseActivity(courseActivityId: number): void {
        console.log('GetTypesyCourseActivity called... ', courseActivityId);
        this.CallFunction("GetTypesyCourseActivity", [courseActivityId], this.GetTypesyCourseActivityReceived, this.GetTypesyCourseActivityError, null);
    }

    private GetTypesyCourseActivityReceived = (responseJSONObject:any) => {
        console.log("GetTypesyCourseActivityReceived", responseJSONObject);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypesyCourseActivityEvent(TypesyCourseActivityEvent.TYPESY_COURSE_ACTIVITY_ERROR, responseJSONObject.error.message));
        }
        else {
            let typesyCourseActivity: TypesyCourseActivity = TypesyCourseActivity.fromJson(responseJSONObject.result);
            this.dispatchEvent(new TypesyCourseActivityEvent(TypesyCourseActivityEvent.TYPESY_COURSE_ACTIVITY_RECEIVED, typesyCourseActivity));
        }
    }

    private GetTypesyCourseActivityError = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("GetTypesyCourseActivityError", errMsg);
        this.dispatchEvent(new TypesyCourseActivityEvent(TypesyCourseActivityEvent.TYPESY_COURSE_ACTIVITY_ERROR, null, errMsg));
    }

    public TypesyGetPublicProfile(userId: number): void {
        console.log('TypesyGetPublicProfile called... ', userId);
        this.CallFunction("TypesyGetPublicProfile", [userId], this.TypesyGetPublicProfileReceived, this.TypesyGetPublicProfileError, null);
    }

    private TypesyGetPublicProfileReceived = (responseJSONObject:any) => {
        console.log("TypesyGetPublicProfileReceived", responseJSONObject);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new TypesyPublicProfileEvent(TypesyPublicProfileEvent.TYPESY_PUBLIC_PROFILE_ERROR, responseJSONObject.error.message));
        }
        else {
            let typesyPublicProfile: TypesyPublicProfile = TypesyPublicProfile.fromJson(responseJSONObject.result);
            this.dispatchEvent(new TypesyPublicProfileEvent(TypesyPublicProfileEvent.TYPESY_PUBLIC_PROFILE_RECEIVED, typesyPublicProfile));
        }
    }

    private TypesyGetPublicProfileError = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("TypesyGetPublicProfileError", errMsg);
        this.dispatchEvent(new TypesyPublicProfileEvent(TypesyPublicProfileEvent.TYPESY_PUBLIC_PROFILE_ERROR, null, errMsg));
    }

    /*public GetDefaultWordlists(productId: number): void {
        this.CallFunction("GetDefaultWordlists", [productId], this.defaultWordlistsReceived, this.errorGettingDefaultWordlists, null);
    }

    private defaultWordlistsReceived = (responseJSONObject: any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new WordlistCategoryEvent(WordlistCategoryEvent.WORDLIST_CATEGORIES_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let wordlistCategories:Wordlist_Category[] = [];
            for (let wordlistCategoryObject of responseJSONObject.result.Wordlist_Categories) {
                wordlistCategories.push(Wordlist_Category.fromJson(wordlistCategoryObject));
            }
            this.dispatchEvent(new WordlistCategoryEvent(WordlistCategoryEvent.WORDLIST_CATEGORIES_RECEIVED, wordlistCategories));
        }
    }

    private errorGettingDefaultWordlists = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new WordlistCategoryEvent(WordlistCategoryEvent.WORDLIST_CATEGORIES_ERROR, null, errMsg));
    }*/

    public GetWordlistDataAsText(wordlistId: number, asVocabText: boolean): void {
        this.CallFunction("GetWordlistDataAsText", [wordlistId, asVocabText], this.wordlistTextReceived, this.errorGettingWordlistText, null);
    }

    private wordlistTextReceived = (responseJSONObject: any) => {
        if (responseJSONObject.error != null) {
            //this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_DATA_ERROR, null, responseJSONObject.error.message));
            this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVED, null, responseJSONObject.error.message));
        }
        else {
            //let wordlistText = WordlistText.fromJson(responseJSONObject.result.Wordlist_Text);
            //this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_DATA_RECEIVED, null, wordlistText));
            console.log("TCL: privatewordlistTextReceived -> responseJSONObject.result.Wordlist_Text", responseJSONObject)
            let wordlistText = Text.fromJson(responseJSONObject.result.Wordlist_Text);
            this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVED, wordlistText));
        }
    }

    private errorGettingWordlistText = (errMsg:string, errObj:any = null, id:number = 0) => {
        //this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_DATA_ERROR, null, null, errMsg));
        this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, null, errMsg));
    }

    public AdminGetSubscriptionData(currentSubscriptionId: number): void {
        console.log('AdminGetSubscriptionData: ', currentSubscriptionId);
        this.CallFunction("AdminGetSubscriptionData", [currentSubscriptionId], this.AdminGetSubscriptionDataReceived, this.AdminGetSubscriptionDataError, null);
    }

    private AdminGetSubscriptionDataReceived = (responseJSONObject:any) => {
        console.log("AdminGetSubscriptionDataReceived", responseJSONObject);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminSubscriptionEvent(AdminSubscriptionEvent.ADMIN_SUBSCRIPTION_ERROR, null, null, null, responseJSONObject.error.message));
        }
        else {
            let activeSubscription: UserSubscription = UserSubscription.fromJson(responseJSONObject.result.Active_Subscription);
            let subscriptionDaysRemaining: number = responseJSONObject.result.Subscription_days_remaining;
            let subscriptionMonthsRemaining: number = responseJSONObject.result.Subscription_months_remaining;

            let subscriptionInfo: ActiveSubscription;
            if (responseJSONObject.result.Subscription_Info) {
                subscriptionInfo = ActiveSubscription.fromJson(responseJSONObject.result.Subscription_Info);
            }

            let groups = this._cachedData.GetAdminGroups();
            let userIds:number[] = [];

            for(let group of groups) {
                for (let userGroup of group.User_Groups) {
                    if (userIds.indexOf(userGroup.User_id) < 0) {
                        userIds.push(userGroup.User_id);
                    }
                }
            }
            activeSubscription.Licenses_used = userIds.length;
            this._cachedData.SetAdminSubscriptionInfo(subscriptionInfo);
            this._cachedData.SetAdminSubscription(activeSubscription);
            /* let purchases: UserSubscription[] = [];
            for (let obj of responseJSONObject.result.Purchases) {
                purchases.push(UserSubscription.fromJson(obj));
            } */
            this.dispatchEvent(new AdminSubscriptionEvent(AdminSubscriptionEvent.ADMIN_SUBSCRIPTION_RECEIVED, activeSubscription, subscriptionInfo, subscriptionDaysRemaining, subscriptionMonthsRemaining));
        }
    }

    private AdminGetSubscriptionDataError = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("AdminGetSubscriptionDataError", errMsg);
        this.dispatchEvent(new AdminSubscriptionEvent(AdminSubscriptionEvent.ADMIN_SUBSCRIPTION_ERROR, null, null, null, null, errMsg));
    }

    public AdminUpdateSubscription(currentSubscriptionId: number, purchaseData: PurchaseData, price: number, currency: string, numUsers: number, numYears: number): void {
        console.log('AdminUpdateSubscription: ', currentSubscriptionId);
        this.CallFunction("AdminUpdateSubscription", [currentSubscriptionId, purchaseData.toJson(), price, currency, numUsers, numYears], this.AdminUpdateSubscriptionReceived, this.AdminUpdateSubscriptionError, null);
    }

    private AdminUpdateSubscriptionReceived = (responseJSONObject:any) => {
        console.log("AdminUpdateSubscriptionReceived", responseJSONObject);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new AdminSubscriptionEvent(AdminSubscriptionEvent.ADMIN_SUBSCRIPTION_ERROR, null, null, null, null, responseJSONObject.error.message));
        }
        else {
            let activeSubscription: UserSubscription = UserSubscription.fromJson(responseJSONObject.result.Active_Subscription);
            /* let subscriptionInfo: ActiveSubscription;
            if (responseJSONObject.result.Subscription_Info) {
                subscriptionInfo = ActiveSubscription.fromJson(responseJSONObject.result.Subscription_Info);
            } */
            /* let purchases: UserSubscription[] = [];
            for (let obj of responseJSONObject.result.Purchases) {
                purchases.push(UserSubscription.fromJson(obj));
            } */

            let groups = this._cachedData.GetAdminGroups();
            let userIds:number[] = [];

            for(let group of groups) {
                for (let userGroup of group.User_Groups) {
                    if (userIds.indexOf(userGroup.User_id) < 0) {
                        userIds.push(userGroup.User_id);
                    }
                }
            }
            activeSubscription.Licenses_used = userIds.length;
            this._cachedData.SetAdminSubscription(activeSubscription);

            this.dispatchEvent(new AdminSubscriptionEvent(AdminSubscriptionEvent.ADMIN_SUBSCRIPTION_UPDATED, activeSubscription, null));
        }
    }

    private AdminUpdateSubscriptionError = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("AdminUpdateSubscriptionError", errMsg);
        this.dispatchEvent(new AdminSubscriptionEvent(AdminSubscriptionEvent.ADMIN_SUBSCRIPTION_ERROR, null, null, null, null, errMsg));
    }

    public AdminUploadPurchaseOrder(existingPurchaseId: number, contactEmail: string, base64PurchaseOrder: string, filename: string): void {
        console.log('AdminUploadPurchaseOrder: ', existingPurchaseId, contactEmail, base64PurchaseOrder, filename);
        this.CallFunction("AdminUploadPurchaseOrder", [existingPurchaseId, contactEmail, base64PurchaseOrder, filename], this.AdminUploadPurchaseOrderSuccess, this.AdminUploadPurchaseOrderError, null);
    }

    private AdminUploadPurchaseOrderSuccess = (responseJSONObject:any) => {
        console.log("AdminUploadPurchaseOrderSuccess", responseJSONObject);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new UploadPurchaseOrderEvent(UploadPurchaseOrderEvent.PURCHASE_ORDER_UPLOAD_ERROR, responseJSONObject.error.message));
        }
        else {
            this.dispatchEvent(new UploadPurchaseOrderEvent(UploadPurchaseOrderEvent.PURCHASE_ORDER_UPLOAD_SUCCESS));
        }
    }

    private AdminUploadPurchaseOrderError = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("AdminUploadPurchaseOrderError", errMsg);
        this.dispatchEvent(new UploadPurchaseOrderEvent(UploadPurchaseOrderEvent.PURCHASE_ORDER_UPLOAD_ERROR, errMsg));
    }

    public GetCategoryCertificateData(courseCategoryId: number, userId: number): void {
        this.CallFunction("GetCategoryCertificateData", [courseCategoryId, userId], this.certificateDataReceived, this.certificateDataError, null);
    }

    private certificateDataReceived = (responseJSONObject:any) => {
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new PrintCertificateEvent(PrintCertificateEvent.CERTIFICATE_ERROR, null, null, null, null, responseJSONObject.error.message));
        }
        else {
            let certificate = responseJSONObject.result;
            this.dispatchEvent(new PrintCertificateEvent(PrintCertificateEvent.CERTIFICATE_DETAILS_RECEIVED, certificate.Category_name, certificate.Date_Completed, certificate.Goal1, certificate.Goal2));
        }
    }

    private certificateDataError = (errMsg:string, errObj:any = null, id:number = 0) => {
        this.dispatchEvent(new PrintCertificateEvent(PrintCertificateEvent.CERTIFICATE_ERROR, null, null, null, null, errMsg));
    }

    /** Functions for the new Status Level Reward System **/
    public get TypesyStatusLevels(): TypesyStatusLevel[] {
        return this._cachedData.TypesyStatusLevels;
    }

    public get UserTypingCompetency(): UserTypingCompetency {
        return this._cachedData.UserTypingCompetency;
    }

    public get UserStatusPoints(): number {
        return this._cachedData.UserStatusPoints != null ? this._cachedData.UserStatusPoints.Total : 0;
    }
    /** End of functions for the new Status Level Reward System **/

    public get PlacementTest(): PlacementTest {
        return this._cachedData.PlacementTest;
    }

    public StorePlacementTestResults(placementTestID: number, questionAnswers: string, speed: number, accuracy: number) {
        this.CallFunction("StorePlacementTestResults", [placementTestID, questionAnswers, speed, accuracy], this.placementTestResultsStored, this.errorStoringPlacementTestResults, null);
    }

    private placementTestResultsStored = (responseJSONObject:any) => {  
        if (responseJSONObject.error != null) {
            
        }
        else {
            console.log("TCL: privateplacementTestResultsStored -> responseJSONObject.result.Can_touch_type", responseJSONObject.result.Can_touch_type);
        }
    }

    private errorStoringPlacementTestResults = (errMsg:string, errObj:any = null, id:number = 0) => {
    }

    public GetUpgradeOffers(platform: string): void {
        this.CallFunction("GetUpgradeOffers", [platform], this.GetUpgradeOffersReceived, this.GetUpgradeOffersError);
    }

    private GetUpgradeOffersReceived = (responseJSONObject:any) => {
        console.log("GetUpgradeOffersReceived", responseJSONObject);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new UpgradeOfferEvent(UpgradeOfferEvent.UPGRADE_OFFERS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            let upgradeOffers: UpgradeOffer[] = [];
            for (let offer of responseJSONObject.result.Offers) {
                upgradeOffers.push(UpgradeOffer.fromJson(offer));
            }
            console.log('upgradeOffers: ', upgradeOffers);
            this.dispatchEvent(new UpgradeOfferEvent(UpgradeOfferEvent.UPGRADE_OFFERS_RECEIVED, upgradeOffers));
        }
    }

    private GetUpgradeOffersError = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("GetUpgradeOffersError", errMsg);
        this.dispatchEvent(new UpgradeOfferEvent(UpgradeOfferEvent.UPGRADE_OFFERS_ERROR, null, errMsg));
    }

    public AdminRemoveUsersFromGroups(userIds: number[], purchaseId: number) {        
        this.CallFunction("AdminRemoveUsersFromGroups", [userIds, purchaseId], this.usersRemovedFromGroups, this.errorRemovingUsersFromGroups, true);
    }

    private usersRemovedFromGroups = (responseJSONObject:any) => {
        console.log("usersRemovedFromGroups", responseJSONObject);
        if (responseJSONObject.error != null) {
            this.dispatchEvent(new UserGroupEvent(UserGroupEvent.USERS_REMOVE_FROM_OTHER_GROUPS_ERROR, null, responseJSONObject.error.message));
        }
        else {
            this._cachedData.RemoveUserFromOtherGroups(responseJSONObject.result.User_groups_removed);
            this.dispatchEvent(new UserGroupEvent(UserGroupEvent.USERS_REMOVED_FROM_OTHER_GROUPS, null, null, status));
        }
    }

    private errorRemovingUsersFromGroups = (errMsg:string, errObj:any = null, id:number = 0) => {
        console.log("errorRemovingUsersFromGroups", errMsg);
        this.dispatchEvent(new UserGroupEvent(UserGroupEvent.USERS_REMOVE_FROM_OTHER_GROUPS_ERROR, null, errMsg));
    }
}
