import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceHolderDirective } from './placeholder/place-holder.directive';

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, PlaceHolderDirective],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceHolderDirective,
    CommonModule,
  ],
})
export class SharedModule {}
