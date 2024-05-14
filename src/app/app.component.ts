import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: student = new student();
  studentList: student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModel() {
    // this.studentObj = new student();
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = "block";
    }
  }

  closeModal() {
    this.studentObj = new student();
    if (this.model != null) {
      this.model.nativeElement.style.display = "none";
    }
  }

  onEdit(item: student) {
    this.studentObj = item;
    this.openModel();

  }

  updateStudent() {
    const currentRecord = this.studentList.find(m => m.id === this.studentObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.mobileNumber = this.studentObj.mobileNumber;
      currentRecord.email = this.studentObj.email;
      currentRecord.city = this.studentObj.city;
      currentRecord.state = this.studentObj.state;
      currentRecord.pincode = this.studentObj.pincode;
    }
    localStorage.setItem("angular17crud", JSON.stringify(this.studentList));
    this.closeModal();
  }

  onDelete(item: student) {
    this.studentObj = item;
    const isDelete = confirm("Are sure want to delete ? ")
    if (isDelete) {
      const currentRecord = this.studentList.findIndex(m => m.id === this.studentObj.id);
      this.studentList.splice(currentRecord, 1);
      localStorage.setItem("angular17crud", JSON.stringify(this.studentList));
    }
  }

  saveStudent() {
    debugger;
    const isLocalPresent = localStorage.getItem("angular17crud");
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem("angular17crud", JSON.stringify(oldArray));

    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem("angular17crud", JSON.stringify(newArr));
    }
    this.closeModal();
  }
}


export class student {
  id: number;
  name: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  email: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.mobileNumber = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.pincode = "";
    this.email = "";

  }

}
