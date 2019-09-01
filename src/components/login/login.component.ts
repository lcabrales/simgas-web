import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/services/toolbar/toolbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public toolbarService: ToolbarService) { }

  ngOnInit() {
    this.toolbarService.hide();
  }

}
