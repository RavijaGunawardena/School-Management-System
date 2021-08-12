import { SubjectService } from './../services/subject.service';
import { Subject } from './../models/Subject';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  templateUrl: './subject-student.component.html',
  styleUrls: ['./subject-student.component.css']
}) 
export class SubjectStudentComponent implements OnInit {
  details$: Observable<Subject[]>;
  
  public userAccessList: Array<any> = [];
 
  checkBoxesValues = [
    {"id":1, value: "Maths" , isSelected:false},
    {"id":2, value: "Physics", isSelected:false}, 
    {"id":3, value: "Science", isSelected:false},
    {"id":4, value: "English", isSelected:false},
    {"id":5, value: "ICT", isSelected:false}
  ];

  getStringName: string;
  getId: number;

  constructor(private router: Router, private subjectService: SubjectService,) { 
    this.getStringName = this.router.getCurrentNavigation().extras.state.stName;
    this.getId = this.router.getCurrentNavigation().extras.state.stId;
 
    console.log(this.getStringName)
    console.log(this.getId)
 
  }

  resData;
  newsdata;

  ngOnInit(): void {
    this.fetchAll().subscribe( res => { this.resData = res; this.newsdata = this.resData.data; 
      this.userAccessList = res; console.log("Users" , this.userAccessList); this.fetchedData(); })
    this.details$ = this.subjectService.fetchAll();
  }
 
  getStudentId: number;

  fetchedData() {
    console.log("res Data", this.userAccessList);

    const subjectEnrolled = this.userAccessList.filter(stu => stu.studentId === this.getId).map(subName => subName.subjectName); 
    const checkList = this.checkBoxesValues.filter(ch => ch.isSelected == false).map(chName => chName.value);            
           
    console.log("subjEn", subjectEnrolled);
    console.log("ChName", checkList);

    for (var indexSubjectEnrolled in subjectEnrolled) {
      for (var indexCheckLists in checkList){
        if (subjectEnrolled[indexSubjectEnrolled] === checkList[indexCheckLists]) {
          console.log("subjEn2", subjectEnrolled[indexSubjectEnrolled]);
          console.log("ChName2", checkList[indexCheckLists]);
          this.checkBoxesValues.filter (c => c.value == subjectEnrolled[indexSubjectEnrolled]).map (ch => ch.isSelected = true)
        }
      }
    }
  }

  fetchAll(): Observable<Subject[]> {  
    return this.subjectService.fetchAll();
  }

  checkCheckBoxvalue(event){
    if (event.target.checked == true) { 
      console.log("Selected Subject is", event.target.value); 
      this.post(event.target.value, this.getId)    
    }
    else {
      console.log("Deleted Subject is",event.target.value);
      const subTODelete = this.userAccessList.filter(subName => subName.subjectName === event.target.value && subName.studentId === this.getId)
      .map(subId => subId.subjectId); 
      console.log("Deleted Subject Id iS", subTODelete);
      for (var index in subTODelete) {
        console.log ("SUBto De", subTODelete[index])
        this.delete (subTODelete[index]);
      }
    }

  }

  post(sn: Partial<Subject>, studentId: number): void {  
    const subjectName = (<string>sn).trim();
    if (!subjectName) return;
    console.log  ("SB name", subjectName);

    const newSSt: Subject = {
      subjectName,
      studentId,
    };

    this.details$ = this.subjectService 
      .post(newSSt)
      .pipe(tap(() => (this.details$ = this.fetchAll())));
     
    this.subjectService.post(newSSt).subscribe(Response => { console.log("Post Complete") })
  }

  delete(subjectId: number): void {
    console.log ("Came to delete i")
    this.details$ = this.subjectService
      .delete(subjectId)
      .pipe(tap(() => (this.details$ = this.fetchAll())));
      
      this.subjectService.delete(subjectId).subscribe(Response => { console.log("Delete Completed") })

  }

}

