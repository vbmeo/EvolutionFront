/**
 * Alla base di tutto non importa avere un array di oggetti, any va sempre bene e consente di non definire oggetti specifici
 * il che porta la possibilità di usare una classe astratta generica
 */


import { Component, OnInit,NgModule } from '@angular/core';
import {MacroSettimanaliService } from '../services/macro-settimanali.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-macrosettimanali',
  templateUrl: './macrosettimanali.component.html',
  styleUrls: ['./macrosettimanali.component.css']
})
export class MacrosettimanaliComponent implements OnInit {
  //listaMacro: Observable<MacroSettimanali[]>;
  	listaOggettiObservable: any = [];
 // macro : MacroSettimanali [];
  	i: number = 0;
   	numeroRecordPerPagina : number = environment.numeroMaxRecordPerTabellaMacro;
   	numeroDiPagineTotali : number = 0;
	paginaCorrente : number = 1;
	items: any[];//contiene i record da visualizzare 
	arrayConNumerazionePaginePerFooter : Array<number>;//array di numeri consecuti x per sfruttare ngfor in html alla fine è come fare un for da 1 a tot
	paginaIniziale : number = environment.inizioDaPagina;
	inputName : string = '';
	numeroDiRecordTotali : number =0;
	numeroMassimopagineDelFooter : number=environment.numeroMassimopagineDelFooter;
	numeroPagineMassimoPerQuestoFooter : number = 1;//in caso ci siano meno o più pagine di quelle consentite si definisce questo nell'init
	primaPaginaFooter : number = 1;
	ultimaPaginaFooter : number = 1;

  constructor(public macroSettimanaliService: MacroSettimanaliService) { }
 

  ngOnInit() {
	
	//   this.macroSettimanaliService.getAll().subscribe((data: {}) => {
	// 	  this.macroSettimanali = data;
	//   })
	  

		//va a leggere l'array totale
		this.macroSettimanaliService.getAll()
		.subscribe(
		result => { 
				//------------questa parte intera serve a settare quei parametri che servono per l'impaginazione----
				//oltre a generare la prima pagina di dati
				//this.macro= new Array(result.length);//setta l'array
						//definisce valori
						this.listaOggettiObservable = result;//sempre per prima
						this.numeroDiRecordTotali = (result.length);
						this.definisciPageNumber(result.length);
						this.definisciNumeroPagineMassimoPerQuestoFooter(this.numeroDiPagineTotali);
						this. refreshItems()//che svolge anche altre funzioni come definisciPrimaEUltimaPaginaFooter e definisciArraypagineDelFooter
						
				//console.log('success', result);
				//this.macro = result
				
		},
		(error: any) => { 
			console.log('error', error);
		}
		)

		this.refreshItems();

  }

//quando doc pronto
  	 ngAfterViewInit(): void {
	 }

definisciPageNumber(numeroDiRecordTotali : number){
	this.numeroDiPagineTotali = parseInt(""+ (numeroDiRecordTotali / this.numeroRecordPerPagina));
						if(numeroDiRecordTotali % this.numeroRecordPerPagina != 0){
							this.numeroDiPagineTotali ++;
				}
				console.log('definito numeroDiPagineTotali da funzione in ' + this.numeroDiPagineTotali);
}


// definisciPrimaPaginaDiDati(result : any[]){
// 	this.items= new Array(this.numeroRecordPerPagina);//setta l'array	
// 			//riempe array con dati delle prima pagina			
// 			result.forEach(element => {
// 				if(this.i<this.numeroRecordPerPagina){
// 					this.items[this.i]=element;
// 					this.i++;
// 				}							
// 				//console.log('for--', this.macro[(this.i)-1].data);
// 			});
// }


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
		console.log('primo set footer prima pagina {} ultima pagina {}',this.primaPaginaFooter,this.ultimaPaginaFooter);
	}else{
		//non primo set di pagine
		this.primaPaginaFooter = (intSetPagineRichiesta*this.numeroPagineMassimoPerQuestoFooter)+1;
		this.ultimaPaginaFooter = (intSetPagineRichiesta+1)*this.numeroPagineMassimoPerQuestoFooter;
		//controllo se oltre fine pagine
		if (this.ultimaPaginaFooter>this.numeroDiPagineTotali)
			this.ultimaPaginaFooter=this.numeroDiPagineTotali
		console.log('secuessivo set ('+(intSetPagineRichiesta+1)+')footer prima pagina '+this.primaPaginaFooter+' ultima pagina '+this.ultimaPaginaFooter);
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



   refreshItems(){
	this.items = this.listaOggettiObservable.slice((this.paginaCorrente - 1)*this.numeroRecordPerPagina, (this.paginaCorrente) * this.numeroRecordPerPagina);	
	this.definisciPrimaEUltimaPaginaFooter(this.numeroPagineMassimoPerQuestoFooter, this.paginaCorrente);
	this.definisciArraypagineDelFooter(this.primaPaginaFooter, this.ultimaPaginaFooter);
   }

   prevPage(){
      if(this.paginaCorrente>1){
         this.paginaCorrente --;
	  } 
	  console.log('paginaCorrente--'+this.paginaCorrente)
      this.refreshItems();
   }
   nextPage(){
      if(this.paginaCorrente < this.numeroDiPagineTotali){
			this.paginaCorrente ++;		
	  }
	  console.log('paginaCorrente--'+this.paginaCorrente)
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
