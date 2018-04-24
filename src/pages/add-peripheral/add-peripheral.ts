import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  Nav,
  Platform,
  NavController,
  NavParams,
  MenuController,
  ToastController,
  AlertController
} from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { Thing } from "../../models/thing";
import { storage } from "firebase";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Vibration } from "@ionic-native/vibration";

@IonicPage()
@Component({
  selector: "page-add-peripheral",
  templateUrl: "add-peripheral.html"
})
export class AddPeripheralPage {
  @ViewChild(Nav) nav: Nav;
  private typeRef: AngularFireList<any>;
  type: Observable<any[]>;
  private modelRef: AngularFireList<any>;
  model: Observable<any[]>;
  private periphRef: AngularFireList<any>;
  periph: Observable<any[]>;
  thing = {} as Thing;
  private img: string;
  private stock: string = 'https://firebasestorage.googleapis.com/v0/b/assettracker-clone.appspot.com/o/Profile%20Pictures%2Ficon.png?alt=media&token=b5d940c5-72ff-4417-9447-fe3bd9480467';

  constructor(
    
    private navCtrl: NavController,
    private platform: Platform,
    private navParams: NavParams,
    private menu: MenuController,
    private afDatabase: AngularFireDatabase,
    private toastCtrl: ToastController,
    private camera: Camera,
    private alertCtrl: AlertController, private vibration: Vibration,
  ) {
    this.typeRef = this.afDatabase.list("/Assets/data/Types");
    this.type = this.typeRef.valueChanges();
    this.modelRef = this.afDatabase.list("/Assets/data/Models");
    this.model = this.modelRef.valueChanges();
    this.periphRef = this.afDatabase.list("/Assets/data/Peripherals");
    this.periph = this.periphRef.valueChanges();

    this.platform.registerBackButtonAction(() => {
      console.log("Minimized");
      this.navCtrl.pop();
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddPeoplePage");
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' ); this.menu.swipeEnable(false, 'right' );

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);
  }

 async addThing(thing: Thing) {

  console.log(thing);
    const newThing = this.periphRef.push({});

    console.log(this.thing);   
    var key= Math.floor(Date.now() / 1000);
      const pics = storage().ref(`Pictures/${key}.jpg`);

      if (thing.Model == undefined|| thing.Type == undefined || thing.Number == undefined|| thing.Serial== undefined){
        let toast = this.toastCtrl.create({
          message: "Please fill up the Required Fields.",
          duration: 2500,
          position: "top"
        });
        toast.present(); this.vibration.vibrate(250);
      }
      
  else {
    console.log('awla');
    if (this.img == undefined){
      newThing.set({
        id: newThing.key,
        Type: thing.Type,
        Model: thing.Model,
        Number: thing.Number,
        Serial: thing.Serial,
        img: this.stock
      });
      let toast = this.toastCtrl.create({
        message: "A Peripheral has been successfully added",
        duration: 2500,
        position: "top"
      });
  
      await this.navCtrl.pop();
      toast.present(); this.vibration.vibrate(250);
    }
    else{
    pics.putString(this.img, 'data_url' ).then (data =>{
    newThing.set({
      id: newThing.key,
      Type: thing.Type,
        Model: thing.Model,
        Number: thing.Number,
        Serial: thing.Serial,
      img: data.downloadURL
    });
  });
    
  let toast = this.toastCtrl.create({
    message: "A Peripheral has been successfully added",
    duration: 2500,
    position: "top"
  });
  await this.navCtrl.pop();
  toast.present(); this.vibration.vibrate(250);
  }
 }
}

  async takePic() {
    try {
      const options: CameraOptions = {
        quality: 75,
        targetHeight: 800,
        targetWidth: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        allowEdit: true
        
      };

      const result = await this.camera.getPicture(options);
      this.img = `data:image/jpeg;base64,${result}`;

      
    } catch (e) {
      console.error(e);
    }
  }

  async getPic() {
    try {
      const options: CameraOptions = {
        quality: 75,
        targetHeight: 800,
        targetWidth: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        allowEdit: true,
        sourceType: 2
      };

      const result = await this.camera.getPicture(options);
      this.img = `data:image/jpeg;base64,${result}`;
      

      
    } catch (e) {
      console.error(e);
    }
  }

  async showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Delete?',
      message: 'Are you sure you want to delete this image?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('ionViewDidLoad PeoplePage');
          }
        },
        {
          text: 'Delete',
          handler: () => {
             this.img = undefined;
          }
        }
      ]
    });
    confirm.present();
  }
}