import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';



@Component({
  templateUrl: "settings.html"
})
export class Settings {
  private notificationText: string;
  private StartDate: string;
  private EndDate: string;



  constructor(
    private nav: NavController,
    navParams: NavParams,
    private menu: MenuController,
    public ngFire: AngularFire


  ) {


  }




}
