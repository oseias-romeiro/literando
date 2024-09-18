import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public searchQuery: string = '';
  
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchQuery = params['query'] || '';
    });
  }

  inputChange(event: any) {
    this.searchQuery = event.target.value;
  }

  onSubmit() {
    console.log(this.searchQuery);
    if(window.location.href.includes('search')) {
      window.location.href = `#search/${this.searchQuery}`;
      window.location.reload();
    }else {
      window.location.href = `#search/${this.searchQuery}`;
    }
  }

}
