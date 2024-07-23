import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ValuationParameter } from './valuation-parameters.model';

@Injectable({
  providedIn: 'root',
})
export class CoinValuationParametersService {
  baseUrl: string = 'http://localhost:3001/coin-valuation-parameters';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 8000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  fetch(): Observable<ValuationParameter[]> {
    return this.http.get<ValuationParameter[]>(this.baseUrl);
  }

  fetchById(id: string): Observable<ValuationParameter> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ValuationParameter>(url);
  }

  create(parameter: ValuationParameter): Observable<ValuationParameter> {
    return this.http.post<ValuationParameter>(this.baseUrl, parameter);
  }

  update(parameter: ValuationParameter): Observable<ValuationParameter> {
    const url = `${this.baseUrl}/${parameter.id}`;
    return this.http.put<ValuationParameter>(url, parameter);
  }

  delete(parameter: ValuationParameter): Observable<ValuationParameter> {
    const url = `${this.baseUrl}/${parameter.id}`;
    return this.http.delete<ValuationParameter>(url);
  }
}
