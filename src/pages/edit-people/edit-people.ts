import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';
import { People } from "../../models/people";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs'
import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage} from 'firebase';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-edit-people',
  templateUrl: 'edit-people.html',
})


export class EditPeoplePage {
  deleteserve: boolean;
  public peopleRef: AngularFireList<any>;
  public img: string;
  public stock: string = 'https://firebasestorage.googleapis.com/v0/b/assettracker-clone.appspot.com/o/Profile%20Pictures%2Ficon.png?alt=media&token=b5d940c5-72ff-4417-9447-fe3bd9480467';
  people: Observable<any[]>;
  
 public editperson = { firstname: "", middlename: "", lastname: "", eid: "", img: "", personID: "" };
  peopleaf = {} as People;

  constructor(public navCtrl: NavController, private vibration: Vibration, public navParams: NavParams, private menu: MenuController, public alertCtrl: AlertController, public afDatabase: AngularFireDatabase, public toastCtrl: ToastController, private camera: Camera
  ) {
    this.editperson =
      {
        firstname: navParams.get('firstname'), middlename: navParams.get('middlename'), lastname: navParams.get('lastname'),
        eid: navParams.get('eid'), img: navParams.get('img'), personID: navParams.get('id')
      }
      ;
      this.peopleRef = this.afDatabase.list('/People');
      this.deleteserve = false;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPeoplePage');
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' ); this.menu.swipeEnable(false, 'right' );;

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);
  }

  showConfirmserver(peopleaf: People) {
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
            console.log (this.deleteserve);
           this.deleteserve = true;
           console.log (this.deleteserve);

           let toast = this.toastCtrl.create({
            message: 'Picture Deleted',
            duration: 2500,
            position: 'top'
          });
          toast.present(); this.vibration.vibrate(250);
           
          }
          
        }
      ]
    });
    confirm.present();
  }

  showConfirmlocal() {
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
            console.log('Deleted Pic from local');

            let toast = this.toastCtrl.create({
              message: 'Picture Deleted',
              duration: 2500,
              position: 'top'
            });
            toast.present(); this.vibration.vibrate(250);
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
          }
        }
      ]
    });
    confirm.present();
  }

  
    updatePerson(peopleaf: People) {
      console.log("Old Image = " + this.editperson.img);
      // console.log("Image = " + this.img);
      var key= Math.floor(Date.now() / 1000);
      
    const newPics = storage().ref(`Pictures/${key}.jpg`);

      if (this.img == undefined){
         console.log("No Image");
        
        if (this.deleteserve == true){ 
          var delPics = storage().refFromURL(this.editperson.img);
          delPics.delete();
          this.peopleRef.update(this.editperson.personID, {
            img: 'https://firebasestorage.googleapis.com/v0/b/assettracker-clone.appspot.com/o/Profile%20Pictures%2Ficon.png?alt=media&token=b5d940c5-72ff-4417-9447-fe3bd9480467',
          });
          console.log('Deleted Pic from Server');
        }
    this.peopleRef.update(this.editperson.personID, {
      First_name: peopleaf.firstname,
      Middle_name: peopleaf.middlename,
      Last_name: peopleaf.lastname,
      EID: peopleaf.eid
    });
  }

else if (this.editperson.img == this.stock) {
  console.log("Has Image to upload but with placeholder image");
  newPics.putString(this.img, 'data_url' ).then (data =>{
  this.peopleRef.update(this.editperson.personID, {
  First_name: peopleaf.firstname,
    Middle_name: peopleaf.middlename,
  Last_name: peopleaf.lastname,
  EID: peopleaf.eid,
  img: data.downloadURL
});

});
}

else {
  console.log("Has Image to upload but with different image");
  var delPics = storage().refFromURL(this.editperson.img);
  delPics.delete();
  newPics.putString(this.img, 'data_url' ).then (data =>{
  this.peopleRef.update(this.editperson.personID, {
  First_name: peopleaf.firstname,
    Middle_name: peopleaf.middlename,
  Last_name: peopleaf.lastname,
  EID: peopleaf.eid,
  img: data.downloadURL
});

});
}


    let toast = this.toastCtrl.create({
      message: 'User info was successfully updated',
      duration: 2500,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
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
}
