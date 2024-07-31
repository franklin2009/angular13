import { Routes } from "@angular/router";
import { EmployeeComponent } from './components/employee';
import { NoFoundComponent } from './shared/tools/no-found.component';

export const AppRoute: Routes = [
  {
    path: "",
    component: EmployeeComponent
  },
  { 
      path: '**', 
      component: NoFoundComponent  
  }
];
