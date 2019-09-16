import { Component, OnInit } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public toolbarService: ToolbarService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.toolbarService.show();
  }

  performLogout() {
    this.loginService.performLogout();
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}
