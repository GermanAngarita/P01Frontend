import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-confi',
  templateUrl: './account-confi.component.html',
  styleUrls: ['./account-confi.component.css']
})
export class AccountConfiComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  constructor() { }

  ngOnInit() {
  }

}
