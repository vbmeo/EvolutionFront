import { Component, OnInit } from '@angular/core';
import {MacroSettimanaliService } from '../services/macro-settimanali.service';
import { MacroSettimanali } from '../Model/MacroSettimanali';
import { Observable, Subject } from 'rxjs';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-macro-settimanali',
  templateUrl: './macro-settimanali.component.html',
  styleUrls: ['./macro-settimanali.component.css']
})
export class MacroSettimanaliComponent implements OnInit {
  listaMacro: Observable<MacroSettimanali[]>;
  constructor(private macroSettimanaliService : MacroSettimanaliService) { }

  ngOnInit() {
	this.listaMacro = this.macroSettimanaliService.getAll();

  }

}
