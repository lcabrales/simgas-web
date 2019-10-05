import { Component } from '@angular/core';
import { LoginService } from './components/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isToolbarVisible: boolean;

  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.isToolbarVisible = true;
  }

  performLogout() {
    this.loginService.performLogout();
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['/']);
  }

  showToolbar() {
    this.isToolbarVisible = true;
  }

  hideToolbar() {
    this.isToolbarVisible = false;
  }
}
