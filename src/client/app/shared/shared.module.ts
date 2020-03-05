import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { materialModules } from './material-modules';
import { FontAwesomeIconsModule } from './font-awesome-icons.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeIconsModule,
    ...[materialModules]
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeIconsModule,
    ...[materialModules]
  ]
})
export class SharedModule {}
