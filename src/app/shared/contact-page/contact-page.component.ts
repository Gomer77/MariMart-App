import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent {
  contactForm !: FormGroup

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      fullName : [''],
      eMail : [''],
      comment : [''],
    })
  }
}
