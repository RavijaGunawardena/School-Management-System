import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-app';

  constructor(private _router: Router) { }

  toStudentPage() {
    console.log("Cam TO ")
    this._router.navigate(['/student'])
  }

}
