import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  nomeUsuario: any = localStorage.getItem('usuario')
  nomeTecnico: any = localStorage.getItem('tecnico')
  url: any = localStorage.getItem('page')

  constructor(private router: Router, private loginService: LoginService, private _sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.pegaInfoUsuario()
  }

  logOut(){
    this.router.navigate(['login'])
    localStorage.clear()
  }


  openAdmin(page: any){
    localStorage.setItem('page', page)
    this.router.navigate(['area-administrativa'])
  }

  usuario: any;

  pegaInfoUsuario(){
    let dadosEnviar: any;
    if(this.nomeUsuario == null){
      dadosEnviar = this.nomeTecnico
    }else{
      dadosEnviar = this.nomeUsuario
    }
    this.loginService.retornaUsuarioLogado(dadosEnviar).then((data: any) =>{
      this.usuario = data.usuario

      this.usuario.img_perfil = this._sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + this.usuario.img_perfil)

    })
  }
}
