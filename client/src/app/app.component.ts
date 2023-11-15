import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  config = {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID:
      '40371381493-jgkjo26qsn0qbrna3be9iab89mgq90do.apps.googleusercontent.com',
    NEXT_PUBLIC_SERVER_ENDPOINT: 'http://localhost:1337',
    NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL:
      'http://localhost:1337/api/sessions/oauth/google',
  };

  onClick() {
    this.getGoogleOAuthUrl()
  }

  getGoogleOAuthUrl() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: this.config.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
      client_id: this.config.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      access_type : 'offline',
      response_type : 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(" ")
    };

    const qs = new URLSearchParams(options);
    console.log(qs.toString())
    window.open(`${rootUrl}?${qs.toString()}`)
    // return `${rootUrl}?${qs.toString()}`;
  }
}
