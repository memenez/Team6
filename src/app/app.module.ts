import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { DataProvider } from '../providers/data/data';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PeoplePage } from '../pages/people/people';
import { CustodianPage } from '../pages/custodian/custodian';
import { AssetsPage } from '../pages/assets/assets';
import { PeripheralsPage } from '../pages/peripherals/peripherals';
import { TagsPage } from '../pages/tags/tags';
import { ProjectsPage } from '../pages/projects/projects';
import { TypesPage } from '../pages/types/types';
import { BrandsPage } from '../pages/brands/brands'; 
import { CubesPage } from '../pages/cubes/cubes';
import { OsPage } from '../pages/os/os';
import { LogsPage } from '../pages/logs/logs'; 
import { LoginPage } from '../pages/login/login';
import { AddPeoplePage } from '../pages/add-people/add-people';
import { ViewPeoplePage } from '../pages/view-people/view-people';
import { AddPeripheralPage } from '../pages/add-peripheral/add-peripheral';
import { AddAssetPage } from '../pages/add-asset/add-asset';
import { AddTagPage } from '../pages/add-tag/add-tag'; 
import { EditPeoplePage } from '../pages/edit-people/edit-people';
import { ViewAssetPage } from "../pages/view-asset/view-asset";
import { RegisterUserPage } from '../pages/register-user/register-user';
import { ConfCredsPage } from '../pages/conf-creds/conf-creds';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileDetailsPage } from '../pages/profile-details/profile-details';
import { RegisterPhonePage } from '../pages/register-phone/register-phone';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule} from '@angular/http';
import { Vibration } from '@ionic-native/vibration';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Firebase } from '@ionic-native/firebase';
import { AppMinimize } from '@ionic-native/app-minimize';
import { ResetPassPage } from '../pages/reset-pass/reset-pass';

export const firebaseConfig = {
    apiKey: "AIzaSyCcKH_nF8-a509y7alvz69L1tuVCO6nkHI",
    authDomain: "assettracker-clone.firebaseapp.com",
    databaseURL: "https://assettracker-clone.firebaseio.com",
    projectId: "assettracker-clone",
    storageBucket: "assettracker-clone.appspot.com",
    messagingSenderId: "315547314734"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PeoplePage,
    CustodianPage,
    AssetsPage,
    PeripheralsPage,
    TagsPage,
    ProjectsPage,
    TypesPage,
    BrandsPage,
    CubesPage,
    OsPage,
    LogsPage,
    LoginPage,
    AddPeoplePage,
    ViewPeoplePage,
    AddPeripheralPage, 
    AddAssetPage,
    AddTagPage,
    EditPeoplePage,
    ViewAssetPage,
    RegisterUserPage,
    ProfilePage,
    ConfCredsPage,
    ProfileDetailsPage,
    RegisterPhonePage,
    ResetPassPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PeoplePage,
    CustodianPage,
    AssetsPage,
    PeripheralsPage,
    TagsPage,
    ProjectsPage,
    TypesPage,
    BrandsPage,
    CubesPage,
    OsPage,
    LogsPage,
    LoginPage,
    AddPeoplePage,
    ViewPeoplePage,
    AddPeripheralPage, 
    AddAssetPage,
    AddTagPage,
    EditPeoplePage,
    ViewAssetPage,
    RegisterUserPage,
    ProfilePage,
    ConfCredsPage,
    ProfileDetailsPage,
    RegisterPhonePage,
    ResetPassPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    DataProvider,
    Vibration,
    FingerprintAIO,
    PhotoViewer,
    Firebase,
    AppMinimize
  ]
})
export class AppModule {}
