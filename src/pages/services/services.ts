import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, PopoverController, ViewController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

import { TipsPage } from '../tips/tips';
import { AvailablePages } from '../available/available';
import { ServiceDetail } from '../service-detail/service-detail';
import { AngularFire,FirebaseListObservable } from 'angularfire2';



@Component({
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class ServicesPage {

	services:FirebaseListObservable<any>;


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
  }

  //go to Register
  goTips() {
  this.navCtrl.push(TipsPage);
  }



  goToServiceDetail(services) {
  this.navCtrl.push(ServiceDetail, services);
}

goToAvailable() {
  this.navCtrl.push(AvailablePages);
}


}
