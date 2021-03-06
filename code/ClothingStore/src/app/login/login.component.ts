import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }


  userDetails: any = {}
  msg: string;

  loginUser() {
    if (this.userDetails.email && this.userDetails.password) {
      this.auth.login(this.userDetails).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate([''])
        },
        err => {
          if (err) {
            this.msg = 'LOGIN FAILED!'
          }
        }
      )
    }
    else {
      this.msg = "All Fields are required!"
    }
  }

  ngOnInit(): void {
  }

}