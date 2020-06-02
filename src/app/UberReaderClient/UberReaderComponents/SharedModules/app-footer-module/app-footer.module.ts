import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceLocationModule } from '../resource-location-module/resource-location.module';
import { AppFooter } from './components/AppFooter';
import { ExternalLinkModule } from '../external-link-module/external-link.module';

@NgModule({
    declarations: [
        AppFooter
    ],
    entryComponents: [
        AppFooter
    ],
    imports: [
        CommonModule,
        ResourceLocationModule,
        ExternalLinkModule
    ],
    exports: [
        AppFooter
    ]
})
export class AppFooterModule { }