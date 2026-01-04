import { Component } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {
socialLinks = [
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      link: 'https://www.linkedin.com/company/finspiresoftwaresolution',
      className: 'linkedin'
    },
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      link: 'https://www.instagram.com/fins_pire?igsh=Y3p0eHR2MDAzNjlj',
      className: 'instagram'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-f',
      link: 'https://www.facebook.com/share/1LaM55SZjo/',
      className: 'facebook'
    }
    ,
    {
      name: 'Whatsapp',
      icon: 'fab fa-whatsapp',
      link: 'https://wa.me/94763244160',
      className: 'whatsapp'
    }
  ];
}
