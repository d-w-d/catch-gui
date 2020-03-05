import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  openSidenav: EventEmitter<any> = new EventEmitter();

  catchLogo = '../../../assets/images/pngs/large_logo_v4.png';
  // catchLogo = '../../../assets/images/pngs/inverted_logo_v1.png';

  constructor() {}

  ngOnInit() {}

  _openSidenav() {
    this.openSidenav.emit();
  }
}
