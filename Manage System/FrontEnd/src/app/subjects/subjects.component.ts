import { AllSubjectsService } from './../services/all-subjects.service';
import { Subject } from './../models/Subject';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'] 
})
export class SubjectsComponent implements OnInit {
  details$: Observable<Subject[]>;

  constructor(private allSubjects: AllSubjectsService,) { }

  resData;
  newsdata;

  ngOnInit(): void {
    this.fetchAll().subscribe( res => { this.resData = res; this.newsdata = this.resData.data; 
   console.log("Subjects" , this.resData)})
   this.details$ = this.allSubjects.fetchAll();

  }
 
  fetchAll(): Observable<Subject[]> { 
    return this.allSubjects.fetchAll();
  }

}
 