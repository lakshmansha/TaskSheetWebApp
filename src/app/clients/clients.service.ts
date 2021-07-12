import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { IReturn, Client } from '@app/@core/interface';
import { ModelMapper } from '@app/@core/mapper';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Client[]> {
    const Url = environment.apiUrl + '/clients';

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        const resData = {} as IReturn;
        resData.data = [];
        res.data.forEach((element: any) => {
          element = new ModelMapper(Client).map(element);
          resData.data.push(element);
        });
        return resData.data;
      })
    );
  }
}
