export class ErrorMessage
{
    public static INITIALISATION_ERROR:string = "Error Initialising App";
    public static DATABASE_INITIALISATION_ERROR:string = "Error Initialising local Database";
    public static ACTIVATION_TIMEOUT_ERROR:string = "Timeout occurred. Please Check your internet connection.";
    public static ACTIVATION_VALIDATION_ERROR:string = "Activation could not be validated with the server. Check your internet connection and try again.";
    /*public static const GET_UI_TEXT_ERROR:string = "The application could not start up. Make sure you have an internet connection.";*/
    public static GET_UI_TEXT_ERROR:string = "We need an Internet connection to do this. Please check your Internet and try again. We suggest checking your Wi-Fi, Cellular, or other network settings.";
    public static GET_UI_TEXT_ERROR_TITLE:string = "Oops! Something went wrong...";
    
    
    public static FACEBOOK_SHARE_PERMISSION_ERROR:string = "facebookSharePermissionError";
    public static FACEBOOK_LOGIN_ERROR:string = "facebookLoginError";
    
    public static TRIAL_VERSION_ERROR:string = "Not available in Trial";

    public static CANCEL_LOADING:string = "Request cancelled.";

    public static INVALID_USER:string = "Invalid User";
}