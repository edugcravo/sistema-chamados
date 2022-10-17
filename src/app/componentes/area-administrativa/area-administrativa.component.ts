import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area-administrativa',
  templateUrl: './area-administrativa.component.html',
  styleUrls: ['./area-administrativa.component.css']
})
export class AreaAdministrativaComponent implements OnInit {

  usuarioForm: UntypedFormGroup;
  todosUsuarios: any;

  constructor(private fb: UntypedFormBuilder, private loginService: LoginService) {
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
    this.obterTodosUsuarios()
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
      }
    })
  }


  obterTodosUsuarios(){
    this.loginService.retornaTodosUsers().then(dados =>{
      this.todosUsuarios = dados
      console.log(dados)
    })
  }
}
