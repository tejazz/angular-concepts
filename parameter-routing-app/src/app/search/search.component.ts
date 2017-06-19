import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  book:any = []

  constructor(public app:AppService) { }

  ngOnInit() {
    this.book = this.app.getAllBooks()
  }

}
