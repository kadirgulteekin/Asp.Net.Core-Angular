import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createCheckoutForm();
  }

  createCheckoutForm() {
    const firstNameValidators = [Validators.required, Validators.minLength(3)];
    const lastNameValidators = [Validators.required, Validators.minLength(3)];
    const streetValidators = [Validators.required, Validators.minLength(8)];
    const cityValidators = [Validators.required, Validators.minLength(3)];
    const stateValidators = [Validators.required, Validators.minLength(3)];
    const zipCodeValidators = [Validators.required, Validators.minLength(3)];

    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, firstNameValidators],
        lastName: [null, lastNameValidators],
        street: [null, streetValidators],
        city: [null, cityValidators],
        state: [null, stateValidators],
        zipCode: [null, zipCodeValidators],
      }),
      deliveryForm : this.fb.group({
        deliveryMethod: [null, Validators.required],
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });
  }
}
