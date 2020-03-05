import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-neat-data-title',
  templateUrl: './neat-data-title.component.html',
  styleUrls: ['./neat-data-title.component.scss']
})
export class NeatDataTitleComponent implements OnInit {
  objid: string;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.objid = params.objid;
    });
  }

  ngOnInit() {}
}
