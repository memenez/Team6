import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-custodian',
  templateUrl: 'custodian.html'
})
export class CustodianPage {
  cust: AngularFireList<any[]>;
  custRef: Observable<any>;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private afDb: AngularFireDatabase ) {
   this.cust = this.afDb.list('/Custodians');
   this.custRef = this.cust.valueChanges();
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' ); this.menu.swipeEnable(false, 'right' );;
  
    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }
  
  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);
    }
}
