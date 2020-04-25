import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ApiFitechService } from '../services/api-fitech.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-antecedentefmliar',
  templateUrl: './antecedentefmliar.component.html',
  styleUrls: ['./antecedentefmliar.component.scss'],
})
export class AntecedentefmliarComponent implements OnInit {
  condicionPersona = {
    arritmia_corazon:false,
    ataque_corazon:false,
    operacion_corazon:false,
    enfermedad_corazon:false,
    presion_corazon:false,
    diabete_corazon:false,
    muerte_prematura:false,
    ninguna:false
  }
  habilitar:boolean=true


  constructor(private ruta:NavController,private cdRef:ChangeDetectorRef,private usuarioservicio:UsuarioService,
              private ApiService:ApiFitechService,public loadingController: LoadingController) { }

  ngOnInit() {
  }

  avanzar(){ 
    if(!this.condicionPersona.arritmia_corazon && !this.condicionPersona.ataque_corazon && !this.condicionPersona.diabete_corazon &&
      !this.condicionPersona.enfermedad_corazon &&!this.condicionPersona.muerte_prematura && !this.condicionPersona.ninguna &&
      !this.condicionPersona.operacion_corazon &&!this.condicionPersona.presion_corazon){
        this.habilitar = false
      }else{
       this.usuarioservicio.condicionCorazon(this.condicionPersona) 
      //  localStorage.setItem('condicionPersona', JSON.stringify(this.condicionPersona))
        this.evaluar()
      }
  }

 historialcorazon(datos){
    console.log(this.habilitar)

    if(datos == 'option'){
      this.condicionPersona.ninguna = false;
      this.habilitar = false
      this.cdRef.detectChanges();
    }

    if(datos == 'none'){
      this.condicionPersona.arritmia_corazon=false;
      this.condicionPersona.ataque_corazon=false;
      this.condicionPersona.operacion_corazon=false;
      this.condicionPersona.enfermedad_corazon=false;
      this.condicionPersona.presion_corazon=false;
      this.condicionPersona.diabete_corazon=false;
      this.condicionPersona.muerte_prematura=false;
        if(this.condicionPersona.ninguna){
          this.habilitar = false
        }else{
          this.habilitar = true
        }
      this.cdRef.detectChanges();
    }


 }


 async evaluar(){
  //this.ruta.navigateRoot(['/relacioncadera'])
 /*  this.presentLoading(); */
  /* const valido = await this.ApiService.Antecedentefamiliar(this.usuarioservicio.condicionPersona)
  if(valido){ */
   /*  this.loadingController.dismiss() */
     this.ruta.navigateRoot('corazon')
  /* }else{
    return
  } */
  

}

async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Porfavor espere...',
  });
  await loading.present();
}

}
