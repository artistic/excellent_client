import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, PopoverController, ViewController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

import { TipsPage } from '../tips/tips';
import { WashPage } from '../wash/wash';
import { AngularFire,FirebaseListObservable } from 'angularfire2';



@Component({
  selector: 'page-servicedetails',
  templateUrl: 'service-detail.html'
})
export class ServiceDetail {
	ServiceInfo: any;
	services:FirebaseListObservable<any>;
	about:FirebaseListObservable<any>;


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
  	this.services = ngFire.database.list("/services");
  	this.ServiceInfo = navParams.data; //here you'll get the data you passed from your home.ts
  }


   goToWash(about) {
  this.navCtrl.push(WashPage, about);
}







}
