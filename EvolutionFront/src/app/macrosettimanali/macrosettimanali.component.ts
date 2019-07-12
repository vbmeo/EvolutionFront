/**
 * Alla base di tutto non importa avere un array di oggetti, any va sempre bene e consente di non definire oggetti specifici
 * il che porta la possibilità di usare una classe astratta generica
 */
import { Component, OnInit,NgModule } from '@angular/core';
import {MacroSettimanaliService } from '../services/macro-settimanali.service';
import { environment } from '../../environments/environment';

import {BaseTableComponent} from '../base-table/base-table.component';

@Component({
  selector: 'app-macrosettimanali',
  templateUrl: './macrosettimanali.component.html',
  styleUrls: ['./macrosettimanali.component.css']
})
export class MacrosettimanaliComponent extends BaseTableComponent implements OnInit {

  constructor(public macroSettimanaliService: MacroSettimanaliService) {
	  //mando parametri alla super classe abstracta per settare parametri dell'impaginazione
	  super(environment.numeroMaxRecordPerTabellaMacro,environment.inizioDaPagina,environment.numeroMassimopagineDelFooter);
  }
 
  ngOnInit() {
	super.settaggioIniziale(this.macroSettimanaliService.getAll());	
  }

	//quando doc pronto
  	 ngAfterViewInit(): void {
	 }



	integerFormatter(valore: number){
		//console.log('valore da mettere intero--'+valore);
		let x = Math.round(valore);
		//console.log('valore modificATO intero--'+x);
		return x;
		//return  parseInt(valore,10);
	}
}
