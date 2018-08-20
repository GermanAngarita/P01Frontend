import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//Servicios
import { AuthGuardService} from './services/auth-guard.service';
import { ManagerGuardService } from './services/manager-guard.service';
import { AccountGuardService } from './services/account-guard.service';


//Components
import { AccountComponent } from '../app/account/account.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { CenterComponent } from './center/center.component';
import { AccountConfiComponent } from './dashboard/account-confi/account-confi.component';
import { NewAccountComponent } from './dashboard/account-confi/new-account/new-account.component';
import { PlansConfiComponent } from './dashboard/plans-confi/plans-confi.component';
import { PlansComponent } from './dashboard/plans-confi/plans/plans.component';
import { AccountListComponent } from './dashboard/account-confi/account-list/account-list.component';
import { AccountDetailsComponent } from './dashboard/account-confi/account-details/account-details.component';
import { CentersConfiComponent } from './dashboard/centers-confi/centers-confi.component';
import { CenterListComponent } from './dashboard/centers-confi/center-list/center-list.component';
import { CenterDetailsComponent } from './dashboard/centers-confi/center-details/center-details.component';
import { SupplyConfiComponent } from './dashboard/supply-confi/supply-confi.component';
import { ControlCenterComponent } from './account/control-center/control-center.component';
import { SupplyAccountComponent } from './account/supply-account/supply-account.component';
import { ServiceAccountComponent } from './account/service-account/service-account.component';
import { ServiceConfiComponent } from './account/service-account/service-confi/service-confi.component';
import { ServiceListComponent } from './account/service-account/service-list/service-list.component';

const routes:Routes =[
  { path:'login', component:LoginComponent },
  { path:'', redirectTo:'login', pathMatch:'full'},

  { path:'dashboard', component:DashboardComponent, canActivate:[ManagerGuardService], children:[
    { path:'menu', component:MenuComponent},
    { path:'accountConfi', component:AccountConfiComponent, children:[
      { path:'newAccount', component:NewAccountComponent},
      { path:'accountList', component:AccountListComponent },
      { path:'accountDetails/:id', component:AccountDetailsComponent},
      { path:'', redirectTo:'accountList', pathMatch:'full' }

    ]},
    { path:'plansConfi', component:PlansConfiComponent, children:[
      { path:'plans', component:PlansComponent },
      { path:'', redirectTo:'plans', pathMatch:'full'}
    ]},
    { path:'centersConfi', component:CentersConfiComponent, children:[
      { path:'centerList', component:CenterListComponent },
      { path:'centerDetails/:id', component:CenterDetailsComponent},
      { path:'', redirectTo:'centerList', pathMatch:'full'}
    ]},
    { path:'supplyConfi', component:SupplyConfiComponent},
    { path:'', redirectTo:'menu', pathMatch:'full'}
  ]},
  { path:'account_manager', component:AccountComponent, canActivate:[AccountGuardService], children:[
    { path:'controlCenter', component:ControlCenterComponent},
    { path:'supply', component:SupplyAccountComponent},
    { path:'service', component:ServiceAccountComponent, children:[
      { path:'config', component:ServiceConfiComponent},
      { path:'list', component:ServiceListComponent },
      { path:'', redirectTo:'list', pathMatch:'full' }
    ]},
    { path:'', redirectTo:'controlCenter', pathMatch:'full' }
  ] },
  { path:'service_center', component:CenterComponent }
]

@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  exports:[ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
