import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChamadosService } from 'src/app/services/chamados.service';

@Component({
  selector: 'app-chamados-visualizacao-user',
  templateUrl: './chamados-visualizacao-user.component.html',
  styleUrls: ['./chamados-visualizacao-user.component.css']
})
export class ChamadosVisualizacaoUserComponent implements OnInit {

  nomeUsuario: any = localStorage.getItem('usuario')
  userLogado: any = localStorage.getItem('logado')
  chamado: any;
  tecnicoChamado: any;

  constructor(private chamadosService: ChamadosService, private router: Router, public dialog: MatDialog) { }


  ngOnInit() {
    this.obterChamados()
    if(this.userLogado != 'true'){
      this.router.navigate(['login']);
    }
    
  }

  obterChamados(){
    if(localStorage.getItem('nivel') != 'gestor'){
    this.chamadosService.retorna_chamado_por_usuario(localStorage.getItem('id_usuario')).then((data: any) =>{
      
      this.chamado = data.chamado
      this.tecnicoChamado = data.tecnicos
      let nomesTecnico: any[] = []

      for(let tecnico of this.tecnicoChamado){
        nomesTecnico.push(tecnico.nome)
      }

      nomesTecnico.forEach((element: any, index: any) => {
          this.chamado[index]['nome_tecnico'] = element
      })

      console.log(this.chamado)
      console.log(this.tecnicoChamado)
    })
  }else{
    this.chamadosService.retorna_chamado_por_setor(localStorage.getItem('setor')).then((data: any) =>{
      this.chamado = data.chamado
      this.tecnicoChamado = data.tecnicos
      let nomesTecnico: any[] = []

      for(let tecnico of this.tecnicoChamado){
        nomesTecnico.push(tecnico.nome)
      }

      nomesTecnico.forEach((element: any, index: any) => {
          this.chamado[index]['nome_tecnico'] = element
      })
    })
  }
  }


  abreChamado(id: any) {
    localStorage.setItem('id-chamado', id)
    this.router.navigate(['chamado-individual-user']);
    // this.dialog.open(ChamadoIndividualComponent, {
    //   width: '500px',
    //   data: id
    // });
  }
}