import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { NovoTecnicoComponent } from './novo-tecnico/novo-tecnico.component';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css']
})
export class TecnicosComponent implements OnInit {

  todosTecnicos: any;
  tecnicoForm: UntypedFormGroup;

  constructor(private loginService: LoginService, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public dialog: MatDialog) { 
    this.nomeAtual = this.data[0].nome
    this.tecnicoForm = this.fb.group({
      nome: [data[0].nome, [Validators.required]],
      especialidade: [data[0].especialidade, [Validators.required]],

    });
  }

  ngOnInit() {
  }

  
  obterTodosTecnicos(){
    this.loginService.retornaTodosTecnicos().then(dados =>{
      this.todosTecnicos = dados
      this.data = dados
      console.log(dados)
    })
  }

  nomeAtual: any;

  novoForm(data: any){
    this.nomeAtual = data.nome
    this.tecnicoForm = this.fb.group({
      nome: [data.nome],
      especialidade: [data.especialidade],
    });
  }

  EnviarDados(){
    console.log('teste')
  }


  openDialogNovoTecnico(): void {
    const dialogUser = this.dialog.open(NovoTecnicoComponent, {
      // width: '50%',
      data: this.todosTecnicos
    });

    dialogUser.afterClosed().subscribe(dados =>{
      this.obterTodosTecnicos()
  
      
    });

  }
}
