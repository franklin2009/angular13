import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {IEmployee} from '../../../shared/interfaces/IEmployee';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  modalRef?: BsModalRef;

  employee:IEmployee;
  action:string = 'new';
  @Input('showModal') showModal?:Subject<any>;
  @Output() saveForm = new EventEmitter<IEmployee>();
  @ViewChild('tpEmployeeForm') tpEmployeeForm: any;

  constructor(private modalService: BsModalService) {
    this.employee = {id:0, firstName:"", lastName:"", email:"", phone:0, deleted:false};
  }

  ngOnInit(): void {
    this.showModal?.subscribe(data => {
        console.log("EmployeeForm Data",data)
        this.action=data.action;
        if(data.action==='new')  this.reset();
        else   this.employee=data.employee;
        this.open();  
    });
  }
  ngOnDestroy() {
    this.showModal?.unsubscribe();
  }

  open() {
		this.modalRef = this.modalService.show(this.tpEmployeeForm);
	}

  save():void{
    this.saveForm.emit(this.employee);
    this.modalRef?.hide();
  }

  reset():void{
    this.employee = {id:0, firstName:"", lastName:"", email:"", phone:0, deleted:false};
  }

 

}
