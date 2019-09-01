import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/services/toolbar/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public toolbarService: ToolbarService) { }

  ngOnInit() {
    this.toolbarService.show();
  }
}
