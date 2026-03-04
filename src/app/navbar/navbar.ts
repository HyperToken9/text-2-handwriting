import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  template: `<nav
    class="bg-[#14213D] h-[15vh]  w-screen flex justify-center md:justify-start items-center"
  >
    <img src="assets/logo.png" class="h-[80%] mx-5" alt="Text to Handwriting logo" />
  </nav>`,
})
export class NavbarComponent {}
