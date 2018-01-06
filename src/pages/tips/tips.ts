import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, PopoverController, ViewController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

import { AngularFire,FirebaseListObservable } from 'angularfire2';



@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html'
})
export class TipsPage {

	tips:FirebaseListObservable<any>;


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
  	this.tips = ngFire.database.list("/tips");
  }




}
