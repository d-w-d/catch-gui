import { Component, OnInit } from '@angular/core';
import { environment } from '@client/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // lastUpdated = environment.lastUpdated.replace('this-exact-moment', 'Tue Nov 5 15:21:26 EST 2019');

  lastUpdated = '';

  timeStamp = ' ' + new Date().getFullYear();

  // sbnLogo = 'assets/images/pngs/bw_sbn_logo_v1.png';
  sbnLogo = 'assets/images/pngs/sbn_logo3_v0.png';

  constructor() {}

  ngOnInit() {}
}
