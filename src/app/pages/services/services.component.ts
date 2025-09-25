import { Component, OnInit } from '@angular/core';

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
      name: 'AI & Machine Learning',
      icon: 'fas fa-brain',
      description: 'Intelligent solutions powered by artificial intelligence and machine learning',
      features: ['Data Analytics', 'Predictive Modeling', 'Natural Language Processing', 'Computer Vision']
    },
    {
      name: 'UI/UX Design',
      icon: 'fas fa-palette',
      description: 'Beautiful and intuitive user experiences that drive engagement',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    },
    {
      name: 'Technology Consulting',
      icon: 'fas fa-handshake',
      description: 'Strategic technology consulting to help businesses make informed decisions',
      features: ['Digital Transformation', 'Architecture Review', 'Technology Roadmap', 'Process Optimization']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
