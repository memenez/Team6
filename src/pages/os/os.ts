import { Component } from "@angular/core";
import { Vibration } from "@ionic-native/vibration";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import {
  AlertController,
  IonicPage,
  MenuController,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { Observable } from "rxjs";

@IonicPage()
@Component({
  selector: "page-os",
  templateUrl: "os.html"
})
export class OsPage {
  osRef: AngularFireList<any>;
  os: Observable<any[]>;
  fafe = this.afAuth.auth.currentUser.displayName;
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private vibration: Vibration,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private menu: MenuController,
    private afDb: AngularFireDatabase
  ) {
    this.osRef = this.afDb.list("Assets/data/OS");
    this.os = this.osRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProjectsPage");
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, "left");
    this.menu.swipeEnable(false, "right");
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  addOs() {
    const newOs = this.osRef.push({});

    let prompt = this.alertCtrl.create({
      title: "Add OS",
      message: "Enter the OS Details",
      inputs: [
        {
          name: "name",
          placeholder: "Name"
        },
        {
          name: "version",
          placeholder: "OS Version"
        },
        {
          name: "edition",
          placeholder: "OS Edition"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log(data.name);
            console.log(data.version);
            console.log(data.edition);
          }
        },
        {
          text: "Add",
          handler: data => {
            if (
              data.name == undefined ||
              data.version == undefined ||
              data.edition == undefined
            ) {
              let toast = this.toastCtrl.create({
                message: "All Fields must be populated.",
                duration: 2500,
                position: "top"
              });
              toast.present();
              this.vibration.vibrate(250);
            } else {
              newOs.set({
                id: newOs.key,
                Name: data.name,
                version: data.version,
                edition: data.edition
              });
              let toast = this.toastCtrl.create({
                message: "Operating System Added.",
                duration: 2500,
                position: "top"
              });
              toast.present();
              this.vibration.vibrate(250);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  removeOs(name) {
    console.log(name);
    let confirm = this.alertCtrl.create({
      title: `Delete?`,
      message: "Do you really want to delete this OS?",
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
            this.osRef.remove(name);

            let toast = this.toastCtrl.create({
              message: "Operating System removed.",
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
