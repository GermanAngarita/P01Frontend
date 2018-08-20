import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CenterService } from '../../../services/center/center.service';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-center-details',
  templateUrl: './center-details.component.html',
  styleUrls: ['./center-details.component.css']
})
export class CenterDetailsComponent implements OnInit {

  centertId:any
  center:any=[]
  user:any={
    name:'',
    last_name:'',
    email:'',
    role:'center_service',
    account:[],
    centers:[],
    password:'',
    repeat_password:''
  }
  typeUser:any='CENTER_SERVICE'
  constructor(private activeRoute: ActivatedRoute, private centerService:CenterService, private modalService:NgbModal) { }

  ngOnInit() {
    this.activeRoute.params.subscribe( (params: Params)=>{
      this.centertId = params['id']
      this.centerService.findCenterById(this.centertId)
      .subscribe( center =>{
        this.center = JSON.parse(center)
      })
      
    } )
  }

  saveUser():void{
    if(this.user.name && this.user.last_name && this.user.email && this.user.password && this.user.repeat_password){
      if(this.user.password == this.user.repeat_password){
        this.user.account.push(this.center.account)
        this.user.centers.push(this.center._id)
      } else {
        // las contraseñas no coinceden
        this.msg('¡Ups!', 'Las contraseñas no coinciden')
      }
    } else {
      // Por favor completa todos los datos
      this.msg('¡Ups', 'Por favor completa todos los datos')
    }
  }



  msg(header:string, body:string){
    const modalRef = this.modalService.open(MsgComponent,{
      centered:true,
    });
    modalRef.componentInstance.header = header
    modalRef.componentInstance.body = body
  }

}
