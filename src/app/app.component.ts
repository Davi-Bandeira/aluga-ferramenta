import { AuthService } from './service/auth.service';
import { Component, NgModule } from '@angular/core';
import {  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'commerce-ui';

  mostrarMenu: boolean = false;

  constructor(private authService: AuthService){

  }

  NgOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }
}
