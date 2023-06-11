import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder,private accountService:AccountService) {}

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressForValues();
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


  getAddressForValues(){
    this.accountService.getUserAddress().subscribe(address=>{
      if(address){
        console.log("address" , address)
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    },error => {
      console.log(error);
    })
  }
}
