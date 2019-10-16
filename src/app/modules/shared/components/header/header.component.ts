import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit() {
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
