import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  RutinasService
} from '../rutinas.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rutina-entrenamiento',
  templateUrl: './rutina-entrenamiento.page.html',
  styleUrls: ['./rutina-entrenamiento.page.scss'],
})
export class RutinaEntrenamientoPage implements OnInit {
  @ViewChild('myVideo', {
    static: false
  }) txtVideo: ElementRef;
  rutinas: any = [];
  status = 'rutina';
  secuencia = 1;
  actual = 0;
  total: number;
  video: string;
  btn: boolean;
  tiemposegundo: NodeJS.Timeout;
  timeLeft: number;
  zero: number;
  mostrar: boolean = true;
  audio: HTMLAudioElement;
  sonido = "../../../assets/sonido/reloj.mp3";
  imagen: string;
  data: any = [];
  final: any;
  constructor(private service: RutinasService, private navCtrl: NavController) {}

  async ngOnInit() {
    this.data = await this.service.getRutina();
    this.setValues();
    this.startVideo();
  }
  setValues(){
    this.rutinas = this.data['exercises'].filter(value => value.stage === this.secuencia);
    this.final = this.data['exercises'].length;
    this.total = this.rutinas.length;
  }

  async startVideo() {
    this.setValues();
    this.video = `http://fittech247.com/fittech/videos/${this.rutinas[this.actual].cod}/${this.rutinas[this.actual].url}`
    this.mostrar = true;
    this.timeLeft = this.data['ratio_w'];
    var b = setInterval(() => {
      console.log(this.txtVideo.nativeElement.readyState)
      if (this.txtVideo.nativeElement.readyState === 4) {
        this.txtVideo.nativeElement.play()
        //cronometro
        clearInterval(b);
        this.startTimer();
      }
    }, 500);
  }

  startTimer() {
    this.btn = true;
    this.zero = null;
    this.tiemposegundo = setInterval(() => {

      if (this.timeLeft <= 10) {
        console.log("activate")
        this.zero = 0
      }

      if (this.timeLeft >= 1 && this.timeLeft < 10) {
        this.playSonido()
      }

      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.siguiente();
        this.txtVideo.nativeElement.pause()
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.tiemposegundo);
    this.mostrar = false
    this.txtVideo.nativeElement.pause()
  }

  playTimer() {
    this.startTimer()
    this.mostrar = true
    this.txtVideo.nativeElement.play()
  }

  playSonido() {
    this.audio = new Audio();
    this.audio.src = this.sonido;
    this.audio.load();
    this.audio.play();
  }



  siguiente(){

    if(this.actual == this.total){
      this.actual = 0;
      this.secuencia++;
      clearInterval(this.tiemposegundo);
      this.timerDescanse();
      this.status = 'descanso';
    }else{
      this.actual++;
      console.log('Actual',this.actual);
      console.log('total',this.total);
      console.log('Rutina', this.rutinas);
       
        if(this.actual == this.total){
          this.secuencia++;
          this.actual = 0;
          this.setValues();
          clearInterval(this.tiemposegundo);
          this.timerDescanse();
          this.status = 'descanso';
        }{
          clearInterval(this.tiemposegundo);
          this.timerDescanse();
          this.status = 'descanso';
        }
    }
    
  }

  atras(){
    if(this.actual < 1 && this.secuencia <= 1){
     this.navCtrl.pop();
    }else{
      clearInterval(this.tiemposegundo);

      this.timerDescanse();
      this.status = 'descanso';
    }
  }

  async timerDescanse(){
    this.imagen = `http://fittech247.com/fittech/imagenes/${this.rutinas[this.actual].cod}/${this.rutinas[this.actual].id}.jpg`;
    this.timeLeft = this.data['ratio_r'];
    this.zero = null;
      this.tiemposegundo = setInterval(() => {
        if(this.timeLeft <= 10){
          console.log("activate")
          this.zero = 0
        } 
        
        if(this.timeLeft >= 1 && this.timeLeft < 10) {
            this.playSonido()
        }
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 0;
          this.siguiente_();
        }
      },1000)
  }

  atras_(){
    clearInterval(this.tiemposegundo);
    console.log(this.actual);
    console.log(this.secuencia)
   if(this.actual == 0 && this.secuencia > 1){
     this.secuencia--;
    this.setValues();
    this.actual = this.total-1;
    console.log(this.secuencia, this.actual);
    
    clearInterval(this.tiemposegundo);
    this.status = 'rutina';
    this.startVideo();
   }else{
     if(this.actual != 0){
       this.actual--;
       this.status = 'rutina';
      this.startVideo();
     }else if( this.secuencia > 1){
       this.secuencia--;
       this.setValues();
       this.actual = this.total-1;
      this.status = 'rutina';
      this.startVideo();
     }
   }
  }

  siguiente_(){
    clearInterval(this.tiemposegundo);
    this.status = 'rutina';
    this.startVideo();
  }

  

}