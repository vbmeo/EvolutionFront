import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {macroSettimanaliI} from '../model/Macrosettimanalii';//già interfaccia


import { environment } from '../../environments/environment'; //il file dove sono contenute costanti come gli indirizzi server json
//import { Subscription } from 'rxjs';

const API_EVOLUTION_MACRO_GETALL = environment.urlBase + environment.urlMacro;

@Injectable({
  providedIn: 'root'
})
export class MacroSettimanaliService {
	

	constructor(private http: HttpClient) { }


	// Http Options
	httpOptions = {
		headers: new HttpHeaders({
		'Content-Type': 'application/json'
		})
	}  

	getArray() : macroSettimanaliI[]{
	    this.http.get<macroSettimanaliI[]>(API_EVOLUTION_MACRO_GETALL).subscribe(data2 => {
				var arrayDiUtenti3: macroSettimanaliI[] = [];
				data2.forEach(function(element) {
					console.log("inserisco in array da json  '" + element.id) + "'";
						arrayDiUtenti3.push(element);
					});
				return arrayDiUtenti3;
			   });
		return null;
	}

//prima rotirnava una lista di macrosettimanali, ma giocando tutto su any funzina ugualmente
//e si esclude il vincolo con macrosettimanali... non importa definirlo
// HttpClient API get() method => Fetch employees list
	getAll(): Observable<any> {
		return this.http.get(API_EVOLUTION_MACRO_GETALL)
		.pipe(
		retry(1),
		catchError(this.handleError)
		)
	}

	getAllMacro() : Observable<macroSettimanaliI[]>{
		return this.http.get<macroSettimanaliI[]>(API_EVOLUTION_MACRO_GETALL);
	}


     // Error handling 
	handleError(error) {
		let errorMessage = '';
		if(error.error instanceof ErrorEvent) {
		// Get client-side error
		errorMessage = error.error.message;
		} else {
		// Get server-side error
		errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		window.alert(errorMessage);
		return throwError(errorMessage);
	}






}
