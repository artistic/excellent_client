/*
  Declaration files are how the Typescript compiler knows about the type information(or shape) of an object.
  They're what make intellisense work and make Typescript know all about your code.

  A wildcard module is declared below to allow third party libraries to be used in an app even if they don't
  provide their own type declarations.

  To learn more about using third party libraries in an Ionic app, check out the docs here:
  http://ionicframework.com/docs/v2/resources/third-party-libs/

  For more info on type definition files, check out the Typescript docs here:
  https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
*/
declare module '*';
interface Window { geofence: any; TransitionType:any }
// Generated by typings
// Source: https://raw.githubusercontent.com/cowbell/cordova-plugin-geofence/master/typings/cordova-plugin-geofence.d.ts
interface TransitionType {
  ENTER: number;
  EXIT: number;
  BOTH: number;
}

interface Window {
  geofence: GeofencePlugin;
  TransitionType: TransitionType;
}

interface GeofencePlugin {
  initialize(
    successCallback?: (result: any) => void,
    errorCallback?: (error: string) => void
  ): Promise<any>;

  addOrUpdate(
    geofence: Geofence | Geofence[],
    successCallback?: (result: any) => void,
    errorCallback?: (error: string) => void
  ): Promise<any>;

  remove(
    id: number | number[],
    successCallback?: (result: any) => void,
    errorCallback?: (error: string) => void
  ): Promise<any>;

  removeAll(
    successCallback?: (result: any) => void,
    errorCallback?: (error: string) => void
  ): Promise<any>;

  getWatched(
    successCallback?: (result: any) => void,
    errorCallback?: (error: string) => void
  ): Promise<string>;

  onTransitionReceived: (geofences: Geofence[]) => void;
  onNotificationClicked: (notificationData: Object) => void;
}

export interface Geofence {
  id: string;
  latitude: number;
  longitude: number;
  radius: number;
  transitionType: number;
  notification?: Notification;
  wash_details?: WashDetails;
}

interface Notification {
  id?: number;
  title?: string;
  text: string;
  smallIcon?: string;
  icon?: string;
  openAppOnClick?: boolean;
  vibration?: number[];
  data?: Object;
  picture: Object;
  start: string;
  end: string;
}
interface WashDetails {
  user: string;
  vehicle: string;
  wash_cost: string;
  wash_status: string;
  washer: string;
}