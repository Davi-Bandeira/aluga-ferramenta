import { ToolsService } from '../service/tools.service';
import { ClientsService } from '../service/clients.service';
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

  constructor(private clientService: ClientsService, private toolsService: ToolsService, private rentService: RentService) {
    this.ferramentasService = rentService;
    rentService.logado();    
  }

  ngOnInit() {

    this.ferramentas = this.ferramentasService.getFerramentas();

    this.list();
    this.clientService.list().subscribe(dados => this.clients = dados);
    this.toolsService.list().subscribe(dados => this.tools = dados);
  }

  list() {
    this.rentService.list().subscribe(dados => this.rents = dados);
  }
  logoOut(){
    localStorage.setItem("acesso", "false");
  }

  listarDisponiveis(){
    var table1 = document.getElementById("tableAlugar");
    var table2 = document.getElementById("tableAlugadas");    

    table1.style.display = "block";
    table2.style.display = "none";
  }

  listarAlugadas(){
    var table1 = document.getElementById("tableAlugar");
    var table2 = document.getElementById("tableAlugadas");    

    table1.style.display = "none";
    table2.style.display = "block";
  }

  save() {
    this.rentService.save(this.rent)
      .subscribe(() => {
        this.rent = {};
        this.list();
        this.msgSuccess = 'Rent created successfully.';
      },
        response => {
          this.msgError = 'Tools must contain the customer and at least one product.';
        }
      );

    this.msgError = null;
    this.msgSuccess = null;
  }

  delete(rent: any) {
    this.rentService.delete(rent)
      .subscribe(() => {
        this.list();
        this.msgSuccess="Rent deleted successfully."
      },
        response => {
          this.msgError = 'Could not delete rent.';
        }
      );

    this.msgError = null;
    this.msgSuccess = null;
  }

  update(rent: any) {
    this.rent = rent;
  }

  cancel() {
    this.rent = {};
  }

}
