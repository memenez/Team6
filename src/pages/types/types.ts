import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Vibration } from '@ionic-native/vibration';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-types',
  templateUrl: 'types.html',
})
export class TypesPage {

  typesRef: AngularFireList<any>;
  types: Observable<any[]>;
  fafe = this.afAuth.auth.currentUser.displayName;
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private toastCtrl: ToastController, private vibration: Vibration, public alertCtrl: AlertController, public navParams: NavParams, private menu: MenuController, private afDb: AngularFireDatabase) {
   this.typesRef = this.afDb.list('Assets/data/Types');
   this.types = this.typesRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypesPage');
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' ); this.menu.swipeEnable(false, 'right' );
  }
  
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
    }

    addType() {
      const newType = this.typesRef.push({});

      let prompt = this.alertCtrl.create({
        title: 'Add Type',
        message: "Enter the Type Name",
        inputs: [
          {
            name: 'name',
            placeholder: 'Name'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log(data.name);
              
            }
          },
          {
            text: 'Add',
            handler: data => {
              newType.set({
                id: newType.key,
                name: data.name
            });
            let toast = this.toastCtrl.create({
              message: "Type Added.",
              duration: 2500,
              position: "top"
            });
            toast.present();
            this.vibration.vibrate(250);
            }
          }
        ]
      });
      prompt.present();
    }

    removeType(name) {
      let confirm = this.alertCtrl.create({
        title: 'Delete?',
        message: 'Do you really want to delete this Type?',
        buttons: [
          {
            text: 'Cancel',
             
            handler: () => {

              console.log('Prompt Canceled');
            }
          },
          {
            text: 'Delete',
            handler: () => {
                this.typesRef.remove(name);

      let toast = this.toastCtrl.create({
        message: 'Type removed.',
        duration: 2500,
        position: 'top'
      });
      toast.present(); this.vibration.vibrate(250);
    }
          }
        ]
      });
      confirm.present();
    }
}
