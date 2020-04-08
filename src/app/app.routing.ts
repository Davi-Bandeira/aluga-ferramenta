import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { ToolsComponent } from './tools/tools.component';
import { RentComponent } from './rent/rent.component';
import { LoginComponent } from './login/login.component';

const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'client', component: ClientsComponent},
    {path: 'tools', component: ToolsComponent},
    {path: 'rent', component: RentComponent},
    {path: '', component: LoginComponent}
];

/* Definição e configuração das rotas */
export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);