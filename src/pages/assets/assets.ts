import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Nav,
  MenuController,
  AlertController,
  ToastController
} from "ionic-angular";

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { Asset } from "../../models/asset";
import { AddAssetPage } from "../add-asset/add-asset";

@IonicPage()
@Component({
  selector: "page-assets",
  templateUrl: "assets.html"
})
export class AssetsPage {
  @ViewChild(Nav) nav: Nav;

  selectedAsset: any;
  avatar: string[];
  public assetRef: AngularFireList<any>;
  assets: Observable<any[]>;
  assetDb = {} as Asset;
  pushPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    public alertCtrl: AlertController,
    private afDatabase: AngularFireDatabase,
    public toastCtrl: ToastController
  ) {
    this.selectedAsset = navParams.get("asset");
    this.pushPage = AddAssetPage;
    this.assetRef = this.afDatabase.list("/Assets/items");
    this.assets = this.assetRef.valueChanges();
  }

  // viewAsset(First_name, Middle_name, Last_name, EID, img) {
  //   this.navCtrl.push(ViewAssetPage, {
  //     firstname: First_name,
  //     middlename: Middle_name,
  //     lastname: Last_name,
  //     eid: EID,
  //     img: img
  //   });
  // }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PeoplePage");
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' ); this.menu.swipeEnable(false, 'right' );;
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
}
