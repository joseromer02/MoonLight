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
    { usuario: 'jose', contrasena: 'jose' }, 
    { usuario: 'otroUsuario', contrasena: 'otraContrasena' },
  ];

  constructor(private router: Router) {}

  onSubmit(): void {
    // Encriptar la contraseña antes de compararla
    const contrasenaEncriptada = this.encriptarContrasena(this.contrasena);

    // Verificar las credenciales
    const usuarioCorrecto = this.usuariosCorrectos.find(u => u.usuario === this.usuario);

    if (usuarioCorrecto) {
      const contrasenaCorrectaEncriptada = this.encriptarContrasena(usuarioCorrecto.contrasena);

      console.log('Contraseña ingresada:', this.contrasena);
      console.log('Contraseña encriptada ingresada:', contrasenaEncriptada);

      console.log('Contraseña almacenada:', usuarioCorrecto.contrasena);
      console.log('Contraseña encriptada almacenada:', contrasenaCorrectaEncriptada);

      if (contrasenaEncriptada === contrasenaCorrectaEncriptada) {
        // Redirigir a la página después de iniciar sesión correctamente.
        this.router.navigate(['/home']);
      } else {
        console.log('Credenciales incorrectas');
      }
    } else {
      console.log('Usuario no encontrado');
    }
  }

  // Función para encriptar la contraseña
  private encriptarContrasena(contrasena: string): string {
    return SHA256(contrasena).toString();
  }

  // Función para generar una contraseña encriptada (solo para propósitos de ejemplo)
  private generarContrasenaEncriptada(contrasena: string): string {
    return this.encriptarContrasena(contrasena);
  }

  // Ejemplo de uso para generar una contraseña encriptada
  generarYMostrarContrasenaEncriptada(): void {
    const contrasenaOriginal = 'nuevaContrasena'; // Cambia esto por la contraseña que desees
    const contrasenaEncriptada = this.generarContrasenaEncriptada(contrasenaOriginal);

    console.log('Contraseña Original:', contrasenaOriginal);
    console.log('Contraseña Encriptada:', contrasenaEncriptada);
  }

  contraVisible() {
    this.mostarcontrasena = !this.mostarcontrasena;
  }
}
