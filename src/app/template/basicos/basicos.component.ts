import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

@ViewChild('miFormulario') miFormulario!: NgForm;

initForm = {
  producto: 'RTX 3090',
  precio: 0,
  existencias: 10
}

  constructor() { }

  ngOnInit(): void {
  }

  validarCampo(campo: string): boolean {
    return this.miFormulario?.controls[`${campo}`]?.invalid && this.miFormulario?.controls[`${campo}`]?.touched;
  }
  
  // guardar(miFormulario: NgForm) {
  guardar() {
    this.miFormulario.resetForm({
      precio: 0,
      existencias: 0
    });
  }

}
