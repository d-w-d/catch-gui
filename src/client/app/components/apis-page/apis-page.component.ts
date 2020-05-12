import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apis-page',
  templateUrl: './apis-page.component.html',
  styleUrls: ['./apis-page.component.scss']
})
export class ApisPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  demoJson = json();
}

function json() {
  const result = JSON.stringify(
    {
      matches: [
        {
          body_type: 'comet',
          comparison_text: '65P/Gunn',
          display_text: '65P/Gunn',
          target: '65P'
        },
        {
          body_type: 'asteroid',
          comparison_text: '657 Gunlod',
          display_text: '657 Gunlod',
          target: '657'
        }
        // ...
      ],
      name: '65p gunn'
    },
    null,
    2
  );

  console.log('result \n', result);
  return ('\n' + result).replace(`}\n  ],`, `}\n    ...,\n  ],`);
}
