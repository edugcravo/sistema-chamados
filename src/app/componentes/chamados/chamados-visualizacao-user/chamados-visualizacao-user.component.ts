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
  value_filtro_user: any = ''

  constructor(private chamadosService: ChamadosService, private router: Router, public dialog: MatDialog) { }


  ngOnInit() {
    this.obterChamados()
    if(this.userLogado != 'true'){
      this.router.navigate(['login']);
    }
    
  }

  mostrarNomeUser: any = false;

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
      console.log(data)
      this.mostrarNomeUser = true
      this.chamado = data.chamado
      this.tecnicoChamado = data.tecnicos
      let usuariosChamado = data.usuarios
      let nomesTecnico: any[] = []

      for(let tecnico of this.tecnicoChamado){
        nomesTecnico.push(tecnico.nome)
      }

      nomesTecnico.forEach((element: any, index: any) => {
          this.chamado[index]['nome_tecnico'] = element
      })

      for(let usuario of usuariosChamado){
        this.chamado[usuariosChamado.indexOf(usuario)]['nome_usuario'] = usuario.nome
      }

      this.obterUsuariosSetor()
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

  usuarios: any;

  obterUsuariosSetor(){
    this.chamadosService.retorna_usuarios_por_setor(localStorage.getItem('setor')).then((data: any) =>{
      this.usuarios = data
      console.log(this.usuarios)
    })
  }

  filtrar(){
    this.chamadosService.retorna_chamado_por_filtro_usuario(this.value_filtro_user, localStorage.getItem('setor')).then((data: any) =>{
      this.chamado  =data.chamado
      console.log(data)

      this.tecnicoChamado = data.tecnicos
      console.log(this.tecnicoChamado)
      let usuariosChamado = data.usuarios
      let nomesTecnico: any[] = []
      let nomesUsuario: any[] = []

      for(let tecnico of this.tecnicoChamado){
        nomesTecnico.push(tecnico)
      }

      for(let usuario of usuariosChamado){
        nomesUsuario.push(usuario)
      }

      nomesTecnico.forEach((element: any, index: any) => {
        console.log(element)
          this.chamado[index]['nome_tecnico'] = element
      })

      for(let usuario of usuariosChamado){
        this.chamado[usuariosChamado.indexOf(usuario)]['nome_usuario'] = usuario
      }

    })

  }
}