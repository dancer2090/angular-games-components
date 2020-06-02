import { VisualComponent } from '../VisualComponent';
import { MatDialogRef } from '@angular/material';

export class ParentDialog extends VisualComponent
{
    public _title: string = "";
    public _declineText: string = "Cancel";
    public _confirmText: string = "Yes";

    constructor(public dialog?: MatDialogRef<any>) {
        super();
    }

    public closeDialog(data?: any) {        
        if (this.dialog) {
            this.dialog.close(data);
        }
    }
}