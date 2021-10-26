import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgContainerComponent } from './components/svg-container/svg-container.component';

@NgModule({
  declarations: [SvgContainerComponent],
  imports: [CommonModule],
  exports: [SvgContainerComponent],
})
export class SharedModule {}
