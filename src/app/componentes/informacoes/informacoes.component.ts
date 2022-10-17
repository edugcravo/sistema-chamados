import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-informacoes',
  templateUrl: './informacoes.component.html',
  styleUrls: ['./informacoes.component.css']
})
export class InformacoesComponent implements OnInit {

  usuario: any;
  usuarioSetores:any;

  nomeUsuario: any = localStorage.getItem('usuario')
  nomeTecnico: any = localStorage.getItem('tecnico')

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.pegaInfoUsuario()
  }

  pegaInfoUsuario(){
    let dadosEnviar: any;
    if(this.nomeUsuario == null){
      dadosEnviar = this.nomeTecnico
    }else{
      dadosEnviar = this.nomeUsuario
    }
    this.loginService.retornaUsuarioLogado(dadosEnviar).then((data: any) =>{
      console.log(data)
      this.usuario = data.usuario
      this.usuarioSetores = data?.usuarios_setores
    })
  }

}
