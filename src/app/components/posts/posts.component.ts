import { Component, OnInit } from '@angular/core';
import { PostsService } from "../../services/posts.service";
import { CommentsService } from "../../services/comments.service"
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  post: Post = {
    userId: 1,
    title: '',
    body: '',
    isShowComment: false,
    comments: [1, 2]
  };
  comments: Comment[] ;
  comment: Comment = {
    postId: 1,
    name: '',
    email: '',
    body: ''
  };
  isAdmin = true;

  constructor(
    public postService: PostsService,
    public commentsService: CommentsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.spinner.hide();
    });
  }

  onDelete(id:number) {
    this.spinner.show();
    this.postService.deletePost(id).subscribe((data: object) => {
      this.posts = this.posts.filter(post => post.id != id);
      this.spinner.hide();
      this.toastr.success('Post deleted success', 'Message');
    }, error => {
      this.spinner.hide();
      this.toastr.error(error.message, 'Error')
    });
  }

  onSubmit(form) {
    this.spinner.show();
    console.log(form);
    const newPost: Post = {
      userId: 1,
      title: this.post.title,
      body: this.post.body
    };
    this.postService.addPost(newPost).subscribe(data => {
      console.log(data);
      this.posts.unshift(data);
    });
    this.spinner.hide();
    form.reset();
  }

  onShowComments(postId) {
    this.spinner.show();
    this.commentsService.getComment(postId).subscribe((comment: Comment[]) => {
      this.comments = comment;
      this.posts.forEach(onePost => {
        if (onePost.id === postId) {
          onePost.comments = this.comments;
          console.log(onePost);
        }

      });
    });
    this.spinner.hide();
  }

}
