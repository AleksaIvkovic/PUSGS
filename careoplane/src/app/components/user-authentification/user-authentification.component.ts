import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-authentification',
  templateUrl: './user-authentification.component.html',
  styleUrls: ['./user-authentification.component.css']
})
export class UserAuthentificationComponent implements OnInit {
  registerForm: FormGroup;
  hide1 = true;
  hide2 = true;
  hide3 = true;
  confirmPassword: string;
  confirmPasswordFormControl = new FormControl(null, [Validators.required, this.comparePasswords.bind(this)]);

  isProfile = false;
  isEdit = false;
  loggedInUser: User;
  isChangePassword = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userService.loggedInUserChanged.subscribe(
      (user: User) => {
        this.loggedInUser = user;
      }
    );
    if (this.router.url.includes('main')) {
      this.isProfile = true;
      this.loggedInUser = this.userService.getMockUpUser();
    } else {
      this.isChangePassword = true;
    }
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      'username': this.isProfile ? new FormControl({'value': this.loggedInUser.username, disabled: !this.isEdit}) : new FormControl(null, [Validators.required]),
      'email': this.isProfile ? new FormControl({'value': this.loggedInUser.email, disabled: !this.isEdit}, [Validators.required, Validators.email]) : new FormControl(null, [Validators.required, Validators.email]),
      'password': this.isProfile ? new FormControl({'value': null, disabled: !this.isEdit}) : new FormControl(null, [Validators.required]),
      'confirmPassword': this.isProfile ? new FormControl({'value': null, disabled: !this.isEdit}) : this.confirmPasswordFormControl,
      'name': this.isProfile ? new FormControl({'value': this.loggedInUser.name, disabled: !this.isEdit}) : new FormControl(null, [Validators.required]),
      'surname': this.isProfile ? new FormControl({'value': this.loggedInUser.surname, disabled: !this.isEdit}) : new FormControl(null, [Validators.required]),
      'city': this.isProfile ? new FormControl({'value': this.loggedInUser.city, disabled: !this.isEdit}) :  new FormControl(null, [Validators.required]),
      'phone': this.isProfile ? new FormControl({'value': this.loggedInUser.phoneNumber, disabled: !this.isEdit}) : new FormControl(null, [Validators.required]),
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

  onEdit() {
    this.isEdit = true;
    this.registerForm.controls.email.enable();
    this.registerForm.controls.password.enable();
    this.registerForm.controls.confirmPassword.enable();
    this.registerForm.controls.name.enable();
    this.registerForm.controls.surname.enable();
    this.registerForm.controls.city.enable();
    this.registerForm.controls.phone.enable();
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    if (this.isEdit) {
      this.userService.updateUser(
        this.loggedInUser.username,
        this.registerForm.value['email'],
        this.registerForm.value['password'],
        this.registerForm.value['name'],
        this.registerForm.value['surname'],
        this.registerForm.value['city'],
        this.registerForm.value['phone'],
      );
      this.registerForm.controls.email.disable();
      this.registerForm.controls.password.disable();
      this.registerForm.controls.confirmPassword.disable();
      this.registerForm.controls.name.disable();
      this.registerForm.controls.surname.disable();
      this.registerForm.controls.city.disable();
      this.registerForm.controls.phone.disable();
      this.isEdit = false;
      this.isChangePassword = false;

      this._snackBar.open('User Data updated successfully', 'OK', {
        duration: 5000,
      });
    } else {
      let user = new User(
        this.registerForm.value['username'],
        this.registerForm.value['email'],
        this.registerForm.value['password'],
        this.registerForm.value['name'],
        this.registerForm.value['surname'],
        this.registerForm.value['city'],
        this.registerForm.value['phone'],
      );
  
      if (this.userService.registerUser(user)) {
        this.router.navigate(['/main']);
      } else {
        this.registerForm.patchValue({
          'username': '',
        })
        this._snackBar.open('Username already taken', 'OK', {
          duration: 5000,
        });
      }
    }
  }

  onCancel() {
    this.registerForm.patchValue({
      email: this.loggedInUser.email,
      password: '',
      confirmPassword: '',
      name: this.loggedInUser.name,
      surname: this.loggedInUser.surname,
      city: this.loggedInUser.city,
      phone: this.loggedInUser.phoneNumber,
    });
    this.registerForm.controls.email.disable();
    this.registerForm.controls.password.disable();
    this.registerForm.controls.confirmPassword.disable();
    this.registerForm.controls.name.disable();
    this.registerForm.controls.surname.disable();
    this.registerForm.controls.city.disable();
    this.registerForm.controls.phone.disable();
    this.isEdit = false;
    this.isChangePassword = false;
    
  }

}
