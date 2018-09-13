import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, NavController, ToastController, Events } from '@ionic/angular';
import { News } from '../../service/service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
nom = '' ;
length: any ;
start = 0 ;
tab: any ;
items: any ;
text: string ;
  val: any;
// tslint:disable-next-line:max-line-length
constructor(public plt: Platform , private events: Events , private ctrl: ToastController , public alertCtrl: AlertController , private network: Network  , public NavCtrl: NavController , private news: News) {

   this.network.onDisconnect().subscribe(async () => {
    const toastt =  await this.ctrl.create({
      message: 'إتصال بشبكة الأنترنت :-(',
      duration: 3000,
      position: 'middle'
    });
    toastt.present();
});


}

  async presentToast() {

   const toast = await this.ctrl.create({
    message: 'User was added successfully',
    duration: 3000,
  });
  toast.present();

  // watch network for a disconnect
   await this.network.onDisconnect().subscribe(async () => {
    const toastt =  await this.ctrl.create({
      message: 'إتصال بشبكة الأنترنت :-(',
      duration: 3000,
      position: 'middle'
    });
    toastt.present();
});


// watch network for a connection
 await this.network.onConnect().subscribe( async () => {

  const toastt =  await this.ctrl.create({
    message: 'أحسنت أنت الأن متصل بشبكة الأنترنت  :-(',
    duration: 4000,
    position: 'middle'
  });
  toastt.present();

  // We just got a connection but we need to wait briefly
  // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(async() => {
    if (this.network.type === 'wifi') {

      const toasttt =  await this.ctrl.create({
        message: 'we got a wifi connection, woohoo!',
        duration: 4000,
        position: 'middle'
      });
      toasttt.present();
      console.log('أحسنت أنت الأن متصل بشبكة الأنترنت عبر WIFI جو, woohoo!');
    }
  }, 4000);
});

}

async ngOnInit () {

  await this.news.getNews().toPromise().then(data => { this.length = data ; });
  this.start = this.length.length - 5  ;

  await this.news.getNewsLilmit( this.start  , 5 ).toPromise().then(data => {
    this.tab = data ;
    console.log(this.tab.news);

  }) ;
}


  async loadData(event) {
    this.start -=  5 ;
    setTimeout(async () => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll

      await this.news.getNewsLilmit(this.start , 5 ).toPromise().then( data => {
          this.items = data ;
        }) ;
        console.log(this.items) ;
       this.tab = this.tab.concat(this.items) ;
      // tslint:disable-next-line:triple-equals
      if ( this.start < 0) {
        event.target.disabled = true;
        this.text = 'لا توجد أخبار أخرى' ;
      }
    }, 500);
  }


}

