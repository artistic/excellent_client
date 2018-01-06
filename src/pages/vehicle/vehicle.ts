import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, PopoverController, ViewController, AlertController } from 'ionic-angular';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import { Auth } from '../../providers/auth';
import * as firebase from 'firebase';
import { Camera } from 'ionic-native';


const cameraOpts = {
      quality: 60,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      targetWidth:720,
      correctOrientation: true,
      allowEdit: true,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
}



@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html'
})
export class VehiclePage {

  vehicleInfo: any;
  color : any;
  vehicleId : any;
  vehicle:FirebaseListObservable<any>;
  locations:FirebaseListObservable<any>;
  private displayUser : string;
  private displayUsr : string;
  vehicles:FirebaseListObservable<any>;
  vhcls:FirebaseListObservable<any>;
  public imageLocalURL:any;

  constructor(
    public navCtrl: NavController,
        public navParams: NavParams,
        private menu: MenuController,
        public ngFire: AngularFire,
        public platform:Platform,
        public popoverCtrl: PopoverController,
        public alertCtrl: AlertController,
        public auth: Auth,
        public viewCtrl: ViewController,
    )
  {
    this.vehicleInfo = navParams.data;
    this.vehicleId = this.vehicleInfo.$key;
    console.log(this.vehicleId);
    this.locations = ngFire.database.list("/locations");
    this.displayUser = firebase.auth().currentUser.uid;
    this.displayUsr = firebase.auth().currentUser.uid;
    this.vehicles = ngFire.database.list(`/userData/${this.displayUser}/vehicles`);
    this.vhcls = ngFire.database.list(`/userData/${this.displayUsr}/vehicles`);
    console.log (this.displayUser);
    this.vehicle = ngFire.database.list("/vehicle");
   }


   takePic() {
  let storageRef = firebase.storage().ref();
  console.log(storageRef)
  Camera.getPicture(cameraOpts).then((image) => {

      this.imageLocalURL = 'data:vehicles/jpeg;base64,' + image;
    }).catch(err => {
      alert(err);
    });
}


  addVehicle():void {
      let prompt = this.alertCtrl.create ({
          title : 'Add A New Vehicle',

          inputs: [
            { name : 'make', placeholder: "Make" },
            { name : 'plates', placeholder: "Plates" },
            { type:'radio', label:this.vehicleInfo.color, value:'1', name : 'color'},
        
          ],
          buttons: [
           {
              text: "Cancel",
              //handler : data => { console.log("cancel clicked");}
           },
           {
              text: "Create Vehicle",
              handler: data => {
                  this.vehicles.push ({
                    make: data.make,
                    plates: data.plates,
                    image : "assets/img/vehicle.png",
                    color : "0",
                    type : "0"
                   })
              }
           }
          ]
      })
      prompt.present();
  }

  editColor(vehicleInfo):void {
      let prompt = this.alertCtrl.create ({
          title : 'Update Vehicle Color',

          inputs : [
        { type:'radio', label:'Black', value:'1'},
        { type:'radio', label:'Blue', value:'2'},
        { type:'radio', label:'Green', value:'3'},
        { type:'radio', label:'Other', value:'4'},
        { type:'radio', label:'Red', value:'5'},
        { type:'radio', label:'Silver', value:'6'},
        { type:'radio', label:'White', value:'7'}
      ],
          buttons: [
           {
              text: "Cancel",
              //handler : data => { console.log("cancel clicked");}
           },
           {
              text: "Update Color",
              handler: (data:string) => {
                  let newColor:string = data;


                  
                  this.vehicles.update (this.vehicleId, {
                    color : newColor
                   })
              }
           }
          ]
      })
      prompt.present();
  }

  editType(vehicleInfo):void {
      let prompt = this.alertCtrl.create ({
          title : 'Update Vehicle Type',

          inputs : [
        { type:'radio', label:'SUV Vehicle', value:'1'},
        { type:'radio', label:'Passenger Vehicle', value:'2'},
        { type:'radio', label:'Minibus Vehicle', value:'3'},
        { type:'radio', label:'Fleet Vehicle', value:'4'}
      ],
          buttons: [
           {
              text: "Cancel",
              //handler : data => { console.log("cancel clicked");}
           },
           {
              text: "Update Vehicle",
              handler: (data:string) => {
                  let newVehicle:string = data;


                  
                  this.vehicles.update (this.vehicleId, {
                    type : newVehicle
                   })
              }
           }
          ]
      })
      prompt.present();
  }

  editTyped(vehicleInfo):void {
      let prompt = this.alertCtrl.create ({
          title : 'Update Vehicle Type',

          message : 'Once a vehicle type has been selected it can not be changed. If the current vehicle type is not correct please delete the vehicle and create a new one',
          buttons: [
           {
              text: "Delete",
              handler: () => {
                this.vehicles.remove(this.vehicleId);
              }
           },
           {
              text: "OK",
              handler : data => { console.log("cancel clicked");}
           }
          ]
      })
      prompt.present();
  }

  editPlates(vehicleInfo):void {
      let prompt = this.alertCtrl.create ({
          title : 'Update Vehicle Plates',

          inputs: [
            {name : 'plates', placeholder: vehicleInfo.plates}

          ],
          buttons: [
           {
              text: "Cancel",
              //handler : data => { console.log("cancel clicked");}
           },
           {
              text: "Update Plates",
              handler: data => {
                  let newPlates:string = vehicleInfo.plates;

                  if (data.plates != '') {
                    newPlates = data.plates;
                  }

                  this.vehicles.update (this.vehicleId, {
                    plates : newPlates
                   })
              }
           }
          ]
      })
      prompt.present();
  }







}
