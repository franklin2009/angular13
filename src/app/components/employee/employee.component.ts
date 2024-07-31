import { Component, OnInit } from '@angular/core';
import {IEmployee} from '../../shared/interfaces/IEmployee';
import { EmployeeService } from '../../services/employee.service'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeTable:IEmployee[] = []; 
  isLoad:boolean=false;
  lastId=1;

  showModalForm:Subject<any> = new Subject();
  showModalDelete:Subject<any> = new Subject();

  constructor(private employeeService:EmployeeService) {}

  ngOnInit(): void {
      this.isLoad=true;
      this.employeeService.getAll().then(employees=>{
        this.employeeTable = [...employees.filter((e:IEmployee)=>!e.deleted)];
        this.isLoad=false; 
        this.lastId = employees.length > 0 ? (employees[0].id>999 ? 1010 : 10) : 1;
      });
  }
  
  loadData():void{
    this.isLoad=true;
      //this.employeeService.getEmployees().subscribe((rs:any)=>{
      this.employeeService.getEmployeesCaching().then(employees=>{
        this.employeeTable = [...employees.filter((e:IEmployee)=>!e.deleted)];
        //this.employeeTable = [...rs.employees.filter((e:IEmployee)=>!e.deleted)];
        this.isLoad=false;
        this.lastId=1010;
      }, er=>{  
        console.log("Err",er); 
        this.isLoad=false; 
      });
  }

  modalForm(employee?:IEmployee):void{
    const data={ action:'new', employee: employee};
    if(employee!=undefined) data.action = 'edit';
    this.showModalForm.next(data);
  }

  saveForm(employee:IEmployee):void{
    this.isLoad=true;
    if(employee.id===0){ // new
      employee.id=this.lastId;
      this.employeeService.create(employee).then(employeeRs=>{
        this.employeeTable.push({...employeeRs});
        this.lastId+=1;
        this.isLoad=false; 
      })
    } else { //edit
        this.employeeService.update(employee).then(employeeRs=>{
          const index=this.employeeTable.findIndex(e => e.id === employeeRs.id);
          if(index > -1) this.employeeTable[index]={...employeeRs};
          this.isLoad=false; 
        });
    }
  }

  modalDelete(employee:IEmployee):void{
    this.showModalDelete.next(employee);
  }

  saveDelete(employee:IEmployee):void{
    //console.log("employee", employee);
    this.isLoad=true;
    this.employeeService.delete(employee).then(employeeRs=>{
      const index=this.employeeTable.findIndex(e => e.id === employeeRs.id);
      if(index > -1){
        this.employeeTable[index].deleted=true;
        this.employeeTable.splice(index, 1);
      }
      this.isLoad=false; 
    });
    
  }

}
