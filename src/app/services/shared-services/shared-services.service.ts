import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from 'src/app/models/Company';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SharedServices {

  baseUrl = environment.baseUrl
  company_list: Company[] = []

  responsebase64 = {
    base64: null,
    extension: null
  }

  constructor(private http: HttpClient) { }

  getmenus() {

    return this.http.post<any>(this.baseUrl + '/getMenus', {})
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }

  getJobsFromDepartment(company_id: Number, department_id: Number) {
    return this.http.post<any>(this.baseUrl + '/getJobsFromDepartment', { company_id: company_id, department_id: department_id })
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//

  getDepartmentFromCompany(company_id: Number) {
    return this.http.post<any>(this.baseUrl + '/getDepartmentFromCompany', { company_id: company_id })
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//

  getCatalogsFromCompany(company_id: Number) {
    return this.http.post<any>(this.baseUrl + '/getCatalogsFromCompany', { company_id: company_id })
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//

  getCompanyCatalogFromUser() {
    return this.http.get<any>(this.baseUrl + '/catalogCompanies', {})
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//

  getCompanyCatalogFromUserDepartments() {
    return this.http.get<any>(this.baseUrl + '/catalogCompaniesDepartments', {})
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//


  loadingSwal() {
    Swal.fire({
      title: '¡Espere por favor!',
      type: 'info',
      backdrop: false,
      confirmButtonText: '',
      onOpen: () => {
        Swal.showLoading();
      },
    })
  }

  showMessageDelete(text) {
    return Swal.fire({
      title: '¡Alerta!',
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar',
      backdrop: false
    })
  }

  /**
   * convert filo to base64
   * return Promise -> object {base64: fileBase64, extension: 'pdf'}
   */
  toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      if (file) {
        let ext = file.name.split('.');
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          let base = reader.result;
          this.responsebase64.extension = ext[ext.length - 1];
          resolve(base)
        };
        reader.onerror = error => reject(error);
      } else {
        resolve(null)
      }
    })
  };



  showMessageConfirm(text) {
    return Swal.fire({
      title: '¡Atención!',
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar!',
      cancelButtonText: 'Cancelar',
      backdrop: false
    })
  }

}////
