import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController,
  MenuController
} from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { Vibration } from "@ionic-native/vibration";
import "rxjs/add/operator/map";


@IonicPage()
@Component({
  selector: "page-conf-creds",
  templateUrl: "conf-creds.html"
})
export class ConfCredsPage {
  credListRef: AngularFireList<any>;
  credList: Observable<any[]>;
  listvalue: any;

  peopleRef: AngularFireList<any>;
  people: Observable<any[]>;
  public stock: string = 'https://firebasestorage.googleapis.com/v0/b/assettracker-clone.appspot.com/o/Profile%20Pictures%2Ficon.png?alt=media&token=b5d940c5-72ff-4417-9447-fe3bd9480467';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDb: AngularFireDatabase,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public afAuth: AngularFireAuth,
    public menu: MenuController, private vibration: Vibration,
  ) {
    this.credListRef = this.afDb.list("/Authlist");
    this.credList = this.credListRef.valueChanges();

    this.peopleRef = this.afDb.list("/People");
    this.people = this.peopleRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log(this.credList);
  }

  approveUser(User, Pass, id,firstname, middlename, lastname, phone, type) {
    console.log(User, Pass);
    let confirm = this.alertCtrl.create({
      title: "Delete?",
      message: "Do you really want to delete this Request?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log("Prompt Canceled");
          }
        },
        {
          text: "Authenticate",
          handler: () => {
            this.afAuth.auth.createUserWithEmailAndPassword(User, Pass).then(
              (success) => {
              success.updateProfile({
                  displayName: type,
                })
                .then(res => 
                  console.log("profile updated"),
                  console.log(success)

                
                )
                .catch(err => console.log(err));
              });

              const authConf = this.peopleRef.push({});
              authConf.set({
                id: authConf.key,
                EID: User,
                First_name: firstname,
                Middle_name: middlename,
                Last_name: lastname,
                img: this.stock


              })

            this.credListRef.remove(id);
            let toast = this.toastCtrl.create({
              message: "User Sucessfully Authenticated!",
              duration: 2500,
              position: "top"
            });

            toast.onDidDismiss(() => {
              console.log("Dismissed toast");
            });
            toast.present(); this.vibration.vibrate(250);
          }
        }
      ]
    });
    confirm.present();
  }

  rejectUser(id) {
    let confirm = this.alertCtrl.create({
      title: "Delete?",
      message: "Do you really want to delete this Request?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log("Prompt Canceled");
          } 
        },
        {
          text: "Delete Request",
          handler: () => {
            this.credListRef.remove(id);
            let toast = this.toastCtrl.create({
              message: "Request Deleted",
              duration: 2500,
              position: "top"
            });

            toast.onDidDismiss(() => {
              console.log("Dismissed toast");
            });

            toast.present(); this.vibration.vibrate(250);
          }
        }
      ]
    });
    confirm.present();
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, "left");
    this.menu.swipeEnable(false, "right");
    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);
  }
}
