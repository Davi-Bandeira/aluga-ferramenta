import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ClientsService } from '../service/clients.service';
import { ClientsUsers } from '../clients/clients.users';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  private users: ClientsUsers = new ClientsUsers();


  constructor(private clientsService: ClientsService, private datePipe: DatePipe, private router: Router) {}

  ngOnInit() {
  }

  fazerCadastro(){
    this.clientsService.fazerCadastro(this.users);

  }

}
