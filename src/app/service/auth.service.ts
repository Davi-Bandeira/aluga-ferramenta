import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

import { Users } from './../login/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  fazerLogin(users: Users){

    var usuarios = JSON.parse(localStorage.getItem("dadosUsuario"));

    var usuarioNome = users.nome;
    var usuarioSenha = users.senha;
    var usuario;
    var obj = [];

    obj = usuarios.find(item => item.nome.match(usuarioNome));
    usuario = Object.values(obj);

  
    if(usuarioNome === usuario[0] && usuarioSenha === usuario[1]){
        
        localStorage.setItem("acesso", "true");

        this.router.navigate(['/tools']);
        window.alert("Usuário Autenticado!");
        this.setUsuarioAtual(usuarioNome);

        
    }else{

      alert("Usuário ou senha inválidos.");

    }
  }

  setUsuarioAtual(usuarioNome: String){
    var usuarios = JSON.parse(localStorage.getItem("dadosUsuario"));

    var usuario;
    var obj = [];

    obj = usuarios.find(item => item.nome.match(usuarioNome));
    usuario = Object.values(obj);

    localStorage.setItem("usuarioAtual", usuario[2]);
  }
}
