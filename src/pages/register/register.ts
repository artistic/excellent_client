import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { NavController, AlertController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Auth } from '../../providers/auth';
import md5 from 'crypto-md5';
import { Forgot } from "../forgot/forgot";
import { AuthPage } from '../auth/auth';
import { BookingsPage } from '../bookings/bookings';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: "register.html",
  selector: 'page-register'
})
export class Register {

  public registerForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  fullnameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  profilePhoto: any;
  tel: any;
  vehicles: any;
  bookings: any;
  profilePicture: any = "https://www.gravatar.com/avatar/";

  constructor(public navCtrl: NavController, public authService: Auth, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  doRegister(){
    this.submitAttempt = true;

    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      this.authService.register(

        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.fullname,
        this.registerForm.value.profilePhoto,
        this.registerForm.value.tel,
        this.registerForm.value.vehicles,
        this.registerForm.value.bookings

      ).then( authService => {

        this.navCtrl.setRoot(AuthPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}