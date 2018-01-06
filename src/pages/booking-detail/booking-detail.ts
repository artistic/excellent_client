import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, PopoverController, ViewController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { GeofenceService } from "../../services/geofence-service";
import { LocationTracker } from '../../providers/location-tracker';

import { TipsPage } from '../tips/tips';
import { BookingsPage } from '../bookings/bookings';
import { AngularFire,FirebaseListObservable } from 'angularfire2';

declare var google:any;

@Component({
  selector: 'page-bookingdetail',
  templateUrl: 'booking-detail.html'
})
export class BookingDetailPage {
	bookingInfo: any;
	icon:any;
  marker : any;
  latitude : any;
  map : any;
  longitude : any;
  private displayUsr : string;
  bookings:FirebaseListObservable<any>;


  constructor(
  	public navCtrl: NavController,
		   public navParams: NavParams,
		    private menu: MenuController,
		    public platform:Platform,
		    public popoverCtrl: PopoverController,
		    public alertCtrl: AlertController,
		    private nav: NavController,
		    private geofenceService: GeofenceService,
		    public viewCtrl: ViewController,
		    public ngFire: AngularFire,
		    public locationService: LocationTracker,
  ){
    this.displayUsr = firebase.auth().currentUser.uid;
  	this.bookingInfo = navParams.data; //here you'll get the data you passed from your home.ts
    this.bookings = ngFire.database.list(`/userData/${this.displayUser}/bookings`);
  }

  ionViewDidEnter() {

    let latitude = this.bookingInfo.wash_latitude;
    let longitude = this.bookingInfo.wash_longitude;
    let dataImg = this.bookingInfo.wash_image;

    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: latitude, lng: longitude },
      zoom: 18
    });

  
    let icon = {
    url: dataImg, // url
    scaledSize: new google.maps.Size(20, 20), // scaled size
    iconAnchor:   [12,12],
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
    };

    let marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map: this.map,
            icon: icon  
          });
    
  }

  editBooking(bookingInfo) {
    let prompt = this.alertCtrl.create ({
      message : 'Edit This Booking <br> <small>Once Booking have been confirmed no edits can be made</small>',
      inputs : [
        {name : 'wash_text', placeholder: bookingInfo.wash_text},
      ],
      buttons : [
        {
          text : "Cancel",
          handler : data => {
            console.log("cancel clicked");
          }
        },

        {
          text : "Update booking",
          handler : data => {
            let newCost:string = bookingInfo.wash_text;

            if(data.wash_text != '') {
              newCost = data.wash_text;
            }


            this.bookings.update(bookingInfo.$key,{
              wash_text: newCost
            })



          }
        }


      ]
    })

    prompt.present();
  }



}
