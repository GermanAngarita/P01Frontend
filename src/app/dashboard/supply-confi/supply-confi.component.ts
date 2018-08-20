import { Component, OnInit } from '@angular/core';
import { SupplysService } from '../../services/supplys/supplys.service';
import { MsgComponent } from '../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-supply-confi',
  templateUrl: './supply-confi.component.html',
  styleUrls: ['./supply-confi.component.css']
})
export class SupplyConfiComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  newSupply:any={
    supply: '',
    description: '',
    reference: '',
    unity: 'und',
    cost :'',
    account:[]
  }
  supplys:any=[]
  seeEditSurvey:boolean = false
  constructor(private supplyService:SupplysService, private modalService:NgbModal) { }

  ngOnInit() {
    this.getSupply()
  }


  createSupply():void{
    if(this.newSupply.supply && this.newSupply.description && this.newSupply.reference && this.newSupply.unity && this.newSupply.cost && this.newSupply.account){
      this.newSupply.reference = this.newSupply.reference.toUpperCase() 
      this.supplyService.newSupply(this.newSupply)
      .subscribe( supply =>{
        this.msg('Genial', 'La referencia se ha creado con exito')
        this.getSupply()
      }, (err)=>{
        // let error = JSON.parse(err)
        console.log(err)
        this.msg('Lo sentimos', 'Ocurrio un error al guardar el servicio')
      })
    } else {
      this.msg('¡Ups!', 'Por favor completa todos los datos.')
    }
    
  }

  getSupply():void{
    this.supplys=[]
    this.supplyService.getSupply(this.user)
    .subscribe( supplys=>{
      this.supplys = JSON.parse(supplys)
    })
  }

  updateSupply(supply:any):void{
    this.supplyService.updateSupply(supply)
    .subscribe( update =>{
      this.msg('Genial', 'La referencia se ha actualizado con éxito')
      this.getSupply()
    },(err)=>{
      this.msg('Lo sentimos', 'Ha ocurrido un problema al actualizar el registro')
    })
  }

  msg(header:string, body:string){
    const modalRef = this.modalService.open(MsgComponent,{
      centered:true,
    });
    modalRef.componentInstance.header = header
    modalRef.componentInstance.body = body
  }

}
