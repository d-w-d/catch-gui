import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output()
  closeSidenav = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  _closeSidenav() {
    this.closeSidenav.emit();
  }
}
