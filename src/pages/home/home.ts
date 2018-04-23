import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ViewPeoplePage } from '../view-people/view-people';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;
  searchTerm: string = '';
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public dataService: DataProvider, public navParams: NavParams ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    let loader = this.loadingCtrl.create({
      content: "Loading. Please wait...",
      duration: 800
    });
    loader.present();

    let searchTerm = this.navParams.get('searchTerm');
    if (searchTerm != (null)){
    this.items = this.dataService.searchItems(searchTerm);
    }
    else {this.items = this.dataService.searchItems('')};
  }

  viewPerson(First_name, Middle_name, Last_name, EID, img){
    this.navCtrl.push(ViewPeoplePage,{firstname:First_name, middlename:Middle_name, lastname:Last_name, eid:EID, img:img})
  }

  
}
