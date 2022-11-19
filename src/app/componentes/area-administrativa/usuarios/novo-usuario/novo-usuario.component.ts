import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  usuarioForm: UntypedFormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private dialogRef: DialogRef<NovoUsuarioComponent>) {
    
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      nascimento: ['', [Validators.required, Validators.maxLength(50)]],
      setor: ['', [Validators.required]],
      ramal:['', [Validators.required]],
      user_passw: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
    });
   }

  ngOnInit() {
  }


  enviaDadosUsuario(){
    this.loginService.criaUser(this.usuarioForm.value).then((dados: any) =>{
      console.log(dados)


      if (!dados.data) {
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'error',
          title: 'Erro ao cadastrar usuário',
        })
      }else{
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'success',
          title: 'Usuário cadastrado com sucesso !'
        })
        this.dialogRef.close();
      }
    })
  }

}
