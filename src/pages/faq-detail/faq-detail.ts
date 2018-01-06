import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';


import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Auth } from '../../providers/auth';
import * as firebase from 'firebase';



@Component({
  selector: 'page-faqdetail',
  templateUrl: 'faq-detail.html'
})
export class FaqDetailPage {
	private displayUser : string;

	FaqInfo: any;
	faq:FirebaseListObservable<any>;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public ngFire: AngularFire
  )
  {
  	this.displayUser = firebase.auth().currentUser.uid;
    console.log (this.displayUser);


    this.faq = ngFire.database.list("/faq");
  this.FaqInfo = navParams.data;

  }



}
