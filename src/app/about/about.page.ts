import { Component } from '@angular/core';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {
  color = 'light' ;
  num = 11 ;
  constructor(private socialSharing: SocialSharing) { }


  share() {
    // tslint:disable-next-line:max-line-length
    this.socialSharing.share( 'message' , 'message' , 'https://image.freepik.com/free-vector/login-form-template-with-avatar_23-2147725576.jpg' ) ;
  }

  like() {
    console.log(this.color) ;
    // tslint:disable-next-line:triple-equals
    if ( this.color == 'light' ) { this.color = 'Default' ; console.log('Default') ; this.num ++ ;
  // tslint:disable-next-line:triple-equals
  } else if ( this.color == 'Default' ) { this.color = 'light' ;  console.log('ligth') ;  this.num -- ; }
  }
}
