import { Component, OnInit } from '@angular/core';
import { ChamadosService } from 'src/app/services/chamados.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.css']
})
export class ResumoComponent implements OnInit {

  constructor(private loginService: LoginService, private chamadoService: ChamadosService) { }

  ngOnInit() {  
    this.retornarUsers()
    this.retornaTipoProblemas()
  }


  filtrarDocumentos(){

  }

  users: any;
  setores: any = [];

  retornarUsers(){
    this.loginService.retornaTodosUsers().then(dados =>{
      this.users = dados
      console.log(dados)
      let setores: any[] = [];
      for(let item of this.users){
        setores.push(item.setor)
      }

      this.setores = setores.filter((este: any, i: any) => setores.indexOf(este) === i);
      console.log(this.setores)
    })
  }

  problemas: any;

  retornaTipoProblemas(){
    this.chamadoService.retorna_todos_tipos_problemas().then((dados: any) =>{
      console.log(dados)
      this.problemas = dados.data
    })
  }

  value_problema: any = '';
  value_setor: any = '';

  valores_filtro: any;
  enviaDados(){
    console.log(this.value_problema)
    console.log(this.value_setor)
    this.chamadoService.retorna_chamado_por_filtro(this.value_setor, this.value_problema).then(dados =>{
      console.log(dados)
      this.valores_filtro = dados
    })
  }
}
