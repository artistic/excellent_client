import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, PopoverController, ViewController, AlertController } from 'ionic-angular';
import { ResetPage } from '../reset/reset';
import { ProfileEdit } from '../profile-edit/profile-edit';
import { BookingsPage } from '../bookings/bookings';
import { BookingDetailPage } from '../booking-detail/booking-detail';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Auth } from '../../providers/auth';
import { Camera } from 'ionic-native';
import { GeofenceListPage } from '../geofence-list/geofence-list';
import { VehiclePage } from '../vehicle/vehicle';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as firebase from 'firebase';



const cameraOpts = {
      quality: 60,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      targetWidth:720,
      correctOrientation: true,
      allowEdit: true,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
}

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers : [Auth]
})


export class ProfilePage {

tel:FirebaseListObservable<any>;
bookings:FirebaseListObservable<any>;
vehicles:FirebaseListObservable<any>;
vhcls:FirebaseListObservable<any>;
cat:string;

public userPhotoUrl : any;
public userDisplayEmail : any;
public userDisplayName : any;
public userDisplayPhoto : any;
public userDisplayTel : any;
public userDisplayVehicles : any;
public userDisplayBookings : any;
private displayUsr : string;
public imageLocalURL:any;
public uploadedImage:any = "";



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
        private socialSharing: SocialSharing,

    )
    {
      var myUserId = firebase.auth().currentUser.uid; // current user id
      this.displayUsr = firebase.auth().currentUser.uid;
      this.displayUser (myUserId);
      console.log (myUserId);
      this.tel = ngFire.database.list("/userData");
      this.bookings = ngFire.database.list(`/userData/${this.displayUsr}/bookings`,{
       query: {
         orderByChild: 'booking_date'
       }
     }

      );

      this.vehicles = ngFire.database.list(`/userData/${this.displayUsr}/vehicles`);
      this.vhcls = ngFire.database.list(`/userData/${this.displayUsr}/vehicles`);





    }


    displayUser (theUserId) {

      var that = this;
      this.auth.viewUser(theUserId).then(snapshot => {

        //that.userPhotoUrl           =   snapshot.val().photo;
        that.userDisplayEmail         =   snapshot.val().email;
        that.userDisplayName          =   snapshot.val().fullname;
        that.userDisplayPhoto         =   snapshot.val().photo;
        that.userDisplayTel           =   snapshot.val().tel;
        that.userDisplayBookings      =   snapshot.val().bookings;
      })

    }

    ionViewDidLoad() {
         this.cat = 'bookings';

    }

    shareInfo()
    {
      this.socialSharing.share("Excellent Eco Carwash", "Waterless Auto Detailing Service", "", "http://excellentecocarwash.co.za/app").
      then(() => {
        alert("Sharing success");
        // Success!
        }).catch(() => {
        // Error!
        alert("Share failed");
      });
    }



    takePic() {
      let storageRef = firebase.storage().ref();
      console.log(storageRef)
      Camera.getPicture(cameraOpts).then((image) => {

          this.imageLocalURL = 'data:image/jpeg;base64,' + image;
        }).catch(err => {
          alert(err);
        });
    }

    uploadPic() {
      let storageRef = firebase.storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      const imageRef = storageRef.child(`profiles/${filename}.jpg`);

      imageRef.putString(this.imageLocalURL, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {

        console.log(snapshot);
         this.uploadedImage = snapshot.downloadURL; //update the variable
         alert("Image Uploaded Successfully")
        })
        .catch(err =>{
            console.log(err);
          alert(imageRef)
        });
    }


    goToReset() {
      this.navCtrl.push(ResetPage);
    }

    goToEdit() {
      this.navCtrl.push(ProfileEdit);
    }

    goToHome() {
      this.navCtrl.push(BookingsPage);
    }

    goBookingDetail(bookings) {
      this.navCtrl.push(BookingDetailPage, bookings);
    }

    goVehicleDetail(vehicles) {
      this.navCtrl.push(VehiclePage, vehicles);
    }

    goToHazards(){
    this.navCtrl.push(GeofenceListPage);
  }

addVehicle():void {
      let prompt = this.alertCtrl.create ({
          title : 'Add A Vehicle',

          inputs: [
            { name : 'make', placeholder: "Make" },
            { name : 'plates', placeholder: "Plates" },
          ],
          buttons: [
           {
              text: "Cancel",
              //handler : data => { console.log("cancel clicked");}
           },
           {
              text: "Create Vehicle",
              handler: data => {
                  this.vhcls.push ({
                    make: data.make,
                    plates: data.plates,
                    image : "assets/img/vehicle.png",
                    color : "0",
                    type : "0"
                   })
              }
           }
          ]
      })
      prompt.present();
  }

  editName(userDisplayName,userDisplayTel):void {
      let prompt = this.alertCtrl.create ({
          title : 'Edit Profile Details',

          inputs: [
            {name : 'fullname', placeholder: userDisplayName},
            {name : 'tel', placeholder: userDisplayTel}

          ],
          buttons: [
           {
              text: "Cancel",
              //handler : data => { console.log("cancel clicked");}
           },
           {
              text: "Edit",
              handler: data => {
                  let newName:string = userDisplayName;
                  let newTel:string = userDisplayTel;

                  if (data.fullname != '') {
                    newName = data.fullname;
                  }
                  if (data.tel != '') {
                    newTel = data.tel;
                  }
                  this.tel.update (this.displayUsr, {
                    fullname : newName,
                    tel : newTel
                   })
              }
           }
          ]
      })
      prompt.present();
  }





}
