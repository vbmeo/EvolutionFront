import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



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

	getArray() {
	   return this.http.get(API_EVOLUTION_MACRO_GETALL);
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
