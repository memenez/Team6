import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Vibration } from '@ionic-native/vibration';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {

  projRef: AngularFireList<any>;
  proj: Observable<any[]>;
  fafe = this.afAuth.auth.currentUser.displayName;
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private toastCtrl: ToastController, private vibration: Vibration, public alertCtrl: AlertController, public navParams: NavParams, private menu: MenuController, private afDb: AngularFireDatabase) {
   this.projRef = this.afDb.list('Assets/data/Projects');
   this.proj = this.projRef.valueChanges();
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

    addProj() {
      const newProj = this.projRef.push({});

      let prompt = this.alertCtrl.create({
        title: 'Add Project',
        message: "Enter the Project Name",
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
              newProj.set({
                id: newProj.key,
                Name: data.name
            });
            let toast = this.toastCtrl.create({
              message: "Project Added.",
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

    removeProj(p) {
      let confirm = this.alertCtrl.create({
        title: 'Delete?',
        message: 'Do you really want to delete this Project?',
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
                this.projRef.remove(p);

      let toast = this.toastCtrl.create({
        message: 'Project removed.',
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
