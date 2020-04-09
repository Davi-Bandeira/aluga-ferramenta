import { ToolsService } from '../service/tools.service';
import { Component, OnInit } from '@angular/core';
import { RentService } from './../service/rent.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  ferramentas: string[]= [];
  ferramentasService: RentService;

  rents: Array<any>;
  rent = {};
  clients: Array<any>;
  tools: Array<any>;
  msgError = null;
  msgSuccess = null;

  constructor(private toolsService: ToolsService, private rentService: RentService) {
    rentService.logado();    
  }

  ngOnInit() {
    this.getAll();
    var Alugar = document.getElementById("button1").addEventListener('click', function alugar(row:any){    
      alert('Alugar');
    })
    var Devolver = document.getElementById("button2").addEventListener('click', function devolver(row: any){
      alert ('Devolver');
    })
  }

  getAll(){
    this.rentService.getAll();
  }

  logoOut(){
    localStorage.setItem("acesso", "false");
    localStorage.setItem("usuarioAtual", "false");
  }

  listarDisponiveis(){
    var table1 = document.getElementById("tableAlugar");
    var table2 = document.getElementById("tableAlugadas");    

    table1.style.display = "block";
    table2.style.display = "none";

    this.getAll();
  }

  listarAlugadas(){
    var table1 = document.getElementById("tableAlugar");
    var table2 = document.getElementById("tableAlugadas");    

    table1.style.display = "none";
    table2.style.display = "block";

    this.rentService.getAlugadas();
  }

  
}
