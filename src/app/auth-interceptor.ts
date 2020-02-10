import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {SessionService} from "./services/session.service";
import {Injectable} from "@angular/core";

// This AuthInterceptor transforms every HTTP request before sending it to the server
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler){

    let token = this.sessionService.getToken();
    if (token == null){
      return next.handle(req);
    } else {
     const cloned =
       req.clone({ setHeaders: {Authorization: token }, withCredentials: true}); // widthCredentials = true is important for cross-size authorization
     return next.handle(cloned);
    }
  }

  //Fb token interceptor
  /*intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.sessionService.getToken();

    if(token){
      const cloned = req.clone({
        setParams: {'auth': token}
      });

      return next.handle(cloned);
    } else throw new Error("Missing token");

  }*/


}
