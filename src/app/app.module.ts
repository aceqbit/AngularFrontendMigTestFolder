import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutManagerComponent } from './components/layout-manager/layout-manager.component';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { WorkflowDesignerComponent } from './components/workflow-designer/workflow-designer.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutManagerComponent,
    DataGridComponent,
    CalendarComponent,
    WorkflowDesignerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
