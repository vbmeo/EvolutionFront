import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import {MacroSettimanaliService } from '../services/macro-settimanali.service';
import {macroSettimanaliI} from '../model/macrosettimanalii';//già interfaccia

// TODO: Replace this with your own data model type
export interface MacroTabellaItem {
	name: string;
	id: number;
	  
}

// TODO: replace this with real data from your applicatio 
const EXAMPLE_DATA: MacroTabellaItem[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
];




/**
 * Data source for the MacroTabella view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MacroTabellaDataSource extends DataSource<any> {
 
   dataAny : any = this.macroSettimanaliService.getAllMacro();	
   //data: macroSettimanaliI[] =new Array<macroSettimanaliI>(200);//originale
   paginator: MatPaginator;
   sort: MatSort;

//   dataSource = new MacroTabellaDataSource(this.macroSettimanaliService);
   displayedColumns = ['id', 'data'];

  constructor(public macroSettimanaliService: MacroSettimanaliService) {
	super();
  }

  

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect( ): Observable<macroSettimanaliI[]> {

	this.macroSettimanaliService.getAllMacro().subscribe(data2 => {
				var arrayDiUtenti3: macroSettimanaliI[] = [];
				data2.forEach(function(element) {
					console.log("inserisco in array da json  '" + element.id) + "'";
						arrayDiUtenti3.push(element);
					});

					this.dataAny.sort = this.sort;
					this.dataAny.paginator = this.paginator;

					 const dataMutations = [
					observableOf(this.dataAny),
					 //this.paginator.page//legge dall'html le pagine del paginetor
					// this.sort.sortChanges
					];

			   });
		
    // Combine everything that affects the rendered data into one update
	// stream for the data-table to consume.
	// this.macroSettimanaliService.getAllMacro().subscribe(
	// 	(data2 => {this.dataAny = data2;}));

    // CONST DATAMUTATIONS = [
    //  THIS.MACROSETTIMANALISERVICE.GETALL(),
    //   THIS.PAGINATOR.PAGE,
    //   THIS.SORT.SORTCHANGE
    // ];

    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData(this.getSortedData([...this.data]));
	// }));
	return this.dataAny;
  }



  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
	private getPagedData(data: any[]) {
		const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
		return data.splice(startIndex, this.paginator.pageSize);
	}

//   /**
//    * Sort the data (client-side). If you're using server-side sorting,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
  private getSortedData(data: any[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
	}
	

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
