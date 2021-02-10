import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  private _success = new Subject<string>();
  successMessage = '';
  showAlert: boolean = false;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(private router: Router) {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(10000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      const navigation = this.router.getCurrentNavigation();
      this.showAlert = navigation.extras.state ? navigation.extras.state.showAlert : false;
      if (this.showAlert) {
        this._success.next("Your order was received. You can view the order status in your details page. We also send you updates via email.");
      }
    });
  }

  ngOnInit(): void {

  }
}
