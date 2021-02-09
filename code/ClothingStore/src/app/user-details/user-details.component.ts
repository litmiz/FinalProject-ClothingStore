import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  updateDetailsForm;
  userDetails: User = new User();
  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    this.updateDetailsForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: [''],
      country: [''],
      city: [''],
      address: [''],
    })
  }

  ngOnInit(): void {
    this.api.getUserDetails().subscribe(res => {
      console.log(res);
      this.userDetails = res;
      this.updateDetailsForm.patchValue({
        fullName: this.userDetails.fullName,
        email: this.userDetails.email,
        phoneNumber: this.userDetails.phoneNumber,
        country: this.userDetails.country,
        city: this.userDetails.city,
        address: this.userDetails.address,
      });
    });
  }

  updateDetails() {
    this.userDetails.fullName = this.updateDetailsForm.controls.fullName.value;
    this.userDetails.email = this.updateDetailsForm.controls.email.value;
    this.userDetails.phoneNumber = this.updateDetailsForm.controls.phoneNumber.value;
    this.userDetails.country = this.updateDetailsForm.controls.country.value;
    this.userDetails.city = this.updateDetailsForm.controls.city.value;
    this.userDetails.address = this.updateDetailsForm.controls.address.value;
    console.log(JSON.stringify(this.userDetails));
    this.api.updateUserDetails(this.userDetails).subscribe(res => {
      console.log(res);
    });
  }

}
