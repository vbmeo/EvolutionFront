import { Component, OnInit,NgModule } from '@angular/core';
import {MacroSettimanaliService } from '../services/macro-settimanali.service';
import { MacroSettimanali } from '../Model/MacroSettimanali';
//import {Headers, Response} from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-macrosettimanali',
  templateUrl: './macrosettimanali.component.html',
  styleUrls: ['./macrosettimanali.component.css']
})
export class MacrosettimanaliComponent implements OnInit {
  //listaMacro: Observable<MacroSettimanali[]>;
  macroSettimanali: any = [];
  macro : MacroSettimanali [];
  i: number = 0;
	//paginazione tabella
   //filteredItems : Product[];
   pages : number = 1;
   numeroRecordPerPagina : number = environment.numeroMaxRecordPerTabellaMacro;
   numeroDiPagineTotali : number = 0;
   paginaCorrente : number = 1;
   items: any[];
   arrayConNumerazionePaginePerFooter : Array<number>;//array di numeri consecuti x per sfruttare ngfor in html alla fine è come fare un for da 1 a tot
   paginaIniziale : number = environment.inizioDaPagina;
   inputName : string = '';
   numeroDiRecordTotali : number =0;
   numeroMassimopagineDelFooter : number=environment.numeroMassimopagineDelFooter;
   numeroPagineMassimoPerQuestoFooter : number = 1;//in caso ci siano meno o più pagine di quelle consentite si definisce questo nell'init
   primaPaginaFooter : number = 1;
   ultimaPaginaFooter : number = 1;
 	public data: any;
	public weather: any;

  constructor(public macroSettimanaliService: MacroSettimanaliService) { }
 

  ngOnInit() {
	
	  this.macroSettimanaliService.getAll().subscribe((data: {}) => {
		  this.macroSettimanali = data;
	  })
	  
	  this.items=this.macroSettimanali;

		//va a leggere l'array totale
		this.macroSettimanaliService.getArray()
		.subscribe(
		(result: Array<MacroSettimanali>) => { 
				this.macro= new Array(result.length);//setta l'array
						//definisce valori
						this.numeroDiRecordTotali = (this.macro.length);
						this.definisciPageNumber(this.macro.length);
						this.definisciNumeroPagineMassimoPerQuestoFooter(this.numeroDiPagineTotali);
						this.definisciPrimaEUltimaPaginaFooter(this.numeroPagineMassimoPerQuestoFooter, this.paginaCorrente);
						this.definisciPrimaPaginaDiDati(result);
						this.definisciArraypagineDelFooter(this.primaPaginaFooter, this.ultimaPaginaFooter);
						//ciclo per trasferire in array ma non serve a niente
						//perchè lo fa dopo i metodi normali che si chiedono quNTO è LUNGO ECC...
						// result.forEach(element => {
						// 	this.macro[this.i]=element;
						// 	this.i++;
						// 	console.log('for--', this.macro[(this.i)-1].data);
						// });
				
				//console.log('success', result);
				this.macro = result
		},
		(error: any) => { 
			console.log('error', error);
		}
		)

		this.refreshItems();

  }

//quando doc pronto
  	 ngAfterViewInit(): void {
	// 	  alert("ngAfterViewInit");
	// 	   $('#tabellaMacro').dataTable( {
	// 		'language': {
	// 			"decimal": ",",
	// 			"thousands": "."
    //     }
	// } );
	
    //    $('#tabellaMacro').css({'background-color': 'yellow', 'font-size': '200%'});
	
			//questo viene prima del caricamento dei dati
			// $(document).ready(function() {
			// 	alert("ok");			
			// } );

			// //questa prorpio non viene cagata
			// function linkFormatter(value, row) {
			// 	alert("functionFormatterInteger");
			// return "value"+value;
			// }

	 }

definisciPageNumber(numeroDiRecordTotali : number){
	this.numeroDiPagineTotali = parseInt(""+ (numeroDiRecordTotali / this.numeroRecordPerPagina));
						if(numeroDiRecordTotali % this.numeroRecordPerPagina != 0){
							this.numeroDiPagineTotali ++;
				}
					if(this.numeroDiPagineTotali  < this.pages){
					this.pages =  this.numeroDiPagineTotali;
				}
				console.log('definito numeroDiPagineTotali da funzione in ' + this.numeroDiPagineTotali);
}


definisciPrimaPaginaDiDati(result : MacroSettimanali[]){
	this.items= new Array(this.numeroRecordPerPagina);//setta l'array	
			//riempe array con dati delle prima pagina			
			result.forEach(element => {
				if(this.i<this.numeroRecordPerPagina){
					this.items[this.i]=element;
					this.i++;
				}							
				//console.log('for--', this.macro[(this.i)-1].data);
			});
}


definisciNumeroPagineMassimoPerQuestoFooter(numeroPagineTotali : number){
	if (this.numeroDiPagineTotali>=this.numeroMassimopagineDelFooter){
		this.numeroPagineMassimoPerQuestoFooter=this.numeroMassimopagineDelFooter;	
	}else{
		this.numeroPagineMassimoPerQuestoFooter=this.numeroDiPagineTotali;
	}
	console.log('numeroPagineMassimoPerQuestoFooter='+this.numeroPagineMassimoPerQuestoFooter);
}

definisciPrimaEUltimaPaginaFooter(numeroPagineMassimoPerQuestoFooter :  number, paginaCorrente :  number){
	let intSetPagineRichiesta = Math.floor(paginaCorrente/numeroPagineMassimoPerQuestoFooter);
	console.log('numeroPagineMassimoPerQuestoFooter {} set pagina richiesta {} pagina corrente {}',numeroPagineMassimoPerQuestoFooter,intSetPagineRichiesta,paginaCorrente);
	//controlo anche che non sia in numero massiom per quell serie es. 5 di 1-2-3-4-5, allora non cambia
	if (paginaCorrente==numeroPagineMassimoPerQuestoFooter)
		intSetPagineRichiesta--;
		
	if (intSetPagineRichiesta==0){
		//primo set
		this.primaPaginaFooter = 1;
		this.ultimaPaginaFooter = this.numeroPagineMassimoPerQuestoFooter;
		console.log('prrimo set footer prima pagina {} ultima pagina {}',this.primaPaginaFooter,this.ultimaPaginaFooter);
	}else{
		//sucessivo set di pagine
		this.primaPaginaFooter = (intSetPagineRichiesta*this.numeroPagineMassimoPerQuestoFooter)+1;
		this.ultimaPaginaFooter = 2*this.numeroPagineMassimoPerQuestoFooter;
		console.log('secuessivo set footer prima pagina {} ultima pagina {}',this.primaPaginaFooter,this.ultimaPaginaFooter);
	}
}	

definisciArraypagineDelFooter(primapagina : number, ultimapagina : number){
	//setta array
	this.arrayConNumerazionePaginePerFooter = new Array((ultimapagina-primapagina)+1);//setta l'array

	//le pagine devono essere multipli del massimo 


	let contatore = 0;
	for (let i = primapagina; i <= ultimapagina; i++) {
		this.arrayConNumerazionePaginePerFooter[contatore]=i;
		contatore++;
	}

	// this.arrayConNumerazionePaginePerFooter.forEach(element => {
	// 	console.log('indice pagina..{}', element);
	// });
}



   fillArray(): any{
      var obj = new Array();
      for(var index = this.paginaIniziale; index< this.paginaIniziale + this.pages; index ++) {
                  obj.push(index);
      }
      return obj;
   }

   refreshItems(){
	this.items = this.macroSettimanali.slice((this.paginaCorrente - 1)*this.numeroRecordPerPagina, (this.paginaCorrente) * this.numeroRecordPerPagina);	
	this.definisciPrimaEUltimaPaginaFooter(this.numeroPagineMassimoPerQuestoFooter, this.paginaCorrente);
	this.definisciArraypagineDelFooter(this.primaPaginaFooter, this.ultimaPaginaFooter);
   }

   prevPage(){
      if(this.paginaCorrente>1){
         this.paginaCorrente --;
      } 
      if(this.paginaCorrente < this.paginaIniziale){
         this.paginaIniziale = this.paginaCorrente;
      }
      this.refreshItems();
   }
   nextPage(){
      if(this.paginaCorrente < this.numeroDiPagineTotali){
            this.paginaCorrente ++;
      }
      if(this.paginaCorrente >= (this.paginaIniziale + this.pages)){
         this.paginaIniziale = this.paginaCorrente - this.pages + 1;
      }
 
      this.refreshItems();
   }
    setPage(index : number){
         this.paginaCorrente = index;
         this.refreshItems();
    }


	integerFormatter(valore: number){
		//console.log('valore da mettere intero--'+valore);
		let x = Math.round(valore);
		//console.log('valore modificATO intero--'+x);
		return x;
		//return  parseInt(valore,10);
	}
}
