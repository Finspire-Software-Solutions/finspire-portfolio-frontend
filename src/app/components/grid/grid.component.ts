import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  particles: any[] = [];

  ngOnInit(): void {
    this.generateParticles();
  }
  generateParticles(): void {
    for (let i = 0; i < 50; i++) {
      const particle = {
        style: {
          width: Math.random() * 3 + 1 + 'px',
          height: Math.random() * 3 + 1 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          opacity: Math.random() * 0.5 + 0.3,
          animation: `float ${Math.random() * 15 + 10}s linear infinite`,
          'animation-delay': Math.random() * 5 + 's'
        }
      };
      this.particles.push(particle);
    }
  }
}