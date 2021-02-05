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
  sentToServerMsg;
  cv;
  cvHint = 'Add your CV';

  constructor(private formBuilder:FormBuilder, private api:ApiService) {
    this.contactForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      queryType: ['0', Validators.required],
      queryContent: [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  fileChoose(event) {
    if (event.target.value) {
      this.cv = <File>event.target.files[0];
      this.cvHint = this.cv.name;
    }
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
    this.api.sendQuery(newQuery, this.cv).subscribe(res => {
      console.log("I DOOOOOOOOOOO");
      this.sentToServerMsg = "Your query has been received and will be answered ASAP."
    })
  }

}
