import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
export interface Work {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  description: string;
  client: string;
  appUrl: string;
  year: string;
  duration: string;
  teamSize: string;
  services: string[];
  tags: string[];
}
@Injectable({
  providedIn: 'root'
})
export class WorksService {

  constructor() { }
   private works: Work[] = [
    {
      id: 1,
      title: 'Hotel Management System',
      category: 'Web Development',
      image: '/assets/grandpittu.png',
      excerpt: 'A responsive hotel booking system with advanced features, enabling real-time reservations, admin management, and efficient content control.',
      description: 'Developed a hotel table booking and management system that allows users to reserve tables based on their specific requirements such as date, time, and party size. The platform includes an admin panel where bookings can be reviewed, approved, or rejected in real time. Integrated a CMS to enable administrators to manage hotel content, availability, and booking rules efficiently, ensuring smooth operations and an improved customer experience.',
      client: 'Mr.Theepan',
      appUrl: 'https://grandpittu.lk',
      year: '2024',
      duration: '6 months',
      teamSize: '2 members',
      services: ['Web Development', 'UI/UX Design', 'Backend API'],
      tags: ['React.js', 'Springboot', 'MySql', 'AWS', 'WebSocket']
    },
    {
      id: 2,
      title: 'Ceylon Choice Portfolio Website',
      category: 'Branding',
      image: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766843334/Screenshot_2025-12-27_191739_yfg7dr.png',
      excerpt: '"Comprehensive brand and digital identity for Ceylon Choice, showcasing food manufacturing and international trade between Sri Lanka, India, France, and the UK.',
      description: 'Developed a portfolio website for Ceylon Choice, showcasing the company’s food manufacturing capabilities and international trade operations. The website highlights their production of food products and the import of vegetables, fish, meat, and fruits from Sri Lanka and India for distribution in France and the UK. Designed to present the brand, product range, and market presence with a clear, informative, and visually engaging layout.',
      client: 'Mr.Ceylon Choice',
      appUrl: 'https://ceylonchoice.com',
      year: '2024',
      duration: '',
      teamSize: '',
      services: [],
      tags: ['React.js']
    },
    {
      id: 3,
      title: 'Aura Water Management',
      category: 'Branding',
      image: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766665510/AuraWater_osoflw.png',
      excerpt: 'Complete brand identity for Aura Water Management, featuring a platform for efficient water monitoring, real-time analytics, and sustainable resource management.',
      description: 'Developed a comprehensive platform for Aura Water Management, enabling efficient monitoring and management of water resources. The system includes real-time data tracking, reporting, and analytics tools to optimize water usage and ensure sustainable practices for residential and commercial clients. Designed with a user-friendly interface for both administrators and end-users to track water consumption and manage resources effectively.',
      client: 'Mr.Aura',
      appUrl: 'https://aurawaterpvt.com',
      year: '2024',
      duration: '',
      teamSize: '',
      services: [],
      tags: ['React.js','Firebase']
    },
    {
      id: 4,
      title: 'Grace Home Renovation Portfolio Website',
      category: 'Branding',
      image: 'https://res.cloudinary.com/dc7gkgjja/image/upload/v1766665573/GraceHomeReno_ela64s.png',
      excerpt: 'Complete brand identity for Grace Home Renovation, featuring a portfolio and service management website showcasing renovation projects and home improvement services.',
      description: 'Built a portfolio and service management website for Grace Home Renovation, showcasing their renovation projects and home improvement services. The platform allows potential clients to view completed projects, explore service offerings, and contact the company for consultations. Integrated a CMS for easy management of project galleries, service details, and client inquiries, ensuring a seamless user experience.',
      client: 'Mr.Grace Home Renovation',
      appUrl: 'https://gracehomereno.com',
      year: '2024',
      duration: '',
      teamSize: '',
      services: [],
      tags: ['Angular','Firebase']
    },
    // Add more works...
  ];

  getRecentWorks(count: number): Observable<Work[]> {
    const recent = this.works.slice(0, count);
    return of(recent).pipe(delay(300)); // Simulate API delay
  }

  getAllWorks(): Observable<Work[]> {
    return of(this.works).pipe(delay(500)); // Simulate API delay
  }

  getWorkById(id: number): Observable<Work | undefined> {
    const work = this.works.find(w => w.id === id);
    return of(work).pipe(delay(200));
  }

  getWorksByCategory(category: string): Observable<Work[]> {
    const filtered = category === 'all' 
      ? this.works 
      : this.works.filter(w => w.category === category);
    return of(filtered).pipe(delay(300));
  }
}
