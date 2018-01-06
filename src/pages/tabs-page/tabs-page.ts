import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { LoggingModePage } from '../logging-mode/logging-mode';

import { AllHazardsPage } from '../all-hazards/all-hazards';
import { GeofenceListPage } from "../geofence-list/geofence-list";



@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = AllHazardsPage;
  tab2Root: any = GeofenceListPage;
  tab3Root: any = LoggingModePage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
