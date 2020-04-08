import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

import { Users } from './../login/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(users: Users){

    var usuarios = JSON.parse(localStorage.getItem("dadosFerramenta"));

    var usuarioNome = users.nome;
    var usuarioSenha = users.senha;

    if(usuarioNome === "Davi" && usuarioSenha === "2248"){
        this.usuarioAutenticado = true;
        this.mostrarMenuEmitter.emit(true);
        
        localStorage.setItem("acesso", "true");

        this.router.navigate(['/tools']);
        window.alert("Usuário Autenticado!");
        
    }else{

      alert("Usuário ou senha inválidos.");

      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }

  }
}
