import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { BlogService, BlogPost } from '../../services/blog.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogRequestDto } from '../../model/BlogRequestDto';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastService } from '../../shared/toast/toast.service';
import { ProjectRequestDto } from 'src/app/model/ProjectRequestDto';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
}
