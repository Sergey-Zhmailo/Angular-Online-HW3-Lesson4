import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {Observable} from "rxjs/index";
import { Comment } from "../components/models/Comment";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = environment.api_url;

  constructor(
    private http: HttpClient
  ) { }

  getComment(postId):Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }

}


