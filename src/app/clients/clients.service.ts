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

  getAll(): Observable<IReturn> {
    const Url = environment.apiUrl + '/clients';

    return this.http.get<IReturn>(Url).pipe(
      map((res) => {
        res.data.forEach((element: any) => {
          element = new ModelMapper(Client).map(element);
        });
        return res.data;
      })
    );
  }
}
