import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  message: string;

  constructor(private dialogRef: MatDialogRef<AlertComponent>) { }

  ngOnInit() {
  }

  setMessage(message: string) {
    this.message = message;
  }

  close() {
    this.dialogRef.close()
  }
}
