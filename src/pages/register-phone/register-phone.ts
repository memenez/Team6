import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  Platform
} from "ionic-angular";
import { MenuController } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Vibration } from "@ionic-native/vibration";
import { RegisterPhone } from "../../models/register-phone";
import { Firebase } from "@ionic-native/firebase";
import { HomePage } from "../home/home";
import * as firebase from "firebase";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio";

declare var FirebasePlugin: any;

@IonicPage()
@Component({
  selector: "page-register-phone",
  templateUrl: "register-phone.html"
})


export class RegisterPhonePage {
  numberCheck: any;

  peopleRef: AngularFireList<any>;
  creds = {} as RegisterPhone;
  public phoneNumber: number;
  public verificationId: any;
  fpScanner: boolean;
  email: any;
  password: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    private vibration: Vibration,
    private alertCtrl: AlertController,
    private platform: Platform,
    private faio: FingerprintAIO
  ) {
    this.peopleRef = this.afDb.list("/Authlist");

    this.email = this.navParams.get('email');
    this.password = this.navParams.get('password')
  }

  ionViewDidEnter() {
    console.log(this.email, this.password);
    this.menu.swipeEnable(false, "left");
    this.menu.swipeEnable(false, "right");
    this.checkAvail();
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  private registerPhone(): void {
    interface Window {
      FirebasePlugin: any;
    }
    let phone = "+" + this.phoneNumber;
    console.log(phone);

   FirebasePlugin.verifyPhoneNumber(phone, 5, (credential) =>{
        
        this.verificationId = credential.verificationId;
        this.showPrompt();
        console.log("verificationID: " + credential.verificationId);
      },
      error => {
        let toast = this.toastCtrl.create({
          message: error,
          duration: 2500,
          position: "top"
        });
  
        toast.onDidDismiss(() => {
          console.log("Dismissed toast");
        });
  
        toast.present(); this.vibration.vibrate(250);
      }
    );
  }

  private verifyCode(code): void {
    console.log(code);

    let credential = firebase.auth.PhoneAuthProvider.credential(
      this.verificationId,
      code
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(res => {

        firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        console.log("SCC", res);
        this.doLogin();
      });
  }

  private showPrompt() {
    let prompt = this.alertCtrl.create({
      title: "Verify Login",
      message: "Type code that was sent to your number.",
      inputs: [
        {
          name: "code",
          placeholder: "Code",
          type: 'number',
          max: 6,
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            return;
          }
        },
        {
          text: "Verify",
          handler: data => {
            this.verifyCode(data.code);
          }
        }
      ]
    });
    prompt.present();
  }

  private doLogin() {
    this.navCtrl.setRoot(HomePage);
  }
  

  async checkAvail() {
    try {
      console.log(this.fpScanner);
      await this.platform.ready();
      const fpAvail = await this.faio.isAvailable();
      console.log(fpAvail);
      if (fpAvail === "OK") {
        this.fpScanner = true;
        console.log(this.fpScanner);
      }
    } catch (e) {
      console.log(e);
    }
  }
  loginfp() {
    this.faio.show({
        clientId: "Fingerprint-Demo",
        clientSecret: "password"
      })
      .then((result: any) => {
        this.vibration.vibrate(250);
        firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        this.doLogin();
      })
      .catch((error: any) => {
        console.log("err: ", error);
      });
  }
}
