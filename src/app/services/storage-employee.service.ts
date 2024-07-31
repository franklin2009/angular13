import { Injectable } from '@angular/core';
import {IEmployee} from '../shared/interfaces/IEmployee';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root'})
export class StorageEmployeeService {
    employee?:IEmployee;
    key:string='employees';
    keyCaching:string='employeesCaching';

    constructor() {}

    setTable(employees:IEmployee[]):void{
      const table:string=JSON.stringify(employees);
      sessionStorage?.setItem(this.key,table);
    }

    getTable():IEmployee[]{
      const data:string=sessionStorage?.getItem(this.key) || "";
      const table:IEmployee[]= (data!="" ? JSON.parse(data) : []);
      return table;
    }

    removeEmployee(employee:IEmployee):void{
      const table:IEmployee[]=this.getTable();
      const index=table.findIndex(e => e.id === employee.id);
      if(index > -1){
        table[index].deleted=true;
        table.splice(index, 1);
        this.setTable(table);
      }
    }

    removeTable():void{
      sessionStorage?.removeItem(this.key);
    }
    
    setEmployee(employee:IEmployee):void{
      const table:IEmployee[]=this.getTable();
      table.push(employee);
      this.setTable(table);
    }

    updEmployee(employee:IEmployee):void{
      const table:IEmployee[]=this.getTable();
      const index=table.findIndex(e => e.id === employee.id);
      if(index > -1) {
        table[index]={...employee};
        this.setTable(table);
      }
    }

    getIndex(index:number):IEmployee{
      const table:IEmployee[]=this.getTable();
      return table[index];
    }

    getId(id:number):IEmployee{
      const table:IEmployee[]=this.getTable();
      const index=table.findIndex(e => e.id === id);
      return (index > -1 ? table[index] : this.default());
    }

    default():IEmployee{
      return {id:0, firstName:"", lastName:"", email:"", phone:0, deleted:false};
    }

    isCaching():boolean{
      const now = Date.now();
      const data:string = sessionStorage?.getItem(this.keyCaching) || "";
      const caching:any = (data!="" ? JSON.parse(data) : {employees: [], expired: 0});
      // console.log("isCaching",caching, now, caching.expired > now)
      return (caching.expired > now);
    }

    setCaching(employees:IEmployee[]){
      const expires = environment.expired;  //un minuto  //(24*60*60); 
      const timer = Date.now() + expires*1000; 
      const caching = {employees: employees, expired: timer}
      sessionStorage.setItem(this.keyCaching, JSON.stringify(caching));
    }

    getCaching():IEmployee[]{
      const data:string = sessionStorage?.getItem(this.keyCaching) || "";
      const caching:any = (data!="" ? JSON.parse(data) : {employees: [], expired: 0});
      return caching?.employees;
    }


}
