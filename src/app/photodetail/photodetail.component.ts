import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photodetail',
  templateUrl: './photodetail.component.html',
  styleUrls: ['./photodetail.component.css'],
  providers: [ PhotoService ]
})
export class PhotodetailComponent implements OnInit {

  photo:any;  //could be a photo obejct
  photodisplayurl:string='';
  editing:boolean=false;

  constructor(private route: ActivatedRoute,
              private photoService:PhotoService ) { }

  ngOnInit() {
    this.getPhoto();
  }

  setEditMode(mode):void{
    this.editing = (mode ? true : false);
  }

  getPhoto(): void{
     const param = this.route.snapshot.paramMap.get('id');
     this.photoService.getPhoto(param)
      .subscribe((photo) => {
        this.photo = photo;
        this.photodisplayurl = this.photoService.photoUrl + this.photo.imageurl;
      });
  }

  updatePhoto(obj:any):void {
    this.photo.title = obj.titleField;
    this.photo.description = obj.descField;
    this.photoService.updatePhoto(this.photo._id, this.photo)
      .subscribe((result)=>{
        location.reload();
    });
  }

  // deletes photo using PhotoService
  deletePhoto(){
    if (confirm(`Are you sure you want to delete ${this.photo.title}?`)){
      console.log(`deleting ${this.photo._id}`);
      this.photoService.deletePhoto(this.photo._id)
        .subscribe((result)=>{
          alert(`Photo ${this.photo.title} has been deleted`);
          this.router.navigate(['/gallery']);
        })
      }
  }
}
