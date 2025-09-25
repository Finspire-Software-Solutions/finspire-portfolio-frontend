import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'info@finspire.com',
      link: 'mailto:info@finspire.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Address',
      value: '123 Tech Street, Innovation City, IC 12345',
      link: 'https://maps.google.com'
    }
  ];

  socialLinks = [
    { icon: 'fab fa-linkedin', url: 'https://linkedin.com/company/finspire' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/finspire' },
    { icon: 'fab fa-github', url: 'https://github.com/finspire' },
    { icon: 'fab fa-facebook', url: 'https://facebook.com/finspire' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    if (form.valid) {
      // Handle form submission here
      console.log('Form submitted:', form.value);
      // You can add your form submission logic here
      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
    }
  }

}
