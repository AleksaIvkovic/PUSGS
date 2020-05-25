import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Admin } from '../models/admin.model';
import { Subject } from 'rxjs';
import { VehicleReservation } from '../models/vehicle-reservation.model';
import { FlightReservation } from '../models/flight-reservation.model';
import { Vehicle } from '../models/vehicle.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient
    ) {}

    loggedInUserChanged = new Subject<User>();

    private user: User = new User(
        'regular',
        'testUsername',
        'test@gmail.com',
        'pass',
        'Name',
        'Surname',
        'City',
        '123456789'
    );

    // private userWithReservations: User = new User(
    //     'resUsername',
    //     'test@gmail.com',
    //     'pass',
    //     'Name',
    //     'Surname',
    //     'City',
    //     '123456789',
    //     [
    //         new VehicleReservation(
    //             new Vehicle('BMW', 'Car', 5, 2019, 200, 'Novi Sad', 0, [], false, 'INEX'),
    //             new Date(2020, 4, 25),
    //             'Novi Sad',
    //             new Date(2020, 4, 27),
    //             'Novi Sad',
    //             3,
    //             400
    //         ),
    //         new VehicleReservation(
    //             new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150, 'Novi Sad', 0, [], false, 'Europcar'),
    //             new Date(2020, 4, 26),
    //             'Novi Sad',
    //             new Date(2020, 4, 27),
    //             'Novi Sad',
    //             2,
    //             300
    //         ),
    //     ]
    // );

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
        'rent a car 1'
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
        'Lufthansa'
    )

    //private loggedInUser: any;
    private loggedInUser: any = this.airlineAdminWithoutComapny;
    // private loggedInUser;

    private users: User[] = [
        this.user,
        // this.userWithReservations
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
        return this.loggedInUser.userName;
    }

    getMockUpRentACarAdmin(): Admin {
        return this.loggedInUser;
    }

    // logIn(usermail: string, password: string): boolean {
    //     if (usermail === undefined || password === undefined) {
    //         return false;
    //     }
        
    //     let isMail = usermail.includes('@') ? true : false;
    //     for (let user of this.users) {
    //         if (isMail) {
    //             if (user.email === usermail && user.password === password) {
    //                 this.loggedInUser = user;
    //                 this.loggedInUserChanged.next(this.loggedInUser);
    //                 return true;
    //             }
    //         } else {
    //             if (user.username === usermail && user.password === password) {
    //                 this.loggedInUser = user;
    //                 this.loggedInUserChanged.next(this.loggedInUser);
    //                 return true;
    //             }
    //         }
    //     }

    //     for (let admin of this.admins) {
    //         if (isMail) {
    //             if (admin.email === usermail && admin.password === password) {
    //                 this.loggedInUser = admin;
    //                 this.loggedInUserChanged.next(this.loggedInUser);
    //                 return true;
    //             }
    //         } else {
    //             if (admin.username === usermail && admin.password === password) {
    //                 this.loggedInUser = admin;
    //                 this.loggedInUserChanged.next(this.loggedInUser);
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }

    logOut() {
        this.loggedInUser = null;
    }

    registerUser(newUser: User): boolean {
        for (let user of this.users) {
            if (user.userName === newUser.userName) {
                return false;
            }
        }
        this.users.push(newUser);
        this.loggedInUser = newUser; //Ovo je samo privremeno, mora prvo da potvrdi preko mejla
        return true;
    }

    checkPassword(password: string) {
        return password === this.loggedInUser.password;
    }

    updateUser(username: string, newEmail: string, newName: string, newSurname: string, newCity: string, newPhone: string) {
        let index = this.users.indexOf(this.loggedInUser);
        this.users[index].email = newEmail;
        // this.users[index].password = newPassword;
        this.users[index].name = newName;
        this.users[index].surname = newSurname;
        this.users[index].city = newCity;
        this.users[index].phoneNumber = newPhone;
        this.loggedInUser = this.users[index];
        this.loggedInUserChanged.next(this.users[index]);
    }

    updatePassword(newPassword: string) {
        let index = this.users.indexOf(this.loggedInUser);
        this.users[index].password = newPassword;
        this.loggedInUserChanged.next(this.users[index]);
    }

    updateCompanyName(companyName: string) {
        let address = 'http://localhost:' + localStorage.getItem('port') + '/api/AppUsers/UpdateCompany/' + localStorage.getItem('username');
        // var user: User = localStorage.getItem('user');
        // user.company = companyName;
        return this.http
        .put(
            address,
            {company: companyName}
        );
    }

    addReservation(reservation: any){
        this.loggedInUser.reservations.push(reservation);
    }

    register(user: User) {
        var body = {
            UserName: user.userName,
            Email: user.email,
            Password: user.password,
            Name: user.name,
            Surname: user.surname,
            PhoneNumber: user.phoneNumber,
            City: user.city,
            Role: user.role
        }
        let address = "http://localhost:" + localStorage.getItem('port') + '/api/AppUsers/Register';
        return this.http.post(address, body);
    }

    login(usermail: string, password: string) {
        var user = {
            Username: usermail,
            Password: password
        }
        let address = "http://localhost:" + localStorage.getItem('port') + '/api/AppUsers/Login';
        return this.http.post(address, user);
    }

    getUser(username: string) {
        let address = "http://localhost:" + localStorage.getItem('port') + '/api/AppUsers/' + username;
        return this.http.get(address);
    }
}