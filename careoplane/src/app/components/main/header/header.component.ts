import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from '../../log-in/log-in.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;
  isLoggedIn = false;
  isRentACarAdmin = false;
  isAirlineAdmin = false;
  isNewAdmin = false;

  constructor(
    private userService: UserService,
    private logInDialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.router.navigate(['/user-authentification']);
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
          this.user = this.userService.getLoggedInUser();
          this.checkUser();
        }
    })
  }

  checkUser() {
    this.isLoggedIn = true;
    if (this.user.type !== undefined) {
      if (this.user.type === 'rent-a-car') {
        this.isRentACarAdmin = true;
        if (this.user.company === '') {
          this.router.navigate(['main/new-rent-a-car-profile']);
          this.isNewAdmin = true;
        } else {
          this.router.navigate(['main/rent-a-car-profile']);
        }
      } else if (this.user.type === 'airline') {
        this.isAirlineAdmin = true;
        if(this.user.company === ''){
          this.router.navigate(['main/airline-profile/new']);
          this.isNewAdmin = true;
        }
        else{
          this.router.navigate(['main/airline-profile',this.user.company,'details']);
        }
      }
    } else {
      this.router.navigate(['/main']);
    }
  }

  onProfile() {
    this.router.navigate(['/main/user-profile']);
  }

  onLogOut() {
    this.isLoggedIn = false;
    this.isAirlineAdmin = false;
    this.isRentACarAdmin = false;
    this.userService.logOut();
    this.router.navigate(['/main']);
  }

}
