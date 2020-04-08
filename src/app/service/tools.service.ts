import { Tools } from './../tools/tools';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  toolsUrl = 'http://localhost:8084/tools'

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
      if(tool.id == usuarioID){
        obj.push(tool);
      }
    });
    
    this.renderAll(obj);
  }

  cadastrarFerramenta(tools: Tools){

    var id = JSON.parse(localStorage.getItem("usuarioAtual"));
  
    var nome = tools.nome;
    var status = "Disponivel";
    var valor = tools.valor;
    var ID = id;

    var dados = JSON.parse(localStorage.getItem("dadosFerramenta"));

    if(dados == null){
      localStorage.setItem("dadosFerramenta", "[]");
      dados = [];
    }

    var auxRegistro = {
      nome: nome,
      status: status,
      valor: valor,
      id: ID
    }

    dados.push(auxRegistro);

    localStorage.setItem("dadosFerramenta",JSON.stringify(dados));

    var item = [];
    item.push(auxRegistro);
    
    this.renderLine(item);
  }

  buscar(term: any){
    var dados = JSON.parse(localStorage.getItem("dadosFerramenta"));
    var usuarioID = localStorage.getItem("usuarioAtual");
    
    var obj = [];
    var toolsFound = [];

    dados.forEach(function(tool) {
      if(tool.id == usuarioID){
        obj.push(tool);
      }
    });

    obj.forEach(function(tool) {
      if(tool.nome == term){
        toolsFound.push(tool);
      }
    });
    this.renderAll(toolsFound);
  }
  
  renderLine(tools: Array<any>){
    var table = document.getElementById("ferramentas").getElementsByTagName("tbody")[0];
    
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
  
  renderAll(tools: Array<any>){

    var table = document.getElementById("ferramentas").getElementsByTagName("tbody")[0];
    var tbodyNew = document.createElement("tbody");
    table.parentNode.replaceChild(tbodyNew, table);

    var table = document.getElementById("ferramentas").getElementsByTagName("tbody")[0];

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




  list() {
    return this.httpClient.get<any[]>(`${this.toolsUrl}`);
  }

  save(product: any){
    return this.httpClient.post(this.toolsUrl, product);
  }

  delete(tool: any){
    return this.httpClient.delete(this.toolsUrl+'/'+tool.id);
  }
  
}
