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

    private loggedInUser: any;

    private users: User[] = [
        this.user,
    ];

    getLoggedInUser() {
        return this.loggedInUser;
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

    addReservation(reservation: any){
        this.loggedInUser.reservations.push(reservation);
    }

    updateCompanyName(companyName: string) {
        let address = 'http://localhost:' + localStorage.getItem('port') + '/api/AppUsers/UpdateCompany/' + localStorage.getItem('username');
        return this.http
        .put(
            address,
            {company: companyName}
        );
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

    getUser() {
        let address = "http://localhost:" + localStorage.getItem('port') + '/api/AppUsers/GetUserProfile';
        return this.http.get(address);
    }

    externalLogin(formData){
        let address = "http://localhost:" + localStorage.getItem('port') + '/api/AppUsers/SocialLogin';
        return this.http.post(address, formData);
    }
}