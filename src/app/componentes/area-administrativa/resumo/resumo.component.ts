import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
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

  media: any;
  enviaDados(){
    this.dias = 0
    this.hora = 0
    if(this.value_problema == '') {
      this.value_problema = ['']
    }

    if(this.value_setor == '') {
      this.value_setor = ['']
    }

    console.log(this.value_problema)
    console.log(this.value_setor)
    this.chamadoService.retorna_chamado_por_filtro(this.value_setor, this.value_problema).then(dados =>{
      // console.log(dados)
      this.valores_filtro = dados
      let count = 0
      for(let item of this.valores_filtro.chamado){
        count++
        this.difference(item.data_criacao, item.data_finalizacao, item.hora_criacao, item.hora_finalizacao)
      }

      
      this.hora = this.hora.split(':')

      this.hora[0] = this.hora[0] / count
      if(this.hora[0] < 10){
        this.hora[0] = '0' + this.hora[0]
      }
      
      this.hora[1] = this.hora[1] / count
      this.hora[1] = Math.round(this.hora[1])
      if(this.hora[1] < 10){
        this.hora[1] = '0' + this.hora[1]
      }

      this.hora[2] = this.hora[2] / count
      this.hora[2] = Math.round(this.hora[2])
      if(this.hora[2] < 10){
        this.hora[2] = '0' + this.hora[2]
      }

      this.hora = this.hora[0] + ':' + this.hora[1] + ':' + this.hora[2]
      
      console.log(this.hora)

      this.valores_filtro.chamado.forEach((element: any, index: any) => {
        element.id_usuario = this.valores_filtro.nome_users[index]
        element.tipo_problema = this.valores_filtro.problemas[index]

      });
    })
    
  }

  teste(){
    console.log(this.hora)
  }

  dias: any = 0;
  hora: any = 0;

  totalDias: any = [];
  totalHoras: any = [];

  difference(date1: any, date2: any, hora1: any, hora2: any) {  

    date1 = date1.replaceAll('-', "")
    date2 = date2.replaceAll('-', "")


    var difference = Math.abs(date2-date1);
    let days = difference/(1000 * 3600 * 24)

    this.dias = this.dias + days
  
    var ms = moment(hora2,"HH:mm:ss").diff(moment(hora1,"HH:mm:ss"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

    if(this.hora == 0){
      console.log('entrou')
      this.hora = s
      console.log(this.hora)
    }else{
      console.log(this.hora)
      console.log('caiu no else')
      this.hora = this.somartempos(this.hora, s)
      console.log(this.hora)
    }
  }
  
  contador: any;

  somartempos(tempo1: any, tempo2: any) {
    console.log(tempo1)
    console.log(tempo2)
    var array1 = tempo1?.split(':');

    var tempo_seg1: any = (parseInt(array1[0]) * 3600) + (parseInt(array1[1]) * 60) + parseInt(array1[2]);

    var array2 = tempo2.split(':');

    var tempo_seg2: any = (parseInt(array2[0]) * 3600) + (parseInt(array2[1]) * 60) + parseInt(array2[2]);

    var tempofinal = parseInt(tempo_seg1) + parseInt(tempo_seg2);

    var hours = Math.floor(tempofinal / (60 * 60));

    var divisorMinutos = tempofinal % (60 * 60);

    var minutes = Math.floor(divisorMinutos / 60);

    var divisorSeconds = divisorMinutos % 60;

    var seconds = Math.ceil(divisorSeconds);

    this.contador = "";

    if (hours < 10) { this.contador = "0" + hours + ":"; } else { this.contador = hours + ":"; }

    if (minutes < 10) { this.contador += "0" + minutes + ":"; } else { this.contador += minutes + ":"; }

    if (seconds < 10) { this.contador += "0" + seconds; } else { this.contador += seconds; }

   return this.contador
}

  // difference(date1: any, date2: any) {  
  //   const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  //   const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  //     let day = 1000*60*60*24;
  //   return(date2utc - date1utc)/day
  // }

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
