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

  getAll(){
    var dados = JSON.parse(localStorage.getItem("dadosFerramenta")); 
    var usuarioID = localStorage.getItem("usuarioAtual");
    
    var obj = [];

    dados.forEach(function(tool) {
      if(tool.id != usuarioID){
        obj.push(tool);
      }
    });
    
    this.renderAll(obj);
  }

  renderAll(tools: Array<any>){

    var table = document.getElementById("tableAlugar").getElementsByTagName("tbody")[0];
    var tbodyNew = document.createElement("tbody");
    table.parentNode.replaceChild(tbodyNew, table);

    var table = document.getElementById("tableAlugar").getElementsByTagName("tbody")[0];

    tools.forEach(function(item){
      
      var newRow = table.insertRow(table.rows.length);

      var newCell_1 = newRow.insertCell(0);
      var newCell_2 = newRow.insertCell(1);
      var newCell_3 = newRow.insertCell(2);
      var newCell_4 = newRow.insertCell(3);

      var nome = document.createTextNode(item["nome"]);
      var valor = document.createTextNode(item["valor"]);
      var status = document.createTextNode(item["status"]);

      newCell_1.appendChild(nome);
      newCell_2.appendChild(valor);
      newCell_3.appendChild(status);

      newCell_4.innerHTML = "<button type= 'button' class='btn btn-outline-danger'>Remover</button>";

    });
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

