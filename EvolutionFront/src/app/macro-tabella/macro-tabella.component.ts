import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MacroTabellaDataSource } from './macro-tabella-datasource';//, MacroTabellaItem
import {macroSettimanaliI} from '../model/macrosettimanalii';//già interfaccia
import {MacroSettimanaliService } from '../services/macro-settimanali.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-macro-tabella',
  templateUrl: './macro-tabella.component.html',
  styleUrls: ['./macro-tabella.component.scss']
})
export class MacroTabellaComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<macroSettimanaliI>;
  dataSource: MatTableDataSource<any>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'data'];

 constructor(public macroSettimanaliService: MacroSettimanaliService) {
  }

  ngOnInit() {
	//this.dataSource = new MacroTabellaDataSource(this.macroSettimanaliService);

	this.macroSettimanaliService.getAllMacro().subscribe(list => {
				let array = list.map(item =>{
					return {
						$id: item.id,
						$data: item.data,
						$calorie_sett : item.calorie_sett,
	  					$carboidrati_sett: item.carboidrati_sett,
	  					$proteine_sett: item.proteine_sett,
						$grassi_sett: item.grassi_sett,
						$alcool_sett: item.alcool_sett
					};
					this.dataSource = new MatTableDataSource(array);
				})
			});


  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
