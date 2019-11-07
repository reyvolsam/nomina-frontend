import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog/company',
    loadChildren: () => import('./modules/catalogs/company/company.module').then(m => m.CompanyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog/departments',
    loadChildren: () => import('./modules/catalogs/department/department.module').then(m => m.DepartmentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog/jobs',
    loadChildren: () => import('./modules/catalogs/job/job.module').then(m => m.JobModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog/contractTypes',
    loadChildren: () => import('./modules/catalogs/contractTypes/contractTypes.module').then(m => m.ContractTypesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog/contributionBases',
    loadChildren: () => import('./modules/catalogs/contributionBases/contributionBases.module').then(m => m.ContributionBasesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog/employeeTypes',
    loadChildren: () => import('./modules/catalogs/employee-types/employee-types.module').then(m => m.EmployeeTypesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog/workShifts',
    loadChildren: () => import('./modules/catalogs/workShifts/workShifts.module').then(m => m.WorkShiftsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog/paymentMethods',
    loadChildren: () => import('./modules/catalogs/method-payments/method-payments.module').then(m => m.MethodPaymentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog/discountTypes',
    loadChildren: () => import('./modules/catalogs/discount-types/discount-types.module').then(m => m.DiscountTypesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog/periodTypes',
    loadChildren: () => import('./modules/catalogs/period-types/period-types.module').then(m => m.PeriodTypesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule),
    canActivate: [AuthGuard]
  },
  {
      path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
