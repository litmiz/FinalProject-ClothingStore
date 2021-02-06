import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }


  userDetails: any = {}
  msg: string;

  registerUser() {
    if (this.userDetails.email && this.userDetails.password) {
      this.auth.register(this.userDetails).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate([''])
        },
        err => {
          if (err) {
            this.msg = 'Register Failed!'
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
