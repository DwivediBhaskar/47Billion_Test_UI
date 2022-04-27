import { Component, ElementRef, OnInit, Renderer2, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from "primeng/api";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'User From';
  dialogLoading: boolean = false;
  valid: boolean = false;
  userList: any[] = [];
  addVehicle:object = {
    name: "",
    email: "",
    address: ""
  };
  submitted = false;
  addVehicleForm: FormGroup = new FormGroup({});

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private messageService: MessageService, private formBuilder: FormBuilder, private renderer: Renderer2){
  
    }
    ngOnInit(){
      this.addVehicleForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['',[ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        address: ['', [Validators.required]],
      })
  
    }
    onFileChanged(event:any) {
      const file = event?.target?.files[0];
     console.log("file",file, event)

    }
    onSubmit() {
      this.valid = true;
      this.submitted = true;
      //fetches the form object with key as name of the control and value as the form control's value
      this.addVehicle = this.addVehicleForm.getRawValue();
      
      if (this.addVehicleForm.valid ) {
        this.dialogLoading = true;
        // this.addVehicleService.addExportedVehicle(this.addVehicle).subscribe(saveData => {
        //   this.showSuccessMessage(saveData.message);
        //   this.addVehicleForm.reset();
        //   this.psSearch = "";
        //   this.dialogLoading = false;
        //   this.submitted = false;
        // },
        //   err => {
        //     if (err.error) {
        //       this.showErrorMessage(err.error.message);
        //     } else {
        //       this.showErrorMessage(err.message);
        //     }
        //     this.dialogLoading = false;
        //   }
        // )
      }
    }
    

    public getJSON(): Observable<any> {
      return this.http.get('https://api.myjson.com/bins/zg8of');
    }
}
