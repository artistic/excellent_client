import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { Auth } from '../../providers/auth';
import { LoggingModePage  } from '../logging-mode/logging-mode';
import { AllHazardsPage } from '../all-hazards/all-hazards';
import { BookingsPage } from '../bookings/bookings';
import { Register } from "../register/register";
import { Forgot } from "../forgot/forgot";

/*
  Generated class for the Auth page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  email:any;
  password:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ngFire: AngularFire) {


  }

  ionViewDidLoad() {
    console.log('ioniewDidLoad AuthPage');
  }


//implement this in auth.ts
  login() {
    this.ngFire.auth.login({
      email:this.email,
      password:this.password
    },
    {
      provider:AuthProviders.Password,
      method:AuthMethods.Password
    })
   .then((res)=>{
      console.log("Logged In" + JSON.stringify(res));

      let user = {
        email: res.auth.email,
        picture: res.auth.photoURL,
        uid:res.auth.uid
      };

      window.localStorage.setItem("user",JSON.stringify(user));
      this.navCtrl.setRoot(AllHazardsPage);
    })
    .catch((err)=>{
      console.log('Whoopsy Daisy!!' + err)
    })

  }

  //go to Register
  goToRegister() {
  this.navCtrl.push(Register);
  }

  //go to Forgot
  goToForgot() {
  this.navCtrl.push(Forgot);
  }

  // isLoggedIn() {

  // }


}
