import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedServices } from 'src/app/services/shared-services/shared-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User
  userMenu = [];

  submenu = []

  constructor(
    private sharedServices: SharedServices,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit() {
    this.submenu = []

    this.sharedServices.getmenus()
    .subscribe(
    res => {
      console.log(res)
      this.userMenu = res.data

      if(this.userMenu.length == 0){
        Swal.fire('¡Atención!', res.message, 'warning')
      } else {
        this.userMenu = res.data
      }
    },
    error => {
      console.log(error.error.message)
      Swal.fire('¡Error!', error.error.message, 'warning')
    });

    this.userMenu.forEach(v => {
      if(this.router.url == v.url) v.active = true
    })



  }

  OpensubMenu(i)
  {
    this.submenu = this.userMenu[i].submenu
  }

  logout()
  {
    console.log('logout')
    this.authService.logout()
    .subscribe(
      (res) => {
        this.router.navigate(['login']);
      },
      error => {
        Swal.fire('Error!', error.error.message, 'error')
      })
    this.router.navigate(['/login'])
  }//

}
