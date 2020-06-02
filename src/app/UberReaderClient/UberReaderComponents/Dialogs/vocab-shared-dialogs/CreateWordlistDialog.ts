import { Component, Input, Inject } from '@angular/core';
import { UberReaderDialog } from '../UberReaderDialog';
import { StringUtils } from '../../../../UberReaderData/Utils/StringUtils';
import { UberReaderLoadingMessage } from '../UberReaderLoadingMessage';
import { ChangeWordlistVisibility } from './ChangeWordlistVisibility';
import { UberApplication } from '../../../../UberReaderData/UberApplication';
import { Wordlist } from '../../../../UberReaderData/DataClasses/db/Wordlist';
import { Word } from '../../../../UberReaderData/DataClasses/db/Word';
import { WordlistEvent } from '../../../../UberReaderData/Events/WordlistEvent';
import { MultiAddWordEvent } from '../../../../UberReaderData/Events/MultiAddWordEvent';
import { ClosePopUpEvent } from '../../../../UberReaderData/Events/ClosePopUpEvent';
import { WordlistVisibilityEvent } from '../../../../UberReaderData/Events/WordlistVisibilityEvent';
import { ProxyWordlist } from '../../../../UberReaderData/DataClasses/other/ProxyWordlist';
import { UberReader } from '../../../UberReader';
import { ScreenState } from '../../../../UberReaderData/Utils/ScreenState';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { ParentDialog } from '../ParentDialog';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

@Component({
    selector: 'create-wordlist-dialog',
	styleUrls: ['./CreateWordlistDialog.css'],
    template: `
		<div>       
			<div class="mdl-grid login-form-grid">
				<div class="mdl-cell mdl-cell--12-col login-form-cell">
					<h3 class="mdl-typography--headline mdl-color-text--grey-800 login-headline">{{ _title }}</h3>
					<button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
						<mdl-icon>close</mdl-icon>   
					</button>

					<mdl-textfield *ngIf="topGroupOptionsVisible" type="text" [(ngModel)]="nameTextInput" autofocus (keyup)="validate()" [disabled]="nameTextInputDisabled" label="Enter a name for the new word list" floating-label></mdl-textfield>
					<div class="{{topGroupOptionsVisible ? 'createListRow' : 'hide'}}">
                    	<label class="col">{{wordlistVisibility}}</label><a (click)="handleClickEvent()" class="col">change</a>
					</div>                     
					<label>Type or paste one word per line, then press OK.</label>
					<mdl-textfield [(ngModel)]="wordsTextBox" rows="3"></mdl-textfield>
				</div> 
			</div>        
			<div class="mdl-dialog__actions">
				<button mdl-button class="green-button login-button" (click)="okButton_Click()" [disabled]="disabled" mdl-button-type="raised" mdl-ripple>OK</button>
				<button mdl-button class="close" (click)="cancelButton_Click()" mdl-button-type="raised" mdl-ripple>Cancel</button>
			</div>
		</div>
    `	
})

export class CreateWordlistDialog extends ParentDialog
{
    @Input() visible:boolean = true;
	@Input() topGroupOptionsVisible:boolean = true;	

    private _wordlist:Wordlist;

    public nameTextInput:string = "";
    public nameTextInputDisabled:boolean = false;
    public wordsTextBox:string = "";
    public disabled:boolean = true;

    private _isPublic:boolean = true;
    public wordlistVisibility:string = "Visible to community, ";

    private sameSession:boolean = false;
	public willNavigate:boolean = false;
	private _model:UberApplication; 
	private wordlistCreatedCallback:(event: WordlistEvent) => void;

	constructor(
		private matDialog: MatDialog,
		public dialogRef: MatDialogRef<CreateWordlistDialog>,
		@Inject(MAT_DIALOG_DATA) dialogData: any
	) {
        super(dialogRef);
        this._model = UberApplication.GetInstance();
		this._title = "Create Word List";

		if (dialogData._title){
			this._title = dialogData._title;
		}
		if (dialogData.topGroupOptionsVisible != null){
			this.topGroupOptionsVisible = dialogData.topGroupOptionsVisible;
		}
		if (dialogData.Wordlist){
			this.Wordlist = dialogData.Wordlist;
		}
		if (dialogData.wordlistCreated){
			this.wordlistCreatedCallback = dialogData.wordlistCreated;
		}
		if (dialogData.willNavigate){
			this.willNavigate = dialogData.willNavigate;
		}
		if (dialogData.words){
			this.addWordToTextBox(dialogData.words);
		}
    }

    public addWordToTextBox(words:Word[]):void
    {
        if(words == null)
            return;

        for(let word of words)
        {
            this.wordsTextBox += word.Word_text + '\r';
        }
    }

	private updateVisiblityLink():void
	{		
		if(this._isPublic == true)
        {			
            this.wordlistVisibility = "Visible to community, ";
        }
        else
        {			
            this.wordlistVisibility = "Visible to me only, ";
        }
	}

    public cancelButton_Click():void
    {
        this.closeDialog();
    }

    public okButton_Click():void
    {
        let newLevelName:string = StringUtils.TrimString(this.nameTextInput);

        if(this.sameSession)
        {
            UberReaderLoadingMessage.GetInstance().Show(this._model.GetUiTextByKey("STAT_ADDING_TO_WORDLIST"));
            this.processWords();
        }
        else
        {
			var wordlist = this._model.UserWordlistExists(newLevelName);
            if (wordlist != false)
			{					
				if(wordlist instanceof ProxyWordlist) {
					UberReaderLoadingMessage.GetInstance().Show(this._model.GetUiTextByKey("STAT_ADDING_TO_WORDLIST"));
                	this._model.GetAllWordlistData(wordlist.Wordlist_id, this.wordlistDataReceived, this.wordlistDataError);
				}
				else {
					//AlertDialog.show(this._model.GetUiTextByKey("ERR_DUPLICATE_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_DUPLICATE_WORD_LIST_TITLE"),true);
					this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_DUPLICATE_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_DUPLICATE_WORD_LIST_TITLE"), true);
				}
			}
            else
            {
                UberReaderLoadingMessage.GetInstance().Show(this._model.GetUiTextByKey("STAT_CREATING_WORD_LIST"));
                this._model.CreateWordlist(newLevelName, this._isPublic, this.wordlistCreated, this.wordlistCreationError);
            }
        }		
    }

	 private wordlistDataReceived = (event:WordlistEvent) => {
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_RECEIVED, this.wordlistDataReceived);
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_ERROR, this.wordlistDataError);	
        
        if (event.Wordlist != null) {
		    this._wordlist = event.Wordlist;
			this._isPublic = this._wordlist.Is_public;
			this.updateVisiblityLink();
			this.processWords();
        }
        else {
            //AlertDialog.show(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"),true);
			this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"), true);
        }   
    }

    private wordlistDataError = (event:WordlistEvent) => {
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_RECEIVED, this.wordlistDataReceived);
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_ERROR, this.wordlistDataError);
        
        UberReaderLoadingMessage.GetInstance().Hide();        
        //AlertDialog.show(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"),true);
		this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"), true);
	}

    private wordlistCreated = (event:WordlistEvent) =>
	{
	    event.target.removeEventListener(WordlistEvent.WORDLIST_CREATED, this.wordlistCreated);
		event.target.removeEventListener(WordlistEvent.WORDLIST_CREATION_ERROR, this.wordlistCreationError);
				
		this._wordlist = event.Wordlist;
        this._isPublic = this._wordlist.Is_public;
        this.updateVisiblityLink();
        
		this.processWords();
	}
			
	private wordlistCreationError = (event:WordlistEvent) =>
	{
	    event.target.removeEventListener(WordlistEvent.WORDLIST_CREATED, this.wordlistCreated);
		event.target.removeEventListener(WordlistEvent.WORDLIST_CREATION_ERROR, this.wordlistCreationError);
				
		UberReaderLoadingMessage.GetInstance().Hide();
				
		// AlertDialog.show(this._model.GetUiTextByKey("ERR_CREATING_WORD_LIST_MESSAGE"), 
		//     this._model.GetUiTextByKey("ERR_CREATING_WORD_LIST_TITLE"), true);
		this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_CREATING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_CREATING_WORD_LIST_TITLE"), true);
	}

    private processWords():void
    {
        let wordTexts:string = this.wordsTextBox.replace(new RegExp("\r", "g"), "\n");
		let lines:string[] = wordTexts.split("\n");
		let whiteSpace:RegExp = new RegExp("\\s");
		let wordsToAdd:string[] = [];
		for (let line of lines)
		{
		    let trimmedLine:string = StringUtils.TrimString(line);
			if (trimmedLine.length == 0)
			{
			    continue;
			}
		    wordsToAdd.push(trimmedLine);
		}
				
		// remove duplicates
		for (var i:number = 0; i < wordsToAdd.length; i++)
		{
		    for (var j:number = wordsToAdd.length - 1; j > i; j--)
			{
			    if (wordsToAdd[i] == wordsToAdd[j])
				{
				    wordsToAdd.splice(j, 1);
				}
			}
		}
				
		this._model.AddWordStringsToList(this._wordlist, wordsToAdd, this.wordsAddedToList, this.addWordsError);
    }

    private wordsAddedToList = (event:MultiAddWordEvent) =>
	{
	    event.target.removeEventListener(MultiAddWordEvent.WORDS_ADDED, this.wordsAddedToList);
		event.target.removeEventListener(MultiAddWordEvent.MULTI_ADD_WORD_ERROR, this.addWordsError);
				
		UberReaderLoadingMessage.GetInstance().Hide();
				
    	//this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_CREATED, this._wordlist));
				
		let badLines:string[] = [];
		let wordsAdded:number = 0;
		let wordsAlreadyInList:number = 0;
				
		for(let result of event.WordInsertResults)
		{
		    if (result.Status == "Word added")
			{
			    wordsAdded++;
			}
			else if (result.Status == "Word already in list")
			{
			    wordsAlreadyInList++;
			}
			else if (result.Status == "Word not found")
			{
			    badLines.push(result.WordString);
			}
		}
		
		this.dispatchEvent(new WordlistEvent(WordlistEvent.WORDLIST_CREATED, this._wordlist, null, "", wordsAdded));
		if (this.wordlistCreatedCallback) {
			this.wordlistCreatedCallback(new WordlistEvent(WordlistEvent.WORDLIST_CREATED, this._wordlist, null, "", wordsAdded));
		}		

		this.wordsTextBox = "";		
		let errorAlertText:string = "";
		let infoAlertText:string = "";
		let successAlertText:string = (wordsAdded <= 1 ? StringUtils.substitute(this._model.GetUiTextByKey("STAT_INITIAL_RESULT_ADDING_WORDS_SINGULAR"), wordsAdded, 
            this._wordlist.Name) : StringUtils.substitute(this._model.GetUiTextByKey("STAT_INITIAL_RESULT_ADDING_WORDS_PLURAL"), wordsAdded, this._wordlist.Name));
				
		let hasError:boolean = false;		

		if (badLines.length > 0)
		{
		    hasError = true;
			//errorAlertText += " " + (badLines.length == 1 ? this._model.GetUiTextByKey("STAT_BADLINES_RESULT_ADDING_WORDS_SINGULAR") : this._model.GetUiTextByKey("STAT_BADLINES_RESULT_ADDING_WORDS_PLURAL")).replace("{0}", badLines.length.toString());
			errorAlertText += " ";
			if (badLines.length == 1) {
				errorAlertText += "{0} word was not added because it could not be found in the dictionary.";
			}
			else {
				errorAlertText += "{0} words were not added because they could not be found in the dictionary.";
			}
			errorAlertText = errorAlertText.replace('{0}', badLines.length.toString());
					
			let badLinesText:string = "";
			for (let badLine of badLines)
			{
			    badLinesText += badLine + "\n";
			}
					
			this.wordsTextBox = badLinesText;			
		}

		if (wordsAlreadyInList > 0)
		{
		    hasError = true;
			infoAlertText += " " + (wordsAlreadyInList == 1 ?  this._model.GetUiTextByKey("STAT_DUPLICATES_RESULT_ADDING_WORDS_SINGULAR") : this._model.GetUiTextByKey("STAT_DUPLICATES_RESULT_ADDING_WORDS_PLURAL")).replace("{0}", wordsAlreadyInList.toString());			
		}
				
		if(hasError)
		{
			//AlertDialog.show(alertText, "", false, 1, "OK", "", this.closeDialog);
			//this._model.showErrorNotif(errorAlertText);
			/*let timeout:number = 3000;
			if (wordsAdded > 0)
				this._model.showSuccessNotif(successAlertText);
				timeout += 1000;
			if (wordsAlreadyInList > 0) {				
				this._model.showInfoNotif(infoAlertText, "", timeout);
				timeout += 1000;
			}					
			if (badLines.length > 0) {				
				this._model.showErrorNotif(errorAlertText, "", timeout);
			}
			else {
				this.closeDialog();
			}*/
			//this._model.showSnackbar(successAlertText + infoAlertText + errorAlertText);
			this._model.showMdlAlertDialog(successAlertText + infoAlertText + errorAlertText);
			if (badLines.length == 0) {
				this.closeDialog();
			}
		}
		else
		{
			if (wordsAdded > 0)	 {
				this._model.showSnackbar(successAlertText);
			}				
			this.closeDialog();

		    /*if(this.sameSession)
			{
			    AlertDialog.show(alertText + " " + this._model.GetUiTextByKey("STAT_ADD_MORE_WORDS").replace("{0}", this._wordlist.Name), "Words Successfully Added", false, 2, 
                    this._model.GetUiTextByKey("GEN_YES"), this._model.GetUiTextByKey("GEN_NO"), this.addAgain);					
			}
			else
			{				
			    AlertDialog.show(successAlertText + " " + this._model.GetUiTextByKey("STAT_ADD_MORE_WORDS").replace("{0}", this._wordlist.Name), "Wordlist Successfully Created", false, 2, 
                    this._model.GetUiTextByKey("GEN_YES"), this._model.GetUiTextByKey("GEN_NO"), this.addAgain);								
			}*/
		}

		if(!this.sameSession && this.willNavigate) {
			if (this._wordlist != null) {
				let proxy_wordlists = UberApplication.GetInstance().GetUserProxyWordlists();
				this._model.currentlySelectedWordlist = proxy_wordlists.find(proxy_wordlist => { return proxy_wordlist.Wordlist_id == this._wordlist.Wordlist_id });
				this._model.CurrentWordlist = this._wordlist;		
				UberReader.GetInstance().updateUnviewedWords();			
				UberReader.GetInstance().SwitchScreenState(ScreenState.MANAGING_WORDLIST, true);
				this.closeDialog();
			}
		}		
	}

	private addAgain = (event:ClosePopUpEvent) =>
	{
	    if(event.detail == ClosePopUpEvent.OK)
		{
		    this.sameSession = true;
			this.wordsTextBox = "";
			this.nameTextInputDisabled = true;
		}
		else
		{
		    this.closeDialog();
		}
	}

    private addWordsError = (event:MultiAddWordEvent) =>
	{
	    event.target.removeEventListener(MultiAddWordEvent.WORDS_ADDED, this.wordsAddedToList);
		event.target.removeEventListener(MultiAddWordEvent.MULTI_ADD_WORD_ERROR, this.addWordsError);
				
		UberReaderLoadingMessage.GetInstance().Hide();
		//AlertDialog.show(event.ErrorMessage, this._model.GetUiTextByKey("ERR_ADDING_MULTI_WORDS_TITLE"), true);
		this._model.showMdlAlertDialog(event.ErrorMessage, this._model.GetUiTextByKey("ERR_ADDING_MULTI_WORDS_TITLE"), true);
	}

    public handleClickEvent():void
    {
		let scopeWordlist:Wordlist = this._wordlist;
		let scopePublic:boolean = this._isPublic;
		let scopeHandler = this.setWordlistVisibility;
		let dialogData:any = {};
		if(scopeWordlist != null)
		{
			dialogData.wordlist = scopeWordlist;
			dialogData.wordlistName = scopeWordlist.Name;
			dialogData.defaultIsPublicValue = true;
		}			
		else
		{
			dialogData.wordlist = null;
			dialogData.wordlistName = "This Wordlist";
			dialogData.defaultIsPublicValue = scopePublic;		
		}
		dialogData.setWordlistVisibility = this.setWordlistVisibility;
		let pDialog = this.matDialog.open(ChangeWordlistVisibility, {
			data: dialogData,				
			width: '500px'
		});

		/*
        this._isPublic = !this._isPublic;
        if(this._isPublic)
        {
            this.wordlistVisibility = "Visible to everyone, ";
        }
        else
        {
            this.wordlistVisibility = "Visible to me only, ";
        }   
		*/
    }

	private setWordlistVisibility = (e:WordlistVisibilityEvent) =>
	{		
		//e.target.removeEventListener(WordlistVisibilityEvent.WORDLIST_VISIBILITY_CHANGED, this.setWordlistVisibility);		
		this._isPublic = e.IsPublic;
		this.updateVisiblityLink();
	}

    private validate():void
    {
        this.disabled = this.nameTextInput.length == 0;
    }
	
	public set Wordlist(wordlist:Wordlist){
		this._wordlist = wordlist;
		this._isPublic = this._wordlist.Is_public;
		this.updateVisiblityLink();
		this.sameSession = true;
		this.nameTextInput = this._wordlist.Name;
		this.nameTextInputDisabled = true;
		this.disabled = false;
	}

    public dispose():void{}
}