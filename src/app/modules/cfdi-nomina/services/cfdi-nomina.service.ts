import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CFDIModel } from '../models/CFDIModel';

@Injectable({
  providedIn: 'root'
})
export class CfdiNominaService {

  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }


  getCFDI() {
    return this.http.get(`${this.baseUrl}/cfdiNomina`);
  }

  postCFDI(cfdi: CFDIModel) {
    return this.http.post(`${this.baseUrl}/cfdiNomina`, cfdi);
  }

  putCFDI(cfdi: CFDIModel) {
    return this.http.put(`${this.baseUrl}/cfdiNomina/${cfdi.id}`, cfdi);
  }

  deleteCFDI(id: number) {
    return this.http.delete(`${this.baseUrl}/cfdiNomina/${id}`);
  }
}
