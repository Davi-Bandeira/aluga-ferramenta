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

  clients: Array<any>;
  client = {};
  msgError = null;
  msgSuccess = null;

  constructor(private clientsService: ClientsService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
    this.list();
  }

  fazerCadastro(){
    this.clientsService.fazerCadastro(this.users);
  }

  list() {
    this.clientsService.list().subscribe(dados =>
      dados.forEach(element => {
        element.dateBirth = this.datePipe.transform(element.dateBirth, "yyyy-MM-dd");
      },
        this.clients = dados
      ));
  }

  save() {
    this.clientsService.save(this.client)
      .subscribe(() => {
        this.client = {};
        this.list();
        this.msgSuccess = 'Client created successfully.';
      },
        response => {
          this.msgError = 'Name and e-mail of client cannot be empty.';
        }
      );

      this.msgError = null;
      this.msgSuccess = null;

      this.router.navigate(['/login']);
  }

  delete(client: any) {
    this.clientsService.delete(client)
      .subscribe(() => {
        this.list();
        this.msgSuccess = 'Client created successfully.';
      },
        response => {
          this.msgError = 'Could not delete client.';
        }
      );

      this.msgError = null;
      this.msgSuccess = null;
  }

  update(client: any) {
    this.client = client;
    client.dateBirth = this.datePipe.transform(client.dateBirth, "yyyy-MM-dd");
  }

  cancel() {
    this.client = {};
  }

}
