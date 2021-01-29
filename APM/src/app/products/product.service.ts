import { IProduct } from './product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class ProductService {

	private productsUrl = 'api/products/products.json';
	constructor(private http: HttpClient) {}


	getProducts(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>(this.productsUrl).pipe(
			tap(data => console.log(`All: ${JSON.stringify(data)}`)),
			catchError(this.handleError)
		);
	}

	private handleError(err: HttpErrorResponse) {
		let errorMessage = '';
		if(err.error instanceof ErrorEvent) {
			// A client side or network error occured. Handle it accordingly
			errorMessage = `An error occured: ${err.error.message}`;
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what wend wrond,
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		}
		console.error(errorMessage);
		return throwError(errorMessage);

	}


}