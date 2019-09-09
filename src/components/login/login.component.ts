import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../toolbar/toolbar.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = null;
  password = null;

  constructor(public toolbarService: ToolbarService, private loginService: LoginService) { }

  ngOnInit() {
    this.toolbarService.hide();
  }

  performLogin(){
    this.loginService.login(this.username, this.password).subscribe(
      res => {
        //todo save in localStorage and route to main component
        console.log(res);
    });
  }
}
