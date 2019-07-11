import { Component, OnInit,NgModule } from '@angular/core';
import {MacroSettimanaliService } from '../services/macro-settimanali.service';
import { MacroSettimanali } from '../Model/MacroSettimanali';
//import {Headers, Response} from '@angular/http';

@Component({
  selector: 'app-macrosettimanali',
  templateUrl: './macrosettimanali.component.html',
  styleUrls: ['./macrosettimanali.component.css']
})
export class MacrosettimanaliComponent implements OnInit {
  //listaMacro: Observable<MacroSettimanali[]>;
  macroSettimanali: any = [];
  macro : MacroSettimanali [];
  employees: Array<any>;
  i: number = 0;
	//paginazione tabella
   //filteredItems : Product[];
   pages : number = 1;
   pageSize : number = 7;
   pageNumber : number = 0;
   currentIndex : number = 1;
   items: any[];
   pagesIndex : Array<number>;//array di numeri consecuti x per sfruttare ngfor in html alla fine è come fare un for da 1 a tot
   pageStart : number = 1;
   inputName : string = '';
   totalItem : number =0;

   
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
						this.totalItem = (this.macro.length);
						this.definisciPageNumber(this.macro.length);
						
						this.definisciPrimaPaginaDiDati(result);
						this.definisciPageIndex(result);
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

definisciPageNumber(macro2lenght : number){
	this.pageNumber = parseInt(""+ (macro2lenght / this.pageSize));
						if(macro2lenght % this.pageSize != 0){
							this.pageNumber ++;
				}
					if(this.pageNumber  < this.pages){
					this.pages =  this.pageNumber;
				}
				console.log('definito pageNumber da funzione in ' + this.pageNumber);
}


definisciPrimaPaginaDiDati(result : MacroSettimanali[]){
	this.items= new Array(this.pageSize);//setta l'array	
			//riempe array con dati delle prima pagina			
			result.forEach(element => {
				if(this.i<this.pageSize){
					this.items[this.i]=element;
					this.i++;
				}							
				//console.log('for--', this.macro[(this.i)-1].data);
			});
}

	

definisciPageIndex(result : MacroSettimanali[]){
	//setta array
	this.pagesIndex = new Array(this.pageNumber);//setta l'array
	for (let i = 1; i <= this.pageNumber; i++) {
		this.pagesIndex[i]=i;
	}

	this.pagesIndex.forEach(element => {
		console.log('indice pagina..{}', element);
	});
}



   fillArray(): any{
      var obj = new Array();
      for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
                  obj.push(index);
      }
      return obj;
   }

   refreshItems(){
	this.items = this.macroSettimanali.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
	this.pagesIndex =  this.fillArray();
   }

   prevPage(){
      if(this.currentIndex>1){
         this.currentIndex --;
      } 
      if(this.currentIndex < this.pageStart){
         this.pageStart = this.currentIndex;
      }
      this.refreshItems();
   }
   nextPage(){
      if(this.currentIndex < this.pageNumber){
            this.currentIndex ++;
      }
      if(this.currentIndex >= (this.pageStart + this.pages)){
         this.pageStart = this.currentIndex - this.pages + 1;
      }
 
      this.refreshItems();
   }
    setPage(index : number){
         this.currentIndex = index;
         this.refreshItems();
    }


	integerFormatter(valore: number){
		console.log('valore da mettere intero--'+valore);
		let x = Math.round(valore);
		console.log('valore modificATO intero--'+x);
		return x;
		//return  parseInt(valore,10);
	}
}
