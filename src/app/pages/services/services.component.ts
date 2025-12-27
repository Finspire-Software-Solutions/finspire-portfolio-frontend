import { Component, OnInit } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services = [
    {
      name: 'Web Development',
      icon: 'fas fa-globe',
      description: 'Custom web applications built with modern technologies like Angular, React, and Node.js',
      features: ['Responsive Design', 'Progressive Web Apps', 'E-commerce Solutions', 'CMS Development']
    },
    {
      name: 'Mobile App Development',
      icon: 'fas fa-mobile-alt',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      features: ['Native iOS/Android', 'React Native', 'Flutter', 'App Store Optimization']
    },
    {
      name: 'Cloud Solutions',
      icon: 'fas fa-cloud',
      description: 'Scalable cloud infrastructure and migration services',
      features: ['AWS/Azure/GCP', 'DevOps & CI/CD', 'Microservices', 'Container Orchestration']
    },
    {
      name: 'Graphics Designs',
      icon: 'fas fa-paint-brush',
      description: 'Professional graphics designs for your business',
      features: ['Logo Design', 'Banner Design', 'Poster Design', 'Business Card Design']
    },
    {
      name: 'UI/UX Design',
      icon: 'fas fa-palette',
      description: 'Beautiful and intuitive user experiences that drive engagement',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    },
    {
      name: 'Video Editing',
      icon: 'fas fa-video',
      description: 'Professional video editing services for your business',
      features: ['Video Editing', 'Video Production', 'Video Marketing', 'Video Production']
    },
    {
      name: 'Digital Marketing',
      icon: 'fas fa-bullhorn',
      description: 'Professional digital marketing services for your business',
      features: ['Search Engine Optimization', 'Pay Per Click', 'Social Media Marketing', 'Email Marketing']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
