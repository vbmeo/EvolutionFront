import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';//per ngmodule aggiungere questi angular 7
// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MacrosettimanaliComponent } from './macrosettimanali/macrosettimanali.component';
//conponent material

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MacroTabellaComponent } from './macro-tabella/macro-tabella.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MacroMatTabellaComponent } from './macro-mat-tabella/macro-mat-tabella.component';

@NgModule({
  declarations: [
    AppComponent,
	MacrosettimanaliComponent,
	MacroTabellaComponent,
	MacroMatTabellaComponent
 ],
  imports: [
	BrowserModule,
	// FormsModule, angular 7
	HttpClientModule,
	MatTableModule,
	MatPaginatorModule,
	MatSortModule,
	BrowserAnimationsModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
