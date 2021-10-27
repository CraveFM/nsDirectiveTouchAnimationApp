import { Pipe, PipeTransform } from '@angular/core';
import { Http, ImageSource } from '@nativescript/core';
import { from, Observable } from 'rxjs';

@Pipe({
  name: 'protectedImage'
})
export class ProtectedImagePipe implements PipeTransform {

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
