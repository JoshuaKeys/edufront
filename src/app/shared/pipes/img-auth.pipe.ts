import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Pipe({
  name: 'imgAuth'
})
export class ImgAuthPipe implements PipeTransform {

  async transform(src: string): Promise<string> {
    const token = localStorage.getItem('user-auth');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const imageBlob = await this.httpClient.get(src, { headers, responseType: 'blob' }).toPromise();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageBlob);
    });
  }
  constructor(private httpClient: HttpClient, private authService: AuthService) { }
}
