import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { NgModule, ErrorHandler } from "@angular/core";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { GeofenceDetailsPage } from "../pages/geofence-details/geofence-details";
import { GeofenceListItem } from "../components/geofence-list-item/geofence-list-item";
import { GeofenceListPage } from "../pages/geofence-list/geofence-list";
import { GeofenceService } from "../services/geofence-service";
import { Register } from "../pages/register/register";
import { Forgot } from "../pages/forgot/forgot";
import { Settings } from "../pages/settings/settings";
import { Auth } from '../providers/auth';
import { MyApp } from "./app.component";
import { LoggingModePage } from  "../pages/logging-mode/logging-mode";
import { FindHazardsPage } from '../pages/find-hazards/find-hazards';
import { AuthPage} from '../pages/auth/auth';
import { AllHazardsPage } from '../pages/all-hazards/all-hazards';
import { ServicesPage } from '../pages/services/services';
import { FaqPage } from '../pages/faq/faq';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEdit } from '../pages/profile-edit/profile-edit';
import { TipsPage } from '../pages/tips/tips';
import { VehiclePage } from '../pages/vehicle/vehicle';
import { AvailablePages } from '../pages/available/available';
import { AvaDetailPage } from '../pages/ava-detail/ava-detail';
import { BookingsPage } from '../pages/bookings/bookings';
import { ServiceDetail } from '../pages/service-detail/service-detail';
import { WasherDetail } from '../pages/washer-detail/washer-detail';
import { BookingDetailPage } from '../pages/booking-detail/booking-detail';
import { FaqDetailPage } from '../pages/faq-detail/faq-detail';
import { VehicleDetailPage } from '../pages/vehicle-detail/vehicle-detail';
import { WashPage } from '../pages/wash/wash';
import { ResetPage } from '../pages/reset/reset';
import { LocationTracker } from '../providers/location-tracker';
import { DataAnalysisPage } from '../pages/data-analysis/data-analysis';
import { PresentationModePage } from "../pages/presentation-mode/presentation-mode";
import { AllHazardsPopoverPage } from '../pages/all-hazards-popover/all-hazards-popover';
import { Camera } from '../providers/camera';
import * as firebase from 'firebase';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation } from '@ionic-native/geolocation';


export const firebaseConfig = {
  apiKey: "AIzaSyAgHsJ-xPJPjph3fMkoBk6Bf7jhS26svSI",
    authDomain: "ecocarwash-a7a46.firebaseapp.com",
    databaseURL: "https://ecocarwash-a7a46.firebaseio.com",
    projectId: "ecocarwash-a7a46",
    storageBucket: "ecocarwash-a7a46.appspot.com",
    messagingSenderId: "553901386041"
};

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '8c1bf586'
  },
  'push': {
    'sender_id': '553901386041',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#ff0000'
      }
    }
  }
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};



const components = [
  MyApp,
  GeofenceDetailsPage,
  GeofenceListPage,
  GeofenceListItem,
  LoggingModePage,
  FindHazardsPage,
  AuthPage,
  AllHazardsPage,
  ServicesPage,
  FaqPage,
  ProfilePage,
  ProfileEdit,
  TipsPage,
  VehiclePage,
  AvailablePages,
  AvaDetailPage,
  BookingsPage,
  ServiceDetail,
  BookingDetailPage,
  FaqDetailPage,
  VehicleDetailPage,
  WashPage,
  WasherDetail,
  ResetPage,
  DataAnalysisPage,
  PresentationModePage,
  AllHazardsPopoverPage,
  Register,
  Forgot,
  Settings
]

@NgModule({
  declarations: components,

  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    IonicStorageModule.forRoot()
  ],

  bootstrap: [IonicApp],
  entryComponents: components,
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeofenceService,
    Auth,
    LocationTracker,
    Camera,
    StatusBar,
    SocialSharing,
    Geolocation,
    Push,
    SplashScreen
  ]
})
export class AppModule {}