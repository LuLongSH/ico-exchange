import { Component, OnInit } from '@angular/core';
import { LocalizationService } from './services/localization.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public selectedLanguage: string;
  public textStyleRTL: boolean;

  constructor(private localizationService: LocalizationService, private authService: AuthService) {
    this.textStyleRTL = false;
    this.selectedLanguage = 'EN';
  }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.loggedIn;
  }

  onLogout() {
    this.authService.logout();
  }

  onChange(data) {
    this.selectedLanguage = data;
    this.localizationService.language = this.selectedLanguage;
    if(this.selectedLanguage === 'AR') {
      this.textStyleRTL =  true;
    } else {
      this.textStyleRTL =  false;
    }
  }

}
