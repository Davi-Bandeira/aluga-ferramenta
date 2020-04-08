import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ClientsUsers } from '../clients/clients.users';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  clientUrl = 'http://localhost:4200/client'

  constructor(private httpClient: HttpClient, private router: Router) { }

  fazerCadastro(users: ClientsUsers){
    
    var usuarioNome = users.nome;
    var usuarioSenha = users.senha;

    var dados = JSON.parse(localStorage.getItem("dadosUsuario"));

    if(dados == null){
      localStorage.setItem("dadosUsuario", "[]");
      dados = [];
    }

    var auxRegistro = {
      nome: usuarioNome,
      senha: usuarioSenha
    }

    dados.push(auxRegistro);

    localStorage.setItem("dadosUsuario",JSON.stringify(dados));
    alert("Usuario cadastrado com sucesso!");

    this.router.navigate(['/login']);
  }

  list() {
    return this.httpClient.get<any[]>(`${this.clientUrl}`);
  }

  save(client: any){
    return this.httpClient.post(this.clientUrl, client);
  }

  delete(client: any){
    return this.httpClient.delete(this.clientUrl+'/'+client.id);
  }
  
}
