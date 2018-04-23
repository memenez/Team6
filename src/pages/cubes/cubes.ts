import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Vibration } from '@ionic-native/vibration';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-cubes',
  templateUrl: 'cubes.html',
})
export class CubesPage {

  cubeRef: AngularFireList<any>;
  cube: Observable<any[]>;
  fafe = this.afAuth.auth.currentUser.displayName;
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private toastCtrl: ToastController, private vibration: Vibration, public alertCtrl: AlertController, public navParams: NavParams, private menu: MenuController, private afDb: AngularFireDatabase) {
   this.cubeRef = this.afDb.list('Assets/data/Cubes');
   this.cube = this.cubeRef.valueChanges()  ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' ); this.menu.swipeEnable(false, 'right' );
  }
  
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
    }

    addCube() {
      const newCube = this.cubeRef.push({});

      let prompt = this.alertCtrl.create({
        title: 'Add Cubicle',
        message: "Enter Cube Details",
        inputs: [
          {
            name: 'name',
            placeholder: 'Name'
          },
          {
            name: 'loc',
            placeholder: 'Location'
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
              newCube.set({
                id: newCube.key,
                Name: data.name,
                Location: data.loc,
            });
            let toast = this.toastCtrl.create({
              message: "Cube Added.",
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

    removeCube(name) {
      console.log(name);
      let confirm = this.alertCtrl.create({
        title: `Delete ` + name + '?' ,
        message: 'Do you really want to delete this OS?',
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
                this.cubeRef.remove(name);

      let toast = this.toastCtrl.create({
        message: 'Location removed.',
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
