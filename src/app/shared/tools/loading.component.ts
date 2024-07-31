import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="overlay-load" *ngIf="showLoad">
                <p class="text-center">  <i class="spinner-border  text-light"></i> <br/>  <span> Cargando... </span>  </p>
            </div>`
})
export class LoadingComponent implements OnInit {
  @Input() showLoad:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}