import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MacroSettimanaliComponent } from './macro-settimanali/macro-settimanali.component';

@NgModule({
  declarations: [
    AppComponent,
    MacroSettimanaliComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
