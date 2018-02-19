import { Component,OnInit } from '@angular/core';
import { PostService } from './../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:any[];
 
  constructor(private service:PostService) {}
  
  ngOnInit(){
    this.service.getPosts()
    .subscribe(
    res => {
        this.posts = res.json();
    },
    error =>{
      alert('An unexpected error occurred.');
      console.log(error);
    });
   }
   createPost(inputTitle:HTMLInputElement){
     let post = { title:inputTitle.value};
     console.log(post)
     inputTitle.value= '';
      this.service.createPost(post)
     .subscribe(
      response => {
       post['id']= response.json().id;
       this.posts.splice(0,0,post);
       console.log(response);
     },
      (error:Response) =>{
        if(error.status === 400){
          //this is an exsample in case of a form error
          //this.form.setErrors(error.json());
        }else{
          alert('An unexpected error occurred.')
          console.log(error);
        }
        alert('An unexpected error occurred.')
        console.log(error);
    });
   }
   deletePost(postInfo){
     // to test the delete error we can send an invalid id like 345
      this.service.deletePost(postInfo.id)
     .subscribe(
      response => {
       let index = this.posts.indexOf(postInfo);
       this.posts.splice(index,1);
     },
      (error:Response) =>{
        if(error.status === 404){ 
          alert('This Post has already been deleted.');
          console.log(error);
        }
        else{
          alert('An unexpected error occurred.');
          console.log(error);
        }
        
    });  
  }
  updatePost(post){
    this.service.updatePost(post)
    .subscribe(
      response => {
      console.log(response);
    },
    error =>{
      alert('An unexpected error occurred.');
      console.log(error);
    });
  }
} 
