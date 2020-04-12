import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from '../../log-in/log-in.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private logInDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onLogIn() {
    let dialogRef = this.logInDialog.open(
      LogInComponent
    );

    dialogRef.afterClosed()
    .subscribe(
      result => {
        console.log(result);
    })
  }

}
