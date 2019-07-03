import { Injectable,OnInit } from '@angular/core';
import {Output,EventEmitter} from '@angular/core';//per dati da qui a padre
//import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment'; //il file dove sono contenute costanti come gli indirizzi server json
//import { Subscription } from 'rxjs';
import { MacroSettimanali } from '../Model/MacroSettimanali';

const API_EVOLUTION_MACRO_GETALL = environment.urlBase + environment.urlMacro;

@Injectable({
  providedIn: 'root'
})
export class MacroSettimanaliService {
	listaMacro: Observable<MacroSettimanali[]>;
  
	@Output() eventoEmitter = new EventEmitter<MacroSettimanali[]>();
	
	
	
	constructor(private httpClient: HttpClient) { }



   public getAll(): Observable<MacroSettimanali[]> {
	   

        this.httpClient.get(API_EVOLUTION_MACRO_GETALL).subscribe((res)=>{
            console.log(res);
        });
	
	// 	var parsejson: Observable<Utenti[]> = laResponse.map(response => {
    //   return response.json();
    // 	});

    return null;
  }







}
