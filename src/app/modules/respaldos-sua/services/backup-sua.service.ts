import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BackupSUAModel } from '../models/BackupSUAModel';

@Injectable({
  providedIn: 'root'
})
export class BackupSuaService {

  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }


  getSUA() {
    return this.http.get(`${this.baseUrl}/backupSua`);
  }

  postSUA(sua: BackupSUAModel) {
    return this.http.post(`${this.baseUrl}/backupSua`, sua);
  }

  putSUA(sua: BackupSUAModel) {
    return this.http.put(`${this.baseUrl}/backupSua/${sua.id}`, sua);
  }

  deleteSUA(id: number) {
    return this.http.delete(`${this.baseUrl}/backupSua/${id}`);
  }
}
