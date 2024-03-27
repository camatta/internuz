import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoavaliacaoService {

  constructor(private http: HttpClient) { }

  enviarAutoavaliacao(autoavaliacaoData: any): Observable<any> {
    return this.http.post<any>(`${environment.URL_API}/api/autoavaliacoes`, autoavaliacaoData);
  }
}
