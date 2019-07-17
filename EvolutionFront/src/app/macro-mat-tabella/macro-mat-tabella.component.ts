import {Component, OnInit, ViewChild} from '@angular/core';
//import {MatTableDataSource} from '@angular/material/table';
import {MacroSettimanaliService } from '../services/macro-settimanali.service';
import { Observable, of as observableOf, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';


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

@Component({
  selector: 'app-macro-mat-tabella',
  templateUrl: './macro-mat-tabella.component.html',
  styleUrls: ['./macro-mat-tabella.component.scss']
})
export class MacroMatTabellaComponent implements OnInit {
  //listaData : MatTableDataSource<any>;
  displayedColumns = ['id', 'name'];
  data: MacroTabellaItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;
  constructor(private macroSettimanaliService: MacroSettimanaliService) { }

  ngOnInit() {
	//   this.macroSettimanaliService.getAll().subscribe(list => {
	// 			let array = list.map(item =>{
	// 				return {
	// 					$id: item.id,
	// 					$data: item.data,
	// 					$calorie_sett : item.calorie_sett,
	//   					$carboidrati_sett: item.carboidrati_sett,
	//   					$proteine_sett: item.proteine_sett,
	// 					$grassi_sett: item.grassi_sett,
	// 					$alcool_sett: item.alcool_sett
	// 				};
	// 				this.listaData = new MatTableDataSource(array);
					
	// 			})
	// 		});

  }


  connect(): Observable<MacroTabellaItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

 
  private getPagedData(data: MacroTabellaItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

	private getSortedData(data: MacroTabellaItem[]) {
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
