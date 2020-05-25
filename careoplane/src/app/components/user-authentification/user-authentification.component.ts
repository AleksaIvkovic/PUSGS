import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

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
  confirmPasswordFormControl = new FormControl(null, [Validators.required]); //, this.comparePasswords.bind(this)

  isProfile = false;
  isEdit = false;
  loggedInUser: any;
  isChangePassword = false;
  isAdmin = false;

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
      this.loggedInUser = this.userService.getLoggedInUser();
      this.isAdmin = this.loggedInUser.type !== undefined ? true : false;
    } else {
      this.isChangePassword = true;
    }
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      'username': this.isProfile ? new FormControl({'value': this.loggedInUser.userName, disabled: !this.isEdit}) : new FormControl(null, [Validators.required]),
      'email': this.isProfile ? new FormControl({'value': this.loggedInUser.email, disabled: !this.isEdit}, [Validators.required, Validators.email]) : new FormControl(null, [Validators.required, Validators.email]),
      'password': this.isProfile ? new FormControl({'value': null, disabled: !this.isEdit}, this.isChangePassword ? Validators.required : null) : new FormControl(null, [Validators.required]),
      'confirmPassword': this.isProfile ? new FormControl({'value': null, disabled: !this.isEdit}, this.isChangePassword ? Validators.required : null) : this.confirmPasswordFormControl,
      'oldPassword': this.isProfile ? new FormControl({'value': null, disabled: !this.isEdit}, this.isChangePassword ? Validators.required : null) : new FormControl(null),
      'name': this.isProfile ? new FormControl({'value': this.loggedInUser.name, disabled: !this.isEdit}) : new FormControl(null, [Validators.required]),
      'surname': this.isProfile ? new FormControl({'value': this.loggedInUser.surname, disabled: !this.isEdit}) : new FormControl(null, [Validators.required]),
      'city': this.isProfile ? new FormControl({'value': this.loggedInUser.city, disabled: !this.isEdit}) :  new FormControl(null, [Validators.required]),
      'phone': this.isProfile ? new FormControl({'value': this.loggedInUser.phoneNumber, disabled: !this.isEdit}) : new FormControl(null, [Validators.required]),
    }, 
    {validators: ConfirmPasswordValidator.MatchPassword});

    this.confirmPasswordFormControl.valueChanges
    .subscribe(
      (data: string) => {
        this.confirmPassword = data;
      }
    );
  }

  // comparePasswords(control: FormControl): {[s: string]: boolean} {
  //   //Ako je dobro onda null, ako je lose {'Lose': true}
  //   if (!this.registerForm) {
  //     return null;
  //   }

  //   // if (!control.get('password'))
  //   // return null;
  //   // const password: string = control.get('password').value;
  //   // const confirmPassword: string = control.get('confirmPassword').value; 
  //   // if (password !== confirmPassword) {
  //   //   control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
  //   // }
  //   if (this.registerForm.value['password'] === control.value) {
  //     return null;
  //   } else {
  //     return {'noMatch': true};
  //   }
  // }

  onEdit() {
    this.isEdit = true;
    this.registerForm.controls.email.enable();
    this.registerForm.controls.oldPassword.enable();
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
      if (this.isChangePassword && this.registerForm.value['oldPassword'] !== '') {
        if (!this.userService.checkPassword(this.registerForm.value['oldPassword'])) {
          this.registerForm.patchValue({
            oldPassword: '',
          });
          this._snackBar.open('Old password is invalid', 'OK', {
            duration: 5000,
          });
          return;
        } else {
          if (this.registerForm.value['password'] === '') {
            this._snackBar.open('New password is invalid', 'OK', {
              duration: 5000,
            });
            return;
          }
          this.userService.updatePassword(this.registerForm.value['password']);
        }
      }
        this.userService.updateUser(
          this.loggedInUser.userName,
          this.registerForm.value['email'],
          // this.registerForm.value['password'],
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

        this.registerForm.patchValue({
          oldPassword: '',
          password: '',
          confirmPassword: ''
        });

        this.registerForm.markAsPristine();
  
        this._snackBar.open('User Data updated successfully', 'OK', {
          duration: 5000,
        });
    } else {
      let user = new User(
        'regular',
        this.registerForm.value['username'],
        this.registerForm.value['email'],
        this.registerForm.value['password'],
        this.registerForm.value['name'],
        this.registerForm.value['surname'],
        this.registerForm.value['city'],
        this.registerForm.value['phone'],
      );
  
      this.userService.register(user).subscribe(
        (response: any) => {
          if (response.succeeded) {
            this.registerForm.reset();
            this._snackBar.open('Please verify your e-mail address', 'OK', {duration: 5000,});
            this.router.navigate(['/main']);
        } else {
          response.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this._snackBar.open('Username is already taken', 'OK', {duration: 5000,});
                break;

              default:
                this._snackBar.open(element.description, 'OK', {duration: 5000,});
                break;
            }
          });
        }
        },
        error => {
          console.log(error);
        });
    }
  }

  onCancel() {
    this.registerForm.patchValue({
      email: this.loggedInUser.email,
      oldPassword: '',
      password: '',
      confirmPassword: '',
      name: this.loggedInUser.name,
      surname: this.loggedInUser.surname,
      city: this.loggedInUser.city,
      phone: this.loggedInUser.phoneNumber,
    });
    this.registerForm.controls.email.disable();
    this.registerForm.controls.oldPassword.disable();
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
