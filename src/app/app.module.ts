import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoute } from "./app-routing.module";
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeFormComponent } from './components/employee/form/employee-form.component';
import { EmployeeDeleteComponent } from './components/employee/delete/employee-delete.component';
import { NoFoundComponent } from './shared/tools/no-found.component';
import { LoadingComponent } from './shared/tools/loading.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeeComponent,
   EmployeeDeleteComponent,
   NoFoundComponent,
   LoadingComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(AppRoute),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }