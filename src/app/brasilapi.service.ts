import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cep } from './brasil.models';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {

  cepURL: string = 'https://viacep.com.br/ws/';

  constructor(private hhtp: HttpClient) { }

  listaUfs(cep: string): Observable<Cep> {
    const cepLimpo = cep.replace(/\D/g, '');
    return this.hhtp.get<Cep>(this.cepURL + cepLimpo + '/json');
  }
}
