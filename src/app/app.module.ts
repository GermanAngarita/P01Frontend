import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MsgComponent } from './msg/msg.component';

//Services
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthServiceService } from './services/auth-service.service';
import { ManagerGuardService } from './services/manager-guard.service';
import { AccountGuardService } from './services/account-guard.service';
import { AccountComponent } from './account/account.component';
import { CenterComponent } from './center/center.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { AccountConfiComponent } from './dashboard/account-confi/account-confi.component';
import { NewAccountComponent } from './dashboard/account-confi/new-account/new-account.component';
import { AccountService } from './services/account/account.service';
import { PlansConfiComponent } from './dashboard/plans-confi/plans-confi.component';
import { PlansComponent } from './dashboard/plans-confi/plans/plans.component';
import { PlansService } from './services/plans/plans.service';
import { AccountListComponent } from './dashboard/account-confi/account-list/account-list.component';
import { AccountDetailsComponent } from './dashboard/account-confi/account-details/account-details.component';
import { CenterService } from './services/center/center.service';
import { CentersConfiComponent } from './dashboard/centers-confi/centers-confi.component';
import { CenterListComponent } from './dashboard/centers-confi/center-list/center-list.component';
import { CenterDetailsComponent } from './dashboard/centers-confi/center-details/center-details.component';
import { SupplyConfiComponent } from './dashboard/supply-confi/supply-confi.component';
import { SupplysService } from './services/supplys/supplys.service';
import { ControlCenterComponent } from './account/control-center/control-center.component';
import { SupplyAccountComponent } from './account/supply-account/supply-account.component';
import { ServiceAccountComponent } from './account/service-account/service-account.component';
import { ServiceConfiComponent } from './account/service-account/service-confi/service-confi.component';
import { ServiceService } from './services/service/service.service';
import { ServiceListComponent } from './account/service-account/service-list/service-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MsgComponent,
    AccountComponent,
    CenterComponent,
    MenuComponent,
    AccountConfiComponent,
    NewAccountComponent,
    PlansConfiComponent,
    PlansComponent,
    AccountListComponent,
    AccountDetailsComponent,
    CentersConfiComponent,
    CenterListComponent,
    CenterDetailsComponent,
    SupplyConfiComponent,
    ControlCenterComponent,
    SupplyAccountComponent,
    ServiceAccountComponent,
    ServiceConfiComponent,
    ServiceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    {provide:LocationStrategy, useClass:HashLocationStrategy},
    UserService,
    AuthGuardService,
    AuthServiceService,
    ManagerGuardService,
    AccountGuardService,
    AccountService,
    PlansService,
    CenterService,
    SupplysService,
    ServiceService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    MsgComponent
  ]
})
export class AppModule { }
