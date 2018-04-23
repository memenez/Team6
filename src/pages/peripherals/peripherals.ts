import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, AlertController } from 'ionic-angular';
import { AddPeripheralPage } from '../add-peripheral/add-peripheral';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-peripherals',
  templateUrl: 'peripherals.html',
})
export class PeripheralsPage {

  periphRef: AngularFireList<any>;
  periph: Observable<any[]>;
  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private alertCtrl: AlertController, private vibration: Vibration, public navParams: NavParams, private menu: MenuController, private afDb: AngularFireDatabase,) {
    this.periphRef = this.afDb.list('Assets/data/Peripherals  ');      
    this.periph = this.periphRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeripheralsPage');
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

    addPeriphPage()
    {
      console.log('awlae');
      this.navCtrl.push(AddPeripheralPage);
    }

    removePeriph  (name) {
      console.log(name);
      let confirm = this.alertCtrl.create({
        title: `Delete?`,
        message: "Do you really want to delete this Peripheral?",
        buttons: [
          {
            text: "Cancel",
  
            handler: () => {
              console.log("Prompt Canceled");
            }
          },
          {
            text: "Delete",
            handler: () => {
              this.periphRef.remove(name);
  
              let toast = this.toastCtrl.create({
                message: "Brand removed.",
                duration: 2500,
                position: "top"
              });
              toast.present();
              this.vibration.vibrate(250);
            }
          }
        ]
      });
      confirm.present();
    }
}
