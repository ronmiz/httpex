import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data-service';



@Injectable()
export class PostService extends DataService {
 // private url:string ='https://jsonplaceholder.typicode.com/posts';
  constructor(http:Http) {
    super('https://jsonplaceholder.typicode.com/posts',http);
   }
}
