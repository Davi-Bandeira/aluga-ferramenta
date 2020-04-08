import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientsService } from './service/clients.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";


import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ToolsComponent } from './tools/tools.component';
import { RentComponent } from './rent/rent.component';
//import { routing } from './app.routing';
import { LoginComponent } from './login/login.component';
import { RentService } from './service/rent.service';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ToolsComponent,
    RentComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    //routing,
    CurrencyMaskModule,
    AppRoutingModule
  ],
  
  providers: [ClientsService,DatePipe, AuthService, RentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
