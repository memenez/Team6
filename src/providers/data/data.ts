import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";

@Injectable()
export class DataProvider {
  peopleRef: AngularFireList<any>;
  people: Observable<any>;
  items: any;
  constructor(public http: Http, public afDatabase: AngularFireDatabase) {
    this.items = [
      { title: "one" },
      { title: "two" },
      { title: "three" },
      { title: "four" },
      { title: "five" },
      { title: "six" }
    ];

    this.peopleRef = afDatabase.list("People/");
    this.people = this.peopleRef.valueChanges();
  }

  filterItems(searchTerm) {
    if (searchTerm != "") {
      // console.log("data filter");
      return this.people.map(searched => {
        searched;
        //   console.log("result" + searched); , ref => ref.limitToFirst(5)
        return searched
          .filter(
            people =>
              people.First_name.toLowerCase().indexOf(
                searchTerm.toLowerCase()
              ) > -1
          )
          .slice(0, 5);
      });
    } else {
      return this.people;
    }
  }

  searchItems(searchTerm) {
    if (searchTerm != "") {
      // console.log("data filter");
      return this.people.map(searched => {
        searched;
        //   console.log("result" + searched); , ref => ref.limitToFirst(5)
        return searched.filter(
          people =>
            people.First_name.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1
        );
      });
    } else {
      return this.people;
    }
  }
}
