import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-novo-tecnico',
  templateUrl: './novo-tecnico.component.html',
  styleUrls: ['./novo-tecnico.component.css']
})
export class NovoTecnicoComponent implements OnInit {
  tecnicoForm: UntypedFormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private dialogRef: DialogRef<NovoTecnicoComponent>) {
    
    this.tecnicoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      especialidade: ['', [Validators.required, Validators.maxLength(50)]],
      user_passw: ['', [Validators.required, Validators.maxLength(50)]],
      qtd_chamado: [0, ],
    });
   }

  ngOnInit() {
  }


  enviaDadosUsuario(){
    this.loginService.criaTecnico(this.tecnicoForm.value).then((dados: any) =>{
      console.log(dados)


      if (!dados.data) {
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'error',
          title: 'Erro ao cadastrar tecnico',
        })
      }else{
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'success',
          title: 'Tecnico cadastrado com sucesso !'
        })
        this.dialogRef.close();
      }
    })
  }

}
