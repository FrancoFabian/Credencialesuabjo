import { Component, inject } from '@angular/core';
import {ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MostrarService } from '../../Services/mostrar.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss'
})
export class EditarComponent {
  form:FormGroup;
  private route = inject(Router)
  active: boolean = false;
  activeFirma:boolean = false;
  activeFotoperson:boolean = false;
  imageSave :File | null = null; // Propiedad para almacenar el archivo de imagen
  imageSrc2 !: string;
  imageFirma:File | null = null;
  preFirma!:string;
  constructor(private fb: FormBuilder,
    private share:MostrarService
    ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      
    });
  }
  
  onSubmit() {
    console.log(this.form.value);
    // Aquí puedes manejar la lógica de envío del formulario, como enviar los datos a un servidor
  }

  goEdit() {
    // Lógica para editar
  }
  toggleActive() {
    this.active = !this.active;
  }
  resetForm() {
    this.form.reset();
    this.active = false;
    this.share.changeNav(0)
    this.route.navigate(['listar']);
  }
  onFileTWO(event:any){
    console.log('onFile called', event);
       const file = event.target.files[0];
       if(file){
        this.imageSave = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e:any)=>{
            this.imageSrc2 = e.target.result;
        };
        this.activeFotoperson = true
        reader.readAsDataURL(file);
 
       }
   }
   onFileFirma(event:any){
    console.log('onFile called', event);
       const file = event.target.files[0];
       if(file){
        this.imageFirma = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e:any)=>{
            this.preFirma = e.target.result;
        };
        this.activeFirma = true;
        reader.readAsDataURL(file);
       
       }
   }
   
  
}
