import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
//import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  studentForm: FormGroup;
  serverData: Object;
  loading: boolean=false;
  http: HttpClient;

  constructor(fb: FormBuilder, http: HttpClient) { 
    this.http = http;
    this.studentForm = fb.group(   
        {
          'studentInput': [ '190000000', Validators.compose( [Validators.required, Validators.pattern("^19[0-9]{7}")] ) ],  // studentForm.controls[ 'studentInput' ]
          'studentName': [ 'Your name' , Validators.required ],      // studentForm.controls[ 'studentName' ]
          'studentEmail': [ 'name@your.domain', Validators.email ]
        }
    );
    this.serverData = {};
  }
/*
  studentIdValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^19[0-9]{5}/)) {
      return {invalidStudentId: true};
    } else {
      return {invalidStudentId: false};
    }    
  }
 */ 

  onSubmit(formValue: any): void {
    console.log( 'you submitted value: ', formValue );

    if (this.studentForm.valid) {
        console.log( 'you submitted value: ', formValue );
        this.loading = true;
        this.serverData = {};
        // var pathName = '/api/student/'+formValue['studentInput']; 
        var pathName = '/api/student/' +
          this.studentForm.controls['studentInput'].value + '/' +
          this.studentForm.controls['studentName'].value + '/' +
          this.studentForm.controls['studentEmail'].value;
        console.log('URL: ' + pathName);        
        this.http.get(pathName).subscribe({      
            next: (res) => {
              console.log("data is uploaded successfully.");
              this.serverData = JSON.parse(JSON.stringify(res)); //res.json();
              this.loading = false;            
            },
            error: (err: string) => {
              console.log("Server call failed: " + err);
            }
          })
        
    } else
        console.log( 'errors in form');

  }

  ngOnInit() {
  }

}
