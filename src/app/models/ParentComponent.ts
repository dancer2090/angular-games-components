import { Subject, timer } from 'rxjs';
import { AfterViewInit, OnDestroy } from '@angular/core';

export class ParentComponent implements AfterViewInit, OnDestroy {
    public isViewReady: boolean;
    public _ngOnDestroy: Subject<void>;

    constructor() {
        this.isViewReady = false;
        this._ngOnDestroy = new Subject<void>();
    }

    ngAfterViewInit() {
        timer(300).subscribe(() => this.isViewReady = true);
    }

    ngOnDestroy() {
        console.log('ngOnDestroy ngOnDestroy ngOnDestroy ParentComponent ParentComponent ParentComponent');
        this.isViewReady = false;
        this._ngOnDestroy.next();
        this._ngOnDestroy.complete();
    }
}