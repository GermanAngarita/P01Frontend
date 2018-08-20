import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service/service.service';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  services:any=[]
  page=1
  constructor(private serviceService:ServiceService, 
    private modalService:NgbModal) { }

  ngOnInit() {
    this.getServices()
  }

  getServices():void{
    let body = { id:this.user.account[0] }
    this.serviceService.getServicesByAccount(body)
    .subscribe( services =>{
      this.services = JSON.parse(services)
    })
  }

  activeService(service:any):void{
    this.serviceService.findByIdAndUpdate(service)
    .subscribe( response=>{
      this.msg('Genial', 'El servico se ha actualizado de forma correcta')
      this.getServices()
    }, err=>{
      this.msg('Lo sentimos', 'Ocurrio un error al actualizar el servicio')
    } )
  }

  msg(header:string, body:string){
    const modalRef = this.modalService.open(MsgComponent,{
      centered:true,
    });
    modalRef.componentInstance.header = header
    modalRef.componentInstance.body = body
  }

}
