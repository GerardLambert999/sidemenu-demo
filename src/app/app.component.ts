import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private _AUTH : AuthProvider) {
    this.initializeApp();

    // Populate page for the application
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Logout', component: LoginPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  /**
    * Open a page from the sidemenu
    * @method openPage
    * @param page   {object}      The name of the page component to open
    * return {none}
    */
  openPage(page : any) : void {
    // Ensure we can log out of Firebase and reset the root page
    if(page == 'Logout')
    {
       this._AUTH.logOut()
       .then((data : any) =>
       {
          this.nav.setRoot(page.component);
       })
       .catch((error : any) =>
       {
          console.dir(error);
       });
    }

    // Otherwise reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    else
    {
       this.nav.setRoot(page.component);
    }
  }
}
