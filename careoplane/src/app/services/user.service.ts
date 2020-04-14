import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Admin } from '../models/admin.model';
import { Subject } from 'rxjs';
import { VehicleReservation } from '../models/vehicle-reservation.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    loggedInUserChanged = new Subject<User>();

    private user: User = new User(
        'testUsername',
        'test@gmail.com',
        'pass',
        'Name',
        'Surname',
        'City',
        '123456789'
    );

    private rentACarAdminWithCompany: Admin = new Admin(
        'admin123',
        'admin1@gmail.com',
        'admin',
        'rent-a-car',
        'UNI LINE TTR'
    );

    private rentACarAdminWithoutCompany: Admin = new Admin(
        'admin456',
        'admin2@gmail.com',
        'admin',
        'rent-a-car',
        ''
    );

    private airlineAdminWithComapny: Admin = new Admin(
        'jaty',
        'jaty@gmail.com',
        'admin',
        'airline',
        'Jat'
    )

    private airlineAdminWithoutComapny: Admin = new Admin(
        'lufty',
        'lufty@gmail.com',
        'admin',
        'airline',
        ''
    )

    private loggedInUser: any;
    // private loggedInUser;

    private users: User[] = [
        this.user
    ];

    private admins: Admin[] = [
        this.rentACarAdminWithCompany,
        this.rentACarAdminWithoutCompany,
        this.airlineAdminWithComapny,
        this.airlineAdminWithoutComapny
    ];

    getMockUpUser(): User {
        return this.user;
    }

    getLoggedInUser() {
        return this.loggedInUser;
    }

    getLoggedInUsername() {
        return this.loggedInUser.username;
    }

    getMockUpRentACarAdmin(): Admin {
        return this.loggedInUser;
    }

    logIn(usermail: string, password: string): boolean {
        if (usermail === undefined || password === undefined) {
            return false;
        }
        
        let isMail = usermail.includes('@') ? true : false;
        for (let user of this.users) {
            if (isMail) {
                if (user.email === usermail && user.password === password) {
                    this.loggedInUser = user;
                    this.loggedInUserChanged.next(this.loggedInUser);
                    return true;
                }
            } else {
                if (user.username === usermail && user.password === password) {
                    this.loggedInUser = user;
                    this.loggedInUserChanged.next(this.loggedInUser);
                    return true;
                }
            }
        }

        for (let admin of this.admins) {
            if (isMail) {
                if (admin.email === usermail && admin.password === password) {
                    this.loggedInUser = admin;
                    this.loggedInUserChanged.next(this.loggedInUser);
                    return true;
                }
            } else {
                if (admin.username === usermail && admin.password === password) {
                    this.loggedInUser = admin;
                    this.loggedInUserChanged.next(this.loggedInUser);
                    return true;
                }
            }
        }
        return false;
    }

    logOut() {
        this.loggedInUser = null;
    }

    registerUser(newUser: User): boolean {
        for (let user of this.users) {
            if (user.username === newUser.username) {
                return false;
            }
        }
        this.loggedInUser = newUser; //Ovo je samo privremeno, mora prvo da potvrdi preko mejla
        return true;
    }

    updateUser(username: string, newEmail: string, newPassword: string, newName: string, newSurname: string, newCity: string, newPhone: string) {
        let index = this.users.indexOf(this.loggedInUser);
        this.users[index].email = newEmail;
        this.users[index].password = newPassword;
        this.users[index].name = newName;
        this.users[index].surname = newSurname;
        this.users[index].city = newCity;
        this.users[index].phoneNumber = newPhone;
        this.loggedInUser = this.users[index];
        this.loggedInUserChanged.next(this.users[index]);
    }

    addVehicleReservation(reservation: VehicleReservation) {
        this.loggedInUser.reservations.push(reservation);
    }
}