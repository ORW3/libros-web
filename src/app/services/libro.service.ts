import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LibroService {

  baseUri:string = 'https://api-libros-8nqi.onrender.com/api';
  headers = new HttpHeaders()
    .set('Content-Type','application/json');

  constructor(private http:HttpClient) { }

  //método para agregar un libro
  agregarLibro(data):Observable<any>{
    let url = `${this.baseUri}/agregar`;
    return this.http.post(url,data)
      .pipe(catchError(this.errorManager));
  }

  //métodos para obtener todos los libros
  getLibros(){
    let url = `${this.baseUri}/libros`;
    return this.http.get(url)
  }

  //método para obtener un libro por su id
  getLibro(id):Observable<any> {
    let url = `${this.baseUri}/libro/${id}`;
    return this.http.get(url,{headers: this.headers})
      .pipe(map((res:Response) => {
        return res || {};
      }),
      catchError(this.errorManager)
    )
  }

  //método para actualizar un libro
  updateLibro(id,data): Observable<any> {
    let url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put(url,data,
      {headers: this.headers})
      .pipe(catchError(this.errorManager))
  }

  //método para eliminar un libro
  deleteLibro(id):Observable<any>{
    let url = `${this.baseUri}/eliminar/${id}`;
    return this.http.delete(url,
      {headers: this.headers})
      .pipe(catchError(this.errorManager))
  }

  errorManager(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //obtenemos el error del lado del cliente
      errorMessage = error.error.message;
    } else {
      //obtenemos el error del lado del server
      errorMessage = `Error: ${error.status}
      Mensaje: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
