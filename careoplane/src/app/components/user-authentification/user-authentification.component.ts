import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-authentification',
  templateUrl: './user-authentification.component.html',
  styleUrls: ['./user-authentification.component.css']
})
export class UserAuthentificationComponent implements OnInit {
  registerForm: FormGroup;
  hide1 = true;
  hide2 = true;
  confirmPassword: string;
  confirmPasswordFormControl = new FormControl(null, [Validators.required, this.comparePasswords.bind(this)]);

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'confirmPassword': this.confirmPasswordFormControl,
      'name': new FormControl(null, [Validators.required]),
      'surname': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required]),
    });
    this.confirmPasswordFormControl.valueChanges
    .subscribe(
      (data: string) => {
        this.confirmPassword = data;
      }
    );
  }

  comparePasswords(control: FormControl): {[s: string]: boolean} {
    //Ako je dobro onda null, ako je lose {'Lose': true}
    if (!this.registerForm) {
      return null;
    }

    // if (!control.get('password'))
    // return null;
    // const password: string = control.get('password').value;
    // const confirmPassword: string = control.get('confirmPassword').value; 
    // if (password !== confirmPassword) {
    //   control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    // }
    if (this.registerForm.value['password'] === control.value) {
      return null;
    } else {
      return {'Passwords do not match.': true};
    }
  }

  onSubmit() {

  }

}
