import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  constructor() { }

  getAllBooks() {
    return Books
  }

  getBooks(isbn:number) {
    return Books.find(book => book.isbn === isbn)
  }
}

const Books = [
  { 
    isbn: 7778988845,
    title: "The White Tiger",
    author: "Arvind Adiga"
  },
  {
    isbn: 9889779561,
    title: "American Gods",
    author: "Neil Gaiman"
  },
  {
    isbn: 1002003006,
    title: "Buddha",
    author: "Osamu Tezuka"
  }
]
