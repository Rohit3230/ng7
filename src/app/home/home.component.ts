import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  h1Style: boolean = false;
  users : object;
  constructor(private data : DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(data => {
      this.users = JSON.parse(data['_body']);
      console.log(this.users);
    });
  }

  firstClick() {
    this.data.firstClick();
  }

}
