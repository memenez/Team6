import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-view-people',
  templateUrl: 'view-people.html',
})
export class ViewPeoplePage {
  persons: Array<{firstname: string, middlename: string, lastname: string, eid: string, img: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private viewPic: PhotoViewer) {

    this.persons =[
      {firstname: navParams.get('firstname'), middlename: navParams.get('middlename'), lastname: navParams.get('lastname'),
      eid: navParams.get('eid'), img: navParams.get('img')}
    ]
  }

  viewImg(picture){
    this.viewPic.show(picture);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPeoplePage');
    console.log(this.persons);
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
}
