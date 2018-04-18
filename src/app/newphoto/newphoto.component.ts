import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-newphoto',
  templateUrl: './newphoto.component.html',
  styleUrls: ['./newphoto.component.css']
})
export class NewphotoComponent implements OnInit {
  // When a new photo is created, we'll send an event to the parent
  //  to refresh its photoList
  @Output() newPhoto = new EventEmitter();

  // bound to the form fields
  photo:any = {}
  // property for the file upload element (not bound, but set in a change event)
  fileToUpload: File = null;

  constructor(private photoService:PhotoService) { }

  // bound to change event on file upload html control
  handleFileInput(files):void{
    this.fileToUpload = files.item(0);
  }

  ngOnInit() {
  }

  // called onSubmit
  save(newphotoForm) : void {
    // since we have  file upload, we'll use FormData here rather than JSON
    let formData = new FormData();
    formData.append('image', this.fileToUpload, this.fileToUpload.name);
    formData.append('title', this.photo.title);
    formData.append('description', this.photo.description);
    console.log("submitting");
    // Call on photoService. Upon when its Observable calls the 'next' function (which
    //  is the first argument to subscribe(next, err, complete)), we'll notify the parent component
    //  of the existince of the new photo, and call reset() on the form object
    this.photoService.createPhoto(formData)
      .subscribe((photo)=>{
        console.log(photo)
        this.newPhoto.emit();
        newphotoForm.reset();
      });
  }

}
