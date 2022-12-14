import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Enconding': 'gzip'
  });


  login(body: any) {
    return new Promise(resolve => {
      this.http.post(this.url + '/user/login', body, { headers: this.headers }).subscribe(data => {
        resolve(data)
      })
    })
  }


  retornaUsuarioLogado(nome_user: any){
    let params = new HttpParams()
    .set('nome_user', nome_user)


    return new Promise(resolve => {
      this.http.get(this.url + '/retorna_users_nome', { headers: this.headers, params }).subscribe(data => {
        resolve(data)
      })
    })
  }

  criaUser(body: any){
    console.log(body)
    return new Promise(resolve => {
      this.http.post(this.url + '/cria_user', body, { headers: this.headers }).subscribe(data => {
        resolve(data)
      })
    })
  }


  criaTecnico(body: any){
    console.log(body)
    return new Promise(resolve => {
      this.http.post(this.url + '/cria_tecnico', body, { headers: this.headers }).subscribe(data => {
        resolve(data)
      })
    })
  }

  retornaTodosUsers(){
    return new Promise(resolve => {
      this.http.get(this.url + '/retorna_users', { headers: this.headers }).subscribe(data => {
        console.log(data)
        resolve(data)
      })
    })
  }


  retornaTodosTecnicos(){
    return new Promise(resolve => {
      this.http.get(this.url + '/retorna_tecnicos', { headers: this.headers }).subscribe(data => {
        console.log(data)
        resolve(data)
      })
    })
  }


  atualiza_user(id:any, body: any){
    console.log
    let params = new HttpParams()
      .set('user_id', id)

    return new Promise(resolve => {
      this.http.post(this.url + '/update_image', body, { headers: this.headers, params }).subscribe(data => {
        resolve(data)
      })
    })
  }


  atualiza_tecnico(id:any, body: any){
    console.log
    let params = new HttpParams()
      .set('user_id', id)

    return new Promise(resolve => {
      this.http.post(this.url + '/update_image_tecnico', body, { headers: this.headers, params }).subscribe(data => {
        resolve(data)
      })
    })
  }
}
