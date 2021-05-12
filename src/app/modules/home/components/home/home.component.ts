import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { CompanyService } from '../../../../services/company/company.service';
import Swal from 'sweetalert2';

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

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(){
    this.companyService.get().subscribe((res: any) => {
      console.log(res);
      if (res.data.length > 0) {
        this.companyList = res.data
      }
    }, error => {
      Swal.fire('Error', error.error.message, 'error');
    })
  }

  selected(id: number){
    console.log('empresa seleccionada: ', id);
    this.idSelected = id;
  }

}
