import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';//per ngmodule aggiungere questi
// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MacrosettimanaliComponent } from './macrosettimanali/macrosettimanali.component';


@NgModule({
  declarations: [
    AppComponent,
    MacrosettimanaliComponent
  ],
  imports: [
	BrowserModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
