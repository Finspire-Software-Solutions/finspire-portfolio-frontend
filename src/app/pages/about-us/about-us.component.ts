import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  teamMembers = [
    {
      name: 'S.JANARTHANAN',
      position: 'Full Stack Developer',
      description: 'Building scalable and efficient applications.',
      image: 'assets/janaa.png'
    },
    {
      name: 'P.CHAYANKUMAR',
      position: 'Full Stack Developer',
      description: 'Creating secure and user-friendly solutions.',
      image: 'assets/chayan2.png'
    },
    {
      name: 'M.AJEETHKUMAR',
      position: 'Media Lead, Graphic Designer, Video Editor',
      description: 'Driving creative content and brand growth.',
      image: 'assets/ajewethkumar.png'
    },
    {
      name: 'P.ALAXSAN',
      position: 'HR',
      description: 'Supporting recruitment and employee engagement.',
      image: 'assets/ALAXSAN.png'
    }
  ];
  

  values = [
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies to deliver innovative solutions'
    },
    {
      icon: 'fas fa-users',
      title: 'Collaboration',
      description: 'We work closely with our clients to understand their unique needs'
    },
    {
      icon: 'fas fa-award',
      title: 'Excellence',
      description: 'We strive for excellence in every project we undertake'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Integrity',
      description: 'We build trust through transparency and honest communication'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
