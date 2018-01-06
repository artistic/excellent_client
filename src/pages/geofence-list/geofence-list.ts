import { Component } from "@angular/core";
import { NavController, Platform, MenuController } from "ionic-angular";
import { GeofenceDetailsPage } from "../geofence-details/geofence-details";
import { GeofenceService } from "../../services/geofence-service";
import { LocationTracker } from '../../providers/location-tracker';
import { Splashscreen } from "ionic-native";

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Auth } from '../../providers/auth';
import firebase from 'firebase';
import { Geofence } from "../../utils/interface";

@Component({
  selector: 'geofence-list-page',
  templateUrl: "geofence-list.html"
})
export class GeofenceListPage {
  isLoading: boolean = false;
  geofences: [Geofence];
  locations:FirebaseListObservable<any>;
  articles:FirebaseListObservable<any>;
  hazardTypes:any;
  displayUser:any;

  constructor(
    private nav: NavController,
    private geofenceService: GeofenceService,
    private platform: Platform,
    private menu: MenuController,
    public ngFire: AngularFire,
    public locationService: LocationTracker
  ) {

    this.displayUser = firebase.auth().currentUser.uid;
        console.log (this.displayUser);

    this.isLoading = true;
    this.platform.ready().then(() => {
      this.geofenceService.findAll()
        .then(geofences => {
          this.geofences = geofences;

          this.isLoading = false;
        })
        .catch(() => this.isLoading = false);
    });

    this.locations = ngFire.database.list("/locations");

    this.hazardTypes = [
          {name:"Wash N Go",imgURL:"washings.jpg"},
          {name:"Vacuum",imgURL:"vacuums.jpg"},
          {name:"Jumbo",imgURL:"jumbos.jpg"},
          {name:"Tyres",imgURL:"wheels.jpg"},

        ]
    this.articles = ngFire.database.list("/articles");

  }

  ionViewDidEnter() {
    this.menu.enable(true);
  }

  ionViewLoaded() {
    Splashscreen.hide();
  }

  ionViewDidLoad() {
        this.displayUser = firebase.auth().currentUser.uid;
        console.log (this.displayUser);
      }


  new(){

    console.log(this.locationService.lat);

        const geofence = this.geofenceService.create({
          longitude: this.locationService.lng,
          latitude: this.locationService.lat,
        });

        this.transitionToDetailsPage(geofence);

  }

  itemSelected(x) {
    console.log(x)
  }
  geofenceItemTapped(geofence) {
    this.transitionToDetailsPage(geofence);
  }

  transitionToDetailsPage(geofence) {
    this.nav.push(GeofenceDetailsPage, {
      geofence
    })
  }

  EditMe () {
    alert("Search Availaible in the Pro-Version Of Excellent Eco Carwash.");
  }

  Search() {
    alert("Search Availaible in the Pro-Version Of Excellent Eco Carwash.");
  }


}
