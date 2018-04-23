import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, Nav, MenuController, AlertController, ToastController } from 'ionic-angular';
import { AddPeoplePage } from '../add-people/add-people';
import { ViewPeoplePage } from '../view-people/view-people';
import { EditPeoplePage } from '../edit-people/edit-people';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {storage} from 'firebase';
import { Vibration } from '@ionic-native/vibration';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {
  @ViewChild(Nav) nav: Nav;
  selectedPerson: any;
  peopleRef: AngularFireList<any>;
  people: Observable<any[]>;
  pushPage: any;
  fafe = this.afAuth.auth.currentUser.displayName;
  public stock: string = 'https://firebasestorage.googleapis.com/v0/b/assettracker-clone.appspot.com/o/Profile%20Pictures%2Ficon.png?alt=media&token=b5d940c5-72ff-4417-9447-fe3bd9480467';
  constructor(public platform: Platform,private afAuth: AngularFireAuth, public navCtrl: NavController, private vibration: Vibration, public navParams: NavParams, private menu: MenuController, public alertCtrl: AlertController, private afDatabase: AngularFireDatabase, public toastCtrl: ToastController)  {

    
    this.selectedPerson = navParams.get('person')
    this.pushPage = AddPeoplePage;
    this.peopleRef = this.afDatabase.list('People/');
    this.people = this.peopleRef.valueChanges();

    this.platform.registerBackButtonAction(() => {
      console.log("Minimized");
      this.navCtrl.pop();
    });
  }
  
  viewPerson(First_name, Middle_name, Last_name, EID, img){
    this.navCtrl.push(ViewPeoplePage,{firstname:First_name, middlename:Middle_name, lastname:Last_name, eid:EID, img:img})
  }

   editPerson(First_name, Middle_name, Last_name, EID, img, id){
    this.navCtrl.push(EditPeoplePage,{firstname:First_name, middlename:Middle_name, lastname:Last_name, eid:EID, img:img, id:id})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
    console.log(this.people);
    console.log(this.fafe);
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' ); this.menu.swipeEnable(false, 'right' );
  
    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1')
  }
  
  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);
    }

    removePerson(personID, img) {
      let confirm = this.alertCtrl.create({
        title: 'Delete?',
        message: 'Do you really want to delete this User?',
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
              if (img == this.stock) {
                this.peopleRef.remove(personID);
              }
              else {
              this.peopleRef.remove(personID);
              var delPics = storage().refFromURL(img);
              delPics.delete();
              }
      let toast = this.toastCtrl.create({
        message: 'User was successfully deleted',
        duration: 2500,
        position: 'top'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present(); this.vibration.vibrate(250);
    }
          }
        ]
      });
      confirm.present();
    }

}