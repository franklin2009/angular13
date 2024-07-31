import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-found',
  template: `<div class="row" >
              <div class="col-md-12">
                <div class="error-template text-center">
                    <h3>Oops!</h3>
                    <h2>Error 404</h2>
                    <div class="error-details mb-3">
                      Pagina no encontrada
                    </div>
                    <div class="error-actions">
                      <a routerLink="/" class="btn btn-danger btn-lg"> Ir a inicio </a>
                    </div>
                </div>
              </div>
          </div>`
})
export class NoFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}