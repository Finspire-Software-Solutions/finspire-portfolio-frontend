import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProjectRequestDto } from '../model/ProjectRequestDto';
import { collection, Firestore, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private http: HttpClient, private firestore: Firestore) {}
}

