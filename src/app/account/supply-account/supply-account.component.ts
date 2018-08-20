import { Component, OnInit } from '@angular/core';
import { SupplysService } from '../../services/supplys/supplys.service';
import { MsgComponent } from '../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-supply-account',
  templateUrl: './supply-account.component.html',
  styleUrls: ['./supply-account.component.css']
})
export class SupplyAccountComponent implements OnInit {

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
  error:any={
    error:{ err: { errmsg:''}}
  }
  constructor( private supplyService:SupplysService, private modalService:NgbModal) { }

  ngOnInit() {
    this.getSupply()
  }


  createSupply():void{
    if(this.newSupply.supply && this.newSupply.description && this.newSupply.reference && this.newSupply.unity && this.newSupply.cost && this.newSupply.account){
      this.newSupply.reference = this.newSupply.reference.toUpperCase()
      this.newSupply.account = this.user.account
      this.supplyService.newSupply(this.newSupply)
      .subscribe( supply =>{
        this.msg('Genial', 'La referencia se ha creado con exito')
        this.newSupply={
          supply: '',
          description: '',
          reference: '',
          unity: 'und',
          cost :'',
          account:[]
        }
        this.getSupply()
      }, (err)=>{
        this.error = err
        this.msg('Lo sentimos', 'Ocurrio un error al guardar la referencia: '+this.error.error.err.errmsg)
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
