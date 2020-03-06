import { Component, ViewChild, ElementRef } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { from } from 'rxjs';
export interface emp{
  user_id:number;
  user_name:string;
  user_email:string;
  user_mob:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'logindemo';
  private addUserTable:emp[];
  private url='api/addUserTable';
  addForm:FormGroup;

  @ViewChild ('closebutton' ,{static:true}) closebutton:ElementRef;

constructor(private http:HttpClient,private formBuilder:FormBuilder){}

  ngOnInit(){
    this.addForm=this.formBuilder.group({
      user_id:'',
      user_name:['', Validators.required],
      user_email:['',Validators.required],
      user_mob:['',Validators.required]
    });
    this.getAllUser().subscribe(
      object =>
      {this.addUserTable=object;
        console.log(object)
      }

    )
  }
  getAllUser(){
    return this.http.get<emp[]>(this.url);
  }
  onSubmit(){
    this.addUserTable.push(this.addForm.value);
    console.log(this.addUserTable);
    this.closebutton.nativeElement.click();
  }

}
