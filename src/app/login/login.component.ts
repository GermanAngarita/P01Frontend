import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService  } from '../services/user.service';
import { MsgComponent } from '../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user = {
    email:'',
    password:''
  }
  response:any=[]
  message:any = ''
  getUser:any = []

  constructor( private userService: UserService,
    private router: Router,
    private modalService:NgbModal ) { }

  ngOnInit() {
  	localStorage.setItem('token', '');
  }

  getNewPass():void {
    if(this.user.email){
      this.userService.getNewPass(JSON.stringify(this.user))
    .subscribe( getNewPass => {
      this.msg('Cambio de Contraseña', `Se ha enviado un email con una nueva contraseña a ${this.user.email}`)
    } )
    } else {
      this.msg('Lo sentimos', 'Olvidaste escribir una cotraseña')
    }
  }

  singIn():void{
    this.response=[]
    this.message = ''
    if(this.user.email){
      this.userService.singIn(this.user)
    .subscribe( response => { 
      this.response = JSON.parse(response); 
      this.setLocalStore(response)
    },   
      err =>{ 
      this.message = err } )
    } else {
      this.msg('Lo sentimos', 'Olvidaste escribir un Correo Electrónico')
    }
  }

  goTo(route:string): void {
    this.router.navigateByUrl(route);
  }
  
  setLocalStore(token: any): void {
    const tokenSave = JSON.parse(token);
    
    localStorage.setItem('token', JSON.stringify(tokenSave.token));
    this.getUserByEmail()
  }
  getUserByEmail():void {
    this.getUser = []
    this.userService.getUserByEmail(this.user)
    .subscribe( getUserByEmail => {
      this.getUser = JSON.parse(getUserByEmail); 
      this.handRoutes(JSON.parse(getUserByEmail))} )
    
  }
  handRoutes(user:any):void{
    localStorage.setItem('user', JSON.stringify(user));
    if(user.active){
      switch(user.role){
        case 'manager': this.router.navigate(['dashboard']); break
        case 'account_customer': this.router.navigate(['account_manager']); break
        case 'service_center': this.router.navigate(['service_center']); break
        // case 'adviser': this.router.navigate(['adviser']); break
      }
    } else {
      this.msg('Lo sentimos', 'Tu usuario no se encuetra activo, por favor contacta al administrador te cuenta.')
    }
    // console.log(user.role)
  }

  closeAlert(){
    this.message = ''
  }

  msg(header:string, body:string){
    const modalRef = this.modalService.open(MsgComponent,{
      centered:true,
    });
    modalRef.componentInstance.header = header
    modalRef.componentInstance.body = body
  }

}
