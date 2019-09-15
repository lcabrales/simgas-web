import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { ToolbarService } from '../toolbar/toolbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private toolbarService: ToolbarService,
    private loginService: LoginService, 
    private router: Router,
    private profileService: ProfileService) { }

  ngOnInit() {
    this.toolbarService.show();
    this.updateLoggedInUser();
  }

  updateLoggedInUser(){
    let user = this.loginService.getUserLoggedIn();
    console.log(user.UserId);
    this.profileService.get(user.UserId)
    .subscribe(response => {
      if (response.Result.Code != 200 || response.Data.length == 0) {
        alert("Un error ha ocurrido");
        return;
      }

      this.loginService.setUserLoggedIn(response.Data[0]);
    });
  }

  logout() {
    this.loginService.performLogout();
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['/']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
