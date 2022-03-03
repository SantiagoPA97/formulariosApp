import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
// import { nombreApellidoPattern, emailPattern, noPuedeSerReaver } from '../../../shared/validator/validaciones';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.ev]],
    username: ['', [Validators.required, this.vs.noPuedeSerReaver]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [this.vs.camposIguales('password', 'confirmPassword')]
  });

  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']) {
      return 'Email obligatorio'
    } else if (errors?.['pattern']) {
      return 'Debe ser un correo valido'
    } else if (errors?.['emailTomado']) {
      return 'El correo ya esta en uso'
    }

    return '';
  }

  constructor(private fb: FormBuilder, private vs: ValidatorService, private ev: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Santiago Pelaez',
      email: 'test1@test.com',
      username: 'Spikex',
      password: '123456',
      confirmPassword: '123456'
    });
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;  
  }

  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.['required'] && this.miFormulario.get('email')?.touched;
  // }
  
  // emailFormato() {
  //   return this.miFormulario.get('email')?.errors?.['pattern'] && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.['emailTomado'] && this.miFormulario.get('email')?.touched;
  // }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
