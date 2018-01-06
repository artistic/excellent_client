import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, PopoverController, ViewController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

import { TipsPage } from '../tips/tips';
import { WashPage } from '../wash/wash';
import { BookingsPage } from '../bookings/bookings';
import { AngularFire,FirebaseListObservable } from 'angularfire2';



@Component({
  selector: 'page-washerdetails',
  templateUrl: 'washer-detail.html'
})
export class WasherDetail {
	WasherInfo: any;
	washer:FirebaseListObservable<any>;



  constructor(
  	public navCtrl: NavController,
		   public navParams: NavParams,
		    private menu: MenuController,
		    public platform:Platform,
		    public popoverCtrl: PopoverController,
		    public alertCtrl: AlertController,
		    private nav: NavController,
		    public viewCtrl: ViewController,
		    public ngFire: AngularFire,
  ){
  	this.washer = ngFire.database.list("/washer");
  	this.WasherInfo = navParams.data; //here you'll get the data you passed from your home.ts
  }





}
