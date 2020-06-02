import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownList } from './components/DropDownList';
import { DropDownListItem } from './components/DropDownListItem';
import { MdlModule } from '@angular-mdl/core';
import { ClickOutsideModule } from '../click-outside-module/click-outside.module';

@NgModule({
  declarations: [
    DropDownList,
    DropDownListItem 
  ],
  imports: [
    CommonModule,
    MdlModule,
    ClickOutsideModule
  ],
  exports: [
    DropDownList,
    DropDownListItem,
  ]  
})
export class SharedComponentsModule { }
