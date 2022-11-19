import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ChamadosService } from 'src/app/services/chamados.service';
import Swal from 'sweetalert2';


const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

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
  erro: any = false;
  dataTimeAtual: any = new Date().toISOString()


  constructor(private router: Router, private chamadosService: ChamadosService, private fb: UntypedFormBuilder, private _snackBar: MatSnackBar) {
 

    this.chamadosForm = this.fb.group({
      id_equipamento: ['', [Validators.required, Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.maxLength(50)]],
      ramal: ['', [Validators.required, Validators.maxLength(50)]],
      tipo_problema: ['', [Validators.required, Validators.maxLength(50)]],
      desc_problema: ['', [Validators.required]],
      status:[''],
      id_tecnico: [0],
      id_usuario: [''],
      arquivo: [''],
      data_hora_criacao: [this.dataTimeAtual]
    });
    
   }

  ngOnInit() {
    if(this.userLogado != 'true'){
      this.router.navigate(['login']);
    }
    this.obterTiposProblemas()
  }

  id_usuario: any = localStorage.getItem('id_usuario')

  enviaDadosChamado(){

    this.chamadosForm.value.arquivo = this.base64

    if(this.chamadosForm.value.local != '' && this.chamadosForm.value.ramal != '' && this.chamadosForm.value.desc_problema != ''){
      let user = parseInt(this.id_usuario)
    this.chamadosForm.value.id_usuario = user
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
    })}
    else{
      this.erro = true
      this._snackBar.open('Preencha todos os campos necessáros !', '', {
        duration: 3000
      })
    }
  }



  obterTiposProblemas(){
    this.chamadosService.retorna_todos_tipos_problemas().then((dados: any) =>{
      this.problemas = dados.data
      console.log(this.problemas)
    })
  }
  

  previewImage: string | undefined = '';
  previewVisible = false;
  file: any;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
      this.previewImage = file['preview']
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;

  };


  arrayBufferToBase64(buffer: any) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }


  base64: any;

  beforeUpload: any = async (file: NzUploadFile): Promise<boolean> => {
      var buffer = await file['arrayBuffer']();
      this.base64 = this.arrayBufferToBase64(buffer)
    return true
  }


}
