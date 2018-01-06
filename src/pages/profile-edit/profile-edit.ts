import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, PopoverController, ViewController, AlertController } from 'ionic-angular';
import md5 from 'crypto-md5';

import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Auth } from '../../providers/auth';
import * as firebase from 'firebase';





@Component({
  selector: 'page-profileedit',
  templateUrl: 'profile-edit.html',
  providers : [Auth]
})


export class ProfileEdit {

tel:FirebaseListObservable<any>;

public userPhotoUrl : any;
public userDisplayEmail : any;
public userDisplayName : any;
public userDisplayPhoto : any;
public userDisplayTel : any;
public userDisplayVehicles : any;
public userDisplayBookings : any;
email : any;



profilePicture: any = "https://www.gravatar.com/avatar/";



  constructor(
  	public navCtrl: NavController,
       public navParams: NavParams,
        private menu: MenuController,
        public ngFire: AngularFire,
        public platform:Platform,
        public popoverCtrl: PopoverController,
        public alertCtrl: AlertController,
        private nav: NavController,
        public viewCtrl: ViewController,
        public auth: Auth,

  	)
  	{
      this.tel = ngFire.database.list("/userData");

  	}

    ionViewWillEnter(){
          var myUserId = firebase.auth().currentUser.uid; // current user id
          this.displayUser (myUserId);
          console.log (myUserId);

        }

    displayUser (theUserId) {

      var that = this;
      this.auth.viewUser(theUserId).then(snapshot => {

        // get user photo
        //that.userPhotoUrl           =   snapshot.val().photo;
        that.userDisplayEmail         =   snapshot.val().email;
        that.userDisplayName          =   snapshot.val().fullname;
        that.userDisplayPhoto         =   snapshot.val().photo;
        that.userDisplayTel           =   snapshot.val().tel;
        that.userDisplayVehicles      =   snapshot.val().vehicles;
        that.userDisplayBookings      =   snapshot.val().bookings;
      })

    }






  emailChanged(){
        this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex');
    }


}
