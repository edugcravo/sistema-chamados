import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  todosUsuarios: any;
  usuarioForm: UntypedFormGroup;
  

  constructor(private loginService: LoginService, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public dialog: MatDialog) { 
    this.nomeAtual = this.data[0]?.nome
    this.usuarioForm = this.fb.group({
      nome: [data[0]?.nome, [Validators.required]],
      email: [data[0]?.email, [Validators.required]],

      setor: [data[0]?.setor, [Validators.required]],
    });


  }

  ngOnInit() {
  }


  obterTodosUsuarios(){
    this.loginService.retornaTodosUsers().then(dados =>{
      this.todosUsuarios = dados
      this.data = dados
      console.log(dados)
    })
  }

  nomeAtual: any;

  novoForm(data: any){
    this.nomeAtual = data.nome
    this.usuarioForm = this.fb.group({
      nome: [data.nome],
      email: [data.email],
      setor: [data.setor],
    });
  }

  EnviarDados(){
    console.log('teste')
  }


  openDialogNovoUser(): void {
    const dialogUser = this.dialog.open(NovoUsuarioComponent, {
      width: '30%',
      data: this.todosUsuarios
    });

    dialogUser.afterClosed().subscribe(dados =>{
      this.obterTodosUsuarios()
  
      
    });

  }
}
