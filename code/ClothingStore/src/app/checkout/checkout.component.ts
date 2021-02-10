import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Order } from '../order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm;
  @Input() orderId;
  order: Order;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  pay() {
    this.order = new Order(
      this.orderId,
      this.checkoutForm.controls.country.value,
      this.checkoutForm.controls.city.value,
      this.checkoutForm.controls.address.value,
      "ordered"
    );
    console.log(this.order);

    this.api.editMyOrder(this.order).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/my-orders', {state: {showAlert: true}});
    });
  }

}
