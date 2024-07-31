import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {IEmployee} from '../shared/interfaces/IEmployee';
import {StorageEmployeeService} from './storage-employee.service';

@Injectable({ providedIn: 'root'})
export class EmployeeService {
    
    constructor(private httpClient: HttpClient, private storageSrv:StorageEmployeeService) {}

    getEmployees(): Observable<IEmployee[]> {
        const url=environment.apiUrl;
        return this.httpClient.get<IEmployee[]>(url);
    }

    getEmployeesCaching():Promise<IEmployee[]>{
        const _self=this;
        const url=environment.apiUrl;
        let employees:IEmployee[]=[];
        const promise = new Promise<IEmployee[]>((resolve, reject) => {
            if(!_self.storageSrv.isCaching()){
                _self.httpClient.get<IEmployee[]>(url).toPromise().then((rs:any)=>{
                    //console.log("getEmployeesCaching",rs)
                    employees=rs?.employees || [];
                    _self.storageSrv.setCaching(employees);
                    _self.storageSrv.setTable(employees.filter((e:IEmployee)=>!e.deleted));
                    setTimeout(()=>{   resolve(employees);  },2000);
                }, er=>{
                    reject("Error!, httpClient, "+er);
                })
            } else  {
                employees=_self.storageSrv.getCaching();
                _self.storageSrv.setTable(employees.filter((e:IEmployee)=>!e.deleted));
                setTimeout(()=>{   resolve(employees);  },500);
            }
        });
        return promise;
    }

    getAll():Promise<IEmployee[]>{
        const _self=this;
        const promise = new Promise<IEmployee[]>((resolve) => {
            const employees=_self.storageSrv.getTable();
            setTimeout(()=>{   resolve(employees);  },1000);
        });
        return promise;
    }

    create(employee:IEmployee):Promise<IEmployee>{
        const _self=this;
        const promise = new Promise<IEmployee>((resolve) => {
            _self.storageSrv.setEmployee(employee);
            setTimeout(()=>{   resolve(employee);  },1000);
        });
        return promise;
    }

    update(employee:IEmployee):Promise<IEmployee>{
        const _self=this;
        const promise = new Promise<IEmployee>((resolve) => {
            _self.storageSrv.updEmployee(employee);
            setTimeout(()=>{   resolve(employee);  },1000);
        });
        return promise;
    }

    delete(employee:IEmployee):Promise<IEmployee>{
        const _self=this;
        const promise = new Promise<IEmployee>((resolve) => {
            _self.storageSrv.removeEmployee(employee);
            setTimeout(()=>{   resolve(employee);  },1000);
        });
        return promise;
    }

    show(id:number):Promise<IEmployee>{
        const _self=this;
        const promise = new Promise<IEmployee>((resolve) => {
           const employee:IEmployee = _self.storageSrv.getId(id);
            setTimeout(()=>{   resolve(employee);  },1000);
        });
        return promise;
    }
}
