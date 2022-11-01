import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = '';
  senha: any = '';

  constructor(private router: Router, private loginService: LoginService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login(){
    let body = {
      "username": this.usuario,
      "user_passw": this.senha
    }
    this.loginService.login(body).then((data: any) => {
      console.log(data)
      if(data?.status == 200 || data == null){
        if(data?.tecnico){
          localStorage.setItem('tecnico', data?.tecnico.nome)
          localStorage.setItem('id_tecnico', data?.tecnico.id)
          this.router.navigate(['chamados']);
        }
        else{
          localStorage.setItem('usuario', this.usuario)
          localStorage.setItem('id_usuario', data?.id)
          this.router.navigate(['gerar-chamado'])
        }
        localStorage.setItem('logado', 'true')
      }else{
        this._snackBar.open('Usuário ou senha inválido', '', {
          duration: 3000
        })
      }


    // this.router.navigate(['gerar-chamado']);
  })

}
}
