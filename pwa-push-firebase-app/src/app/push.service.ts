import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class PushService {

  pushData:any = []

  constructor(private http:Http) { }

  // Providers function that triggers a push operation
  generatePush(pushData) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'key=<firebase server key>'})
    let options = new RequestOptions({ headers: headers })
    return this.http.post('https://fcm.googleapis.com/fcm/send', pushData, options)
        .map(data => {console.log("Successfully Sent")})
  }
  
}
