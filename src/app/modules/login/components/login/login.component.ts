import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  submitted = false
  loading = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if(this.authService.isLoggedIn()) this.router.navigateByUrl('')

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true

    if (this.loginForm.invalid) {
      return;
    } else {
      this.loading = true

      this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (res) => {
          this.router.navigate(['']);
        },
        error => {
          this.loading = false
          Swal.fire('Error!', error.error.message, 'error')
        })
    }//

  }//

}
