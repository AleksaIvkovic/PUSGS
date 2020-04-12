import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Admin } from '../models/admin.model';
import { Subject } from 'rxjs';

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

    private loggedInUser: User = this.user;

    private users: User[] = [
        this.user
    ];

    private rentACarAdmin: Admin = new Admin(
        'admin@gmail.com',
        'admin',
        'rent-a-car',
        'UNI LINE TTR'
    );

    getMockUpUser(): User {
        return this.user;
    }

    getMockUpRentACarAdmin(): Admin {
        return this.rentACarAdmin;
    }

    logIn(usermail: string, password: string): boolean {
        if (usermail === undefined || password === undefined) {
            return false;
        }
        
        let isMail = usermail.includes('@') ? true : false;
        for (let user of this.users) {
            if (isMail) {
                if (user.email === usermail && user.password === password) {
                    return true;
                }
            } else {
                if (user.username === usermail && user.password === password) {
                    return true;
                }
            }
        }
        return false;
    }

    registerUser(newUser: User): boolean {
        //Provera da li je slobodan username
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
}