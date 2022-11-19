import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { LoginService } from 'src/app/services/login.service';


const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


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

  constructor(private loginService: LoginService, private router: Router, private _sanitizer:DomSanitizer) { }

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
      console.log(this.usuarioSetores)
      for(let item of this.usuarioSetores){
        item.img_perfil = this._sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' + item.img_perfil)
      }
      

      this.usuario.img_perfil = this._sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + this.usuario.img_perfil)

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

  bloquear: any = false;

  enviaDados(){
    this.bloquear = true
    if(this.nomeUsuario == null){
      this.loginService.atualiza_tecnico(this.usuario.id, {img_perfil: this.base64}).then(dados =>{
        console.log(dados)
        setTimeout(() => {
          this.bloquear = false
          window.location.reload()
        }, 500);
  
      })
    }else{
      this.loginService.atualiza_user(this.usuario.id, {img_perfil: this.base64}).then(dados =>{
        console.log(dados)
        setTimeout(() => {
          this.bloquear = false
          window.location.reload()
        }, 500);
  
      })
    }
    
  }

}
