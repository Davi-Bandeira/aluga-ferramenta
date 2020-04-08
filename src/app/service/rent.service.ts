import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  rentUrl = 'http://localhost:8084/rent'

  constructor(private httpClient: HttpClient, private router: Router) { }

  logado(){
    var logado = false;

    if(localStorage.getItem("acesso") == "true"){
      logado = true;
    }

    if(logado != true){
        alert("Voce não esta autenticado, Faça o login!");
        this.router.navigate(['/login']);
    }
  }

  getFerramentas(){
    return['1', 'Martelo', 'Sim', '10,00']
  }

  list() {
    return this.httpClient.get<any[]>(`${this.rentUrl}`);
  }

  save(rent: any){
    return this.httpClient.post(this.rentUrl, rent);
  }

  delete(rent: any){
    return this.httpClient.delete(this.rentUrl+'/'+rent.id);
  }

}

