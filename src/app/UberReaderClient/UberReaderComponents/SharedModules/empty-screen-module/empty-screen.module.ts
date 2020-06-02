import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyScreen } from './components/empty-screen.component';
import { MdlModule } from '@angular-mdl/core';
import { MatButtonModule } from '@angular/material';

@NgModule({
    declarations: [
        EmptyScreen
    ],
    entryComponents: [
        EmptyScreen
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MdlModule
    ],
    exports: [
        EmptyScreen
    ]
})
export class EmptyScreenModule { }