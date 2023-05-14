import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css'],
})
export class CheckoutDeliveryComponent {

  deliveryMethods: IDeliveryMethod[];

  @Input() checkoutForm: FormGroup;

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.checkoutService
      .getDeliveryMethods()
      .subscribe((dm: IDeliveryMethod[]) => {
        this.deliveryMethods = dm;
      },error => {
        console.log(error);
      });
  }
}
