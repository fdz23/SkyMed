import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hospitais } from 'src/assets/hospitais';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  insereHospital(hospital: Hospitais): Observable<Hospitais> {
    const url = `http://127.0.0.1:8080/hospital/`;
    return this.http.post<Hospitais>(url, hospital);
  }

  atualizaHospital(hospital: Hospitais): Observable<Hospitais> {
    const url = `http://127.0.0.1:8080/hospital/`;
    return this.http.put<Hospitais>(url, hospital);
  }

  obtenhaHospitais(): Observable<any> {
    const url = `http://127.0.0.1:8080/hospital/`;
    return this.http.get<Hospitais[]>(url);
  }

  obtenhaHospitalPorId(id: any): Observable<any> {
    const url = `http://127.0.0.1:8080/hospital/`;
    return this.http.get<Hospitais[]>(url.concat(id));
  }

  deletaHospital(id: any): Observable<any> {
    const url = `http://127.0.0.1:8080/hospital/`;
    return this.http.delete(url.concat(id));
  }
}
