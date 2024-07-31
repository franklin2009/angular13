import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {IEmployee} from '../../../shared/interfaces/IEmployee';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  modalRef?: BsModalRef;

  employee:IEmployee;
  @Input('showModal') showModal?:Subject<any>;
  @Output() saveDelete = new EventEmitter<IEmployee>();
  @ViewChild('tpEmployeeDelete') tpEmployeeDelete: any;

  constructor(private modalService: BsModalService) {
    this.employee = {id:0, firstName:"", lastName:"", email:"", phone:0, deleted:false};
  }

  ngOnInit(): void {
    this.showModal?.subscribe(data => {
      console.log("tpEmployeeDelete Data",data)
      this.employee=data;
      this.open();  
  });
  }

  ngOnDestroy() {
    this.showModal?.unsubscribe();
  }

  open() {
		this.modalRef = this.modalService.show(this.tpEmployeeDelete);
	}

  save():void{
    this.saveDelete.emit(this.employee);
    this.modalRef?.hide();
  }


}
