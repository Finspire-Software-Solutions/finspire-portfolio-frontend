import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ClientRequestDto } from 'src/app/model/ClientRequestDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  
  @ViewChild('servicesWrapper', { static: false }) wrapper!: ElementRef;

  services = [
    { name: 'Video Editing', icon: 'fas fa-video', link: '/services', ariaLabel: 'Video Editing - Professional video editing services' },
    { name: 'Digital Marketing', icon: 'fas fa-bullhorn', link: '/services', ariaLabel: 'Digital Marketing - Comprehensive digital marketing solutions' },
    { name: 'Graphics Designs', icon: 'fas fa-paint-brush', link: '/services', ariaLabel: 'Graphics Design - Creative graphic design services' },
    { name: 'UI/UX Designs', icon: 'fas fa-palette', link: '/services', ariaLabel: 'UI/UX Design - User interface and experience design' },
    { name: 'Web Development', icon: 'fas fa-globe', link: '/services', ariaLabel: 'Web Development - Modern web development solutions' },
    { name: '24/7 Support', icon: 'fas fa-headset', link: '/contact-us', ariaLabel: '24/7 Support - Round the clock support services' }
  ];

  works = [
    { title: 'Grand Pittu', category: 'Web Development', image: 'assets/grandpittu.png' },
    { title: 'Finspire Portfolio', category: 'Web Development', image: 'assets/finspire-portfolio.png' },
    { title: 'Kalaisankara Matrimony', category: 'Web Development', image: 'assets/kalaisankara.png' }
  ];

  private rotationDegree = 0;
  private radius = 200;
  hoveredService: any = null;
  clients:ClientRequestDto[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.clients = [
      { name: 'Grand Pittu', description: 'Web Development', image: 'assets/grandpittu.png' },
      { name: 'Finspire Portfolio', description: 'Web Development', image: 'assets/finspire-portfolio.png' },
      { name: 'Kalaisankara Matrimony', description: 'Web Development', image: 'assets/kalaisankara.png' }
    ];
  }

  ngAfterViewInit() {
    this.positionServices();
    this.animate();
    
    // Reposition services on window resize
    window.addEventListener('resize', () => {
      this.positionServices();
    });
  }

  positionServices() {
    const wrapperEl = this.wrapper.nativeElement;
    const servicesEls = wrapperEl.querySelectorAll('.service');
    const centerX = wrapperEl.offsetWidth / 2;
    const centerY = wrapperEl.offsetHeight / 2;

    // Adjust radius based on screen size
    const containerWidth = wrapperEl.offsetWidth;
    let adjustedRadius = this.radius;
    
    if (containerWidth <= 280) {
      adjustedRadius = 110; // Very small mobile
    } else if (containerWidth <= 350) {
      adjustedRadius = 140; // Small mobile
    } else if (containerWidth <= 400) {
      adjustedRadius = 160; // Medium mobile
    } else {
      adjustedRadius = this.radius; // Desktop
    }

    servicesEls.forEach((serviceEl: any, index: number) => {
      const angle = (index / servicesEls.length) * 2 * Math.PI;
      const x = centerX + adjustedRadius * Math.cos(angle) - serviceEl.offsetWidth / 2;
      const y = centerY + adjustedRadius * Math.sin(angle) - serviceEl.offsetHeight / 2;
      serviceEl.style.left = `${x}px`;
      serviceEl.style.top = `${y}px`;
    });
  }

  animate() {
    const wrapperEl = this.wrapper.nativeElement;
    const servicesEls = wrapperEl.querySelectorAll('.service');

    const animateFrame = () => {
      // Slower rotation for smoother motion
      this.rotationDegree = (this.rotationDegree + 0.25) % 360;
      wrapperEl.style.transform = `rotate(${this.rotationDegree}deg)`;
      
      // Keep the service cards slightly more upright by adding a small
      // anti-clockwise bias to the counter-rotation
      const uprightBiasDeg = 5; // small anti-clockwise adjustment
      servicesEls.forEach((serviceEl: any) => {
        const hovered = serviceEl.classList.contains('hovered');
        serviceEl.style.transform = `rotate(${-this.rotationDegree - uprightBiasDeg}deg) scale(${hovered ? 1.15 : 1}) rotateX(10deg) rotateY(10deg)`;
      });
      requestAnimationFrame(animateFrame);
    };

    animateFrame();
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }



}
