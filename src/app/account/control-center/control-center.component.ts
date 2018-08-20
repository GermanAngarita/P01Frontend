import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlTree, Route } from '@angular/router';

@Component({
  selector: 'app-control-center',
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.css']
})
export class ControlCenterComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  constructor(private router:Router) { }

  ngOnInit( ) {
  }

  goTo(url:string):void{
    this.router.navigateByUrl(url)
  }

}
