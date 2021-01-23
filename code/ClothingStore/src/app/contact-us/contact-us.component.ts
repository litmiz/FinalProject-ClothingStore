import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Query } from '../query';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm;

  constructor(private formBuilder:FormBuilder, private api:ApiService) {
    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      queryType: ['0', Validators.required],
      CV: [''],
      queryContent: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  sendToServer(){
    console.log("asaf");
    const newQuery = new Query(
      this.contactForm.controls.fullName.value,
      this.contactForm.controls.email.value,
      this.contactForm.controls.queryType.value,
      this.contactForm.controls.queryContent.value,
    );
    console.log(newQuery);
    this.api.sendQuery(newQuery).subscribe(res => {
      console.log("I DOOOOOOOOOOO");
    })
  }

}
