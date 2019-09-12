import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  visible: Observable<boolean>

  show() {
    this.visible = of(true);
  }

  hide() {
    this.visible = of(false);
  }

  toggle() {
    this.visible = of(!this.visible);
  }
}
