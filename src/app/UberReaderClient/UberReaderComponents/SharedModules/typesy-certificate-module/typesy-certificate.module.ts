import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesyCertificateComponent } from './components/typesy-certificate.component';
import { ResourceLocationModule } from '../resource-location-module/resource-location.module';

@NgModule({
    declarations: [
        TypesyCertificateComponent
    ],
    imports: [
        CommonModule,
        ResourceLocationModule
    ],
    exports: [
        TypesyCertificateComponent
    ]
})
export class TypesyCertificateModule { }