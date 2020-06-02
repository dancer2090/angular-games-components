import { Lesson_Plan } from '../DataClasses/db/Lesson_Plan';
import { DictionaryNumber } from '../Utils/Dictionary';
import { DictionaryString } from '../Utils/Dictionary';
import { StringUtils } from '../Utils/StringUtils';
import { SearchTextSessionCache } from './SearchTextSessionCache';
import { Author } from '../DataClasses/db/Author';
import { AuthorPicture } from '../DataClasses/other/AuthorPicture';
import { ProxyActivity } from '../DataClasses/other/ProxyActivity';
import { ProxyCourse } from '../DataClasses/other/ProxyCourse';
import { ProxyTest } from '../DataClasses/other/ProxyTest';
import { ProxyText } from '../DataClasses/other/ProxyText';
import { ProxyWordlist } from '../DataClasses/other/ProxyWordlist';
import { SharedProxyWordlist } from '../DataClasses/other/SharedProxyWordlist';
import { SharedProxyText } from '../DataClasses/other/SharedProxyText';
import { TestData } from '../DataClasses/other/TestData';
import { Word_PartOfSpeech } from '../DataClasses/other/Word_PartOfSpeech';
import { AControl } from '../DataClasses/db/AControl';
import { Activity } from '../DataClasses/db/Activity';
import { Activity_Category } from '../DataClasses/db/Activity_Category';
import { Chart_Category } from '../DataClasses/db/Chart_Category';
import { Code } from '../DataClasses/db/Code';
import { Course } from '../DataClasses/db/Course';
import { Course_Category } from '../DataClasses/db/Course_Category';
import { Default } from '../DataClasses/db/Default';
import { Language } from '../DataClasses/db/Language';
import { Offer } from '../DataClasses/db/Offer';
import { ProductInfo } from '../DataClasses/db/ProductInfo';
import { Result } from '../DataClasses/db/Result';
import { Setting } from '../DataClasses/db/Setting';
import { Text } from '../DataClasses/db/Text';
import { UI_Text } from '../DataClasses/db/UI_Text';
import { UserPref } from '../DataClasses/db/UserPref';
import { User_Course } from '../DataClasses/db/User_Course';
import { User_Prep_Program } from '../DataClasses/db/User_Prep_Program';
import { Prep_Program_Course } from '../DataClasses/db/Prep_Program_Course';
import { User_Question } from '../DataClasses/db/User_Question';
import { User_Notes } from '../DataClasses/db/User_Notes';
import { User_Text } from '../DataClasses/db/User_Text';
import { Word } from '../DataClasses/db/Word';
import { Word_Discover } from '../DataClasses/db/Word_Discover';
import { Word_Pos } from '../DataClasses/db/Word_Pos';
import { Word_Sense } from '../DataClasses/db/Word_Sense';
import { Word_User } from '../DataClasses/db/Word_User';
import { Wordlist } from '../DataClasses/db/Wordlist';
import { Wordlist_Category } from '../DataClasses/db/Wordlist_Category';
import { Wordlist_Word } from '../DataClasses/db/Wordlist_Word';
import { StatusLevel } from '../DataClasses/other/StatusLevel';
import { CourseInfo } from '../DataClasses/other/CourseInfo';
import { Prep_Program_Info } from '../DataClasses/other/Prep_Program_Info';
import { User_Comment } from '../DataClasses/db/User_Comment';
import { Question_Group } from '../DataClasses/db/Question_Group';
import { Prep_Program } from '../DataClasses/db/Prep_Program';
import { WordUsageExample } from '../DataClasses/db/WordUsageExample';
import { User } from '../DataClasses/db/User';
import { AppSettings } from '../AppSettings';
import { ExamInfo } from '../DataClasses/db/ExamInfo';
import { ProxyLessonPlan } from '../DataClasses/other/ProxyLessonPlan';
import { AdminUser } from '../DataClasses/db/AdminUser';
import { UserSubscription } from '../DataClasses/db/UserSubscription';
import { Group } from '../DataClasses/db/Group';
import { User_Group } from '../DataClasses/db/User_Group';
import { Customer } from '../DataClasses/db/Customer';
import { Chart } from '../DataClasses/db/Chart';
import { District } from '../DataClasses/db/District';
import { Group_Lesson_Plan } from '../DataClasses/db/Group_Lesson_Plan';
import { ProxyTypingTest } from '../DataClasses/other/ProxyTypingTest';
import { TypingTest } from '../DataClasses/db/Typing_Test';
import { UserTypingTestResult } from '../DataClasses/db/User_Typing_Test_Result';
import { School_Trial_Info } from '../DataClasses/db/School_Trial_Info';
import { RunningTask } from '../DataClasses/other/RunningTask';
import { UserNotification } from '../DataClasses/db/UserNotification';
import { ProxyTypingTask } from '../DataClasses/other/ProxyTypingTask';
import { TypingTask } from '../DataClasses/db/Typing_Task';
import { UserTypingTaskResult } from '../DataClasses/db/User_Typing_Task_Result';
import { Grading_Template } from '../DataClasses/db/Grading_Template';
import { ActiveSubscription } from '../DataClasses/db/ActiveSubscription';
import { TypesyStatusLevel } from '../DataClasses/db/Typesy_Status_Level';
import { UserTypingCompetency } from '../DataClasses/db/User_Typing_Competency';
import { UserStatusPoints } from '../DataClasses/db/User_Status_Points';
import { PlacementTest } from '../DataClasses/db/PlacementTest';
import { Assignment_Type } from '../DataClasses/db/Assignment_Type';
import { Topic } from '../DataClasses/db/Topic';
import { UserLessonPlan } from '../DataClasses/db/User_Lesson_Plan';

//import Proxy = flash.utils.Proxy;

//import MaxAggregator = mx.olap.aggregators.MaxAggregator;
//import ObjectUtil = mx.utils.ObjectUtil;

//import WString = comp.WordSearch.WString;
//interface StringMap { [s: string]: string; }



export class CachedData
{
    // PRODUCT DATA
    private _course_categories:Course_Category[];
    private _courses:DictionaryNumber<Course> = {};
	private _preview_courses:DictionaryNumber<Course> = {};
    private authorProxyCourses:ProxyCourse[];
    private _proxy_lesson_plans:ProxyLessonPlan[];
    private _lesson_plans:DictionaryNumber<Lesson_Plan> = {};
    
    private _proxyMyCourses:ProxyCourse[];
    private _courseInfo:CourseInfo[];
    private _courseAuthors:Author[];
    //private _publicUsers:User[];
    private _proxyWishlistCourses:ProxyCourse[];
    private _proxyDiscoverCourses:ProxyCourse[];

    //private _publicWordlists:ProxyWordlist[];

    private _courseRecommendations:DictionaryString<ProxyCourse[]> = {};
    private _popularCourseRecommendations:DictionaryString<ProxyCourse[]> = {};
    private _personalCourseRecommendations:DictionaryString<ProxyCourse[]> = {};

    private _myPrepProgram:Prep_Program[];
    private _prepDiscoverProgram:Prep_Program[];
    private _programInfo:Prep_Program_Info[];
    private _programWishlist:Prep_Program[];
    
    private _activity_categories:Activity_Category[];
    private _chart_categories:Chart_Category[];
    private _default_settings:Setting[];
    private _activities:DictionaryNumber<Activity> = {};
	private _questionGroups:DictionaryNumber<Question_Group> = {};
    private _codes:DictionaryNumber<Code> = {};
    private _acontrols:DictionaryNumber<AControl> = {};
    private _defaults:DictionaryString<Default> = {};
    //private var _defaultText:Text;
    //private var _defaultWordlist:Wordlist;
    private _proxyTests:ProxyTest[];
    private _wordlistCategories:Wordlist_Category[];
    private _languages:Language[];
    private _statusLevel:StatusLevel[];
    private _typesy_status_levels: TypesyStatusLevel[];
    private _testData:DictionaryNumber<TestData> = {};
    
    // USER DATA
    private _enableCertificates:boolean = true;
    private _user_settings:Setting[];
    private _group_settings:Setting[];
    private _userPrefs:DictionaryString<UserPref> = {};
    private _groupUserPrefs:DictionaryString<UserPref> = {};
    private _user_courses:DictionaryNumber<User_Course> = {};
    private _user_prep_program:DictionaryNumber<User_Prep_Program> = {};
    private _userQuestions:DictionaryNumber<User_Question> = {};
    private _userNotes:DictionaryNumber<User_Notes> = {};
    private _results:DictionaryString<Result> = {};
    private _currentText:Text;
    private _statusPoints:number;
    private _enabledActivities:DictionaryString<string>;
    private _enabledCourseStep1:DictionaryString<string>;
    private _enabledCharts:DictionaryString<string>;
    private _enabledCourses:DictionaryString<string>;
    private _enabledWordlists:DictionaryString<string>;
    private _enabledTexts:DictionaryString<ProxyText>;
    private _trialMode:string;
    private _trialWordlistLimit:number;
	private _trialMaxNumTexts:number;
    private _number_of_texts:number;
    private _number_of_wordlists: number;
    private _userTexts:DictionaryNumber<User_Text> = {};
    private _user_comments:User_Comment[];
    private _lesson_plan_course_categories: DictionaryNumber<Course_Category[]>;
    private _upgrade_url:string;
    private _current_lesson_plan: Lesson_Plan;
    
    private organization_display_name:string;
    private organization_logo_url:string;
    //private var _currentWordlist:Wordlist;
    //private var _auxWordlist:Wordlist;
    private _uiText:DictionaryString<UI_Text> = {};// = {};
    //private var _currentWordlist:Wordlist;
    private _wordUsers:DictionaryNumber<Word_User> = {};
    private _wordDiscovers:Word_Discover[];
    private _userProxyWordlists:ProxyWordlist[];
    private _sharedProxyWordlists:SharedProxyWordlist[];
    private _userProxyTexts:ProxyText[];
    private _sharedProxyTexts:SharedProxyText[];
    private _wordlists:DictionaryNumber<Wordlist> = {};
    private _words:DictionaryNumber<Word> = {};
    private _wordUsageExamples:DictionaryString<WordUsageExample[]> = {};
    private _productInfo:ProductInfo;
    //private _localProductVersion:string;
    
    private _libraryProxyTexts:ProxyText[];
            
    private _defaultTexts:DictionaryNumber<Text> = {};
    private _proxyTextsTable:ProxyText[]; //vector = version of defaulttext
    private _basicProxyTexts:ProxyText[];
    
    private _offers:Offer[] = [];
    private _exam_info:DictionaryString<ExamInfo> = {};
    //private _inAppOffers:DictionaryString<Offer> = {};

    private _userProxyTypingTests: ProxyTypingTest[] = [];
    private _userTypingTestResults: UserTypingTestResult[] = [];
    private _userProxyTypingTasks: ProxyTypingTask[] = [];
    private _userTypingTaskResults: UserTypingTaskResult[] = [];
    private _currentTypingTest: TypingTest; 
    private _school_trial_info: School_Trial_Info;
    private _running_tasks: DictionaryNumber<(responseObject:any) => void> = {};
    private _user_notifications: UserNotification[] = [];
    private _userTypingCompetency: UserTypingCompetency;
    private _userStatusPoints: UserStatusPoints;
    private _placementTest: PlacementTest;
    private _topics: Topic[] = [];
    private _userLessonPlans: UserLessonPlan[] = [];

    public SetExamInfo(exam_info: ExamInfo[]) {
        this._exam_info = {};
        for (let examInfoObject of exam_info)
        {
            this._exam_info[examInfoObject.Exam_name] = examInfoObject;
        }
    }

    public SetCodes(codes:Code[])
    {
        this._codes = {};
        for (var code of codes)
        {
            this._codes[code.Code_id] = code;
        }
    }

    public SetProductData(courseCategories:Course_Category[],
                            activityCategories:Activity_Category[],
                            chartCategories:Chart_Category[],
                            defaultSettings:Setting[],
                            acontrols:AControl[],
                            codes:Code[],
                            defaults:Default[],
                            //defaultText:Text,
                            //wordlistCategories:Wordlist_Category[],
                            productInfo:ProductInfo,
                            languages:Language[],
                            statusLevel:StatusLevel[],
                            currentLessonPlan:Lesson_Plan,
                            typesyStatusLevels: TypesyStatusLevel[]):void
    {
        this._productInfo = productInfo;
        this._course_categories = courseCategories;
        this._activity_categories = activityCategories;
        this._chart_categories = chartCategories;
        this._default_settings = defaultSettings;
        this._languages = languages;
        this._statusLevel = statusLevel;        
        this._lesson_plans = {};
        this._lesson_plan_course_categories = {};
        this._typesy_status_levels = typesyStatusLevels;

        if(currentLessonPlan) {
            this._current_lesson_plan = currentLessonPlan;
            this._lesson_plans[currentLessonPlan.Lesson_plan_id] = currentLessonPlan;
            this._lesson_plan_course_categories[currentLessonPlan.Lesson_plan_id] = courseCategories;
        }

        //_activities = {};
        /*for (var activity of activities)
        {
            _activities[activity.Activity_id] = activity;
        }*/
        this._acontrols = {};
        for (var aControl of acontrols)
        {
            this._acontrols[aControl.Control_id] = aControl;
        }
        this._codes = {};
        for (var code of codes)
        {
            this._codes[code.Code_id] = code;
        }
        this._defaults = {};
        for (var appDefault of defaults)
        {
            this._defaults[appDefault.Key] = appDefault;
        }
        //_defaultText = defaultText;
        //_wordlistCategories = wordlistCategories;
    }
    
    public SetUserData(userSettings:Setting[],
                        userPrefs:UserPref[],
                        userCourses:User_Course[],
                        goal1Current:Result,
                        goal2Current:Result,
                        currentText:Text,
                        words:Word[],
                        wordUsers:Word_User[],
                        wordDiscovers:Word_Discover[],
                        userProxyWordlists:ProxyWordlist[],
                        sharedProxyWordlists:SharedProxyWordlist[], 
                        wordlistCategories:Wordlist_Category[],
                        //uiText:UI_Text[],
                        userQuestions:User_Question[],
                        statusPoints:number,
                        userProxyTexts:ProxyText[],
                        currentWordlist:Wordlist,
                        org_display_name:string,
                        org_logo_url:string,
                        userText:User_Text,
                        sharedProxyTexts:SharedProxyText[],
                        number_of_texts:number,
                        number_of_wordlists: number,
                        libraryUserTexts:User_Text[],
                        libraryDefaultProxyText:ProxyText[],
                        groupUserPrefs:UserPref[],
                        groupSettings:Setting[],
                        proxyCoursesInMyCourses:ProxyCourse[],
                        proxyWishlistObject:ProxyCourse[],
                        userComments:User_Comment[],
                        userNotes:User_Notes[],
                        userPrepPrograms:User_Prep_Program[],
                        prepPrograms:Prep_Program[],
                        prepProgramWishlist:Prep_Program[],
                        trialParameters:any,                                
                        lessonPlans:ProxyLessonPlan[],
                        userProxyTypingTests: ProxyTypingTest[],
                        userTypingTestResults: UserTypingTestResult[],
                        school_trial_info: School_Trial_Info,
                        userNotifications: UserNotification[],
                        userProxyTypingTasks: ProxyTypingTask[],
                        userTypingTasksResults: UserTypingTaskResult[],
                        userTypingCompetency: UserTypingCompetency,
                        userStatusPoints: UserStatusPoints,
                        placementTest: PlacementTest,
                        topics: Topic[],
                        userLessonPlans: UserLessonPlan[]):void
    {
        this._user_settings = userSettings;
        this.AddToLocalStorage("userSettings", JSON.stringify(this._user_settings));
        this._group_settings = groupSettings;
        this.AddToLocalStorage("groupSettings", JSON.stringify(this._group_settings));
        this._userPrefs = {};
        this._groupUserPrefs = {};
        this._statusPoints = statusPoints;
        this.organization_display_name = org_display_name;
        this.organization_logo_url = org_logo_url;
        this._number_of_texts = number_of_texts;
        this._number_of_wordlists = number_of_wordlists;
        if (number_of_texts != null)
        {
            this.AddToLocalStorage("numTexts", JSON.stringify(this._number_of_texts));
        }
        if (number_of_wordlists != null)
        {
            this.AddToLocalStorage("numWordlists", JSON.stringify(this._number_of_wordlists));
        }
        this._proxyMyCourses = proxyCoursesInMyCourses;
        this.AddToLocalStorage("proxyCoursesInMyCourses", JSON.stringify(this._proxyMyCourses));
        this._proxyWishlistCourses = proxyWishlistObject;
        this.AddToLocalStorage("proxyWishlistCourses", JSON.stringify(this._proxyWishlistCourses));
        this._user_comments = userComments;
        this.AddToLocalStorage("userComments", JSON.stringify(this._user_comments));
        
        for (var userPref of userPrefs)
        {
            // This assumes the userPrefs are ordered with user prefs before product prefs
            if (this._userPrefs[userPref.Key] == null)
            {
                this._userPrefs[userPref.Key] = userPref;
            }
        }
        this.AddToLocalStorage("userPrefs", JSON.stringify(this._userPrefs));
        for (var groupUserPref of groupUserPrefs)
        {
            if (this._groupUserPrefs[groupUserPref.Key] == null)
            {
                this._groupUserPrefs[groupUserPref.Key] = groupUserPref;
            }
        }
        this.AddToLocalStorage("groupUserPrefs", JSON.stringify(this._groupUserPrefs));
        this._user_courses = {};
        for (var userCourse of userCourses)
        {
            this._user_courses[userCourse.Course_id] = userCourse;
        }
        this.AddToLocalStorage("userCourses", JSON.stringify(this._user_courses));
        this._userQuestions = {};
        for (var userQuestion of userQuestions)
        {
            this._userQuestions[userQuestion.Question_id] = userQuestion;
        }
        this.AddToLocalStorage("userQuestions", JSON.stringify(this._userQuestions));
        this._results = {};
        if (goal1Current != null)
        {            
            this._results[goal1Current.Result_key] = goal1Current;
        }
        if (goal2Current != null)
        {
            this._results[goal2Current.Result_key] = goal2Current;
        }
        this.AddToLocalStorage("results", JSON.stringify(this._results));
        //_userTexts = {};
        if(userText != null)
        {
            this._userTexts[userText.Text_id] = userText;
        }
        
        if(libraryUserTexts != null)
        {
            for (var ut of libraryUserTexts)
            {
                this.InsertUser_Text(ut);
            }
        }
        
        if(currentText)
        {
            this._currentText = currentText;
            this.InsertText(currentText);
        }
        
        this._wordlists = {};
        
        if(currentWordlist != null)
        {
            this._wordlists[currentWordlist.Wordlist_id] = currentWordlist;
        }
        /*for (var wordlist of wordlists)
        {
            _wordlists[wordlist.Wordlist_id] = wordlist;
        }*/
        this._words = {};
        for (var word of words)
        {
            this._words[word.Word_id] = word;
        }
        this._wordUsers = {};
        for (var wordUser of wordUsers)
        {
            this._wordUsers[wordUser.Word_id] = wordUser;
        }
        
        this._enabledActivities = {};
        this._enabledCourses = {};
        this._enabledWordlists = {};
        this._trialMaxNumTexts = null;
        this._enabledCharts = {};
        this._enabledCourseStep1 = {};

        this._enableCertificates = true;
        this._trialMode = null;
        this._trialWordlistLimit = null;

        if(trialParameters)
        {
            if(trialParameters.Enabled_activities && trialParameters.Enabled_activities.length > 0)
            {
                let enabledActivities = (<string>trialParameters.Enabled_activities).split(",");
                for (var activityId of enabledActivities)
                {
                    this._enabledActivities[activityId] = activityId;
                }
            }
            
            if(trialParameters.Enabled_courses && trialParameters.Enabled_courses.length > 0)
            {
                let enabledCourses = (<string>trialParameters.Enabled_courses).split(",");
                for (var courseId of enabledCourses)
                {
                    this._enabledCourses[courseId] = courseId;
                }
            }

            if(trialParameters.Enabled_wordlists && trialParameters.Enabled_wordlists.length > 0)
            {
                let enabledWordlists = (<string>trialParameters.Enabled_wordlists).split(",");
                for (var wordlistId of enabledWordlists)
                {
                    this._enabledWordlists[wordlistId] = wordlistId;
                }
            }

            if(trialParameters.Enabled_charts && trialParameters.Enabled_charts.length > 0)
            {
                let enabledCharts = trialParameters.Enabled_charts.split(",");
                for (var chartId of enabledCharts)
                {
                    this._enabledCharts[chartId] = chartId;
                }
            }

            if(trialParameters.Enabled_courses_step1 && trialParameters.Enabled_courses_step1.length > 0)
            {
                let  enabledCourseStep1 = trialParameters.Enabled_courses_step1.split(",");
                for (var courseStep1Id of enabledCourseStep1)
                {
                    this._enabledCourseStep1[courseStep1Id] = courseStep1Id;
                }
            }

            this._trialMaxNumTexts = trialParameters.Max_num_texts;
            this._enableCertificates = trialParameters.Enable_certificates;
            this._trialMode = trialParameters.Text_trial_mode ? trialParameters.Text_trial_mode : "";
            this._trialWordlistLimit = trialParameters.Wordlist_word_limit;
            this._upgrade_url = trialParameters.Upgrade_url;
        }
        
        if(libraryDefaultProxyText != null)
        {			
            this.InsertLibraryProxyTexts(libraryDefaultProxyText);
        }
        
        /*_uiText = {};
        for (var uiTextInst of uiText )
        {
            _uiText[uiTextInst.Key] = uiTextInst;
        }*/
        
        this._wordDiscovers = wordDiscovers.sort(this.sortWordDiscovers);
        this._userProxyWordlists = userProxyWordlists.sort(this.sortProxyWordlists);
        this.AddToLocalStorage("userProxyWordlists", JSON.stringify(this._userProxyWordlists));
        this._userProxyTexts = userProxyTexts.sort(this.sortProxyTexts);
        this._sharedProxyTexts = sharedProxyTexts.sort(this.sortSharedProxyTexts);
        this._wordlistCategories = wordlistCategories;
		this._sharedProxyWordlists = sharedProxyWordlists;
        this._programWishlist = prepProgramWishlist;
        this.AddToLocalStorage("prepProgramsWishlist", JSON.stringify(this._programWishlist));

        this._user_prep_program = {};
        for (let userPrepProgram of userPrepPrograms)
        {
            this._user_prep_program[userPrepProgram.Prep_program_id] = userPrepProgram;
        }
        this.AddToLocalStorage("userPrepPrograms", JSON.stringify(this._user_prep_program));
        this._myPrepProgram = prepPrograms;
        this.AddToLocalStorage("myPrepProgram", JSON.stringify(this._myPrepProgram));

        this._userNotes = {};
        for (var userNote of userNotes)
        {
            this._userNotes[userNote.Course_activity_id] = userNote;
        }
        this.AddToLocalStorage("userNotes", JSON.stringify(this._userNotes));

        this._proxy_lesson_plans = lessonPlans;
        this._userProxyTypingTests = userProxyTypingTests;
        this._userTypingTestResults = userTypingTestResults;
        /*if(currentLessonPlan != null && currentCourseCategories != null) {    
            //_course_categories should always contain ONLY the course categories of the current lesson plan
            this._course_categories = currentCourseCategories;
            this._current_lesson_plan = currentLessonPlan;            
            this._lesson_plans[currentLessonPlan.Lesson_plan_id] = currentLessonPlan;
            this._lesson_plan_course_categories[currentLessonPlan.Lesson_plan_id] = currentCourseCategories;
        }*/
        this._school_trial_info = school_trial_info;
        this._user_notifications = userNotifications;
        this._userProxyTypingTasks = userProxyTypingTasks;
        this._userTypingTaskResults = userTypingTasksResults;
        this._userTypingCompetency = userTypingCompetency;
        this._userStatusPoints = userStatusPoints;
        this._placementTest = placementTest;
        this._topics = topics;
        this._userLessonPlans = userLessonPlans;
    }

    public GetSchoolTrialInfo(): School_Trial_Info {
        return this._school_trial_info;
    }
    
    public GetOrganizationDisplayName():string
    {
        return this.organization_display_name;
    }

    public SetOrganizationLogoUrl(value: string)
    {
        this.organization_logo_url = value;
    }
    
    public GetOrganizationLogoUrl():string
    {
        return this.organization_logo_url;
    }
    
    public DeleteUserText(id:number):void
    {			
        for (var i = this._userProxyTexts.length - 1; i >= 0; i--)
        {
            if (this._userProxyTexts[i].Text_id == id)
            {
                //_userProxyTexts.removeAt(i);
                this._userProxyTexts.splice(i, 1);
                return;
            }
        }
    }
    
    public DeleteSharedText(id:number):void
    {			
        for (var i = this._sharedProxyTexts.length - 1; i >= 0; i--)
        {
            if (this._sharedProxyTexts[i].Shared_object_id  == id)
            {
                //_sharedProxyTexts.removeAt(i);
                this._sharedProxyTexts.splice(i, 1);
                return;
            }
        }
    }

    /*
    public function SetUserProxyTexts(userProxyTexts:ProxyText[]):void
    {
        _userProxyTexts = new ProxyText[]();
        _userProxyTexts = userProxyTexts.sort(sortProxyTexts);
    }*/
    
    public InsertUserText(text:ProxyText):void
    {
        var toInsert:boolean = true;
        for (var i = this._userProxyTexts.length - 1; i >= 0; i--)
        {
            if (this._userProxyTexts[i].Text_id == text.Text_id)
            {
                toInsert = false;
                break;
            }
        }
        
        if(toInsert)
        {
            this._userProxyTexts.push(text);
        }
    }
    
    public InsertSharedText(text:SharedProxyText):void
    {
        var toInsert:boolean = true;
        for (var i = this._sharedProxyTexts.length - 1; i >= 0; i--)
        {
            if (this._sharedProxyTexts[i].Shared_object_id == text.Shared_object_id)
            {
                toInsert = false;
                break;
            }
        }
        
        if(toInsert)
        {
            this._sharedProxyTexts.push(text);
        }
    }
    
    public UpdateProxyTexts(updatedProxyTexts:ProxyText[]):boolean
    {			
        var updated:boolean = false;
        for (var updatedProxyText of updatedProxyTexts)
        {
            var insertProxyText:boolean = true;
            for (var i = this._userProxyTexts.length - 1; i >= 0; i--)
            {
                if (this._userProxyTexts[i].Text_id == updatedProxyText.Text_id)
                {
                    if (updatedProxyText.Deleted == true)
                    {
                        //_userProxyTexts.removeAt(i);
                        this._userProxyTexts.splice(i, 1);
                        updated = true;
                    }
                    else if (this._userProxyTexts[i]._Date.getTime() < updatedProxyText._Date.getTime())
                    {
                        this._userProxyTexts[i] = updatedProxyText;
                        updated = true;
                    }
                    insertProxyText = false;
                }
            }
            if (insertProxyText == true && updatedProxyText.Deleted == false)
            {
                this._userProxyTexts.push(updatedProxyText);
                updated = true;
            }
        }
        if (updated)
        {
            this._userProxyTexts = this._userProxyTexts.sort(this.sortProxyTexts);
        }
        return updated;
    }
    
    public UpdateSharedProxyTexts(updatedSharedProxyTexts:SharedProxyText[]):boolean
    {			
        var updated:boolean = false;
        for (var updatedSharedProxyText of updatedSharedProxyTexts)
        {
            var insertSharedProxyText:boolean = true;
            for (var i = this._sharedProxyTexts.length - 1; i >= 0; i--)
            {
                if ((<SharedProxyText>this._sharedProxyTexts[i] ).Text_id == updatedSharedProxyText.Text_id)
                {
                    if (this._sharedProxyTexts[i].Last_updated.getTime() < updatedSharedProxyText.Last_updated.getTime())
                    {
                        this._sharedProxyTexts[i] = updatedSharedProxyText;
                        updated = true;
                    }
                    
                    //update current text can_edit
                    if(this._currentText && this._currentText.Text_id == updatedSharedProxyText.Text_id)
                    {
                        this._currentText.Can_edit = updatedSharedProxyText.Can_edit;
                    }
                    
                    insertSharedProxyText = false;
                }
            }
            if (insertSharedProxyText == true)
            {	
                this._sharedProxyTexts.push(updatedSharedProxyText);
                updated = true;
            }
        }
        if (updated)
        {
            this._sharedProxyTexts = this._sharedProxyTexts.sort(this.sortSharedProxyTexts);
        }
        return updated;
    }
    
    public UpdateProxyTextByText(text:Text):void
    {
        for (var pt of this._userProxyTexts)
        {
            if(text.Text_id == pt.Text_id)
            {
                //these are the only editable parts
                pt.Title = text.Title;
                pt.Genre = text.Genre;
                pt.Author = text.Author;
                break;
            }
        }
    }
    
    public GetUserProxyTexts():ProxyText[]
    {
        return this._userProxyTexts;
    }
    
    public GetSharedProxyTexts():SharedProxyText[]
    {
        return this._sharedProxyTexts;
    }
    
    public SetWordlistData(wordlist:Wordlist, words:Word[]):void
    {
        this._wordlists[wordlist.Wordlist_id] = wordlist;
        for (var word of words)
        {
            this._words[word.Word_id] = word;
        }
    }

    public GetUnseenWords(wordlist_id:number):number
    {
        let retVal:number = 0;
        let wordlist = this._wordlists[wordlist_id];

        if(wordlist != null)
        {
            for(let word of wordlist.WordlistWords)
            {
                console.log(word.Word_added + ": " + word.Seen);
                if(word.Seen != true)
                {
                    retVal++;
                }
            }
        }

        return retVal;
    }

    public UpdateWordsSeen(wordlist_id:number) {
        let wordlist = this._wordlists[wordlist_id];

        if(wordlist != null)
        {
            for(let word of wordlist.WordlistWords)
            {
                word.Seen = true;
            }
        }
    }
    
    //Product Data Functions
    public get GetProductInfo():ProductInfo
    {
        return this._productInfo;
    }

    /*
    public set SetLocalProductInfoVersion(version:string)
    {
        this._localProductVersion = version;
    }

    public get GetLocalProductInfoVersion():string
    {
        return this._localProductVersion;
    }
    */
    /*public function get DefaultText():Text
    {
        return _defaultText;
    }*/
    
    public get ProxyTests():ProxyTest[]
    {
        return this._proxyTests;
    }
    public set ProxyTests(value:ProxyTest[])
    {
        this._proxyTests = value;
    }
    
    public get StatusPoints():number
    {
        return this._statusPoints;
    }
    public set StatusPoints(value:number)
    {
        this._statusPoints = value;
    }
    
    public GetUiTextByKey(key:string):string
    {
        var retVal:string;
        var uiText:UI_Text = this._uiText ? <UI_Text>this._uiText[key]  : null;
        
        if (uiText != null)
        {
            retVal = uiText.Value;
        }
        else
        {
            //UberReaderAccessor.GetDebugView().PrintToDebug("Error - No translation for: " + key);
            retVal = "No translation yet";
        }
        
        return retVal;
    }

    public UiTextLoaded():boolean
    {
        let retVal:boolean = false;
        for(let uiText in this._uiText)
        {
            retVal = true;
            break;
        }
        return retVal;
    }
    
    public GetQuestionAnswer(questionId:number):string
    {
        var retVal:string = "";
        var userQuestion:User_Question = <User_Question>this._userQuestions[questionId] ;
        if (userQuestion != null)
        {
            retVal = userQuestion.Answer;
        }
        return retVal;
    }
    
    public GetTestData(testId:number):TestData
    {
        return this._testData[testId];
    }
    public UpdateTestData(testData:TestData):void
    {
        this._testData[testData.Test_id] = testData;
    }

    public get LessonPlans():ProxyLessonPlan[] {
        return this._proxy_lesson_plans;
    }

    public set LessonPlans(lessonPlans: ProxyLessonPlan[]) {
        this._proxy_lesson_plans = lessonPlans;
    }

    public getLessonPlanById(id:number): Lesson_Plan {
        return this._lesson_plans[id];
    }

    public addLessonPlan(lessonPlan: Lesson_Plan): void {
        this._lesson_plans[lessonPlan.Lesson_plan_id] = lessonPlan;
    }

    public getCourseCategoryByLessonPlanId(id:number): Course_Category[] {
        return this._lesson_plan_course_categories[id];
    }

    public addUserCourseCategory(lessonPlanId:number, categories:Course_Category[]): void {
        this._lesson_plan_course_categories[lessonPlanId] = categories;
    }

    public get CurrentLessonPlan(): Lesson_Plan {
        return this._current_lesson_plan;
    }

    public set CurrentLessonPlan(lessonPlan: Lesson_Plan) {
        this._current_lesson_plan = lessonPlan;
    }

    public get CourseCategories():Course_Category[]
    {
        return this._course_categories;
    }

    public set CurrentCourseCategories(categories:Course_Category[]) {
        this._course_categories = categories;
    }
    
    public get ActivityCategories():Activity_Category[]
    {
        return this._activity_categories;
    }
    
    public get ChartCategories():Chart_Category[]
    {
        return this._chart_categories;
    }
    
    public get DefaultSettings():Setting[]
    {
        return this._default_settings;
    }
    
    public get WordlistCategories():Wordlist_Category[]
    {
        return this._wordlistCategories;
    }
    
    public GetCode(codeId:number):Code
    {
        return this._codes[codeId];
    }
    
    public GetCodeByText(codeText:string):Code
    {        
        for (var key in this._codes)
        {
            var code = this._codes[key];
            if (code.Code_text == codeText)
            {
                return code;
            }
        }
        return null;
    }
    
    public GetCodesByParent(parentId:number):Code[]
    {
        var retVal:Code[] = new Array<Code>();
        for (var key in this._codes)
        {
            var code = this._codes[key];
            if (code.Parent_code_id == parentId)
            {
                retVal.push(code);
            }
        }
        return retVal;
    }

    public GetExamInfoByExamName(exam_name: string):ExamInfo {        
        return this._exam_info[exam_name];
    }
    
    public GetUserQuestion(questionId:number):User_Question
    {
        return this._userQuestions[questionId];	
    }

    public GetUserNotes(courseActivityId:number):User_Notes
    {
        return this._userNotes[courseActivityId];
    }

    public GetAllUserNotes():User_Notes[]
    {
        let user_notes:User_Notes[] = [];
        for(let id in this._userNotes)
        {
            user_notes.push(this._userNotes[id]);
        }
        return user_notes;
    }

    public HasUserNotes(course_id: number) {        
        return this.GetAllUserNotes().findIndex(note => { return note.Course_id == course_id; }) != -1;
    }
    
    public InsertQuestionGroup(questionGroup:Question_Group[]):void
    {
        for(var group of questionGroup)
        {
            this._questionGroups[group.Question_group_id] = group;			
        }
    }
    
    public GetQuestionGroupById(id:number):Question_Group
    {
        return this._questionGroups[id];
    }
    
    public GetQuestionGroupByCourseId(id:number):Question_Group[]
    {
        var retVal:Question_Group[] = [];
        
        for (var key in this._questionGroups)
        {
            var grp = this._questionGroups[key];
            if(grp.Course_id == id)
            {
                retVal.push(grp);
            }
        }
        return retVal;
    }
    
    public InsertActivity(activity:Activity):void
    {
        this._activities[activity.Activity_id] = activity;
    }
    
    public InsertActivities(activities:Activity[]):void
    {        
        for (var activity of activities)
        {
            if(this._activities[activity.Activity_id] == null)
            {
                this._activities[activity.Activity_id] = activity;                
            }				
        }
    }
    
    public GetActivity(activityId:number):Activity
    {
        return this._activities[activityId];
    }
    
    public GetAControl(aControlId:number):AControl
    {
        return this._acontrols[aControlId];
    }
    
    public GetWordUser(wordId:number):Word_User
    {
        return this._wordUsers[wordId];
    }
    
    public GetWord(wordId:number):Word
    {
        return this._words[wordId];
    }
    
    public GetCourse(courseId:number):Course
    {
        return this._courses[courseId];
    }
    
    public GetText(textId:number):Text
    {
        return this._defaultTexts[textId];
    }
    
    public GetWordlist(wordlistId:number):Wordlist
    {
        var originalWordlist:Wordlist = this._wordlists[wordlistId];
        var retVal:Wordlist = null;
        if (originalWordlist != null)
        {
            retVal = originalWordlist.Clone();
        }
        return retVal;
    }
    
    public InsertWordlist(wordlist:Wordlist):void
    {
        this._wordlists[wordlist.Wordlist_id] = wordlist;
        var proxyWordlist:ProxyWordlist = new ProxyWordlist();
        proxyWordlist.init(wordlist);
        this._userProxyWordlists.push(proxyWordlist);
        this._userProxyWordlists = this._userProxyWordlists.sort(this.sortProxyWordlists);
        this.AddToLocalStorage("userProxyWordlists", JSON.stringify(this._userProxyWordlists));
    }
    
    public InsertWordlistWord(wordlistWord:Wordlist_Word):void
    {
        var wordlist:Wordlist = <Wordlist>this._wordlists[wordlistWord.Wordlist_id] ;
        if (wordlist != null)
        {
            for (var wlw of wordlist.WordlistWords)
            {
                if (wlw.Word_id == wordlistWord.Word_id && wlw.Word_added == wordlistWord.Word_added)
                {
                    return;
                }
            }
            wordlistWord.Wordlist_word_id = -1;
            wordlist.WordlistWords.push(wordlistWord);
        }
    }
    
    public GetActivitiesByActivityCategory(categoryId:number):Activity[]
    {
        var retVal:Activity[] = new Array<Activity>();
        for (var key in this._activities)
        {
            var activity = this._activities[key];
            if (activity.Category_id == categoryId)
            {
                retVal.push(activity);
            }
        }
        retVal = retVal.sort(this.sortActivities);
        return retVal;
    }
    
    private sortActivities(a1:Activity, a2:Activity):number
    {
        return a1.Sequence - a2.Sequence;
    }
    
    
    // TODO check if this shows extra AControls from activities only in courses and may need to sort
    public SelectAllUserAControls():AControl[]
    {
        var retVal:AControl[] = new Array<AControl>();

        for (var key in this._acontrols)
        {
            var aControl = this._acontrols[key];
            if (aControl.User_setting)
            {
                retVal.push(aControl);
            }
        }
        return retVal;
    }
    
    //User Data Functions
    
    public get CurrentText():Text
    {
        return this._currentText;
    }
    public set CurrentText(value:Text)
    {
        this._currentText = value;
    }
    
    public get WordDiscovers():Word_Discover[]
    {
        return this._wordDiscovers;
    }
    
    public get UserSettings():Setting[]
    {
        return this._user_settings;
    }
    
    public UpdateGroupSettings(groupSettings: Setting[]) {
        for (let groupSetting of groupSettings) {
            let existingSettingIndex = this._group_settings.findIndex(setting => setting.Control_ref == groupSetting.Control_ref && 
                setting.Function_name == groupSetting.Function_name);
            if (existingSettingIndex != -1) {
                this._group_settings[existingSettingIndex] = groupSetting;
            }
            else {
                this._group_settings.push(groupSetting);
            }
        }
    }

    public get GroupSettings():Setting[]
    {
        return this._group_settings;
    }
    
    public get Languages():Language[]
    {
        return this._languages;
    }
    
    public get StatusLevel():StatusLevel[]
    {
        return this._statusLevel;
    }

    public get TypesyStatusLevels(): TypesyStatusLevel[]
    {
        return this._typesy_status_levels;
    }
    
    public GetUserSettingByControlRefFunctionName(controlRef:string, functionName:string):Setting
    {
        for (var userSetting of this._user_settings)
        {
            if (userSetting.Control_ref == controlRef && userSetting.Function_name == functionName)
            {
                return userSetting;
            }
        }
        return null;
    }
    
    public InsertUserSetting(setting:Setting):void
    {
        if(this._user_settings.indexOf(setting) == -1)
            this._user_settings.push(setting);
        
        this.AddToLocalStorage("userSettings", JSON.stringify(this._user_settings));
    }
    
    public UpdateWordUser(wordUser:Word_User):void
    {
        this._wordUsers[wordUser.Word_id] = wordUser;
    }
    
    public DeleteUserPreferences(controlRefs:string[]):void
    {
        for (var i = this._user_settings.length - 1; i >= 0; i--)
        {
            if (controlRefs.indexOf(this._user_settings[i].Control_ref) >= 0)
            {
                //_user_settings.removeAt(i);
                this._user_settings.splice(i, 1);
            }
        }
        
        this.AddToLocalStorage("userSettings", JSON.stringify(this._user_settings));
    }
    
    public UpdateUserSetting(setting:Setting):void
    {
        var duplicateSettingRemover:boolean = false;
        for(var index:number = 0; index < this._user_settings.length; index++)
        {
            var userSetting:Setting = <Setting>this._user_settings[index] ;
            if(userSetting.Control_ref == setting.Control_ref && userSetting.Function_name == setting.Function_name)
            {
                if(duplicateSettingRemover)
                {
                    this._user_settings.splice(index, 1);
                }
                else
                {
                    userSetting = setting;
                    duplicateSettingRemover = true;
                }
            }
        }
        this.AddToLocalStorage("userSettings", JSON.stringify(this._user_settings));
    }
    
    public GetUserPref(key:string):UserPref
    {
        var userPref:UserPref = this._userPrefs[key];
        var groupUserPref:UserPref = this._groupUserPrefs[key];
        if(groupUserPref)
        {
            if(groupUserPref.Force_user_pref != null && groupUserPref.Force_user_pref)
            {
                userPref = groupUserPref;
            }
        }
        
        return userPref;
    }
    
    public GetDefault(key:string):Default
    {
        return this._defaults[key];
    }
    
    public GetDefaultWordSense(wordId:number):Word_Sense
    {
        var retVal:Word_Sense = null;
        var wu:Word_User = this._wordUsers[wordId];
                    
        if (wu != null && wu.Default_sense_id != null)
        {
            var word:Word = this._words[wordId];
            for (var wpos of word.WordPos)
            {
                var senses:Word_Sense[] = this.GetWordPosSensesById(word.Word_id, wpos.Word_Pos_id);
                for (var ws of senses)
                {
                    if (ws.Word_sense_id == wu.Default_sense_id)
                    {
                        retVal = ws;
                        break;
                    }
                }
            }
        }
        return retVal;
    }
    
    public UpdateUserPref(userPref:UserPref):void
    {
        /*if(this._userPrefs[userPref.Key].Last_updated) {
            console.log("1->" + this._userPrefs[userPref.Key].Last_updated.getTime());
            console.log("2->" + userPref.Last_updated.getTime());
        }*/
        //if (this._userPrefs[userPref.Key].Last_updated == null || this._userPrefs[userPref.Key].Last_updated.getTime() < userPref.Last_updated.getTime()) {
            this._userPrefs[userPref.Key] = userPref;
            this.AddToLocalStorage("userPrefs", JSON.stringify(this._userPrefs));
        //    console.log(userPref.Key + " updated to " + this._userPrefs[userPref.Key]);
        //}
    }
    
    public UpdateGroupUserPrefs(groupUserPrefs: UserPref[]): void {
        for (let groupUserPref of groupUserPrefs) {
            this._groupUserPrefs[groupUserPref.Key] = groupUserPref;
        }
        this.AddToLocalStorage("groupUserPrefs", JSON.stringify(this._groupUserPrefs));
    }

    public GetUnseenCourses():number
    {
        var retVal:number = 0;

        if(this._user_courses != null)
        {
            for(let id in this._user_courses)
            {
                if(this._user_courses[id].In_my_courses == true && this._user_courses[id].Seen != true)
                {
                    retVal++;
                }
            }
        }

        return retVal;
    }

    public GetUnseenWishlistCourses():number
    {
        var retVal:number = 0;

        if(this._user_courses != null)
        {
            for(let id in this._user_courses)
            {
                if(this._user_courses[id].On_wishlist == true && this._user_courses[id].Seen != true)
                {
                    retVal++;
                }
            }
        }

        if(this._user_prep_program != null)
        {
            for(let id in this._user_prep_program)
            {
                if(this._user_prep_program[id].On_wishlist == true && this._user_prep_program[id].Seen != true)
                {
                    retVal++;
                }
            }
        }

        return retVal;
    }

    public GetUnseenNotes():number
    {
        var retVal:number = 0;

        if(this._userNotes != null)
        {
            for(let id in this._userNotes)
            {
                if(this._userNotes[id].Notes.trim().length > 0 && this._userNotes[id].Seen != true)
                {
                    retVal++;
                }
            }
        }

        return retVal;
    }

    public GetCoursesWithProgress(): number[] {
        let retVal: number[] = [];
        let firstCourseID: number;
        let courseCategories: Course_Category[] = this._lesson_plan_course_categories[this._current_lesson_plan.Lesson_plan_id];
        for (let category of courseCategories) {
            for (let course of category.ProxyCourses) {
                if (firstCourseID == null) {
                    firstCourseID = course.Course_id;
                }
                let userCourse: User_Course = this._user_courses[course.Course_id];
                if (userCourse && (userCourse.Sequence_upto > 0 || userCourse.Finished)) {
                    retVal.push(userCourse.Course_id);
                } 
            }
        }

        // If user doesn't have any progress yet, then just use the texts from the first course in the curriculum
        if (retVal.length == 0) {
            retVal.push(firstCourseID);
        }
        return retVal;
    }

    public GetUserCourse(courseId:number):User_Course
    {
        return this._user_courses[courseId];
    }
    
    public UpdateUserCourse(userCourse:User_Course):void
    {
        if(this._user_courses[userCourse.Course_id] == null)
        {            
            this._user_courses[userCourse.Course_id] = userCourse;
        }
        else if (this._user_courses[userCourse.Course_id] != null && this._user_courses[userCourse.Course_id]._Date.getTime() < userCourse._Date.getTime())
        {            
            //this._user_courses[userCourse.Course_id] = userCourse;
            /** do not remove! this is for data binding 
             *  this code "this._user_courses[userCourse.Course_id] = userCourse" points to a new memory location,
             *  the variables that point to the previous memory location are now dangling references.
             *  Known issues/bugs:
             *  CourseInfoView - _userCourse variable is not updated every time there is a server call that updates the user course
             *  e.g. PurchaseCourse or AddCourseToMyCourses server calls updates In_my_courses to true but
             *  this._userCourse.In_my_courses variable in CourseInfoView still has null value coz its not bound to the user course in cached data */
            let user_course = this._user_courses[userCourse.Course_id];
            for (let prop in userCourse) {                
                if(prop == "course" && userCourse[prop] == null) 
                    continue;
                user_course[prop] = userCourse[prop];
            }            
        }
        this.AddToLocalStorage("userCourses", JSON.stringify(this._user_courses));
    }
    
    public UpdateUserQuestion(userQuestion:User_Question):void
    {
        this._userQuestions[userQuestion.Question_id] = userQuestion;
        this.AddToLocalStorage("userQuestions", JSON.stringify(this._userQuestions));
    }

    public UpdateUserNote(userNotes:User_Notes):void
    {
        this._userNotes[userNotes.Course_activity_id] = userNotes;
        this.AddToLocalStorage("userNotes", JSON.stringify(this._userNotes));
    }
    
    public UpdateUserCourses(updatedUserCourses:User_Course[], checkTimestamp:boolean = false):User_Course[]
    {
        var retVal:User_Course[] = new Array<User_Course>();
        for (var updatedUserCourse of updatedUserCourses)
        {
            var userCourseTpUpdate:User_Course = this._user_courses[updatedUserCourse.Course_id] ;
            if (!checkTimestamp || userCourseTpUpdate == null || userCourseTpUpdate._Date.getTime() < updatedUserCourse._Date.getTime())
            {
                this._user_courses[updatedUserCourse.Course_id] = updatedUserCourse;
                retVal.push(updatedUserCourse);
            }
        }
        this.AddToLocalStorage("userCourses", JSON.stringify(this._user_courses));
        return retVal;
    }

    public UpdateUserPrepPrograms(updatedUserPrepPrograms:User_Prep_Program[], checkTimestamp:boolean = false):User_Prep_Program[]
    {
        var retVal:User_Prep_Program[] = new Array<User_Prep_Program>();
        for (var updatedUserPrepProgram of updatedUserPrepPrograms)
        {
            var userPrepProgramTpUpdate:User_Prep_Program = this._user_prep_program[updatedUserPrepProgram.Prep_program_id] ;
            if (!checkTimestamp || userPrepProgramTpUpdate == null || userPrepProgramTpUpdate.Last_updated.getTime() < updatedUserPrepProgram.Last_updated.getTime())
            {
                this._user_prep_program[updatedUserPrepProgram.Prep_program_id] = updatedUserPrepProgram;
                retVal.push(updatedUserPrepProgram);
            }
        }
        this.AddToLocalStorage("userPrepPrograms", JSON.stringify(this._user_prep_program));
        return retVal;
    }
    
    public ClearCourseProgress(courseId:number):void
    {
        var userQuestionsToRemove:User_Question[] = new Array<User_Question>();
        for (var key in this._userQuestions)
        {
            var userQuestion = this._userQuestions[key];
            if (userQuestion != null && userQuestion.Course_id == courseId)
            {
                userQuestionsToRemove.push(userQuestion);
            }
        }
        for (var userQuestion2 of userQuestionsToRemove)
        {
            this._userQuestions[userQuestion2.Question_id] = null;
        }
        this.AddToLocalStorage("userQuestions", JSON.stringify(this._userQuestions));
    }
    
    public GetResult(key:string):Result
    {
        console.log('GetResult GetResult GetResult:: ', key, this._results);
        return this._results[key];
    }
    
    public UpdateResult(result:Result, checkTimestamp:boolean = false):void
    {
        if(!checkTimestamp || this._results[result.Result_key] == null || this._results[result.Result_key]._Date.getTime() < result._Date.getTime())
        {
            this._results[result.Result_key] = result;
            this.AddToLocalStorage("results", JSON.stringify(this._results));
        }
    }
    
    /*
    private var _updateTextsTable:boolean = true;
    public function get UpdateTextsTable():boolean
    {
        return _updateTextsTable;
    }
    public function set UpdateTextsTable(value:boolean):void
    {
        _updateTextsTable = value;
    }
    */
    
    private _updateUserTextsTable:boolean = false;
    public get UpdateUserTextsTable():boolean
    {
        return this._updateUserTextsTable;
    }
    public set UpdateUserTextsTable(value:boolean)
    {
        this._updateUserTextsTable = value;
    }
    
    public SetWordlistCategories(wordlistCategories:Wordlist_Category[]):void
    {
        this._wordlistCategories = wordlistCategories;
    }

    public SetTextsTable(proxyTexts:ProxyText[]):void
    {
        this._proxyTextsTable = proxyTexts;
        this._basicProxyTexts = new Array<ProxyText>();
        for (var proxyText of this._proxyTextsTable)
        {
            if (!proxyText.ComplexText)
            {
                this._basicProxyTexts.push(proxyText);
            }
        }
        //_updateTextsTable = false;
    }
    public GetTextsTable(includeComplexTexts:boolean):ProxyText[]
    {
        if (includeComplexTexts)
        {
            return this._proxyTextsTable;
        }
        else
        {
            return this._basicProxyTexts;
        }
    }
    
    /*private var _refreshCurrentWordlist:boolean = false;
    public function get RefreshCurrentWordlist():boolean
    {
        return _refreshCurrentWordlist;
    }
    public function set RefreshCurrentWordlist(value:boolean):void
    {
        _refreshCurrentWordlist = value;
    }*/
    
    /*private var _updateProxyWordlistsTable:boolean = false;
    public function get UpdateProxyWordlistsTable():boolean
    {
        return _updateProxyWordlistsTable;
    }
    public function set UpdateProxyWordlistsTable(value:boolean):void
    {
        _updateProxyWordlistsTable = value;
    }*/
    
    public set UserProxyWordlists(proxyWordlists:ProxyWordlist[])
    {
        this._userProxyWordlists = proxyWordlists.sort(this.sortProxyWordlists);
        this.AddToLocalStorage("userProxyWordlists", JSON.stringify(this._userProxyWordlists));
        //_updateProxyWordlistsTable = false;
    }
    public get UserProxyWordlists():ProxyWordlist[]
    {
        var retVal:ProxyWordlist[] = new Array<ProxyWordlist>();
        for (var proxyWordlist of this._userProxyWordlists)
        {
            retVal.push(proxyWordlist.Clone());
        }
        return retVal;
    }
    
    public UpdateProxyWordlists(updatedProxyWordlists:ProxyWordlist[]):boolean
    {
        var updated:boolean = false;
        for (var updatedProxyWordlist of updatedProxyWordlists)
        {
            var insertWordlist:boolean = true;
            for (var i = this._userProxyWordlists.length - 1; i >= 0; i--)
            {
                if (this._userProxyWordlists[i].Wordlist_id == updatedProxyWordlist.Wordlist_id)
                {
                    if (updatedProxyWordlist.Deleted == true)
                    {
                        //_userProxyWordlists.removeAt(i);
                        this._userProxyWordlists.splice(i, 1);
                        updated = true;
                    }
                    else if (this._userProxyWordlists[i].Last_updated.getTime() < updatedProxyWordlist.Last_updated.getTime())
                    {
                        this._userProxyWordlists[i] = updatedProxyWordlist;
                        updated = true;
                    }
                    insertWordlist = false;
                }
            }
            if (insertWordlist == true && updatedProxyWordlist.Deleted == false)
            {
                this._userProxyWordlists.push(updatedProxyWordlist);
                updated = true;
            }
        }
        if (updated)
        {
            this._userProxyWordlists = this._userProxyWordlists.sort(this.sortProxyWordlists);
            this.AddToLocalStorage("userProxyWordlists", JSON.stringify(this._userProxyWordlists));
        }
        return updated;
    }
    
    public UpdateWordlistWords(updatedWordlistWords:Wordlist_Word[]):boolean
    {
        var updated:boolean = false;
        for (var updatedWordlistWord of updatedWordlistWords)
        {
            var wordlistToUpdate:Wordlist = <Wordlist>this._wordlists[updatedWordlistWord.Wordlist_id] ;
            if (wordlistToUpdate != null)
            {
                var insertWordlistWord:boolean = true;
                for (var i = wordlistToUpdate.WordlistWords.length - 1; i >= 0; i--)
                {
                    if (wordlistToUpdate.WordlistWords[i].Wordlist_word_id == updatedWordlistWord.Wordlist_word_id)
                    {
                        if (updatedWordlistWord.Deleted == true)
                        {
                            //wordlistToUpdate.WordlistWords.removeAt(i);
                            wordlistToUpdate.WordlistWords.splice(i, 1);
                            updated = true;
                        }
                        else if (wordlistToUpdate.WordlistWords[i].Last_updated.getTime() < updatedWordlistWord.Last_updated.getTime())
                        {
                            wordlistToUpdate.WordlistWords[i] = updatedWordlistWord;
                            updated = true;
                        }
                        insertWordlistWord = false;
                    }
                    else if (wordlistToUpdate.WordlistWords[i].Wordlist_word_id == -1
                        && wordlistToUpdate.WordlistWords[i].Word_id == updatedWordlistWord.Word_id
                        && wordlistToUpdate.WordlistWords[i].Wordlist_id == updatedWordlistWord.Wordlist_id)
                    {
                        if (updatedWordlistWord.Deleted == true)
                        {
                            //wordlistToUpdate.WordlistWords.removeAt(i);
                            wordlistToUpdate.WordlistWords.splice(i, 1);
                            updated = true;
                        }
                        else if (wordlistToUpdate.WordlistWords[i].Last_updated.getTime() < updatedWordlistWord.Last_updated.getTime())
                        {
                            wordlistToUpdate.WordlistWords[i] = updatedWordlistWord;
                            updated = true;
                        }
                        else
                        {
                            wordlistToUpdate.WordlistWords[i].Wordlist_word_id = updatedWordlistWord.Wordlist_word_id;
                        }
                        insertWordlistWord = false;
                    }
                }
                if (insertWordlistWord == true && updatedWordlistWord.Deleted == false)
                {
                    wordlistToUpdate.WordlistWords.push(updatedWordlistWord);
                    updated = true;
                }
            }
        }
        return updated;
    }
    
    public UpdateUserQuestions(updatedUserQuestions:User_Question[], checkTimestamp:boolean = false):boolean
    {
        var updated:boolean = false;
        for (var updatedUserQuestion of updatedUserQuestions)
        {
            if (updatedUserQuestion.Deleted == true)
            {
                this._userQuestions[updatedUserQuestion.Question_id] = null;
            }
            else
            {
                var userQuestionToUpdate:User_Question = <User_Question>this._userQuestions[updatedUserQuestion.Question_id] ;
                if (!checkTimestamp || userQuestionToUpdate == null || userQuestionToUpdate.Last_updated.getTime() < updatedUserQuestion.Last_updated.getTime())
                {
                    this._userQuestions[updatedUserQuestion.Question_id] = updatedUserQuestion;
                    updated = true;
                }
            }
        }
        this.AddToLocalStorage("userQuestions", JSON.stringify(this._userQuestions));
        return updated;
    }

    public UpdateUserNotes(updatedUserNotes:User_Notes[], checkTimestamp:boolean = false):boolean
    {        
        var updated:boolean = false;
        for (var updatedUserNote of updatedUserNotes)
        {
            var userQuestionToUpdate:User_Notes = <User_Notes>this._userNotes[updatedUserNote.Course_activity_id] ;
            if (!checkTimestamp || userQuestionToUpdate == null || userQuestionToUpdate.Last_updated.getTime() < updatedUserNote.Last_updated.getTime())
            {
                this._userNotes[updatedUserNote.Course_activity_id] = updatedUserNote;
                updated = true;
            }
        }
        if (updated)
        {
            this.AddToLocalStorage("userNotes", JSON.stringify(this._userNotes));
        }
        return updated;
    }
    
    public UpdateWordDiscovers(updatedWordDiscovers:Word_Discover[]):boolean
    {
        var updated:boolean = false;
        for (var updatedWordDiscover of updatedWordDiscovers)
        {
            var insertWordDiscover:boolean = true;
            for (var i = this._wordDiscovers.length - 1; i >= 0; i--)
            {
                if (this._wordDiscovers[i].Word_discover_id == updatedWordDiscover.Word_discover_id)
                {
                    if (updatedWordDiscover.Deleted == true)
                    {
                        //_wordDiscovers.removeAt(i);
                        this._wordDiscovers.splice(i, 1);
                        updated = true;
                    }
                    else if (this._wordDiscovers[i].Last_updated.getTime() < updatedWordDiscover.Last_updated.getTime())
                    {
                        this._wordDiscovers[i] = updatedWordDiscover;
                        updated = true;
                    }
                    insertWordDiscover = false;
                }
            }
            if (insertWordDiscover == true && updatedWordDiscover.Deleted == false)
            {
                this._wordDiscovers.push(updatedWordDiscover);
                updated = true;
            }
        }
        if (updated)
        {
            this._wordDiscovers = this._wordDiscovers.sort(this.sortWordDiscovers);
        }
        return updated;
    }
    
    private sortWordDiscovers(wd1:Word_Discover, wd2:Word_Discover):number
    {
        return wd1.Seq - wd2.Seq;
    }
    
    private sortProxyWordlists(wl1:ProxyWordlist, wl2:ProxyWordlist):number
    {
        if (wl1.Name == "[display_name] Words")
        {
            return -1;
        }
        else if (wl2.Name == "[display_name] Words")
        {
            return 1;
        }
        else
        {
            return wl1.Name.toLowerCase().localeCompare(wl2.Name.toLowerCase());
        }
        //return wd1.Seq - wd2.Seq;
    }
    
    private sortProxyTexts(pt1:ProxyText, pt2:ProxyText):number
    {
        return pt1.Title.toLowerCase().localeCompare(pt2.Title.toLowerCase());
    }
    
    private sortSharedProxyTexts(pt1:SharedProxyText, pt2:SharedProxyText):number
    {
        return pt1.Title.toLowerCase().localeCompare(pt2.Title.toLowerCase());
    }
    
    public UpdateWordUsers(updatedWordUsers:Word_User[]):boolean
    {
        var updated:boolean = false;
        for (var updatedWordUser of updatedWordUsers)
        {
            var wordUserToUpdate:Word_User = <Word_User>this._wordUsers[updatedWordUser.Word_id] ;
            if (wordUserToUpdate == null || wordUserToUpdate.Last_updated.getTime() < updatedWordUser.Last_updated.getTime())
            {
                this._wordUsers[updatedWordUser.Word_id] = updatedWordUser;
                updated = true;
            }
        }
        return updated;
    }
    
    public CountTextsWithTitleAuthor(title:string, author:string):number
    {
        var count:number = 0;
        for (var proxyText of this._proxyTextsTable)
        {
            if (proxyText.Title == title && proxyText.Author == author)
            {
                count ++;
            }
        }
        return count;
    }
    
    public GetNextWordDiscoverSeq():number
    {
        var maxSeq:number = 0;
        for (var wd of this._wordDiscovers)
        {
            maxSeq = Math.max(maxSeq, wd.Seq);
        }
        return maxSeq + 1;
    }
    
    public WordDiscoverExists(name:string):boolean
    {
        for (var wd of this._wordDiscovers)
        {
            if (wd.Name == name)
            {
                return true;
            }
        }
        return false;
    }
    
    public InsertWordDiscover(wordDiscover:Word_Discover):void
    {
        this._wordDiscovers.push(wordDiscover);
        this._wordDiscovers = this._wordDiscovers.sort(this.sortWordDiscovers);
    }
    
    public UpdateWordDiscover(wordDiscover:Word_Discover):void
    {
        for (var wd of this._wordDiscovers)
        {
            if (wd.Word_discover_id == wordDiscover.Word_discover_id)
            {
                wd = wordDiscover;
                return;
            }
        }
    }
    
    public SwapWordDiscoverRecords(wordDiscover1:Word_Discover, wordDiscover2:Word_Discover):void
    {
        var wd1Seq:number;
        var wd2Seq:number;
        var wd1Pos:number;
        var wd2Pos:number;
        for (var i = 0; i < this._wordDiscovers.length; i++)
        {
            if (this._wordDiscovers[i].Word_discover_id == wordDiscover1.Word_discover_id)
            {
                wd1Pos = i;
                wd1Seq = this._wordDiscovers[i].Seq;
            }
            else if (this._wordDiscovers[i].Word_discover_id == wordDiscover2.Word_discover_id)
            {
                wd2Pos = i;
                wd2Seq = this._wordDiscovers[i].Seq;
            }
        }
        this._wordDiscovers[wd1Pos].Seq = wd2Seq;
        this._wordDiscovers[wd2Pos].Seq = wd1Seq;
        this._wordDiscovers = this._wordDiscovers.sort(this.sortWordDiscovers);
    }
    
    public DeleteWordDiscover(wordDiscoverId:number):void
    {
        for (var i = this._wordDiscovers.length - 1; i >= 0; i--)
        {
            if (this._wordDiscovers[i].Word_discover_id == wordDiscoverId)
            {
                //_wordDiscovers.removeAt(i);
                this._wordDiscovers.splice(i, 1);
                return;
            }
        }
    }
    
    public DeleteWordlist(wordlistId:number):void
    {
        this._wordlists[wordlistId] = null;
        for (var i = this._userProxyWordlists.length - 1; i >= 0; i--)
        {
            if (this._userProxyWordlists[i].Wordlist_id == wordlistId)
            {
                //_userProxyWordlists.removeAt(i);
                this._userProxyWordlists.splice(i, 1);
                this.AddToLocalStorage("userProxyWordlists", JSON.stringify(this._userProxyWordlists));
                return;
            }
        }
    }
    
    public RenameWordlist(wordlist:ProxyWordlist):void
    {
        if (this._wordlists[wordlist.Wordlist_id])
        {
            (<Wordlist>this._wordlists[wordlist.Wordlist_id] ).Name = wordlist.Name;
        }
        for (var i = this._userProxyWordlists.length - 1; i >= 0; i--)
        {
            if (this._userProxyWordlists[i].Wordlist_id == wordlist.Wordlist_id)
            {
                this._userProxyWordlists[i] = wordlist;
                this.AddToLocalStorage("userProxyWordlists", JSON.stringify(this._userProxyWordlists));
                return;
            }
        }
    }

    public UpdateWordlist(wordlist:Wordlist):void
	{
		if (this._wordlists[wordlist.Wordlist_id])
		{
			(this._wordlists[wordlist.Wordlist_id] as Wordlist).Name = wordlist.Name;
			if(wordlist.Is_public != null)
			{
				(this._wordlists[wordlist.Wordlist_id] as Wordlist).Is_public =  wordlist.Is_public;
			}
		}
	}
    
    public DeleteWordlistWords(wordlistId:number, wordIds:number[]):void
    {
        var wordlistWords:Wordlist_Word[] = (<Wordlist>this._wordlists[wordlistId] ).WordlistWords;
        for (var i = wordlistWords.length - 1; i >= 0; i--)
        {
            if (wordIds.indexOf(wordlistWords[i].Word_id) >= 0)
            {
                //wordlistWords.removeAt(i);
                wordlistWords.splice(i, 1);
            }
        }
    }
    
    public DeleteWordSense(wordSense:Word_Sense):void
    {
        var wordPos:Word_Pos = this.GetWordPosByIds(wordSense.Word_pos_id);
        var wordSenses:Word_Sense[] = wordPos.WordSenses;
        for (var i = wordSenses.length - 1; i >= 0; i--)
        {
            if (wordSenses[i].Word_sense_id == wordSense.Word_sense_id)
            {
                //wordSenses.removeAt(i);
                wordSenses.splice(i, 1);
                return;
            }
        }
    }
    
    public InsertWord(word:Word):void
    {
        this._words[word.Word_id] = word;
    }
    
    public InsertText(text:Text):void
    {
        if (text.User_id == null)
        {
            this._defaultTexts[text.Text_id] = text;
        }
    }
    
    public DeleteWord(wordId:number):void
    {
        this._words[wordId] = null;
        this._wordUsers[wordId] = null;
        for (var proxyWordlist of this._userProxyWordlists)
        {
            var userWordlist:Wordlist = this._wordlists[proxyWordlist.Wordlist_id];
            if (userWordlist != null)
            {
                for (var i = userWordlist.WordlistWords.length - 1; i >= 0; i--)
                {
                    if (userWordlist.WordlistWords[i].Word_id == wordId)
                    {
                        //userWordlist.WordlistWords.removeAt(i);
                        userWordlist.WordlistWords.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
    
    public InsertCourse(course:Course):void
    {
        this._courses[course.Course_id] = course;
    }
    
    public SetUITextOnStartUp(uiText:UI_Text[]):void
    {
        this._uiText = {};
        for (var uiTextInst of uiText )
        {
            this._uiText[uiTextInst.Key] = uiTextInst;
        }
    }
    
    public GetProxyCourseById(id:number):ProxyCourse
    {
        let retVal:ProxyCourse;
        for (let cat of this._course_categories)
        {
            for (let pc of cat.ProxyCourses)
            {
                if(pc.Course_id == id)
                {
                    retVal = pc;
                    break;
                }
            }
        }
        
        return retVal;
    }

    public GetAllProxyCourses(): ProxyCourse[] {
        return this._course_categories.map(category => category.ProxyCourses).reduce((a, b) => a.concat(b));
    }
    
    public IsTrialActivityEnabled(activityId:number):boolean
    {
        return this._enabledActivities && (this._enabledActivities[activityId.toString()] != null || this._enabledActivities["all"] != null);
    }

    public IsTrialCourseEnabled(courseId:number):boolean
    {
        console.log('_enabledCourses:: ', this._enabledCourses);
        return this._enabledCourses && (this._enabledCourses[courseId.toString()] != null || this._enabledCourses["all"] != null);
    }
    
    public IsTrialWordlistEnabled(wordlistId:number):boolean
    {
        var defaultWordlist:boolean = this.WordlistIsDefaultWordlist(wordlistId);
        return this._enabledWordlists && defaultWordlist && (this._enabledWordlists[wordlistId.toString()] != null || this._enabledWordlists["all"] != null);
    }
    
    public IsTrialChartEnabled(chartId:number):boolean
    {
        return this._enabledCharts && (this._enabledCharts[chartId.toString()] != null || this._enabledCharts["all"] != null);
    }
    
    public IfTrialCourseStep1Locked(courseId:number):boolean
    {
        return this._enabledCourseStep1 && (this._enabledCourseStep1[courseId.toString()] != null || this._enabledCourseStep1["all"] != null);
    }
    
    public WordlistIsDefaultWordlist(wordlistId:number, wordlistCategory:Wordlist_Category[] = null):boolean
    {	
        if(wordlistCategory == null) wordlistCategory = this._wordlistCategories;
        
        for (var wc of wordlistCategory)
        {
            for (var pwl of wc.ProxyWordlists)
            {
                if(pwl.Wordlist_id == wordlistId)
                {
                    return true;
                }
            }
            
            if(wc.SubCategories.length > 0)
            {
                var ret:boolean = this.WordlistIsDefaultWordlist(wordlistId, wc.SubCategories);
                
                if(ret)
                {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    public IsTrialTextEnabled(textId:number):boolean
    {
        var defaultText:boolean = this.isDefaultText(textId);
        
        if(this._enabledTexts == null)
        {
            this._enabledTexts = {};				
            for (var pt of this._proxyTextsTable)
            {
                if((pt.Trial_Mode1_Enabled != null && pt.Trial_Mode1_Enabled && this._trialMode == "mode1") ||
                    (pt.Trial_Mode2_Enabled != null && pt.Trial_Mode2_Enabled && this._trialMode == "mode2"))
                {
                    this._enabledTexts[pt.Text_id.toString()] = pt;
                }
            }
        }
        
        return (this._enabledTexts && this._enabledTexts[textId.toString()] != null) || this._trialMode == "all" || !defaultText;
    }
    
    private isDefaultText(textId:number):boolean
    {
        for (var pt of this._proxyTextsTable)
        {
            if(pt.Text_id == textId)
            {
                return true;
            }
        }
        return false;
    }
    
    public GetTrialWordlistLimit():number
    {
        return this._trialWordlistLimit;
    }
    
    public GetTrialMaxNumTexts():number
    {
        return this._trialMaxNumTexts;
    }
    
    public InsertUser_Text(ut:User_Text):void
    {
        if(this._userTexts == null)
            this._userTexts = {};
        
        this._userTexts[ut.Text_id] = ut;
    }
    
    public UpdateUser_Text(ut:User_Text):void
    {
        if(this._userTexts == null)
            this._userTexts = {};
        
        if(this._userTexts[ut.Text_id] != null)
        {
            if(this._userTexts[ut.Text_id].Last_updated != null && this._userTexts[ut.Text_id].Last_updated < ut.Last_updated)
            {
                this._userTexts[ut.Text_id] = ut;
            }
        }
        else
        {
            this._userTexts[ut.Text_id] = ut;
        }
    }
    
    public GetUserText(textId:number):User_Text
    {
        return this._userTexts[textId];
    }
    
    private bookCovers:DictionaryNumber<string> = {};
    public GetBookCoverByTextId(id:number):string
    {
        return this.bookCovers[id];
    }
    
    public SetBookCover(covers:any[]):void
    {
        for (var obj of covers)
        {
            this.bookCovers[obj.Text_id] = obj.Cover;
        }
    }
    
    private authorPictures:DictionaryNumber<AuthorPicture> = {};
    public AddAuthorPictures(pictures:AuthorPicture[]):void
    {
        for (var data of pictures)
        {
            this.authorPictures[data.User_Id] = data;
        }
    }
    
    public GetAuthorPictureById(id:number):AuthorPicture
    {
        return <AuthorPicture>this.authorPictures[id] ;
    }
    
    private activityIcons:DictionaryNumber<string> = {};
    public GetActivityIconById(id:number):string
    {
        return this.activityIcons[id];
    }
    
    public SetActivityIcons(icons:any[]):void
    {
        for (var obj of icons)
        {
            this.activityIcons[obj.Activity_id] = obj.Icon;
        }
    }
    
    private courseIcons:DictionaryNumber<string> = {};
    public GetCourseIconById(id:number):string
    {
        return this.courseIcons[id];
    }
    
    public SetCourseIcons(icons:any[]):void
    {
        for (var obj of icons)
        {
            this.courseIcons[obj.Course_id] = obj.Icon;
        }
    }
    
    public GetWordPosByIds(pos_id:number):Word_Pos
    {
        var retVal:Word_Pos = null;
        for (var key in this._words)
        {
            var w = this._words[key];
            for (var wpos of w.WordPos)
            {
                if(wpos.Word_Pos_id == pos_id)
                {
                    retVal = wpos;
                    break;
                }
            }
        }
        
        return retVal;
    }
    
    public UpdateWord_MultipleWordPos(multiplePos:Word_Pos[]):boolean
    {
        var senseUpdated:boolean = false;
        
        for (var newPos of multiplePos)
        {
            var word:Word = this._words[newPos.Word_id];
            if(word)
            {
                var oldPos:Word_Pos = word.GetWordPosById(newPos.Word_Pos_id);
                var wordCurrentPos:Word_Pos[] = word.WordPos;
                if(oldPos)
                {
                    /***
                     * if current pos exist
                     * check if we need to delete
                     * if not, check if word sense exist in current pos
                     * if yes, update
                     * if no, delete old existence and push in current pos
                     * */
                    for (var newPosSense of newPos.WordSenses)
                    {
                        if(newPosSense.Deleted == true)
                        {
                            for(var senseIndex:number=0; senseIndex < oldPos.WordSenses.length; senseIndex++)
                            {
                                if(oldPos.WordSenses[senseIndex].Word_sense_id == newPosSense.Word_sense_id)
                                {
                                    //oldPos.WordSenses.removeAt(senseIndex);
                                    oldPos.WordSenses.splice(senseIndex, 1);
                                    senseUpdated = true;
                                    break;
                                }	
                            }								
                        }
                        else
                        {
                            var updatedSense:boolean = false;
                            for (var oldPosSense of oldPos.WordSenses)
                            {
                                if(newPosSense.Word_sense_id == oldPosSense.Word_sense_id)
                                {
                                    oldPosSense = newPosSense;
                                    updatedSense = true;
                                    senseUpdated = true;
                                    break;
                                }
                            }
                            
                            if(updatedSense == false) //delete old sense if it doesn't exist in current one
                            {
                                for (var posObj of wordCurrentPos)
                                {
                                    var senseDeleted:boolean = false;
                                    for(var senseIndex:number=0; senseIndex < posObj.WordSenses.length; senseIndex++)
                                    {
                                        if(posObj.WordSenses[senseIndex].Word_sense_id == newPosSense.Word_sense_id)
                                        {
                                            //posObj.WordSenses.removeAt(senseIndex);
                                            posObj.WordSenses.splice(senseIndex, 1);
                                            senseDeleted = true;
                                            break;
                                        }	
                                    }
                                    
                                    if(senseDeleted) break;
                                }
                                
                                oldPos.WordSenses.push(newPosSense);
                                senseUpdated = true;
                            }
                        }
                        
                    }
                }
                else
                {
                    /***
                     * if the current pos doesn't exist
                     * loop all senses in new pos
                     * delete all current existence
                     * add new pos in word
                     * */
                    for (var newPosSense of newPos.WordSenses)
                    {
                        for (var posObj of wordCurrentPos)
                        {
                            var senseDeleted:boolean = false;
                            for(var senseIndex:number=0; senseIndex < posObj.WordSenses.length; senseIndex++)
                            {
                                if(posObj.WordSenses[senseIndex].Word_sense_id == newPosSense.Word_sense_id)
                                {
                                    //posObj.WordSenses.removeAt(senseIndex);
                                    posObj.WordSenses.splice(senseIndex, 1);
                                    senseDeleted = true;
                                    senseUpdated = true;
                                    break;
                                }
                            }
                            
                            if(senseDeleted) break;
                        }
                    }
                    
                    for(var senseToDeleteIndex:number = newPos.WordSenses.length - 1; senseToDeleteIndex >= 0; senseToDeleteIndex--)
                    {
                        if(newPos.WordSenses[senseToDeleteIndex].Deleted == true)
                        {
                            //newPos.WordSenses.removeAt(senseToDeleteIndex);
                            newPos.WordSenses.splice(senseToDeleteIndex, 1);
                        }
                    }
                    
                    word.WordPos.push(newPos);
                    senseUpdated = true;
                }				
            }
            
        }
        
        return senseUpdated;
    }
    
    public UpdateWord_SingleWordPos(wordPosFromServer:Word_Pos, Old_word_pos_id:number = null):void
    {
        var word:Word = this._words[wordPosFromServer.Word_id];
        
        if(word)
        {
            var updatedPos:boolean = false;
            for(var index:number = 0; index < word.WordPos.length; index++)
            {
                if((word.WordPos[index]).Word_Pos_id == wordPosFromServer.Word_Pos_id)
                {
                    (word.WordPos[index]).WordSenses = wordPosFromServer.WordSenses;
                    updatedPos = true;
                    break;
                }
            }
            
            //crawl for old existence and delete it
            if(Old_word_pos_id && Old_word_pos_id != null)
            {
                for (var ws of wordPosFromServer.WordSenses)
                {
                    for(var posIndex:number = 0; posIndex < word.WordPos.length; posIndex++)
                    {
                        if(word.WordPos[posIndex].Word_Pos_id == Old_word_pos_id)
                        {
                            var wses:Word_Sense[] = word.WordPos[posIndex].WordSenses;
                            for(var senseIndexToDelete:number = 0; senseIndexToDelete < wses.length; senseIndexToDelete++)
                            {
                                if(ws.Word_sense_id == wses[senseIndexToDelete].Word_sense_id)
                                {
                                    //Word_Pos(word.WordPos[posIndex]).WordSenses.removeAt(senseIndexToDelete);
                                    word.WordPos[posIndex].WordSenses.splice(senseIndexToDelete, 1);
                                }
                            }
                        }
                    }
                }
            }
            
            if(!updatedPos)
            {
                word.WordPos.push(wordPosFromServer);
            }
            
            this._words[word.Word_id] = word;
        }
    }
    
    public GetWordPosSensesById(wordId:number, wordposId:number):Word_Sense[]
    {
        var retVal:Word_Sense[] = new Array<Word_Sense>();
        var word:Word = this._words[wordId];
        if(word != null)
        {
            for (var wpos of word.WordPos)
            {
                if(wpos.Word_Pos_id == wordposId)
                {
                    retVal = wpos.WordSenses;
                    break;
                }
            }
        }
        
        return retVal;
    }
    
    private _introImages:DictionaryNumber<string> = {};
    public AddIntroImages(images:any[]):void
    {
        for (var obj of images)	
        {
            this._introImages[obj.Activity_id] = obj.Intro_screen;
        }
    }
    
    public GetIntroImagesById(id:number):string
    {
        return <string>this._introImages[id] ;
    }
    
    public GetNumberOfTexts():number
    {
        var retVal:number = 0;
        
        if(this._number_of_texts != null)
        {
            retVal += this._number_of_texts;
        }
        
        retVal += this._userProxyTexts.length;
        retVal += this._sharedProxyTexts.length;
        
        return retVal;
    }

    public GetNumberOfWordlists():number {
        return this._number_of_wordlists;
    }
    
    /***************** UT 2.0 ******************/
    public SearchTexts(searchString:string, pageNumber:number, pageSize:number, searchParameter:string, isInit:boolean, userId:number, searchSession:SearchTextSessionCache):any
    {
        var queryUserProxyTexts:ProxyText[] = new Array<ProxyText>();			
        var querySharedProxyTexts:SharedProxyText[] = new Array<SharedProxyText>(); 
        var queryDefaultProxyTexts:ProxyText[] = new Array<ProxyText>();
        
        var userProxyTexts:ProxyText[] = new Array<ProxyText>();			
        var sharedProxyTexts:SharedProxyText[] = new Array<SharedProxyText>(); 
        var defaultProxyTexts:ProxyText[] = new Array<ProxyText>();
        
        var numberOfTextsToSend:number = 0;
        var textsToSkip:number = pageSize * pageNumber;
        var trimmedSearchString:string = StringUtils.TrimString(searchString.toLowerCase());
        let search = (title: string) => {
            let res = true;
            let searchArr: string[] = trimmedSearchString.split(' ');
            title = title.toLowerCase();
            for (let i=0; i<searchArr.length; i++) {
                if (title.indexOf(searchArr[i]) == -1) {
                    res = false;
                    break;
                }
            };
            return res;
        }
        var objectReference:string = "";
        
        var currentTextProxy:any;
        if(isInit && this._currentText != null && pageNumber == 0)
        {
            if(this._currentText.User_id != null && this._currentText.User_id != userId)
            {
                currentTextProxy = SharedProxyText.fromLibrary(this._currentText);
                sharedProxyTexts.push(<SharedProxyText>currentTextProxy );
                searchSession.addId((<SharedProxyText>currentTextProxy ).Text_id);
            }
            else
            {
                currentTextProxy = ProxyText.fromLibrary(this._currentText);
                userProxyTexts.push(currentTextProxy);	
                
                if((<ProxyText>currentTextProxy ).User_id != null)
                {
                    searchSession.addId(currentTextProxy.Text_id);
                }
            }
            
            numberOfTextsToSend++;
        }
        
        //user proxy
        for(var userIndex:number = 0; userIndex < this._userProxyTexts.length; userIndex++)
        {
            objectReference = searchParameter == "all" ? this._userProxyTexts[userIndex].Author + ":" + this._userProxyTexts[userIndex].Title : 
                searchParameter == "title" ? this._userProxyTexts[userIndex].Title : this._userProxyTexts[userIndex].Author;
            if(/* objectReference.toLowerCase().indexOf(trimmedSearchString.toLowerCase()) > -1 */
                search(objectReference) || isInit)
            {						
                if(this._currentText && this._currentText.Text_id == this._userProxyTexts[userIndex].Text_id && isInit)
                {
                    //do nothing
                }
                else
                {
                    if(numberOfTextsToSend < pageSize && !searchSession.isPresent(this._userProxyTexts[userIndex].Text_id))
                    {
                        queryUserProxyTexts.push(this._userProxyTexts[userIndex]);
                    }
                }
            }
        }				
        
        //shared proxy
        for(var sharedIndex:number = 0; sharedIndex < this._sharedProxyTexts.length; sharedIndex++)
        {
            objectReference = searchParameter == "all" ? this._sharedProxyTexts[sharedIndex].Author + ":" + this._sharedProxyTexts[sharedIndex].Title : 
                searchParameter == "title" ? this._sharedProxyTexts[sharedIndex].Title : this._sharedProxyTexts[sharedIndex].Author;
            if(/* objectReference.toLowerCase().indexOf(trimmedSearchString.toLowerCase()) > -1 */
                search(objectReference) || isInit)
            {
                if(this._currentText && this._currentText.Text_id == this._sharedProxyTexts[sharedIndex].Text_id && isInit)
                {
                    //do nothing
                }
                else
                {
                    if(numberOfTextsToSend < pageSize && !searchSession.isPresent(this._sharedProxyTexts[sharedIndex].Text_id))
                    {
                        querySharedProxyTexts.push(this._sharedProxyTexts[sharedIndex]);
                    }
                }
            }
        }			
        
        //default proxy	
        for(var defaultIndex:number = 0; defaultIndex < this._proxyTextsTable.length; defaultIndex++)
        {
            objectReference = searchParameter == "all" ? this._proxyTextsTable[defaultIndex].Author + ":" + this._proxyTextsTable[defaultIndex].Title : 
                searchParameter == "title" ? this._proxyTextsTable[defaultIndex].Title : this._proxyTextsTable[userIndex].Author;
            if(/* objectReference.toLowerCase().indexOf(trimmedSearchString.toLowerCase()) > -1 */
                search(objectReference) || isInit)
            {
                if(numberOfTextsToSend < pageSize && !searchSession.isPresent(this._proxyTextsTable[defaultIndex].Text_id))
                {
                    queryDefaultProxyTexts.push(this._proxyTextsTable[defaultIndex]);
                }				
            }
        }			

        for(var searchUserIndex:number = 0; searchUserIndex < queryUserProxyTexts.length; searchUserIndex++)
        {
            if(numberOfTextsToSend < pageSize)
            {
                userProxyTexts.push(queryUserProxyTexts[searchUserIndex]);
                numberOfTextsToSend++;
                searchSession.addId(queryUserProxyTexts[searchUserIndex].Text_id);
            }
            else
            {
                break;
            }
        }
        
        for(var searchSharedIndex:number = 0; searchSharedIndex < querySharedProxyTexts.length; searchSharedIndex++)
        {
            if(numberOfTextsToSend < pageSize)
            {
                sharedProxyTexts.push(querySharedProxyTexts[searchSharedIndex]);
                numberOfTextsToSend++;
                searchSession.addId(querySharedProxyTexts[searchSharedIndex].Text_id);
            }
            else
            {
                break;
            }
        }	
        
        for(var searchDefaultIndex:number = 0; searchDefaultIndex < queryDefaultProxyTexts.length; searchDefaultIndex++)
        {
            if(numberOfTextsToSend < pageSize)
            {
                defaultProxyTexts.push(queryDefaultProxyTexts[searchDefaultIndex]);
                numberOfTextsToSend++;
                searchSession.addId(queryDefaultProxyTexts[searchDefaultIndex].Text_id);
            }
            else
            {
                break;
            }
        }
        
        /*if(queryUserProxyTexts.length > textsToSkip)
        {
            for(var searchUserIndex:number = Math.max(0, textsToSkip); searchUserIndex < queryUserProxyTexts.length; searchUserIndex++)
            {
                if(numberOfTextsToSend < pageSize)
                {
                    userProxyTexts.push(queryUserProxyTexts[searchUserIndex]);
                    numberOfTextsToSend++;
                }
                else
                {
                    break;
                }
            }
        }
        else
        {
            textsToSkip -= queryUserProxyTexts.length;
        }
        
        if(querySharedProxyTexts.length > textsToSkip)
        {
            for(var searchSharedIndex:number = Math.max(0, textsToSkip); searchSharedIndex < querySharedProxyTexts.length; searchSharedIndex++)
            {
                if(numberOfTextsToSend < pageSize)
                {
                    sharedProxyTexts.push(querySharedProxyTexts[searchSharedIndex]);
                    numberOfTextsToSend++;
                }
                else
                {
                    break;
                }
            }				
        }
        else
        {
            textsToSkip -= querySharedProxyTexts.length;
        }
        
        if(queryDefaultProxyTexts.length > textsToSkip)
        {
            for(var searchDefaultIndex:number = Math.max(0, textsToSkip); searchDefaultIndex < queryDefaultProxyTexts.length; searchDefaultIndex++)
            {
                if(numberOfTextsToSend < pageSize)
                {
                    defaultProxyTexts.push(queryDefaultProxyTexts[searchDefaultIndex]);
                    numberOfTextsToSend++;
                }
                else
                {
                    break;
                }
            }
        }*/
        
        var numPage:number = querySharedProxyTexts.length + queryUserProxyTexts.length + queryDefaultProxyTexts.length;			
        var result:any = {DefaultTexts: defaultProxyTexts, UserTexts: userProxyTexts, SharedTexts: sharedProxyTexts, Number_of_pages: (numPage - 1) / pageSize + 1, SessionCache: searchSession};
        return result;
    }
    
    public BrowseText(pageNumber:number, pageSize:number, browseParameter:number, browseType:string):any
    {
        var filteredTexts:ProxyText[] = new Array<ProxyText>();
        for(var filterIndex:number = 0; filterIndex < this._proxyTextsTable.length; filterIndex++)
        {
            if(this._proxyTextsTable[filterIndex].Topic_id != null && this._proxyTextsTable[filterIndex].Topic_id == browseParameter)
            {
                filteredTexts.push(this._proxyTextsTable[filterIndex]);
            }
        }			
        
        var defaultProxyTexts:ProxyText[] = new Array<ProxyText>();
        var textsToSkip:number = pageSize * pageNumber;
        var numberOfTextsToSend:number = 0;
        
        if(filteredTexts.length > textsToSkip)
        {
            for(var defaultIndex:number = Math.max(textsToSkip, 0); defaultIndex < filteredTexts.length; defaultIndex++)
            {
                if(numberOfTextsToSend < pageSize)
                {
                    defaultProxyTexts.push(filteredTexts[defaultIndex]);
                    numberOfTextsToSend++;
                }
            }
        }
        
        var result:any = {Texts: defaultProxyTexts, Number_of_pages: (filteredTexts.length - 1) / pageSize + 1};
        return result;
    }
    
    public GetProxyActivityById(id:number):ProxyActivity
    {
        for (let category of this._activity_categories)
        {
            for (let proxy_activity of category.ProxyActivities)
            {
                if(proxy_activity.Activity_id == id)
                {
                    return proxy_activity;
                }	
            }
        }
        
        return null;
    }

    public GetAllProxyActivities(): ProxyActivity[] {
        return this._activity_categories.map(category => category.ProxyActivities).reduce((a, b) => a.concat(b));
    }
    
    public GetEnablePrintCertificates():boolean
    {
        return this._enableCertificates;
    }
    
    public GetInAppOfferByProductId(id:string):Offer
    {
        let retVal:Offer;

        for(let offer of this._offers)
        {
            if(offer.App_store_product_id == id)
            {
                retVal = offer;
                break;                
            }
        }

        return retVal;
        //return this._inAppOffers[id];
    }

    public GetInAppOfferByCourseId(id:number):Offer
    {
        var retVal:Offer;
        for (var offer of this._offers)
        {
            if(offer.Course_id != null)
            {
                if(offer.Course_id == id)
                {
                    retVal = offer;
                    break;
                }
            }
        }

        return retVal;
    }

    public GetInAppOffersByProgramId(id:number):Offer[]
    {
        let retVal:Offer[] = [];
        for (let offer of this._offers)
        {        
            if(offer.Prep_program_id != null)
            {
                if(offer.Prep_program_id == id)
                {
                    retVal.push(offer);                    
                }
            }
        }
        return retVal;
    }

    public GetInAppOfferByProgramId(id:number):Offer
    {
        let retVal:Offer;
        for (let offer of this._offers)
        {        
            if(offer.Prep_program_id != null)
            {
                if(offer.Prep_program_id == id)
                {
                    retVal = offer;
                    break;
                }
            }
        }
        return retVal;
    }

    public SetInAppOffers(offers:Offer[]):void
    {        
        for (var offer of offers)
        {
            let toAdd:boolean = true;
            for(let index:number = 0; index < this._offers.length; index++)
            {
                let scopeOffer:Offer = this._offers[index];            
                if(scopeOffer.App_store_product_id != null && offer.App_store_product_id != null)
                {
                    if(scopeOffer.App_store_product_id == offer.App_store_product_id)
                    {
                        this._offers[index] = offer;
                        toAdd = false;
                        break;
                    }
                }
                else if(scopeOffer.Course_id != null && offer.Course_id != null)
                {
                    if(scopeOffer.Course_id == offer.Course_id)
                    {
                        this._offers[index] = offer;
                        toAdd = false;
                        break;
                    }
                }
                else if(scopeOffer.Prep_program_id != null && offer.Prep_program_id != null)
                {
                    if(scopeOffer.Prep_program_id == offer.Prep_program_id && scopeOffer.Price == offer.Price)
                    {
                        this._offers[index] = offer;
                        toAdd = false;
                        break;
                    }
                }
            }

            if(toAdd)
            {
                this._offers.push(offer);
            }            
        }
        console.log("this._offers: ", this._offers);
    }

    public InsertLibraryProxyTexts(newTexts:ProxyText[]):void
    {
        if(this._libraryProxyTexts == null)
            this._libraryProxyTexts = new Array<ProxyText>();
        
        var toInsert:boolean = true;
        for (var newText of newTexts)
        {
            for(var textIndex:number = this._libraryProxyTexts.length - 1; textIndex >= 0; textIndex--)
            {
                if(this._libraryProxyTexts[textIndex].Text_id == newText.Text_id)
                {
                    this._libraryProxyTexts[textIndex] = newText;
                    toInsert = false;
                }
            }
            
            if(toInsert)
            {
                this._libraryProxyTexts.push(newText);
            }
        }
    }
    
    public GetLibraryProxyTexts():ProxyText[]
    {
        if(this._libraryProxyTexts == null)
            this._libraryProxyTexts = new Array<ProxyText>();
        return this._libraryProxyTexts;
    }
    
    public UpdateMyCourses(courses:ProxyCourse[]):void
    {
        for(var c of courses)
        {
            this.UpdateMyCourse(c);
        }
    }
    
    public UpdateMyCourse(course:ProxyCourse):void
    {
        var addCourse:boolean = true;
        for(var index:number = 0; index < this._proxyMyCourses.length; index++)
        {
            var pcourse:ProxyCourse = this._proxyMyCourses[index];
            if(pcourse.Course_id == course.Course_id)
            {
                addCourse = false;
                if((pcourse.Last_updated == null || course.Last_updated == null) ||
                    (pcourse.Last_updated < course.Last_updated))
                {
                    this._proxyMyCourses[index] = course;
                    this.AddToLocalStorage("proxyCoursesInMyCourses", JSON.stringify(this._proxyMyCourses));
                    break;
                }
            }
        }
        
        if(addCourse)
        {
            this._proxyMyCourses.push(course);
            this.AddToLocalStorage("proxyCoursesInMyCourses", JSON.stringify(this._proxyMyCourses));
        }
    }
    
    public GetMyCourseById(id:number):ProxyCourse
    {
        if(this._proxyMyCourses == null) return;

        var retVal:ProxyCourse;
        for (var pc of this._proxyMyCourses)
        {
            if(pc.Course_id == id)
            {
                retVal = pc;
                break;
            }
        }
        
        return retVal;
    }
    
    public GetMyCourses():ProxyCourse[]
    {
        return this._proxyMyCourses;
    }

    private GetMyCoursesByProgress(filters:string[]):ProxyCourse[] {
        var retVal:ProxyCourse[] = [];

       /* var incomplete:ProxyCourse[] = [];
        var notYetStarted:ProxyCourse[] = [];
        var complete:ProxyCourse[] = [];*/
        
        for (let proxyCourse of this._proxyMyCourses)
        {
            let uc:User_Course = this.GetUserCourse(proxyCourse.Course_id);
            
            if(uc.Questions_answered)
            {
                var percentComplete:number = uc.Questions_answered ? (uc.Questions_answered * 100) / proxyCourse.Course_length : 0;
                percentComplete = Math.min(100, percentComplete);
                if(percentComplete >= 100 || uc.Finished == true)
                {
                    if (filters.indexOf("Completed") != -1)
                        retVal.push(proxyCourse);
                }
                else if(percentComplete == 0)
                {
                    if (filters.indexOf("Not Started") != -1)
                        retVal.push(proxyCourse);
                }
                else
                {
                    if (filters.indexOf("In Progress") != -1)
                        retVal.push(proxyCourse);
                }
            }
            else
            {
                if(uc.Finished)
                {
                    if (filters.indexOf("Completed") != -1)
                        retVal.push(proxyCourse);
                }
                else
                {
                    if (filters.indexOf("Not Started") != -1)
                        retVal.push(proxyCourse);
                }
            }
        }
                
        /*if (filters.indexOf("Not Started") != -1) {
            retVal = retVal.concat(notYetStarted);
        }
        if (filters.indexOf("In Progress") != -1) {
            retVal = retVal.concat(incomplete);
        }
        if (filters.indexOf("Completed") != -1) {
            retVal = retVal.concat(complete);
        }*/

        return retVal;
    }

    public GetMyCoursesByPage(pageNumber:number, pageSize:number, sortBy:string, filters:string[]):ProxyCourse[]
    {        
        var retVal:ProxyCourse[];
        if(this._proxyMyCourses)
        {            
            //always sort my proxycourse first
            this.sortMyCoursesBySpecs(sortBy);
            var tempProxyCourses:ProxyCourse[] = this.GetMyCoursesByProgress(filters);            

            let start:number = pageNumber * pageSize;
            let end:number = (pageNumber + 1) * pageSize;//((pageNumber + 1) * pageSize) - 1;
            if(end >= tempProxyCourses.length)
            {
                end = tempProxyCourses.length;
            }            

            retVal = tempProxyCourses.slice(start, end);
        }
        else
        {
            retVal = null;
        }

        return retVal;
    }

    private sortMyCoursesBySpecs(spec:string):void
    {                
        switch(spec)
        {
            case "recent":
                    let userCourses:User_Course[] = [];
                    let sortedCourse:ProxyCourse[] = [];
                    
                    for (let proxyCourse of this._proxyMyCourses)
                    {
                        let uc:User_Course = this.GetUserCourse(proxyCourse.Course_id);
                        if(uc)
                        {
                            userCourses.push(uc);
                        }
                    }
                    
                    let userCoursesArray:User_Course[] = userCourses;
                    userCoursesArray.sort(function(a,b){
                        return b._Date.getTime() - a._Date.getTime();
                    });

                    for(let pcNode of userCoursesArray)
                    {
                        for(let index:number = 0; index < this._proxyMyCourses.length; index++)
                        {
                            if(this._proxyMyCourses[index].Course_id == pcNode.Course_id)
                            {
                                sortedCourse.push(this._proxyMyCourses[index]);
                            }
                        }
                    }         
                    this._proxyMyCourses = sortedCourse;      
                    this.AddToLocalStorage("proxyCoursesInMyCourses", JSON.stringify(this._proxyMyCourses));
                    break;
                case "name_ascending":
                case "name_descending":
                    this._proxyMyCourses.sort(function(a,b){
                        return a.Course_name.toLowerCase().localeCompare(b.Course_name.toLowerCase());
                    });

                    if (spec == "name_descending") {
                        this._proxyMyCourses.reverse();
                    } 
                    this.AddToLocalStorage("proxyCoursesInMyCourses", JSON.stringify(this._proxyMyCourses));
                    break;  
        }        
    }

    private sortCoursesByLastUpdate():void
    {
        let userCourses:User_Course[] = [];
        let sortedCourse:ProxyCourse[] = [];
        
        for (let proxyCourse of this._proxyMyCourses)
        {
            let uc:User_Course = this.GetUserCourse(proxyCourse.Course_id);
            if(uc)
            {
                userCourses.push(uc);
            }
        }
        
        let userCoursesArray:User_Course[] = userCourses;
        
        userCoursesArray.sort(function(a,b){
            return b._Date.getTime() - a._Date.getTime();
        });
        
        for(let pcNode of userCoursesArray)
        {
            for(let index:number = 0; index < this._proxyMyCourses.length; index++)
            {
                if(this._proxyMyCourses[index].Course_id == pcNode.Course_id)
                {
                    sortedCourse.push(this._proxyMyCourses[index]);
                }
            }
        }
        
        this._proxyMyCourses = sortedCourse;
        this.AddToLocalStorage("proxyCoursesInMyCourses", JSON.stringify(this._proxyMyCourses));
    }

    public UpdateMyWishlists(courses:ProxyCourse[]):void
    {
        for (var course of courses)
        {
            this.UpdateMyWishlist(course);
        }
    }
    
    public UpdateMyWishlist(wish:any):void
    {
        var addWishlist:boolean = true;
        if(wish instanceof ProxyCourse)
        {
            for(let index:number = 0; index < this._proxyWishlistCourses.length; index++)
            {
                let pcourse:ProxyCourse = this._proxyWishlistCourses[index];
                if(pcourse.Course_id == wish.Course_id)
                {
                    addWishlist = false;
                    if((pcourse.Last_updated == null || wish.Last_updated == null) ||
                        (pcourse.Last_updated < wish.Last_updated))
                    {
                        this._proxyWishlistCourses[index] = wish;
                        this.AddToLocalStorage("proxyWishlistCourses", JSON.stringify(this._proxyWishlistCourses));
                        break;
                    }
                }
            }
            
            if(addWishlist)
            {
                this._proxyWishlistCourses.push(wish);
                this.AddToLocalStorage("proxyWishlistCourses", JSON.stringify(this._proxyWishlistCourses));
            }
        }
        else if(wish instanceof Prep_Program)
        {
            for(let index:number = 0; index < this._programWishlist.length; index++)
            {
                let program:Prep_Program = this._programWishlist[index];
                if(program.Prep_program_id == wish.Prep_program_id)
                {
                    addWishlist = false;
                    this._programWishlist[index] = wish;
                    this.AddToLocalStorage("prepProgramsWishlist", JSON.stringify(this._programWishlist));
                    break;
                }
            }
            
            if(addWishlist)
            {
                this._programWishlist.push(wish);
                this.AddToLocalStorage("prepProgramsWishlist", JSON.stringify(this._programWishlist));
            }
        }
    }
    
    public GetMyCourseWishlist():ProxyCourse[]
    {
        return this._proxyWishlistCourses;
    }

    public GetMyPrepProgramWishlist():Prep_Program[]
    {
        return this._programWishlist;
    }

    public UpdateDiscoverProxyCourses(courses:ProxyCourse[]):void
    {
        if(this._proxyDiscoverCourses == null)
            this._proxyDiscoverCourses = [];
        
        for (var newCourse of courses)
        {
            var insertCourse:boolean = true;
            for(var index:number = 0; index < this._proxyDiscoverCourses.length; index++)
            {
                var pcourse:ProxyCourse = this._proxyDiscoverCourses[index] as ProxyCourse;
                if(pcourse.Course_id == newCourse.Course_id)
                {
                    insertCourse = false;
                    this._proxyDiscoverCourses[index] = newCourse;
                    break;
                }
            }
                
            if(insertCourse)
            {
                this._proxyDiscoverCourses.push(newCourse);
            }
        }
    }
    
    public RemoveDiscoverProxyCourse(id:number):void
    {
        if(this._proxyDiscoverCourses != null)
        {
            for(var index:number = this._proxyDiscoverCourses.length - 1; index >= 0 ; index--)
            {
                if(this._proxyDiscoverCourses[index].Course_id == id)
                {
                    this._proxyDiscoverCourses.splice(index, 1);	
                    return;
                }
            }
        }
    }
    
    public GetDiscoveryProxyCoursesById(id:number):ProxyCourse
    {
        var retVal:ProxyCourse;
        if(this._proxyDiscoverCourses != null)
        {
            for(var index:number = this._proxyDiscoverCourses.length - 1; index >= 0 ; index--)
            {
                if(this._proxyDiscoverCourses[index].Course_id == id)
                {
                    retVal = this._proxyDiscoverCourses[index];
                    break;
                }
            }
        }

        return retVal;
    }
    
    public GetDiscoveryProxyCourses():ProxyCourse[]
    {
        return this._proxyDiscoverCourses;
    }
    
    public InsertProgramInfo(programInfo:Prep_Program_Info):void
    {
        if(this._programInfo == null)
            this._programInfo = [];
        
        var addProgramInfo:boolean = true;        
        for(var index:number = 0; index < this._programInfo.length; index++)
        {
            if(this._programInfo[index].Prep_program_id == programInfo.Prep_program_id)
            {
                addProgramInfo = false;					
                /*
                if(this._programInfo[index].Last_updated < programInfo.Last_updated)
                {
                    this._programInfo[index] = programInfo;		
                }
                */
                this._programInfo[index] = programInfo;		
                break;
            }
        }
        
        if(addProgramInfo)
        {
            this._programInfo.push(programInfo);
        }
    }

    public InsertCourseInfo(courseInfo:CourseInfo):void
    {
        if(this._courseInfo == null)
            this._courseInfo = [];
        
        var addCourseInfo:boolean = true;
        
        for(var index:number = 0; index < this._courseInfo.length; index++)
        {
            if(this._courseInfo[index].Course_id == courseInfo.Course_id)
            {
                addCourseInfo = false;					
                if(this._courseInfo[index].Last_updated < courseInfo.Last_updated)
                {
                    this._courseInfo[index] = courseInfo;		
                }
                break;
            }
        }
        
        if(addCourseInfo)
        {
            this._courseInfo.push(courseInfo);
        }
    }
    
    public GetCourseInfoById(courseId:number):CourseInfo
    {
        if(this._courseInfo == null)
            this._courseInfo = [];
        
        var retVal:CourseInfo;
        for(var index:number = 0; index < this._courseInfo.length; index++)
        {
            if(courseId == this._courseInfo[index].Course_id)
            {
                retVal = this._courseInfo[index];
                break;
            }
        }
        return retVal;
    }

    public GetCourseInfoByWebUrl(weUrl:string):CourseInfo
    {
        if(this._courseInfo == null)
            this._courseInfo = [];
        
        var retVal:CourseInfo;
        for(var index:number = 0; index < this._courseInfo.length; index++)
        {
            if(weUrl == this._courseInfo[index].Web_url)
            {
                retVal = this._courseInfo[index];
                break;
            }
        }
        return retVal;
    }

    public GetProgramInfoByWebUrl(weUrl:string):Prep_Program_Info
    {
        if(this._programInfo == null)
            this._programInfo = [];
        
        var retVal:Prep_Program_Info;
        for(var index:number = 0; index < this._programInfo.length; index++)
        {
            if(weUrl == this._programInfo[index].Web_url)
            {
                retVal = this._programInfo[index];
                break;
            }
        }
        return retVal;
    }

    public InsertAuthor(author:Author):void
    {
        if(this._courseAuthors == null)
            this._courseAuthors = [];
        
        let addAuthor:boolean = true;        
        for(var index:number = 0; index < this._courseAuthors.length; index++)
        {
            if(this._courseAuthors[index].Author_id == author.Author_id)
            {
                addAuthor = false;
                break;
            }
        }
        
        if(addAuthor)
        {
            this._courseAuthors.push(author);
        }
    }
    
    public GetAuthorById(authorId:number):Author
    {
        if(this._courseAuthors == null)
            this._courseAuthors = [];
        
        var retVal:Author;
        for(var index:number = 0; index < this._courseAuthors.length; index++)
        {
            if(authorId == this._courseAuthors[index].Author_id)
            {
                retVal = this._courseAuthors[index];
                break;
            }
        }
        return retVal;
    }

    public GetAuthorByWebUrl(webUrl:string):Author
    {
        if(this._courseAuthors == null)
            this._courseAuthors = [];
        
        var retVal:Author;
        for(var index:number = 0; index < this._courseAuthors.length; index++)
        {
            if(webUrl == this._courseAuthors[index].Author_web_url)
            {
                retVal = this._courseAuthors[index];
                break;
            }
        }
        return retVal;
    }
    /*
    public InsertWebUser(user:User):void
    {
        if(this._publicUsers == null)
            this._publicUsers = [];

        let addUser:boolean = true;        
        for(var index:number = 0; index < this._publicUsers.length; index++)
        {
            if(this._publicUsers[index].User_id == user.User_id)
            {
                addUser = false;
                break;
            }
        }
        
        if(addUser)
        {
            this._publicUsers.push(user);
        }
    }

    public GetUserByWebUrl(webUrl:string):User
    {
        if(this._publicUsers == null)
            this._publicUsers = [];
        
        let retVal:User;
        for(var index:number = 0; index < this._publicUsers.length; index++)
        {
            if(webUrl == this._publicUsers[index].Public_profile_web_url)
            {
                retVal = this._publicUsers[index];
                break;
            }
        }
        return retVal;
    }

    public InsertPublicWordlists(wordlists:ProxyWordlist[]):void
    {
        for(let wordlist of wordlists)
        {
            this.InsertPublicWordlist(wordlist);
        }
    }

    public InsertPublicWordlist(wordlist:ProxyWordlist):void
    {
        if(this._publicWordlists == null)
            this._publicWordlists = [];

        let addWordlist:boolean = true;        
        for(var index:number = 0; index < this._publicWordlists.length; index++)
        {
            if(this._publicWordlists[index].Wordlist_id == wordlist.Wordlist_id)
            {
                addWordlist = false;
                break;
            }
        }
        
        if(addWordlist)
        {
            this._publicWordlists.push(wordlist);
        }
    }

    public GetPublicWordlistById(id:number):ProxyWordlist
    {
        if(this._publicWordlists == null)
            this._publicWordlists = [];
        
        let retVal:ProxyWordlist;
        for(var index:number = 0; index < this._publicWordlists.length; index++)
        {
            if(id == this._publicWordlists[index].Wordlist_id)
            {
                retVal = this._publicWordlists[index];
                break;
            }
        }
        return retVal;
    }
    */
    public GetProxyCoursebyAuthorId(id:number):ProxyCourse[]
    {
        var retVal:ProxyCourse[] = [];
        //for (let proxyCourse of this.authorProxyCourses)
        for (let proxyCourse of this._proxyDiscoverCourses)
        {
            if (proxyCourse.Authors && proxyCourse.Authors.length > 0 && proxyCourse.Authors[0].Author_id == id)
                retVal.push(proxyCourse);
        }

        return retVal;
    }
    
    public InsertAuthorProxyCourse(courses:ProxyCourse[]):void
    {
        if(this.authorProxyCourses == null)
            this.authorProxyCourses = [];

        for (var newCourse of courses)
        {
            var insertCourse:boolean = true;
            for(var index:number = 0; index < this.authorProxyCourses.length; index++)
            {
                var pcourse:ProxyCourse = this.authorProxyCourses[index] as ProxyCourse;
                if(pcourse.Course_id == newCourse.Course_id)
                {
                    insertCourse = false;
                    this.authorProxyCourses[index] = newCourse;
                    break;
                }
            }
            
            if(insertCourse)
            {
                this.authorProxyCourses.push(newCourse);
            }
        }
    }
    
    public InsertPreviewCourse(course:Course):void
    {
        this._preview_courses[course.Course_id] = course;
    }
    
    public GetPreviewCourse(courseId:number):Course
    {
        return this._preview_courses[courseId];
    }
    
    public UpdateUserComment(comment:User_Comment):void
    {
        if(this._user_comments == null)
            this._user_comments = [];
        
        let insertComment:boolean = true;
        for(var index:number = 0; index < this._user_comments.length; index++)
        {
            if(this._user_comments[index].Course_id == comment.Course_id)
            {
                insertComment = false;
                this._user_comments[index] = comment;
                this.AddToLocalStorage("userComments", JSON.stringify(this._user_comments));
                break;
            }
        }
        
        if(insertComment)
        {
            this._user_comments.push(comment);
            this.AddToLocalStorage("userComments", JSON.stringify(this._user_comments));
        }
    }
    
    public GetUserCommentByCourseId(id:number):User_Comment
    {
        if(this._user_comments == null)
            this._user_comments = [];
        
        let retVal:User_Comment;        
        for(var index:number = 0; index < this._user_comments.length; index++)
        {
            if(this._user_comments[index].Course_id == id)
            {
                retVal = this._user_comments[index];
                break;
            }
        }
        return retVal;
    }

    public GetUserCommentByPrepProgramId(id:number):User_Comment
    {
        if(this._user_comments == null)
            this._user_comments = [];
        
        var retVal:User_Comment;
        for(var index:number = 0; index < this._user_comments.length; index++)
        {
            if(this._user_comments[index].Prep_program_id == id)
            {
                retVal = this._user_comments[index];
                break;
            }
        }
        return retVal;
    }

    public UpdateDiscoverPrepPrograms(programs:Prep_Program[]):void
    {        
        if(this._prepDiscoverProgram == null)
        {
            this._prepDiscoverProgram = [];
        }

        for(let p of programs)
        {
            let toInsert:boolean = true;
            for(let cp of this._prepDiscoverProgram)
            {
                if(cp.Prep_program_id == p.Prep_program_id)
                {
                    toInsert = false;
                    break;
                }
            }

            if(toInsert)
            {
                this._prepDiscoverProgram.push(p);
                if(p.Offers != null && p.Offers.length > 0)
                {
                    this.SetInAppOffers(p.Offers);
                }
            }
        }
    }

    public GetDiscoverPrepProgram():Prep_Program[]
    {
        return this._prepDiscoverProgram;
    }

    public GetDiscoverPrepProgramByExamType(type:string):Prep_Program[]
    {
        let retVal:Prep_Program[];
        let codes:Code[] = this.GetCodesByParent(this.GetCodeByText("exam_types").Code_id);
        let codeToUse:Code;
        for(let code of codes)
        {
            if(code.Code_text == type)
            {   
                codeToUse = code;
                break;
            }
        }
        
        if(codeToUse && this._prepDiscoverProgram && this._prepDiscoverProgram.length > 0)
        {
            retVal = [];
            for(let program of this._prepDiscoverProgram)
            {
                if(program.Exam_id == codeToUse.Code_id)
                {
                    retVal.push(program);
                }
            }
        }
        
        return retVal;
    }

    public GetUnseenPrepProgram():number
    {
        var retVal:number = 0;

        if(this._user_prep_program != null)
        {
            for(let id in this._user_prep_program)
            {
                if(this._user_prep_program[id].In_my_prep == true && this._user_prep_program[id].Seen != true)
                {
                    retVal++;
                }
            }
        }

        return retVal;
    }

    public UpdateUserPrepProgram(userPrepProgram:User_Prep_Program, checkTimestamp:boolean = false):void
    {
        if(!checkTimestamp
            || this._user_prep_program[userPrepProgram.Prep_program_id] == null
            || this._user_prep_program[userPrepProgram.Prep_program_id].Last_updated.getTime() < userPrepProgram.Last_updated.getTime())
        {
            this._user_prep_program[userPrepProgram.Prep_program_id] = userPrepProgram;
            this.AddToLocalStorage("userPrepPrograms", JSON.stringify(this._user_prep_program));
        }
    }

    public GetUserPrepProgramByProgramId(programId:number):User_Prep_Program
    {
        return this._user_prep_program[programId];
    }

    public GetDiscoverPrepProgramById(programId:number):Prep_Program
    {
        let retVal:Prep_Program;

        if(this._prepDiscoverProgram != null && this._prepDiscoverProgram.length > 0)
        {
             for(let p of this._prepDiscoverProgram)
            {
                if(p.Prep_program_id == programId)
                {
                    retVal = p;
                    break;
                }
            }
        }
       

        return retVal;
    }

    public GetMyPrepProgram():Prep_Program[]
    {
        return this._myPrepProgram;
    }

    public GetMyPrepProgramById(programId:number):Prep_Program
    {
        var retVal:Prep_Program;
        for (var prog of this._myPrepProgram)
        {
            if(prog.Prep_program_id == programId)
            {
                retVal = prog;
                break;
            }
        }
        
        return retVal;
    }

    public UpdateMyPrepPrograms(programs:Prep_Program[]):void
    {
        for(var p of programs)
        {
            this.UpdateMyPrepProgram(p);
        }
    }

    public UpdateMyPrepProgram(program:Prep_Program):void
    {
        var addProgram:boolean = true;
        for(var index:number = 0; index < this._myPrepProgram.length; index++)
        {
            var existingProgram:Prep_Program = this._myPrepProgram[index];
            if(existingProgram.Prep_program_id == program.Prep_program_id)
            {
                addProgram = false;
                this._myPrepProgram[index] = program;
                this.AddToLocalStorage("myPrepProgram", JSON.stringify(this._myPrepProgram));
                break;
            }
        }
        
        if(addProgram)
        {
            this._myPrepProgram.push(program);
            this.AddToLocalStorage("myPrepProgram", JSON.stringify(this._myPrepProgram));
        }
    }

    public GetMyProxyCoursesByProgramId(programId:number):ProxyCourse[]
    {
        if(this._myPrepProgram == null) return;

        let retVal:ProxyCourse[] = [];
        let program:Prep_Program;

        for( let p of this._myPrepProgram)
        {
            if(p.Prep_program_id == programId)
            {
                let pCourses:Prep_Program_Course[] = p.Prep_Program_Courses;
                for(let pcourse of pCourses)
                {
                    for(let proxyCourse of this._proxyMyCourses)
                    {
                        if(pcourse.Course_id == proxyCourse.Course_id)
                        {
                            retVal.push(proxyCourse);
                        }
                    }
                }
                break;
            }
        }


        return retVal;
    }

    public Reset():void
    {
        //this.bookCovers = {};
        //this._updateUserTextsTable = false;
        // product data
        this._course_categories = null;
        //this._courses = {};
        this._preview_courses = {};
        
        this._proxyMyCourses = null
        //this._courseInfo = null;
        //this._courseAuthors = null; 
        this._proxyWishlistCourses = null;
        this._proxyDiscoverCourses = null;
        this.authorProxyCourses = null;
        
        this._activity_categories = null;
        //this._chart_categories = null;
        //this._default_settings = null;
        //this._activities = {};
        //this._questionGroups = {};
        //this._codes = {};
        //this._acontrols = {};
        //this._defaults = {};

        //this._proxyTests = null;
        this._wordlistCategories = null;
        this._sharedProxyWordlists = null;
        //this._languages = null;
        this._statusLevel = null;
        this._testData = {};
        
        // user data
        //this._enableCertificates = true;
        this._user_settings = null;
        this._group_settings = null;
        this._userPrefs = {};
        this._groupUserPrefs = {};
        this._user_courses = {};
        this._userQuestions = {};
        this._userNotes = {};        
        this._results = {};
        //this._currentText = null;
        this._statusPoints = null;
        //this._enabledActivities = null;
        //this._enabledCourseStep1 = null;
        //this._enabledCharts = null;
        //this._enabledCourses = null;
        //this._enabledWordlists = null;
        //this._enabledTexts = null;
        //this._trialMode = null;
        //this._trialWordlistLimit = null;
        //this._trialMaxNumTexts = null;
        //this._number_of_texts = null;
        //this._userTexts = {};
        this._user_comments = null;
        
        //this.organization_display_name = null;
        //this.organization_logo_url = null;
        //this._uiText = {}; do not reset

        //this._wordUsers = {};
        //this._wordDiscovers = null;
        //this._userProxyWordlists = null;
        //this._userProxyTexts = null;
        //this._sharedProxyTexts = null;
        //this._wordlists = {};
        //this._words = {};
        //this._productInfo = null;
        
        //this._libraryProxyTexts = null;
                
        //this._defaultTexts = {};
        //this._proxyTextsTable = null;
        //this._basicProxyTexts = null;
        this._offers = [];

        this._prepDiscoverProgram = null;
        //this._programInfo = null;
        this._programWishlist = null;
        this._user_prep_program = {};
        this._myPrepProgram = null;

        this._personalCourseRecommendations = {};

        this.ClearLocalUserStorage();

        this.ClearAdminData();
    }

    public GetWordUsageExamples(wordId:number, wordPosId:number, genresSelected:string[]):WordUsageExample[]
    {
        var retVal:WordUsageExample[] = [];

        if(this._wordUsageExamples && this._wordUsageExamples[wordId + "-" + wordPosId]) {
            for(let example of this._wordUsageExamples[wordId + "-" + wordPosId]) {
                if(genresSelected.indexOf(example.Genre) != -1) {
                    retVal.push(example);
                }
            }
            return retVal;
        }
        else {
            return null;
        }
            
    }

    public SetWordUsageExamples(wordId:number, wordPosId:number, examples:WordUsageExample[]):void
    {
        if(this._wordUsageExamples == null)
            this._wordUsageExamples = {};
        
        this._wordUsageExamples[wordId + "-" + wordPosId] = examples;
    }

    public GetCourseRecommendations(exam:string):ProxyCourse[]
    {
        return this._courseRecommendations[exam];
    }
    public SetCourseRecommendations(exam:string, recommendations:ProxyCourse[]):void
    {
        this._courseRecommendations[exam] = recommendations;
    }

    public GetPopularRecommendations(exam:string):ProxyCourse[]
    {
        return this._popularCourseRecommendations[exam];
    }
    public SetPopularRecommendations(exam:string, recommendations:ProxyCourse[]):void
    {
        this._popularCourseRecommendations[exam] = recommendations;
    }

    public GetPersonalRecommendations(exam:string):ProxyCourse[]
    {
        return this._personalCourseRecommendations[exam];
    }
    public SetPersonalRecommendations(exam:string, recommendations:ProxyCourse[]):void
    {
        this._personalCourseRecommendations[exam] = recommendations;
    }

    public ClearLocalStorage()
    {
        this.RemoveFromLocalStorage("startupData");
        this.RemoveFromLocalStorage("productData");


        this.ClearLocalUserStorage();
    }

    private ClearLocalUserStorage()
    {
        this.RemoveFromLocalStorage("userSettings");
        this.RemoveFromLocalStorage("groupSettings");
        this.RemoveFromLocalStorage("userPrefs");
        this.RemoveFromLocalStorage("groupUserPrefs");
        this.RemoveFromLocalStorage("userCourses");
        this.RemoveFromLocalStorage("userQuestions");
        this.RemoveFromLocalStorage("results");
        this.RemoveFromLocalStorage("userProxyWordlists");
        this.RemoveFromLocalStorage("prepProgramsWishlist");
        this.RemoveFromLocalStorage("myPrepProgram");
        this.RemoveFromLocalStorage("userNotes");
        this.RemoveFromLocalStorage("numTexts");
        this.RemoveFromLocalStorage("proxyCoursesInMyCourses");
        this.RemoveFromLocalStorage("proxyWishlistCourses");
        this.RemoveFromLocalStorage("userComments");
        this.RemoveFromLocalStorage("user");
        this.RemoveFromLocalStorage("authenticationToken");
        this.RemoveFromLocalStorage("lastSyncTime");
        this.RemoveFromLocalStorage("hasUserStored");
        this.RemoveFromLocalStorage("userPrepPrograms");
        this.RemoveFromLocalStorage("user");
        this.RemoveFromLocalStorage("authenticationToken");
        this.RemoveFromLocalStorage("authenticationTokenDate");
        this.RemoveFromLocalStorage("hasUserStored");
        this.RemoveFromLocalStorage("lastSyncTime");
    }

    public LoadFromLocalStorage():void
    {
        this._user_settings = [];
        var userSettingsString = this.GetFromLocalStorage("userSettings");
        if (userSettingsString != null)
        {
            let userSettings = JSON.parse(userSettingsString);
            for (let userSetting of userSettings)
            {
                this._user_settings.push(Object.assign(new Setting(), userSetting));
            }
        }

        this._group_settings = [];
        var groupSettingsString = this.GetFromLocalStorage("groupSettings");
        if (groupSettingsString != null)
        {
            let groupSettings = JSON.parse(groupSettingsString);
            for (let groupSetting of groupSettings)
            {
                this._group_settings.push(Object.assign(new Setting(), groupSetting));
            }
        }

        this._userPrefs = {};
        var userPrefsString = this.GetFromLocalStorage("userPrefs");
        if (userPrefsString != null)
        {
            let userPrefs = JSON.parse(userPrefsString);
            for (let key in userPrefs)
            {
                this._userPrefs[key] = Object.assign(new UserPref(), userPrefs[key]);
            }
        }

        this._groupUserPrefs = {};
        var groupUserPrefsString = this.GetFromLocalStorage("groupUserPrefs");
        if (groupUserPrefsString != null)
        {
            let groupUserPrefs = JSON.parse(groupUserPrefsString);
            for (let key in groupUserPrefs)
            {
                this._groupUserPrefs[key] = Object.assign(new UserPref(), groupUserPrefs[key]);
            }
        }

        this._user_courses = {};
        var userCoursesString = this.GetFromLocalStorage("userCourses");
        if (userCoursesString != null)
        {
            let userCourses = JSON.parse(userCoursesString);
            for (let key in userCourses)
            {
                this._user_courses[key] = Object.assign(new User_Course(), userCourses[key]);
            }
        }

        this._userQuestions = {};
        var userQuestionsString = this.GetFromLocalStorage("userQuestions");
        if (userQuestionsString != null)
        {
            let userQuestions = JSON.parse(userQuestionsString);
            for (let key in userQuestions)
            {
                this._userQuestions[key] = Object.assign(new User_Question(), userQuestions[key]);
            }
        }

        this._results = {};
        var resultsString = this.GetFromLocalStorage("results");
        if (resultsString != null)
        {
            let results = JSON.parse(resultsString);
            for (let key in results)
            {
                this._results[key] = Object.assign(new Result(), results[key]);
            }
        }

        this._userProxyWordlists = [];
        var userProxyWordlistsString = this.GetFromLocalStorage("userProxyWordlists");
        if (userProxyWordlistsString != null)
        {
            let userProxyWordlists = JSON.parse(userProxyWordlistsString);
            for (let userProxyWordlist of userProxyWordlists)
            {
                this._userProxyWordlists.push(Object.assign(new ProxyWordlist(), userProxyWordlist));
            }
        }

        this._programWishlist = [];
        var prepProgramsWishlistString = this.GetFromLocalStorage("prepProgramsWishlist");
        if (prepProgramsWishlistString == null)
        {
            let prepProgramsWishlist = JSON.parse(prepProgramsWishlistString);
            for (let prepProgram of prepProgramsWishlist)
            {
                this._programWishlist.push(Object.assign(new Prep_Program(), prepProgram));
            }
        }

        this._user_prep_program = {};
        var userPrepProgramsString = this.GetFromLocalStorage("userPrepPrograms");
        if (userPrepProgramsString != null)
        {
            let userPrepPrograms = JSON.parse(userPrepProgramsString);
            for (let key in userPrepPrograms)
            {
                this._user_prep_program[key] = Object.assign(new User_Prep_Program(), userPrepPrograms[key]);
            }
        }

        this._myPrepProgram = [];
        var myPrepProgramString = this.GetFromLocalStorage("myPrepProgram");
        if (myPrepProgramString != null)
        {
            let myPrepProgram = JSON.parse(myPrepProgramString);
            for (let prepProgram of myPrepProgram)
            {
                this._myPrepProgram.push(Object.assign(new Prep_Program(), prepProgram));
            }
        }

        this._userNotes = {};
        var userNotesString = this.GetFromLocalStorage("userNotes");
        if (userNotesString != null)
        {
            let userNotes = JSON.parse(userNotesString);
            for (let key in userNotes)
            {
                this._userNotes[key] = Object.assign(new User_Notes(), userNotes[key]);
            }
        }

        var numTextsString = this.GetFromLocalStorage("numTexts");
        if (numTextsString == null)
        {
            this._number_of_texts = null;
        }
        else
        {
            this._number_of_texts = JSON.parse(numTextsString);
        }

        this._proxyMyCourses = [];
        var proxyCoursesInMyCoursesString = this.GetFromLocalStorage("proxyCoursesInMyCourses");
        if (proxyCoursesInMyCoursesString != null)
        {
            let proxyCoursesInMyCourses = JSON.parse(proxyCoursesInMyCoursesString);
            for (let proxyCourse of proxyCoursesInMyCourses)
            {
                this._proxyMyCourses.push(Object.assign(new ProxyCourse(), proxyCourse));
            }
        }

        this._proxyWishlistCourses = [];
        var proxyWishlistCoursesString = this.GetFromLocalStorage("proxyWishlistCourses");
        if (proxyWishlistCoursesString != null)
        {
            let proxyWishlistCourses = JSON.parse(proxyWishlistCoursesString);
            for (let proxyCourse of proxyWishlistCourses)
            {
                this._proxyWishlistCourses.push(Object.assign(new ProxyCourse(), proxyCourse));
            }
        }

        this._user_comments = [];
        var userCommentsString = this.GetFromLocalStorage("userComments");
        if (userCommentsString != null)
        {
            let userComments = JSON.parse(userCommentsString);
            for (let userComment of userComments)
            {
                this._user_comments.push(Object.assign(new User_Comment(), userComment));
            }
        }



    }

    public UpdateUserData(statusPoints:number,
                            orgDisplayName:string,
                            orgLogo:string,
                            userText:User_Text,
                            libraryUserTexts:User_Text[],
                            currentText:Text,
                            currentwordlist:Wordlist,
                            words:Word[],
                            wordUsers:Word_User[],
                            trialParameters:any,
                            libraryDefaultProxyText:ProxyText[],
                            wordDiscovers:Word_Discover[],
                            userProxyTexts:ProxyText[],
                            sharedPorxyTexts:ProxyText[],
                            wordlistCategories:Wordlist_Category[],
                            sharedProxyWordlists:ProxyWordlist[]
                        )
    {
        
    }


    public useLocalStorage:Boolean = AppSettings.CurrentProductId == AppSettings.PREP_ED;
    public AddToLocalStorage(key:string, value:string):void
    {
        if (this.useLocalStorage)
        {
            try 
            {
                localStorage.setItem(key, value);
            }
            catch (err) { }
        }
    }

    public GetFromLocalStorage(key:string):string
    {
        let retVal:string = null;
        if (this.useLocalStorage)
        {
            try
            {
                retVal = localStorage.getItem(key);
            }
            catch (err) { }
        }
        return retVal;
    }

    public RemoveFromLocalStorage(key:string):void
    {
        try
        {
            localStorage.removeItem(key);
        }
        catch (err) { }
    }

    public get UpgradeURL(): string {
        return this._upgrade_url;
    }


    //ADMIN DATA
    private _current_customer_id: number;
    private _currentAdminUserType: string;
    private _admin_users:DictionaryNumber<AdminUser> = {};
    private _subscription:UserSubscription = null;
    private _subscriptionInfo:ActiveSubscription = null;
    private _groups:Group[] = [];
    //private _userGorups:User_Group[] = null;
    private _customer:Customer = null;
    private _district:District = null;
    private _ereflect_admin_customers:Customer[] = [];
    private _userChartCategories:Chart_Category[] = null;
    private _groupChartCategories:Chart_Category[] = null;
    private _customerChartCategories: Chart_Category[] = null;
    private _hasAdminData:boolean = false;
    //private _admin_lesson_plans:ProxyLessonPlan[] = [];
    private _group_lesson_plans:DictionaryNumber<Group_Lesson_Plan[]> = {};
    private _group_typing_tests:DictionaryNumber<TypingTest[]> = {};
    private _group_typing_tasks:DictionaryNumber<TypingTask[]> = {};
    private _grading_templates:Grading_Template[] = [];
    private _assignment_types: Assignment_Type[] = [];
    
    private ClearAdminData():void
    {
        this._admin_users = {};
        this._subscription = null;
        this._subscriptionInfo = null;
        this._groups = [];
        this._ereflect_admin_customers = [];        
        this._customer = null;
        this._district = null;
        this._userChartCategories = null;
        this._groupChartCategories = null;
        this._customerChartCategories = null;
        //this._admin_lesson_plans = [];
        this._hasAdminData = false;
        this._group_lesson_plans = {};
        this._group_typing_tests = {};
        this._group_typing_tasks = {};
        this._grading_templates = [];
        this._assignment_types = [];
        this._currentAdminUserType = "";
    }

    public HasAdminData():boolean
    {
        return this._hasAdminData;
    }

    public SetAdminData(customer:Customer, district: District, subscription:UserSubscription, subscriptionInfo: ActiveSubscription, groups:Group[], users:AdminUser[],
                        userChartCategories:Chart_Category[],
                        groupChartCategories:Chart_Category[],
                        customerChartCategories: Chart_Category[],
                        lessonPlans: ProxyLessonPlan[], 
                        adminUserType:string, 
                        gradingTemplates: Grading_Template[],
                        assigmentTypes: Assignment_Type[]):void
    {
        this._customer = customer;    
        this._district = district;
        this._admin_users = {};
        this.SetAdminUsers(users);
        this._userChartCategories = userChartCategories;
        this._groupChartCategories = groupChartCategories;
        this._customerChartCategories = customerChartCategories;
        this._subscription = subscription;
        this._subscriptionInfo = subscriptionInfo;
        this._groups = groups;
        //this._admin_lesson_plans = lessonPlans;
        this._currentAdminUserType = adminUserType;
        this._grading_templates = gradingTemplates;
        this._assignment_types = assigmentTypes;
        this._hasAdminData = true;
    }

    public SetEreflectAdminCustomers(customers:Customer[]): void {
        this._ereflect_admin_customers = customers;
    }

    public GetAdminCustomer():Customer
    {
        return this._customer;
    }

    public SetAdminCustomer(customer: Customer): void
    {
        this._customer = customer;
    }

    public GetEreflectAdminCustomers():Customer[]
    {
        return this._ereflect_admin_customers;
    }

    public GetGradingTemplates(): Grading_Template[] 
    {
        return this._grading_templates;
    }

    public GetAdminDistrict(): District 
    {
        return this._district;
    }

    public SetAdminDistrict(district: District): void
    {
        this._district = district;
    }

    public GetAdminSubscription():UserSubscription
    {
        return this._subscription;
    }

    public SetAdminSubscription(subscription: UserSubscription): void
    {
        this._subscription = subscription;
    }

    public GetAdminSubscriptionInfo(): ActiveSubscription
    {
        return this._subscriptionInfo;
    }

    public SetAdminSubscriptionInfo(subscriptionInfo: ActiveSubscription): void
    {
        this._subscriptionInfo = subscriptionInfo;
    }

    public GetAssignmentTypes(): Assignment_Type[] {
        return this._assignment_types;
    }

    public SetAssignmentTypes(value: Assignment_Type[]): void {
        this._assignment_types = value;
    }

    public GetAdminUserChartCategories():Chart_Category[]
    {
        return this._userChartCategories;
    }

    public get CurrentCustomerId(): number 
    {
        return this._current_customer_id;
    }

    public set CurrentCustomerId(id: number)
    {
        this._current_customer_id = id;
        console.log('CurrentCustomerId CurrentCustomerId CurrentCustomerId:: ', id);
    }

    public get CurrentAdminUserType(): string
    {
        return this._currentAdminUserType;
    }

    public GetAdminCustomerChartCategories(): Chart_Category[]
    {
        return this._customerChartCategories;
    }

    /**
     * returns all group charts categories
     */
    public GetAdminGroupChartCategories():Chart_Category[]
    {
        return this._groupChartCategories;
    }
    /**
     * returns all group charts and/or reports
     * based on isReport parameter, function will return reports if true, charts if false or both if null
     * @param isReport boolean indicating wether to return charts, reports or both
     */
    public GetAdminGroupCharts(isReport:boolean):Chart[]
    {
        let charts:Chart[] = [];
        for (let chartCategory of this._groupChartCategories)
        {
            charts = charts.concat(chartCategory.Charts.filter(item => isReport == null || item.Is_report == isReport));
        }
        return charts;
    }

    public GetAdminGroups():Group[]
    {
        return this._groups;
    }
    public SetAdminGroups(groups:Group[])
    {
        this._groups = groups;
    }

    public UpdateAdminGroup(group:Group):void
    {
        var addGroup:boolean = true;
        for(var index:number = 0; index < this._groups.length; index++)
        {
            var existingGroup:Group = this._groups[index];
            if(existingGroup.Group_id == group.Group_id)
            {
                addGroup = false;
                this._groups[index] = group;
                break;
            }
        }
        
        if(addGroup)
        {
            this._groups.push(group);
        }
    }

    public UpdateAdminGroups(groups: Group[]): void {
        for (let group of groups) {
            let indexOfExistingGroup: number = this._groups.findIndex(_group => _group.Group_id == group.Group_id);
            if (indexOfExistingGroup != -1) {
                this._groups[indexOfExistingGroup] = group;
            }
            else {
                this._groups.push(group);
            }
        }
    }

    public GetAdminGroup(groupId:number):Group
    {
        for (let group of this._groups)
        {
            if (group.Group_id == groupId)
            {
                return group;
            }
        }
        return null;
    }
    public DeleteAdminGroup(groupId:number):void
    {
        for(var index:number = 0; index < this._groups.length; index++)
        {
            if(this._groups[index].Group_id == groupId)
            {
                this._groups.splice(index, 1);
                break;
            }
        }
    }

    public DeleteAdminGroups(groupIds:number[]):void
    {
        this._groups = this._groups.filter(group => groupIds.indexOf(group.Group_id) == -1);
    }

    public AddUserGroups(userGroups:User_Group[]):void
    {
        for (let userGroup of userGroups)
        {
            let insertUserGorup = true;
            let group = this.GetAdminGroup(userGroup.Group_id);
            for (let i = 0; i < group.User_Groups.length; i++)
            {
                if (group.User_Groups[i].User_id == userGroup.User_id)
                {
                    group.User_Groups[i] = userGroup;
                    insertUserGorup = false;
                    break;
                }
            }
            if (insertUserGorup)
            {
                group.User_Groups.push(userGroup);
            }
        }
        
    }
    public RemoveUserGroups(groupId:number, userIds:number[]):void
    {
        let group = this.GetAdminGroup(groupId);
        for (let i:number = group.User_Groups.length - 1; i >= 0; i--)
        {
            if (userIds.indexOf(group.User_Groups[i].User_id) >= 0)
            {
                group.User_Groups.splice(i, 1);
            }
        }
    }

    /**
     * @param list is an array of pairs of user id and group id 
     * e.g [{User_id, Group_id}]
    */
    public RemoveUserFromOtherGroups(list: any[]): void {
        for (let item of list) {
            let group = this.GetAdminGroup(item.Group_id);
            let index = group.User_Groups.findIndex(userGroup => userGroup.User_id == item.User_id);
            group.User_Groups.splice(index, 1);
        }
    }

    public GetAdminUsers():AdminUser[]
    {
        let retVal:AdminUser[] = [];
        for (let userId in this._admin_users)
        {
            if (this._admin_users[userId] != null)
            {
                retVal.push(this._admin_users[userId]);
            }
        }
        return retVal;
    }

    public GetGroupByUserID(userID: number): Group {
        let _group: Group;
        for (let group of this._groups) {
            if (group.User_Groups.findIndex(userGroup => userGroup.User_id == userID) != -1) {
                _group = group;
                break;
            }
        }
        return _group;
    }

    public GetGroupsByUserID(userID: number): Group[] {
        return this._groups.filter(group => group.User_Groups.findIndex(userGroup => userGroup.User_id == userID) != -1);
    }

    public GetAdminUsersByClassName(groupName: string):AdminUser[]
    {
        let group = this._groups.find(group => group.Group_name == groupName);
        return group == null ? null : this.GetAdminUsersByGroupIsLeader(group.Group_id, false);
    }
    public GetAdminUsersByGroupIsLeader(groupId:number, isLeader:boolean):AdminUser[]
    {
        let group = this.GetAdminGroup(groupId);
        if(group == null) return null;
        
        let userGroups = group.User_Groups;
        let users:AdminUser[] = [];

        for (let userGroup of userGroups)
        {
            if (isLeader == null || userGroup.Is_leader == isLeader)
            {
                if(this._admin_users[userGroup.User_id]) //to make sure that users will not contain undefined values
                    users.push(this._admin_users[userGroup.User_id]);
            }
        }
        return users;
    }
    public GetAdminUsersNotInGroup(groupId:number):AdminUser[]
    {
        let userGroups = this.GetAdminGroup(groupId).User_Groups;
        let users:AdminUser[] = [];

        for (let userId in this._admin_users)
        {
            let user = this._admin_users[userId];            
            if(user) {
                let useUser:boolean = true;
                for (let userGroup of userGroups) {
                    if (userGroup.User_id == user.User_id) {
                        useUser = false;
                        break;
                    }
                }

                if (useUser) {
                    users.push(user);
                }
            }
        }
        return users;
    }

    public GetUsersNotInAnyGroup(): AdminUser[] {
        let users:AdminUser[] = [];
        for (let userId in this._admin_users) {
            let user = this._admin_users[userId]; 
            let userHasGroup = false;           
            if(user) {
                for (let group of this._groups) {
                    userHasGroup = group.User_Groups.findIndex( userGroup => userGroup.User_id == user.User_id) != -1;
                    if (userHasGroup) break;
                }
                if (!userHasGroup) users.push(user);
            }
        }
        return users;
    }

    public SetAdminUsers(users:AdminUser[])
    {
        for(let user of users)
        {
            this._admin_users[user.User_id] = user;
        }
    }

    public UpdateAdminUser(user: AdminUser): void {        
        this._admin_users[user.User_id] = user;
    }

    public UpdateAdminUser2(user: AdminUser): void {
        let _user = this._admin_users[user.User_id];     
        if (_user) {
            Object.assign(_user, user);
        }
        else {
            _user = user;
        }
    }

    public DeleteAdminUser(userId:number):void
    {
        this._admin_users[userId] = null;
        delete this._admin_users[userId];
    }

    /*public GetAdminLessonPlans(): ProxyLessonPlan[] {
        return this._admin_lesson_plans;
    }*/

    public GetGroupLessonPlans(groupId: number): Group_Lesson_Plan[] {
        return this._group_lesson_plans[groupId];
    }

    public SetGroupLessonPlans(groupId: number, lessonPlans: Group_Lesson_Plan[]): void {
        if(this._group_lesson_plans == null)
            this._group_lesson_plans = {};
        this._group_lesson_plans[groupId] = lessonPlans;
    }

    public GetGroupTypingTests(groupId: number): TypingTest[] {
        return this._group_typing_tests[groupId];
    }

    public GetGroupTypingTasks(groupId: number): TypingTask[] {
        return this._group_typing_tasks[groupId];
    }

    public GetTypingTest(proxyTypingTest: ProxyTypingTest): TypingTest {
        let typingTest: TypingTest;        
        if (this._group_typing_tests[proxyTypingTest.GroupId]) {
            for(let test of this._group_typing_tests[proxyTypingTest.GroupId]) {
                if(test.TypingTestId == proxyTypingTest.TypingTestId) {
                    typingTest = test;
                    break;
                }
            }
        }        
        return typingTest;
    }

    public GetTypingTask(proxyTypingTask: ProxyTypingTask): TypingTask {
        let typingTask: TypingTask;        
        if (this._group_typing_tasks[proxyTypingTask.GroupId]) {
            typingTask = this._group_typing_tasks[proxyTypingTask.GroupId].find(task => task.TypingTaskId == proxyTypingTask.TypingTaskId);
        }        
        return typingTask;
    }

    public SetUserTypingTestResults(results: UserTypingTestResult[]): void {
        this._userTypingTestResults = results;
    }

    public SetUserTypingTaskResults(results: UserTypingTaskResult[]): void {
        this._userTypingTaskResults = results;
    }

    public get UserTypingTaskResults(): UserTypingTaskResult[] {
        return this._userTypingTaskResults;
    }

    public SetUserProxyTypingTasks(typingTasks: ProxyTypingTask[]): void {
        this._userProxyTypingTasks = typingTasks;
    }

    public get UserProxyTypingTasks(): ProxyTypingTask[] {
        return this._userProxyTypingTasks;
    }

    public AddUserTypingTestResult(result: UserTypingTestResult): void {
        let index = this._userTypingTestResults.indexOf(result);
        if (index != -1) {
            this._userTypingTestResults[index] = result;
        }
        else {
            this._userTypingTestResults.push(result);
        }
    }

    public AddUserTypingTaskResult(result: UserTypingTaskResult): void {
        let index = this._userTypingTaskResults.findIndex(taskResult => taskResult.TypingTaskId == result.TypingTaskId);
        if (index != -1) {
            this._userTypingTaskResults[index] = result;
        }
        else {
            this._userTypingTaskResults.push(result);
        }
    }

    public GetUserTypingTestResultsById(typingTestId: number): UserTypingTestResult[] {
        return this._userTypingTestResults.filter(res => res.TypingTestId = typingTestId);
    }

    public GetUserTypingTaskResultsById(typingTaskId: number): UserTypingTaskResult[] {
        return this._userTypingTaskResults.filter(res => res.TypingTaskId = typingTaskId);
    }

    public GetResultByID(typingTestId: number): UserTypingTestResult {
        return this._userTypingTestResults.find(res => res.TypingTestId == typingTestId);
    }

    public GetTaskResultByID(typingTaskId: number): UserTypingTaskResult {
        return this._userTypingTaskResults.find(res => res.TypingTaskId == typingTaskId);
    }

    public AddOrUpdateTypingTest(typingTest: TypingTest): void {
        let existingTestIndex: number = -1;

        if (this._group_typing_tests[typingTest.GroupId]) {
            existingTestIndex = this._group_typing_tests[typingTest.GroupId].findIndex(test => test.TypingTestId == typingTest.TypingTestId);
        }
        else {
            this._group_typing_tests[typingTest.GroupId] = [];
        }

        if(existingTestIndex != -1) {
            this._group_typing_tests[typingTest.GroupId][existingTestIndex] = typingTest;
        }
        else {
            this._group_typing_tests[typingTest.GroupId].push(typingTest);
        }
    }

    public AddOrUpdateTypingTask(typingTask: TypingTask): void {
        let existingTaskIndex: number = -1;

        if (this._group_typing_tasks[typingTask.GroupId]) {
            existingTaskIndex = this._group_typing_tasks[typingTask.GroupId].findIndex(test => test.TypingTaskId == typingTask.TypingTaskId);
        }
        else {
            this._group_typing_tasks[typingTask.GroupId] = [];
        }

        if(existingTaskIndex != -1) {
            this._group_typing_tasks[typingTask.GroupId][existingTaskIndex] = typingTask;
        }
        else {
            this._group_typing_tasks[typingTask.GroupId].push(typingTask);
        }
    }

    public DeleteTypingTest(typingTestToDelete: any): void {    
        let index: number = this._group_typing_tests[typingTestToDelete.Group_id].findIndex(test => test.TypingTestId == typingTestToDelete.Typing_test_id);
        if(index != -1) {
            let deleted = this._group_typing_tests[typingTestToDelete.Group_id].splice(index, 1);
        }
    }

    public DeleteTypingTask(typingTaskToDelete: any): void {  
        let index: number = this._group_typing_tasks[typingTaskToDelete.Group_id].findIndex(task => task.TypingTaskId == typingTaskToDelete.Typing_task_id);
        if(index != -1) {
            let deleted = this._group_typing_tasks[typingTaskToDelete.Group_id].splice(index, 1);
        }
    }

    public SetGroupTypingTests(typingTests: TypingTest[]): void {
        if(this._group_typing_tests == null)
            this._group_typing_tests = {};
        let groupId: number = typingTests[0].GroupId;
        this._group_typing_tests[groupId] = typingTests;
    }

    public SetGroupTypingTasks(typingTasks: TypingTask[]): void {
        if(this._group_typing_tasks == null)
            this._group_typing_tasks = {};
        let groupId: number = typingTasks[0].GroupId;
        this._group_typing_tasks[groupId] = typingTasks;        
        /* if (this._group_typing_tasks[groupId] == null) {
            this._group_typing_tasks[groupId] = [];
        }
        let groupTypingTasks = this._group_typing_tasks[groupId];
        //groupTypingTasks = groupTypingTasks.filter(typingTask => typingTasks.find(task => task.TypingTaskId == typingTask.TypingTaskId) != null);
        groupTypingTasks.forEach(typingTask => {
            let index = typingTasks.findIndex(task => task.TypingTaskId == typingTask.TypingTaskId);
            if (index == -1) {
                groupTypingTasks.splice(index, 1);
            }
        });

        typingTasks.forEach(typingTask => {
            let _typingTask = groupTypingTasks.find(task => task.TypingTaskId == typingTask.TypingTaskId);     
            if (_typingTask) {
                Object.assign(_typingTask, typingTask);
            }
            else {
                groupTypingTasks.push(typingTask);
            }
        });
        console.log('groupTypingTasks groupTypingTasks groupTypingTasks:: ', groupTypingTasks, this._group_typing_tasks[groupId]); */
    }

    public get CurrentTypingTest(): TypingTest {
        return this._currentTypingTest;
    }

    public set CurrentTypingTest(value:TypingTest) {
        this._currentTypingTest = value;
    }

    public AddRunningTask(taskID: number, successHandler: (object: any) => void): void {
        this._running_tasks[taskID] = successHandler;
    }
    
    public GetRunningTask(taskID: number): (object: any) => void {
        return this._running_tasks[taskID];
    }

    public RemoveTask(taskID: number): void {
        this._running_tasks[taskID] = null;
    }
    
    public UpdateUserNotifications(notifications: UserNotification[]): void {
        this._user_notifications = notifications;
    }

    public get UserNotifications(): UserNotification[] {
        return this._user_notifications;
    }

    public get UserTypingCompetency(): UserTypingCompetency {
        return this._userTypingCompetency;
    }

    public set UserTypingCompetency(value: UserTypingCompetency) {
        this._userTypingCompetency = value;
    }

    public get UserStatusPoints(): UserStatusPoints {
        return this._userStatusPoints;
    }

    public set UserStatusPoints(value: UserStatusPoints) {
        this._userStatusPoints = value;
    }
    
    public get PlacementTest(): PlacementTest {
        return this._placementTest;
    }

    public get Topics(): Topic[] {
        return this._topics;
    }

    public getUserLessonPlanByID(lessonPlanID: number): UserLessonPlan {
        return this._userLessonPlans.find(lessonPlan => lessonPlan.LessonPlanID == lessonPlanID);
    }

    public updateUserLessonPlan(updatedLessonPlan: UserLessonPlan): void {
        let index: number = this._userLessonPlans.findIndex(lessonPlan => lessonPlan.LessonPlanID == updatedLessonPlan.LessonPlanID);
        if (index != -1) {
            this._userLessonPlans[index] = updatedLessonPlan;
        }
        else {
            this._userLessonPlans.push(updatedLessonPlan);
        }
    }
}