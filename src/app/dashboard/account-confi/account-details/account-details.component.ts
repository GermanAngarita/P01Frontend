import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlansService } from '../../../services/plans/plans.service';
import { AccountService } from '../../../services/account/account.service';
import { CenterService } from '../../../services/center/center.service';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal, ModalDismissReasons  } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  account:any ={
    name:'',
    code:'',
    nit:'',
    av:'',
    logo:'',
    email:'',
    address:'',
    city:'',
    country:'',
    telephone:'',
    contacts:[],
    plan:''
  }
  contact:any={
    name:'',
    position:'',
    email:'',
    telephone:'',
    access:true
  }
  plan:any = []
  plans:any=[]
  accounts:any = []
  users:any=[]
  accountId:any
  viewCenterForm:boolean = false
  newCenter:any={
    name: '',
	  code: '',
    zone: '', //z1,z2,z3, z4 y z5 Es la idea no?	
	  city: '',
    address: '',
    account:'' //Id de la cuenta a la que pertenece

  }
  user:any={
    name:'',
    last_name:'',
    email:'',
    role:'service_center',
    account:[],
    centers:[],
    password:'',
    repeat_password:''
  }
  newPass:any=''
  repeat_newPass:any=''
  typeUser:any='service_center'

  planSelect:any
  count:any=[]
  centers:any=[]
  seeEditAccount:boolean=false
  seeMore:boolean= true
  seeMoreContact:boolean=true
  seeMoreBilling:boolean=true
  seeMoreCenter:boolean=true
  seeEditPlan:boolean=true
  seeFormContact:boolean=true
  viewUserForm:boolean=false
  seeMoreUser:boolean=true
  seeHeadersUsers:boolean=false
  closeResult: string;
  userSelect:any = []
  constructor(
    private activeRoute: ActivatedRoute, 
    private accountService:AccountService, 
    private planService:PlansService, 
    private centerService:CenterService, 
    private modalService:NgbModal,
    private userService:UserService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe( (params: Params)=>{
      this.accountId = params['id']
      this.accountService.getAccountById(this.accountId)
      .subscribe( account =>{
        this.account = JSON.parse(account)
        this.planSelect = this.account.plan
        this.getPlan()
        this.getCount()
        this.getCenter()
        this.getAllPlans()
        this.getUserById()
      })
      
    } )
  }

  getCenter():void{
    this.centers=[]
    let item = { id:this.accountId }
    this.centerService.getCenterById(item)
    .subscribe( centers=>{
      this.centers = JSON.parse(centers)
    } )
  }
  getPlan():void{
    this.planService.getPlanById(this.account.plan)
      .subscribe( plan =>{
        this.plan = JSON.parse(plan)
      } )
  }


  getAllPlans():void{
    this.planService.getPlans()
    .subscribe( plans =>{
      this.plans = JSON.parse(plans)
    } )
  }

  createCenter():void{
    if(this.newCenter.name && this.newCenter.zone && this.newCenter.city && this.newCenter.address){
      this.newCenter.account = this.accountId
      this.centerService.newCenter(this.newCenter)
      .subscribe( (center,)=>{
        this.msg('Genial', 'El centro de servicio se ha creado con exito')
        this.getCenter()
        this.clearCenterForm()
        
      }, (err)=>{
        this.msg('Lo sentimos :(', `Ha ocurrido un error, el Centro de Servicio no se ha creado, revisa el formulario y vuelve a intentarlo`+err)
      })
    } else {
      this.msg('¡Ups!', 'Creemos que olvidaste algunos campos, por favor completalos y luego guarda el centro de servicio')
    }
    
  }


  getCode():void{
    let code;
    if(this.count.count < 10){
      code ='CS00' + this.count.count.toString()
    } else if( this.count.count < 100 ){
      code ='CS0' + this.count.count.toString()
    } else if( this.count.count < 1000 ){
      code ='CS' + this.count.count.toString()
    }
    this.newCenter.code = code
  }

  clearCenterForm():void{
    this.newCenter={
      name: '',
      code: '',
      zone: '', //z1,z2,z3, z4 y z5 Es la idea no?	
      city: '',
      address: '',
      account:'' //Id de la cuenta a la que pertenece
    }
    this.getCount()
  }

  getCount():void{
    this.centerService.countCenter()
    .subscribe( count =>{
      this.count = JSON.parse(count)
      this.getCode()
    })
  }

  // Edicion de los centros de Servicio
  editCenter(center:any):void{
    this.centerService.editCenter(center)
    .subscribe( center =>{
      this.msg('¡Genial!', 'Se han guardado los cambios')
      this.getCenter()
    }, (err)=>{
      this.msg('Ups!', 'Ha ocurrido un error al editar el centro de servicio')
    } )
  }

  // Edicion de la cuenta
  editAccount(account:any):void{
    this.accountService.editAccount(account)
    .subscribe( account=>{
      this.msg('Genial','Los cambios se han guardado con éxito')
      this.seeEditAccount = !this.seeEditAccount
      this.getPlan()
    },(err)=>{
      this.msg('Lo sentimos', 'Ocurrio un error al actualizar la cuenta')
    } )
  }

  //Cambiar el Plan de la cuenta
  editPlan():void{
    this.account.plan = this.planSelect;
    this.editAccount(this.account)
  }

  //Agregar nuevo contacto
  addContact():void{
    if(this.contact.name && this.contact.position && this.contact.email && this.contact.telephone){
      this.account.contacts.push(this.contact)
      this.editAccount(this.account)
      this.contact={
        name:'',
        position:'',
        email:'',
        telephone:'',
        access:true
      }
    } else {
      this.msg('Vamos Amigo', 'Por favor completa todos los datos')
    }
    
  }

  //Validar nuevo usuario
  newUser():void{
    this.userService.singUp(this.user)
    .subscribe( user =>{
      this.msg('Genial', 'Se ha creado el usuario')
      this.user={
        name:'',
        last_name:'',
        email:'',
        role:'center_service',
        account:[],
        centers:[],
        password:'',
        repeat_password:''
      }
      this.getUserById()
    }, (err)=>{
      let e = err
      console.log(e)
      this.msg('Lo sentimos', 'Ha ocurrido un error: '+e.error.message)
    })
  }

  //Crear usuario
  saveUser():void{
    if(this.user.name && this.user.last_name && this.user.email && this.user.password && this.user.repeat_password){
      if(this.user.password == this.user.repeat_password){
        this.user.account[0]=this.accountId
        this.user.role = this.typeUser
        // this.user.centers.push(this.center._id)
        this.user.centers = []
        for(let i of this.centers){
          if(i.select){
            this.user.centers.push(i._id)
          }
        }
        this.newUser()

      } else {
        // las contraseñas no coinceden
        this.msg('¡Ups!', 'Las contraseñas no coinciden')
      }
    } else {
      // Por favor completa todos los datos
      this.msg('¡Ups', 'Por favor completa todos los datos')
    }
  }

  //Obtener usuarios
  getUserById():void{
    this.userService.getUserById(this.accountId)
    .subscribe( users=>{
      this.users = JSON.parse(users)
    } )
  }

  //Actualizar usuarios
  updateUser(user:any):void{
    if(user.newPass && user.repeat_newPass){
      if(user.newPass == user.repeat_newPass){
        user.password = user.newPass
      }
    }
    user.centers = []
    for(let i of this.centers){
      if(i.select){
        user.centers.push(i._id)
      }
    }
    this.userService.upDateUser(user)
    .subscribe( update =>{
      this.msg('Genial', 'El usuario ha sido actualizado exitosamente')
      for(let i of this.centers){
        i.select = false
      }
    }, (err)=>{
      this.msg('Lo sentimos', 'Error al actualizar el usuario: ')
    })
  }

  msg(header:string, body:string){
    const modalRef = this.modalService.open(MsgComponent,{
      centered:true,
    });
    modalRef.componentInstance.header = header
    modalRef.componentInstance.body = body
  }

  open(content, userSelect:any) {
    for(let i of this.centers){
      i.select = false
    }
    this.userSelect = userSelect
  
    for(let i of this.centers){
      for(let j of userSelect.centers){
        if(j == i._id){
          i.select = true
        }
      }
    }

    this.modalService.open(content, { size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
