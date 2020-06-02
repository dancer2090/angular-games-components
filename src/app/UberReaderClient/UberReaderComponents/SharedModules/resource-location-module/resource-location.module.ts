import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceLocationPipe, LocalResourcePipe, LocalResourceAsyncPipe } from './pipes/ResourceLocationPipe';

@NgModule({
    declarations: [
        LocalResourceAsyncPipe,
        LocalResourcePipe,
        ResourceLocationPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LocalResourceAsyncPipe,
        LocalResourcePipe,
        ResourceLocationPipe
    ]
})
export class ResourceLocationModule { }