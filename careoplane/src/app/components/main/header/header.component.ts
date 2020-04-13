import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from '../../log-in/log-in.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private logInDialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onLogIn() {
    let dialogRef = this.logInDialog.open(
      LogInComponent, {
        data: {usermail: '', password: ''}
      }
    );

    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        if (result !== "false") {
          //redirekcija na odredjenu stranicu ulogovanog korisnika
          this.router.navigate(['/main/user-profile']);
        }
    })
  }

}
