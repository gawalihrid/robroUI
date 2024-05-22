import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDrawer } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonService } from "app/shared/common.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'


@Component({
  selector: 'app-imagecapture',
  templateUrl: './imagecapture.component.html',
  styleUrls: ['./imagecapture.component.scss']
})
export class ImagecaptureComponent implements AfterViewInit{
  
  // #region Variables 
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  addCancelButtonFlag:boolean = true
  description =""
  allImageData=[]
  dataSource=null
  imageCaptureHeader = ['Description','Images','CreatedDate']
  //#endregion
  //#region Defult Method
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private commonService: CommonService,
  ){
    this.getAllImages()
  }
  //#endregion


  getAllImages(){
    this.allImageData = []
    this.commonService.getAllImages().subscribe(response => {
      if(response.success){
        
        for(let item of response.data){
          let obj = {
            description:item.description,
            image_data:JSON.parse(item.image_data),
            created_at:item.created_at
          }
          this.allImageData.push(obj)
       
        }
        this.dataSource = new MatTableDataSource(this.allImageData)
        this.dataSource.paginator = this.paginator

      }else{
        this._snackBar.open(response.message,'Dismiss')
      }
    })
  }
  saveImages(){
    
    
    if(this.captures.length !=0){
      let payload = {
        imageData:JSON.stringify(this.captures),
        description:this.description
      }
      this.commonService.insertImages(payload).subscribe(response=>{
        if(response.success){
          this.description =""
          this.getAllImages()
          this.closeDrawer()
          this.isDrawer('close') 
          this._snackBar.open("Images Uploaded Successfully",'Dismiss')
          this.captures = []
        }else{
          this._snackBar.open(response.message,'Dismiss')
        }

      })

    }else{
      this._snackBar.open("Please Capture Image to upload")
    }
  }
clearImages(){
  this.captures= []
  this._snackBar.open("Images Clear")
}

isDrawer(value) {
  if (value == 'open') {
    this.addCancelButtonFlag = false;
  
  } else {
   
    this.addCancelButtonFlag = true;
    this.closeDrawer();
  }
}


closeDrawer() {

  this.matDrawer.close();

  this.addCancelButtonFlag = true

}

  //---------------------------image capture---------------
  
  WIDTH = 640;
  HEIGHT = 400;

  @ViewChild("video")
  public video!: ElementRef;

  @ViewChild("canvas")
  public canvas!: ElementRef;

  captures: string[] = [];
  error: any;
  isCaptured!: boolean;

  async ngAfterViewInit() {
    await this.setupDevices();
   
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  
    this.isCaptured = true;
  }

  removeCurrent() {
    this.isCaptured = false;
   
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }
/////////////////////////////////////////////////////////////////////////////////////


}
