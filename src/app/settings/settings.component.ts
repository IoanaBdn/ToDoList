import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


import * as firebase from 'firebase/app';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  fileName: any;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  onFileSelected(event: any)
  {
    const file : File = event.target.files[0];
    console.log("Filename selected: "+file.name);
    this.fileName = file.name;

  }

  onUpload()
  {
    console.log("Upload:"+this.fileName);
  }


}
