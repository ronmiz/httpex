import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
//throw is a static method of the Observable class
import 'rxjs/add/observable/throw';
import { AppError } from '../../commen/app-erroes';
import { NotFoundError } from '../../commen/not-found-error';
import { Response } from '@angular/http/src/static_response';
import { BadRequsetError } from '../../commen/bad-request-error';


@Injectable()
export class PostService {
  private url:string ='https://jsonplaceholder.typicode.com/posts';
  constructor(private http:Http) { }
  getPosts(){
   return  this.http.get(this.url)
   .catch((this.handlerError));
  }
  createPost(post){
    return this.http.post(this.url,JSON.stringify(post))
    .catch((this.handlerError));
  }
  updatePost(post){
    return this.http.patch(this.url +'/' + post.id ,JSON.stringify({isRead:true}))
    .catch((this.handlerError));
  }
  deletePost(id){
    //we need to return an Observable with an error type
    // so we need to import the Observable from the rxjs lib
    return  this.http.delete(this.url +'/'+ id)
    .catch((this.handlerError))
  }
  private handlerError(error:Response){
    if(error.status === 400 ){
      return Observable.throw(new BadRequsetError(error.json()))
    }
    if (error.status === 404 ){
      return  Observable.throw(new NotFoundError())
    }
    else{
      return  Observable.throw(new AppError(error))
    }

  }
}
