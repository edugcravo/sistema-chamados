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
    if(this.value_problema == '') {
      this.value_problema = ['']
    }

    if(this.value_setor == '') {
      this.value_setor = ['']
    }

    console.log(this.value_problema)
    console.log(this.value_setor)
    this.chamadoService.retorna_chamado_por_filtro(this.value_setor, this.value_problema).then(dados =>{
      console.log(dados)
      this.valores_filtro = dados

      this.valores_filtro.chamado.forEach((element: any, index: any) => {
        element.id_usuario = this.valores_filtro.nome_users[index]
        element.tipo_problema = this.valores_filtro.problemas[index]

      });
    })
  }

  valorFiltroSelecionadoSetor: any;
  valorFiltroAno: any;

  onKeySetor(value: string) {
    this.valorFiltroSelecionadoSetor = this.setores
    this.valorFiltroSelecionadoSetor = this.searchSetor(value);
  }

  searchSetor(value: string) {
    let filter = value.toLowerCase();
    return this.setores.filter((option: any) => option.toLowerCase().startsWith(filter));
  }



  valorFiltroSelecionadoProblema: any;
  valorFiltroProblema: any;

  onKeyProblema(value: string) {
    this.valorFiltroSelecionadoProblema = this.problemas.tipo_problema
    this.valorFiltroSelecionadoProblema = this.searchProblema(value);
  }

  searchProblema(value: string) {
    let filter = value.toLowerCase();
    return this.problemas.tipo_problema.filter((option: any) => option.toLowerCase().startsWith(filter));
  }
}
