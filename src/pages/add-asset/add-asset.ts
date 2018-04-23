import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  ToastController
} from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { Asset } from "../../models/asset";
import { storage } from "firebase";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Vibration } from "@ionic-native/vibration";

@IonicPage()
@Component({
  selector: "page-add-asset",
  templateUrl: "add-asset.html"
})
export class AddAssetPage {
  public assetRef: AngularFireList<any>;
  assets: Observable<any[]>;
  typeRef: AngularFireList<any>;
  type: Observable<any[]>;
  OSRef: AngularFireList<any>;
  OS: Observable<any[]>;
  cubeRef: AngularFireList<any>;
  cube: Observable<any[]>;
  projRef: AngularFireList<any>;
  proj: Observable<any[]>;
  assetDb = {} as Asset;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    private afDatabase: AngularFireDatabase,
    private toastCtrl: ToastController,
    private camera: Camera, 
    private vibration: Vibration,
  ) {
    this.assetRef = this.afDatabase.list("/Assets");
    this.assets = this.assetRef.valueChanges();
    this.typeRef = this.afDatabase.list("/Types");
    this.type = this.typeRef.valueChanges();
    this.OSRef = this.afDatabase.list("/OS");
    this.OS = this.OSRef.valueChanges();
    this.cubeRef = this.afDatabase.list("/Cubes");
    this.cube = this.cubeRef.valueChanges();
    this.projRef = this.afDatabase.list("/Projects");
    this.proj = this.projRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddPeoplePage");
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' );
    this.menu.swipeEnable(false, 'right' );
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  addAsset(assetDb: Asset) {
    const newAsset = this.assetRef.push({});

    console.log(this.assetDb);
    newAsset.set({
      id: newAsset.key,
      Assignee: assetDb.Assignee,
      Cube: assetDb.Cube,
      Hard_Disk: assetDb.HDD,
      Memory: assetDb.Memory,
      Model: assetDb.Model,
      Number: assetDb.Number,
      OS: assetDb.OS,
      Owner: assetDb.Owner,
      Serial: assetDb.Serial,
      Type: assetDb.Type,
      Project: assetDb.Project
    });

    let toast = this.toastCtrl.create({
      message: "An Asset was added successfully",
      duration: 2500,
      position: "top"
    });
    this.navCtrl.pop();
    toast.present(); this.vibration.vibrate(250);
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
        correctOrientation: true
      };

      var key=  Math.floor(Date.now() / 1000);
      const result = await this.camera.getPicture(options);
      const img = `data:image/jpeg;base64,${result}`;
      const pics = storage().ref('Pictures/' + key);

    pics.putString(img, 'data_url' );
      
    } catch (e) {
      console.error(e);
    }
  }
}
