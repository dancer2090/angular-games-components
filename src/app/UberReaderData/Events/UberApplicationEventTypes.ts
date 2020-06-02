export class UberApplicationEventTypes
{
    public static CURRENT_TEXT_CHANGED:string = "CurrentTextChanged";
    public static CURRENT_WORDLIST_CHANGED:string = "CurrentWordlistChanged";
    public static CURRENT_WORD_CHANGED:string = "CurrentWordChanged";
    public static WORD_USER_CHANGED:string = "WordUserChanged";
    public static USER_WORDLIST_CHANGED:string = "UserWordlistChanged";
    public static WORD_SOUND_LOADED:string = "WordSoundLoaded";
    public static WORD_SOUND_LOAD_FAILED:string = "WordSoundLoadFailed";
    
    public static RECEIVING_PRODUCT_DATA_SUCCESS:string = "ProductDataReceived";
    public static RECEIVING_PRODUCT_DATA_FAILED:string = "ErrorReceivingProductData";
    
    public static RECEIVING_USER_DATA_SUCCESS:string = "UserDataReceived";
    public static RECEIVING_USER_DATA_FAILED:string = "ErrorReceivingUserData";	
    
    public static TEXT_UPDATE_SUCCESS:string = "textUpdateSuccessful";
    public static TEXT_UPDATE_FAILED:string = "textUpdateFailed";
    
    public static TEXT_DELETE_SUCCESS:string = "textDeletedSuccessfully";
    public static TEXT_DELETE_FAILED:string = "textDeletionFailed";
    
    public static WORD_DISCOVER_DELETE_SUCCESS:string = "wordDiscoverDeletedSuccessfully";
    public static WORD_DISCOVER_DELETE_FAILED:string = "wordDiscoverDeletionFailed";
    
    public static WORD_INSERT_SUCCESS:string = "wordlistWordsInserted";
    public static WORD_INSERT_FAILED:string = "wordlistWordsInsertError";
    
    public static INSERT_RESULT_SUCCESS:string = "resultInsertSuccessfull";
    public static INSERT_RESULT_FAILED:string = "resultInsertFailed";
    
    public static PROFILE_PIC_LOADED:string = "profilePicLoaded";

    public static ORGANIZATION_LOGO_LOADED:string = "organizationLogoLoaded";
    
    public static TEXT_DOC_IMPORTED:string = "textDocImported";
    public static TEXT_DOC_IMPORT_ERROR:string = "textDocImportError";
    
    public static FEEDBACK_SENT:string = "feedbackSent";
    public static FEEDBACK_SEND_ERROR:string = "feedbackSendError";
    
    public static SHARED_OBJECT_DELETED:string = "sharedObjectDeleted";
    public static SHARED_OBJECT_DELETE_ERROR:string = "sharedObjectDeleteError";
    
    public static SHARED_OBJECT_SETTINGS_UPDATED:string = "sharedObjectSettingsUpdated";
    public static SHARED_OBJECT_SETTINGS_UPDATE_ERROR:string = "sharedObjectSettingsUpdateError";
    
    public static WORDLIST_DELETED:string = "wordlistDeleted";
    public static WORDLIST_DELETE_ERROR:string = "wordlistDeleteError";
    
    public static LOCAL_NETWORD_DIRECTORY_MISSING:string = "localNetworkDirectoryMissing";
    
    public static USER_TEXT_UPDATED:string = "userTextUpdated";
    
    public static DPI_CHANGED:string = "dpiChanged";
    
    
    
    public static COURSES_RECEIVED:string = "coursesReceived";
    public static COURSE_CREATION_ERROR:string = "courseCreationError";
    public static COURSE_SAVE_ERROR:string = "courseSaveError";
    public static QUESTION_CREATION_ERROR:string = "questionCreationError";
    public static QUESTION_SAVE_ERROR:string = "questionSaveError";

    public static APP_STARTED:string = "appHasStartedAndInitialized";
    public static NEW_USER:string = "newUserLoggedIn";

    public static CANCEL_LOADING:string = "cancelLoading";

    public static SHOW_SIDE_MENU:string = "showDiscoverSideMenu";

    public static QUESTION_NOTES_SAVED:string = "courseQuestionNotesSaved";
    public static QUESTION_NOTES_FAILED:string = "courseQuestionNotesFailed";    

    public static WORDLIST_UPDATE_SUCCESS:string = "wordlistUpdateSucessful";
	public static WORDLIST_UPDATE_FAILED:string = "wordlistUpdateFailed";
  
    public static UPDATE_EXAM_TYPE:string = "updateExamType";
    public static UPDATE_BROWSE_SUBJECTS:string = "updateBrowseSubjects";

    public static UPDATE_STATUS:string = "updateAppStatus";
    public static NEW_WORDS_ADDED_TO_LIST:string = "newWordsAddedToList";

    public static REFRESH_NAVIGATION:string = "refreshNavigation";

    public static AUTO_LOGIN_FAILED: string = "AutoLogInFailed";

    public static COMPLETE_PREPED_PROFILE_INFO_SUCCESS: string = "CompletePrepEdProfileInfoSuccess";
    public static COMPLETE_PREPED_PROFILE_INFO_FAILED: string = "CompletePrepEdProfileInfoFailed";

    public static USER_ACCOUNT_ACTIVATED: string = "userAccountActivated";

    public static GOOGLE_CLASSROOM_SYNCED: string = "googleClassroomSynced";
    public static GOOGLE_CLASSROOM_SYNC_FAILED: string = "googleClassroomSyncFailed";
}