import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EmailerService } from '../../core/services/emailer/emailer.service';
import { environment } from '@client/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '@client/app/ngrx/reducers';
import { selectSiteSettingsEffectiveTheme } from '@client/app/ngrx/selectors/site-settings.selectors';
import { TPermittedTheme } from '@client/app/models/site-settings.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit, AfterViewInit, OnDestroy {
  //

  subscriptions: Subscription = new Subscription();
  recaptchaToken: string | undefined;
  theme: TPermittedTheme;
  // Require user to perform recaptcha for every new message
  isMessageSendable = false;

  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
  });

  constructor(
    private fb: FormBuilder,
    private emailer: EmailerService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {
    this.subscriptions.add(
      this.store.select(selectSiteSettingsEffectiveTheme).subscribe(theme => (this.theme = theme))
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      grecaptcha.render('recaptcha-id', {
        sitekey: environment.recaptchaSiteKey,
        theme: this.theme.toUpperCase().includes('LIGHT') ? 'light' : 'dark',
        size: 'normal',
        callback: token => {
          this.recaptchaToken = token;
          this.isMessageSendable = true;
          setTimeout(() => this.form.updateValueAndValidity(), 0);
        },
        'expired-callback': () => {
          this.isMessageSendable = false;
          this.recaptchaToken = undefined;
        },
        'error-callback': () => {
          // executed when reCAPTCHA encounters an error (usually network connectivity)
        }
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  submit() {
    if (this.isFormSubmittable()) {
      this.emailer
        .sendEmail(
          this.form.get('username').value,
          this.form.get('email').value,
          this.form.get('message').value,
          this.recaptchaToken + ''
        )
        .subscribe(response => {
          try {
            if (!!response.success) {
              this.snackBar.open(
                'Message Sent. \n\n You must redo the Recaptcha (i.e. wait or refresh page) to send another message.',
                'Close',
                {
                  duration: 5000
                }
              );
              this.isMessageSendable = false;
            }
          } catch (err) {}
        });
    }
  }

  reset() {
    this.form.reset();
    this.form.clearValidators();
    this.form.clearAsyncValidators();
  }

  isFormSubmittable() {
    const isFormValid =
      !!this.isMessageSendable &&
      !!this.recaptchaToken &&
      !!this.form.get('username') &&
      !!this.form.get('email') &&
      !!this.form.get('message') &&
      !this.form.get('message').hasError('required') &&
      !this.form.get('message').hasError('minlength') &&
      !this.form.get('message').hasError('maxlength') &&
      !this.form.get('email').hasError('required') &&
      !this.form.get('username').hasError('required');
    return isFormValid;
  }
}
