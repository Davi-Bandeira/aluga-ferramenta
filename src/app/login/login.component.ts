import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../service/auth.service';
import { Users } from '../login/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private users: Users = new Users();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  fazerLogin(){
    this.authService.fazerLogin(this.users);
  }

  fazerCadastro(){
    this.router.navigate(['/client']);
  }
}