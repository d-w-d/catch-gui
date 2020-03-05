import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faCog,
  faPaintBrush,
  faLightbulb,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule]
})
export class FontAwesomeIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      //
      faBars,
      faCog,
      faEdit,
      faGithub,
      faLightbulb,
      faPaintBrush,
      faTwitter
    );
  }
}
