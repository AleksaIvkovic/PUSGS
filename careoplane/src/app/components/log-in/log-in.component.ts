import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  logInForm: FormGroup;
  hide = true;
  usermail: string;
  password: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {usermail: string, password: string},
    private dialogRef:MatDialogRef<LogInComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.logInForm = new FormGroup({
      'usermail': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
  }

  onLogin() {
    if (this.userService.logIn(this.logInForm.value['usermail'], this.logInForm.value['password'])) {
      this.dialogRef.close();
    } else {
      this.logInForm.patchValue({
        usermail: '',
        password: ''
      });
    }
  }

}
