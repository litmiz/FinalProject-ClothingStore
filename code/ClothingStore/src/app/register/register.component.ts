import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }


  userDetails: User = new User();
  msg: string;

  registerUser() {
    if (this.userDetails.email && this.userDetails.password) {
      console.log(`UserDetalis: ${JSON.stringify(this.userDetails)}`);
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
