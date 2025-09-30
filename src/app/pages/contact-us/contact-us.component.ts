import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

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
      value: 'finspire001@gmail.com',
      link: 'mailto:finspire001@gmail.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+94 77 042 7773, +94 76 324 4160',
      link: 'tel:+94763244160'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Address',
      value: 'Kilinochchi, Nothern Province, Sri Lanka',
      link: 'https://maps.google.com'
    }
  ];

  socialLinks = [
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/company/finspiresoftwaresolution' },
    // { icon: 'fab fa-twitter', url: 'https://twitter.com/finspire' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/fins_pire?igsh=Y3p0eHR2MDAzNjlj' },
    { icon: 'fab fa-facebook', url: 'https://www.facebook.com/share/1LaM55SZjo/' }
  ];

  constructor( private fb: FormBuilder, private toast: ToastService,private __contact: ContactService) { }

  contactForm!: FormGroup;
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      company: ['', Validators.required],
      interestedService: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      console.log('Form submitted:', form.value);
      if (form.valid) {
        this.__contact.addContact(form.value).subscribe({
          next: (res) => {
            this.toast.success(res);
            form.reset();
          },
          error: (err) => {
            this.toast.error(err.error);
          }
        })
      }
    }
  }

}
