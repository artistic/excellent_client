import { Injectable, NgModule, ErrorHandler} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';



/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  private data : any;
	public fireAuth: any;
	public userData: any;
  email : any;
  password : any;
  fullname: any;
  photo: any;
  tel: any;
  vehicles: any;
  bookings: any;


  constructor(public http: Http)
  {
  this.fireAuth = firebase.auth();
  this.userData = firebase.database().ref('/userData');

  }


  // create a method
  viewUser (userDataId: any)  {
      var userRef = this.userData.child(userDataId);
      return userRef.once('value');

  }



  register(
    email: string,
    password: string,
    fullname: any,
    photo: any,
    tel: any,
    vehicles: any,
    bookings: any

  ): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userData.child(newUser.uid).set(
        {
          email: email,
          fullname: email,
          photo: 'assets/img/user.jpg',
          tel: '+27',
          vehicles: [
            {
              "vehicle_type":"type_here",
              "vehicle_make":"make here",
              "vehicle_plate":"Plate here",
              "vehicle_image":"Image here"
            }
          ],
          bookings: [
            {
              "booking_date":"date here",
              "vehicle_id":"vehicle",
              "wash_type":"wash type",
              "wash_price":"Price",
              "wash_agent":"Agent Named",
              "wash_confirm":"Confirm",
              "wash_status":"status"
            }
          ]

        }
        );

      });
  }

  resetPassword(email: string): any {
  return this.fireAuth.sendPasswordResetEmail(email);
}




}
