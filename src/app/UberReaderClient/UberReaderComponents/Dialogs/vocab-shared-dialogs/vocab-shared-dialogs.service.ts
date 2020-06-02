import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CreateWordlistDialog } from './CreateWordlistDialog';
import { Wordlist } from 'app/UberReaderData/DataClasses/db/Wordlist';
import { WordlistEvent } from 'app/UberReaderData/Events/WordlistEvent';
import { Word } from 'app/UberReaderData/DataClasses/db/Word';
import { ChangeWordlistDialog } from './ChangeWordlistDialog';
import { ProxyWordlist } from 'app/UberReaderData/DataClasses/other/ProxyWordlist';

@Injectable()
export class VocabSharedDialogsService {
    

    constructor(
        private matDialog: MatDialog
    ) {

    }

    public showAddWordsToListDialog(wordlist: Wordlist, callback: (event: WordlistEvent) => void): MatDialogRef<CreateWordlistDialog>  {
        return this.showCreateWordListDialog(wordlist, "Add Words to " + wordlist.Name, false, null, callback);
    }

    public showCreateWordListDialog(
        wordlist: Wordlist, title: string, willNavigate: boolean, topGroupOptionsVisible: boolean, callback: (event: WordlistEvent) => void, words?: Word[]
    ): MatDialogRef<CreateWordlistDialog> {
        let dialogData = {
            _title: title,
            topGroupOptionsVisible: topGroupOptionsVisible,
            willNavigate: willNavigate,
            Wordlist: wordlist,
            wordlistCreated: callback,
            words: words
        };
        return this.matDialog.open(CreateWordlistDialog, {
            data: dialogData,			          
			width : '470px'
		});
    }

    public showChangeWordlistDialog(
        selectWordlistCallback?: (wordlist: ProxyWordlist) => void, addNewWordlistCallback?: () => void
    ): MatDialogRef<ChangeWordlistDialog> {
        let dialogData = {
            selectWordlistCallback: selectWordlistCallback,
			addNewWordlistCallback: addNewWordlistCallback
        };
        return this.matDialog.open(ChangeWordlistDialog, {
            data: dialogData,			          
			width : '450px'
		});
    }
}