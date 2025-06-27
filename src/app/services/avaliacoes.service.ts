import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AvaliacoesService {

  constructor(private http: HttpClient) { }

  getHistoricoAvaliacoesPorUsuario(nomeUsuario: string): Observable<any[]> {
    const params = new HttpParams().set('nomeUsuario', nomeUsuario);
    return this.http.get<any[]>(environment.URL_API + '/api/avaliacoes', { params });
  }

  getUltimaAvaliacaoPorUsuario(nomeUsuario: string): Observable<any> {
    return this.http.get<any>(environment.URL_API + `/api/avaliacoes/ultima?usuario=${nomeUsuario}`);
  }

  getTotalAvaliacoes(): Observable<number> {
    return this.http.get<{ count: number }>(environment.URL_API + '/api/avaliacoes/count')
    .pipe(map(res => res.count));
  }
}
