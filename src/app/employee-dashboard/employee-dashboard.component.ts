import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../model/employee.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  isEditMode: boolean = false;
  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      salary: ['']
    })
    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.postEmploye(this.employeeModelObj).subscribe(
      res => {
        console.log(res);
        this.formValue.reset();
        let concelButton = document.getElementById('cancel');
        concelButton?.click();
        this.getAllEmployee();
      },
      err => {
        console.log(err);
      }
    )
  }
  deleteEmployee(row: any) {
    this.api.deleteEmploye(row.id).subscribe(res => {
      this.getAllEmployee();
    })
  }
  getAllEmployee() {
    this.api.getEmploye().subscribe(res => {
      this.employeeData = res;
    })
  }
  onEdit(row: any){
    this.employeeModelObj.id = row.id
    this.formValue.controls['firstName'].setValue(row.firsName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails() {    
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.updateEmploye(this.employeeModelObj, this.employeeModelObj.id).subscribe(
      res => {
        console.log(res);
        this.formValue.reset();
        let concelButton = document.getElementById('cancel');
        concelButton?.click();
        this.getAllEmployee();
        
      },
      err => {
        console.log(err);
      }
    )
    this.isEditMode = false;
    console.log(this.isEditMode);
  }
}
