import { Component,OnInit } from '@angular/core';
import { PostService } from './../services/post.service';
import { AppError } from './../../commen/app-erroes';
import { NotFoundError } from './../../commen/not-found-error';
import { BadRequsetError } from '../../commen/bad-request-error';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:any[];
 
  constructor(private service:PostService) {}
  
  ngOnInit(){
    this.service.getAll()
     .subscribe(posts =>this.posts = posts);
   }
   createPost(inputTitle:HTMLInputElement){
     let post = { title:inputTitle.value};
     inputTitle.value= '';
     this.service.create(post)
     .subscribe(
      newPost => {
       post['id'] = newPost.id;
       this.posts.splice(0,0,post);
     },
      (error:AppError) =>{
        if(error instanceof BadRequsetError){
          //this is an exsample in case of a form error
          //this.form.setErrors(error.originalError);
          alert('An unexpected error occurred Bad requset send.')
        }else{
          throw error;
        }
    });
   }
   delete(postInfo){
     // to test the delete error we can send an invalid id like 3000
      this.service.delete(postInfo.id)//postInfo.id- 3000
      //we dont get a return value so we have only ()
     .subscribe(
      () => {
       let index = this.posts.indexOf(postInfo);
       this.posts.splice(index,1);
     },
      (error:AppError) =>{
        if(error instanceof NotFoundError){ 
          alert('This Post has already been deleted.');
          console.log(error);
        }
        else{
          throw error;
        }  
    });  
  }
  update(post){
    this.service.update(post)
    .subscribe(
      updatedPost => {
      console.log(updatedPost);
    }
  );
  }
} 
