import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-account',
  templateUrl: './service-account.component.html',
  styleUrls: ['./service-account.component.css']
})
export class ServiceAccountComponent implements OnInit {

  constructor() { }

  public user = JSON.parse(localStorage.getItem('user'));
  ngOnInit() {
  }

}
