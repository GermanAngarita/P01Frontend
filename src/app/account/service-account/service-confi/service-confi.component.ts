import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service/service.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MsgComponent } from '../../../msg/msg.component';
import { SupplysService } from '../../../services/supplys/supplys.service';

@Component({
  selector: 'app-service-confi',
  templateUrl: './service-confi.component.html',
  styleUrls: ['./service-confi.component.css']
})
export class ServiceConfiComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  newService:any = {
    name: '' ,
    type:'',
    code: '' ,
    description: '' ,
    value: '' ,
    cost: 0,
    tax: '' ,
    supplys: [] ,
    account: '' ,
  }
  supplys:any=[]
  error:any=[]
  constructor(private serviceService:ServiceService, private modalService:NgbModal, private supplyService:SupplysService) { }

  ngOnInit() {
    this.getSupplys()
  }

  saveService():void{
    this.newService.account = this.user.account
    if(this.newService.name && this.newService.code && this.newService.description && this.newService.value
    && this.newService.cost && this.newService.tax && this.newService.supplys && this.newService.account){
      
      this.serviceService.newService(this.newService)
      .subscribe( service =>{
        this.msg('Genial', 'El servicio se ha creado con exito')
        this.newService = {
          name: '' ,
          type:'',
          code: '' ,
          description: '' ,
          value: '' ,
          cost: 0,
          tax: '' ,
          supplys: [] ,
          account: '' ,
        }
      }, err =>{
        this.error = JSON.parse(err)
        this.msg('Lo sentimos', 'Ha ocurrido un error')
      })
    } else {
      this.msg('Lo sentimos', 'Por favor diligencia todos los campos')
    }


    
  }


  //Get data for build service
  getSupplys():void{
    this.supplyService.getSupply(this.user)
    .subscribe(supply=>{
      this.supplys = JSON.parse(supply)
    }, err=>{
      this.msg('¡Ups!', 'Al parecer ocurrió un error al consultar los insumos')
    })
  }

  //Agregar insumo
  addSupply(supply:any):void{

    for(let i of this.newService.supplys){
      if(supply._id == i.id){
        return this.msg('Lo sentimos', 'Este insumo ya ha sido agregado')
      }
    }
    // 1. Que agregue el valor al costo del servicio
    this.newService.cost += supply.quantity * supply.cost
    // 2. Defina la cantidad de insumo necesario
    this.newService.supplys.push(supply)
    
  }

  //delet Supply
  deletSupply(supply:any):void{
    this.newService.cost -= supply.quantity * supply.cost
    let index = this.newService.supplys.indexOf(supply)
    this.newService.supplys.splice(index,1)
  }


  //New Service
  msg(header:string, body:string){
    const modalRef = this.modalService.open(MsgComponent,{
      centered:true,
    });
    modalRef.componentInstance.header = header
    modalRef.componentInstance.body = body
  }

}
