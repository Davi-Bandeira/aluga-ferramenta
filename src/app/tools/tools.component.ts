import { ToolsService } from '../service/tools.service';
import { Component, OnInit } from '@angular/core';
import { Tools } from '../tools/tools';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  ferrament: Array<any>;
  tool = {};
  msgError = null;
  msgSuccess = null;
  
  private tools: Tools = new Tools();

  constructor(private toolsService: ToolsService) { 
    toolsService.logado();
  }

  ngOnInit() {
    this.getAll();
    var Remover = document.getElementById("remove").addEventListener('click', function (event){    
      var buttonRetornado = event.target;
      //var colunaButton = buttonRetornado.parentNode;
      //var linhaButton = colunaButton.parentNode;
      //linhaButton.remove();  
      alert("Remover");
    })
  }
  getAll(){
    this.toolsService.getAll();
  }

  cadastrarFerramenta(){
    this.toolsService.cadastrarFerramenta(this.tools);
    event.preventDefault();
    
  }

  removeAll(){
    if(localStorage.getItem("dadosFerramenta")){
      localStorage.removeItem("dadosFerramenta");
      window.location.reload();
    }
    this.toolsService.buscar('false');
  }

  logoOut(){
    localStorage.setItem("acesso", "false");
    localStorage.setItem("usuarioAtual", "false");
  }

  buscar(){
    var term = (<HTMLInputElement> document.getElementById("filtro")).value;

    this.toolsService.buscar(term);

  }
}
