import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  details: any = {}

  constructor(private app: AppService, private route:ActivatedRoute) { 
     this.details = app.getBooks(+this.route.snapshot.params['isbn'])
  }

  ngOnInit() {
  }

}
