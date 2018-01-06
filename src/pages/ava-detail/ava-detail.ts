import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';


import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Auth } from '../../providers/auth';
import firebase from 'firebase';



@Component({
  selector: 'page-avadetail',
  templateUrl: 'ava-detail.html'
})
export class AvaDetailPage {
	private displayUser : string;

	avaInfo: any;
	ava:FirebaseListObservable<any>;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public ngFire: AngularFire
  )
  {
  	this.displayUser = firebase.auth().currentUser.uid;
    console.log (this.displayUser);


    this.ava = ngFire.database.list("/available");
  this.avaInfo = navParams.data;

  }



}
