import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChamadosService } from 'src/app/services/chamados.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gerar-chamado',
  templateUrl: './gerar-chamado.component.html',
  styleUrls: ['./gerar-chamado.component.css']
})
export class GerarChamadoComponent implements OnInit {
  chamadosForm: UntypedFormGroup;
  nomeUsuario: any = localStorage.getItem('usuario')
  nomeTecnico: any = localStorage.getItem('tecnico')
  userLogado: any = localStorage.getItem('logado')

  
  local: any;
  ramal: any;
  tipo_problema: any;
  desc_problema: any;
  problemas: any;



  constructor(private router: Router, private chamadosService: ChamadosService, private fb: UntypedFormBuilder) {
    this.chamadosForm = this.fb.group({
      id_equipamento: ['', [Validators.required, Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.maxLength(50)]],
      ramal: ['', [Validators.required, Validators.maxLength(50)]],
      tipo_problema: ['', [Validators.required, Validators.maxLength(50)]],
      desc_problema: ['', [Validators.required]],
      status:[''],
      id_tecnico: [''],
      id_usuario: [''],
      data_hora_criacao: []
    });
    
   }

  ngOnInit() {
    if(this.userLogado != 'true'){
      this.router.navigate(['login']);
    }
    this.obterTiposProblemas()
  }

  enviaDadosChamado(){
    this.chamadosForm.value.id_usuario = localStorage.getItem('id_usuario');
    console.log(this.chamadosForm.value)
    this.chamadosService.create_chamado(this.chamadosForm.value).then((data: any) =>{
      console.log(data)


      if (data.status == 401) {
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'error',
          title: 'Erro ao enviar chamado',
        })
      }else{
        Swal.fire({
          timer: 2000,
          showConfirmButton: false,
          icon:'success',
          title: 'Chamado criado com sucesso !'
        })
        this.router.navigate(['visualizacao-chamado']);
      }
    })
  }



  obterTiposProblemas(){
    this.chamadosService.retorna_todos_tipos_problemas().then((dados: any) =>{
      this.problemas = dados.data
      console.log(this.problemas)
    })
  }
  

}
