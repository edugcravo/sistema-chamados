import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Enconding': 'gzip'
  });


  log(){
    return new Promise(resolve => {
      this.http.get(this.url + '/logs/retorna-todos', { headers: this.headers }).subscribe(data => {
        resolve(data)
      })
    })
  }

  create_chamado(body: any) {
    console.log(body)
    return new Promise(resolve => {
      this.http.post(this.url + '/chamado/create', body, { headers: this.headers }).subscribe(data => {
        resolve(data)
      })
    })
  }


  retorna_chamado_por_filtro(setor: any, problema: any) {
    let body = {
      problema: problema,
      setor: setor
    }

    return new Promise(resolve => {
      this.http.post(this.url + '/chamado/retorna-por-filtro', body, { headers: this.headers }).subscribe(data => {
        resolve(data)
      })
    })
  }

  retorna_chamado_por_id_tecnico(id_tecnico: any) {
    let params = new HttpParams()
      .set('id_tecnico', id_tecnico)

    console.log(id_tecnico)
    return new Promise(resolve => {
      this.http.get(this.url + '/chamado/retorna-id-tecnico', { headers: this.headers, params }).subscribe(data => {
        resolve(data)
      })
    })
  }


  retorna_chamado_por_id(id: any) {
    let params = new HttpParams()
      .set('id_chamado', id)

    return new Promise(resolve => {
      this.http.get(this.url + '/chamado/retorna-id', { headers: this.headers, params }).subscribe(data => {
        resolve(data)
      })
    })
  }


  atualiza_chamado(id:any, body: any, tecnico: any){

    console.log(id)
    console.log(tecnico)
    console.log(body)

    let params = new HttpParams()
      .set('id_chamado', id)
      .set('tecnico', tecnico)

    return new Promise(resolve => {
      this.http.put(this.url + '/chamado/update_chamado', body, { headers: this.headers, params }).subscribe(data => {
        resolve(data)
      })
    })
  }


  atualiza_status_chamado(id:any, body: any, tecnico: any){

    console.log(id)
    console.log(tecnico)
    console.log(body)

    let params = new HttpParams()
      .set('id_chamado', id)
      .set('tecnico', tecnico)

    return new Promise(resolve => {
      this.http.put(this.url + '/chamado/cancela_ou_reabre_chamado', body, { headers: this.headers, params }).subscribe(data => {
        resolve(data)
      })
    })
  }



  retorna_todos_chamados(){
    return new Promise(resolve => {
      this.http.get(this.url + '/chamado/retorna-chamados', { headers: this.headers }).subscribe(data => {
        resolve(data)
      })
    })
  }



  retorna_todos_tecnicos(){
    return new Promise(resolve => {
      this.http.get(this.url + '/retorna_tecnicos', { headers: this.headers }).subscribe(data => {
        resolve(data)
      })
    })
  }

  retorna_chamado_por_usuario(id: any){
    let params = new HttpParams()
      .set('id_usuario', id)

    return new Promise(resolve => {
      this.http.get(this.url + '/chamado/retorna-id-usuario', { headers: this.headers, params }).subscribe(data => {
        resolve(data)
      })
    })
  }


  retorna_todos_tipos_problemas(){
    return new Promise(resolve => {
      this.http.get(this.url + '/problema/retorna-todos', { headers: this.headers }).subscribe(data => {
        resolve(data)
      })
    })
  }


  //---------------- acompanhamento ----------------------

  retorna_acompanhamento(id: any){
      let params = new HttpParams()
        .set('id', id)
  
        console.log(id)
      return new Promise(resolve => {
        this.http.get(this.url + '/acompanhamento/retorna-id-chamado', { headers: this.headers, params }).subscribe(data => {
          resolve(data)
        })
      })
    }
}

