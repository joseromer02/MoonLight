import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  mostarcontrasena: boolean = false;

  // Definir múltiples usuarios con contraseñas encriptadas
  usuariosCorrectos = [
    { usuario: 'jose', contrasena: '1ec4ed037766aa181d8840ad04b9fc6e195fd37dedc04c98a5767a67d3758ece' }, 
    { usuario: 'jose2', contrasena: 'b8b9b90248616b9e6e3db1c619da7a6a83ae9001b74ecfb5d3041fbbdffa8958' },
    { usuario: 'jose3', contrasena: '562257c924d8712b8da34e2e421105051e24d72e771791f8d09062aec8b1890c' },
  ];

  constructor(private router: Router) {}

  onSubmit(usuarioRequest : string, contrasenaRequest : string): void {

        let usuarioOpt = this.usuariosCorrectos.filter(
          item => item.usuario == usuarioRequest
        );
    
        console.log(this.encriptarContrasena(contrasenaRequest));
    
        // @ts-ignore
        if (usuarioOpt.length > 0 && usuarioOpt[0].contrasena === this.encriptarContrasena(contrasenaRequest)) {
          this.router.navigate(['/home']);
        }
        }

  // Función para encriptar la contraseña
  private encriptarContrasena(contrasena: string): string {
    return SHA256(contrasena).toString();
  }

  contraVisible() {
    this.mostarcontrasena = !this.mostarcontrasena;
  }
}
