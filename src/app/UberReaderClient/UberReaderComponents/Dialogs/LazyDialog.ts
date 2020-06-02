import { Component, OnInit, Inject } from '@angular/core';
import { UberReaderDialog } from './UberReaderDialog';
import { Router } from '@angular/router';
import { MdlDialogService, MdlDialogReference } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'lazy-dialog',
    template: `
        <button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
            <mdl-icon>close</mdl-icon>
        </button>
        <router-outlet name="lazyDialogOutlet"></router-outlet>
    `
})
export class LazyDialog extends UberReaderDialog implements OnInit {

    private dialogOnHideSubscription: Subscription;

    constructor(private dialogRef: MdlDialogReference, @Inject("data") private data: any, private mdlDialogService: MdlDialogService, private router:Router) {
        super(dialogRef);
    }

    ngOnInit() {
        if (this.data) {
            switch (this.data.url) {
                case 'question':
                    this.showPrepEdQuestionDialog(this.data.params);
                    break;
            }
        }
        this.dialogOnHideSubscription = this.dialogRef.onHide().subscribe(() => {
            console.log("fffffffffffffffffffffsadsadasdfasfasfasfsafasfasfasf");
            //this.router.navigate([{ outlets: {}}], { skipLocationChange: true, replaceUrl: false});
        });
    }

    public showPrepEdQuestionDialog(params: any) {        
        this.router.navigate([{ outlets: { lazyDialogOutlet: ['question'] }}],
            { skipLocationChange: true, replaceUrl: false, queryParams: { course_step_num: params.course_step_num, course_activity_id: params.course_activity_id, course_id: params.course_id, updateHistory: 0 } });          
        //this.router.navigate([{ outlets: { lazyDialogOutlet: ['preview', 'preview', params.course_activity_id] }}],
          //  { skipLocationChange: true, replaceUrl: false, queryParams: { updateHistory: 0 } });
    }

    ngOnDestroy() {
        //this.router.navigate([{ outlets: { lazyDialogOutlet: null }}], { skipLocationChange: true, replaceUrl: false});
        this.dispose();
    }

    public dispose(): void {
        this.dialogOnHideSubscription.unsubscribe();
    }
}