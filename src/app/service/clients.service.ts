import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ClientsUsers } from '../clients/clients.users';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  clientUrl = 'http://localhost:4200/client'

  constructor(private httpClient: HttpClient, private router: Router) { }

  fazerCadastro(users: ClientsUsers){

    var id;

    if(localStorage.getItem("usuarioID")){
      id = JSON.parse(localStorage.getItem("usuarioID"));
    }else{
      localStorage.setItem("usuarioID", "0");
      id = JSON.parse(localStorage.getItem("usuarioID"));
    }
    
    var usuarioNome = users.nome;
    var usuarioSenha = users.senha;
    var usuarioID = id;

    var dados = JSON.parse(localStorage.getItem("dadosUsuario"));

    if(dados == null){
      localStorage.setItem("dadosUsuario", "[]");
      dados = [];
    }

    var auxRegistro = {
      nome: usuarioNome,
      senha: usuarioSenha,
      id: usuarioID
    }

    dados.push(auxRegistro);

    localStorage.setItem("dadosUsuario",JSON.stringify(dados));
    alert("Usuario cadastrado com sucesso!");

    Number.parseInt(id);
    id = id + 1;
    localStorage.setItem("usuarioID" , id);

    this.router.navigate(['/login']);
  }
}
