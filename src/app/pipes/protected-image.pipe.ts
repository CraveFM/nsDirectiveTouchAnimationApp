import { Pipe, PipeTransform } from '@angular/core';
import { ImageSource, Http } from '@nativescript/core';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Pipe({
  name: 'protectedImage'
})
export class ProtectedImagePipe implements PipeTransform {

  constructor() {}

  transform(url: string): Observable<ImageSource> {
    let image: Promise<ImageSource> = Http.getImage({
      // headers: {
      //   Authorization: `Bearer ${this.getToken()}`, // or whatever additional headers that needs to be passed in
      // },
      url: url,
      method: 'GET',
    })
    return from( image )
  }

  getToken(): string {
    // access token
    return "qgk2+6Sv9/oM7G3qLEjTH1a1l1g=";
  }

}
