import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { CompanyService } from '../../../../services/company/company.service';
import Swal from 'sweetalert2';
import { SharedServices } from 'src/app/services/shared-services/shared-services.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apps = [
    { nombre: 'Crear Empleado', icono: 'person_add_alt_1', url: '/employee/create' },

  ]

  companyList: Company[] = [];
  idSelected: Number = 0;
  currentUser: User = null;
  loader: boolean = false;
  messageListEmpty:string = null;
  loaderCompanySelected: boolean = false;

  constructor(
    private companyService: CompanyService,
    private sharedServices: SharedServices
  ) { 
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idSelected = this.currentUser.default_company_id;
    console.log(this.currentUser); 
  }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(){
    this.loader = true;
    this.companyService.get().subscribe((res: any) => {
      this.loader = false;
      console.log(res);
      if (res.data.length > 0) {
        this.companyList = res.data
      }else {
        this.messageListEmpty = res.message
      }
    }, error => {
      this.loader = false;
      Swal.fire('Error', error.error.message, 'error');
    })
  }

  selected(id: number){
    if (this.currentUser.default_company_id != id) {
      this.sharedServices.loadingSwal();
      this.loaderCompanySelected = true;
      console.log('empresa seleccionada: ', id);
      this.sharedServices.updateCompanyIdSession(id).subscribe((res: any) => {
        this.loaderCompanySelected = false;
        Swal.close();
        this.idSelected = id;
        this.currentUser.default_company_id = id;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      },error => {
        this.loaderCompanySelected = false;
        Swal.fire('Error', error.error.message, 'error');
  
      }); 
    }
    // this.idSelected = id;
  }

}
