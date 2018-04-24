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
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-brands",
  templateUrl: "brands.html"
})
export class BrandsPage {
  brandsRef: AngularFireList<any>;
  brands: Observable<any[]>;
  modelRef: AngularFireList<any>;
  model: Observable<any[]>;
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
    this.brandsRef = this.afDb.list("Assets/data/Brands");
    this.brands = this.brandsRef.valueChanges();
    this.modelRef = this.afDb.list("Assets/data/Models");
    this.model = this.modelRef.valueChanges();
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

  addBrand() {
    const newBrand = this.brandsRef.push({});
    const newModel = this.modelRef.push({});

    let prompt = this.alertCtrl.create({
      title: "Add Brand",
      message: "Enter Brand Details",
      inputs: [
        {
          name: "name",
          placeholder: "Brand Name"
        },
        {
          name: "model",
          placeholder: "Model Name"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log(data.name);
            console.log(data.model);
          }
        },
        {
          text: "Add",
          handler: data => {
            if (
              data.name == undefined ||
              data.model == undefined
            ) {
              let toast = this.toastCtrl.create({
                message: "All Fields must be populated.",
                duration: 2500,
                position: "top"
              });
              toast.present();
              this.vibration.vibrate(250);
            } else {
              newBrand.set({
                id: newBrand.key,
                name: data.name,
                mxodel: data.model,
              });
              newModel.set({
                id: newModel.key,
                model: data.model,
              });
              let toast = this.toastCtrl.create({
                message: "Brand Added.",
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

  removeBrand(name) {
    console.log(name);
    let confirm = this.alertCtrl.create({
      title: `Delete?`,
      message: "Do you really want to delete this Brand?",
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
            this.brandsRef.remove(name);

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

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
