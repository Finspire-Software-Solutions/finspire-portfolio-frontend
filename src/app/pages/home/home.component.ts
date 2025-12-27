import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ClientRequestDto } from 'src/app/model/ClientRequestDto';
import { WorksService } from 'src/app/services/works.service';

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
clients = [
    { name: 'Client 1', logo: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766652299/og-image_kxqn38.png' },
    { name: 'Client 2', logo: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766652400/Logo_2_gcjobz.png' },
    { name: 'Client 3', logo: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766653056/Aura_Water_Management_7_tx2yuv.png' },
    { name: 'Client 4', logo: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766657309/Aura_Water_Management_8_rufscf.png'},
    { name: 'Client 5', logo: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766657455/WhatsApp_Image_2025-06-01_at_20.02.08_6c014f23_m4hd5d.jpg' },
  ];

works = [
  { 
    title: 'Grand Pittu',
    category: 'Web Development',
    image: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1759299763/ozs1sl04jmyslhhq2ort.png',
    logo: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766653190/7572c9f2-a406-4a68-9b61-47148632c93e-converted_mmhazx.png'
  },
  { 
    title: 'Aura Water Management',
    category: 'Web Development',
    image: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766665510/AuraWater_osoflw.png',
    logo: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766664881/aura_logo_fjkmk0.png'
  },
  { 
    title: 'Grace Home Renovation',
    category: 'Web Development',
    image: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766665573/GraceHomeReno_ela64s.png',
    logo: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766665644/Screenshot_2025-12-14_233145_fuszyr.png'
  }
];

  private rotationDegree = 0;
  private radius = 200;
  hoveredService: any = null;
  constructor(private router: Router,private worksService: WorksService) { }

  ngOnInit(): void {
    this.loadRecentWorks();
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

  recentWorks: any[] = [];
  isLoading = true;

  loadRecentWorks(): void {
    this.worksService.getRecentWorks(3).subscribe({
      next: (works) => {
        this.recentWorks = works;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading works:', error);
        this.isLoading = false;
      }
    });
  }

  navigateToWorks(workId?: number): void {
    console.log('Navigating to works with ID:', workId);
    console.log('Router:', this.router);
    if (workId) {
      this.router.navigate(['/works'], { queryParams: { featured: workId } });
    } else {
      this.router.navigate(['/works']);
    }
  }

  getWorkTags(tags: string[]): string {
    return tags.slice(0, 2).join(' • ');
  }

}
