import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, PopoverController, ViewController, AlertController } from 'ionic-angular';

import { AvaDetailPage } from '../ava-detail/ava-detail';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Auth } from '../../providers/auth';
import firebase from 'firebase';



@Component({
  selector: 'page-available',
  templateUrl: 'available.html'
})
export class AvailablePages {

	available:FirebaseListObservable<any>;


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
  	)
  {


  	this.available = ngFire.database.list("/available");
   }


   goToAvailableDetail(available) {
    this.navCtrl.push(AvaDetailPage, available);
   }


}
