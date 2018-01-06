import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, PopoverController, ViewController, AlertController } from 'ionic-angular';

import { FaqDetailPage } from '../faq-detail/faq-detail';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Auth } from '../../providers/auth';
import * as firebase from 'firebase';



@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})
export class FaqPage {

  faqs:FirebaseListObservable<any>;
  private displayUser : string;

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


    this.faqs = ngFire.database.list("/faq");
   }

   goToFaqDetail(faq) {
    this.navCtrl.push(FaqDetailPage, faq);
   }



}
