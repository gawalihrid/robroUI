import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort, Sort } from '@angular/material/sort';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'app/shared/common.service';

import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { userCreateModuleObj } from 'app/shared/model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  @ViewChild('CreateUserForm') CreateUserFormNgForm: NgForm;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;

  dialogRef: any;

  dataSource = null;
  dataSourcebudgetControlAuditHistory = null
  userCreateModuleObj = new userCreateModuleObj
  createUserAPIData = []
  addCancelButtonFlag: boolean = true
  saveUpdateBtn: boolean = true
  CreateUserForm: FormGroup;
  opened: boolean = false;
  searchControl: string;
  subscription: any = null;
  selectedYear: string;
  years = [];
  budgetControlMasterData = []
  budgetControlAuditHistory = []
  updateId: number

  isCheckFlag: string = 'save'
  createUserHeader = ['action','name','email','role','CreatedDate', 'IsActive']
  tempDeleteDataId: number
  projectCategory = []
  plantName = []
  isShowTableData: boolean = true;
  isAuditData: boolean = false;
  hideWhileOnView: boolean = true
  roleList=[
    {id:'Worker',value:'Worker'},
    {id:'Supervisor',value:'Supervisor'},

  ]

  moduleList = []

  hidePassword = true;
  hideConfirmPassword= true
  isShowErrorMsg:boolean=false
 
  isCheckNum: boolean = false
  isCheckSpecialChar: boolean = false
  isCheckUpperCase: boolean = false
  isMaxLength: boolean = false
  isShowPasswordMatch = true

  //#region Defult Method
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private commonService: CommonService,
    private dialog: MatDialog
  ) {
    this.initilization();
    this.getAllModule()
    this.getAllUserData()

  }
  initilization() {
    this.CreateUserForm = this.fb.group({
      id: [],
      email: ['', Validators.required,],
      password: ['', Validators.required],
      confirmPassword:['',Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      module: this.fb.control([],),
    });
  }


  ngOnInit() {
  }

  //#endregion

  //#region CRUD Opareation
  createAPIModule(){
    
    if(this.CreateUserForm.valid && !this.isShowErrorMsg){
      
      let FormValue = this.CreateUserForm.value
      this.userCreateModuleObj.email = FormValue.email
      this.userCreateModuleObj.password = FormValue.password
      this.userCreateModuleObj.firstName = FormValue.firstName
      this.userCreateModuleObj.lastName = FormValue.lastName
      this.userCreateModuleObj.role = FormValue.role
      this.userCreateModuleObj.moduleList = FormValue.module

    }else{
      this._snackBar.open("Please Enter All Fields and Valid Password",'Dismiss')
      return
    }
  }

  saveAPI(flag) {
   
    this.createAPIModule()
  
    if(flag =='save'){
      // this.userCreateModuleObj.id = 0
      this.userCreateModuleObj.isActive = true
      this.commonService.insertUpdateUser( this.userCreateModuleObj).subscribe(responce =>{
        if(responce.success){
         
          this.dialogRef.close()
          this.closeDrawer()
          this.getAllUserData()
          this._snackBar.open("User Created Successfully",'Dismiss')
        }else{

        }
      })
    }
    else if(flag == 'update'){

    }
  }


  onDelete() {
    
    let payload ={
      userId:this.tempDeleteDataId,
      isActive:false,
    }
    
    this.commonService.deleteUser(payload).subscribe(response =>{

      if(response.success){
        this.dialogRef.close()
        this.getAllUserData()
        this._snackBar.open("User Deleted Successfully")
      }
    })
  }





  //#endregion

  //#region Other methods

  getAllUserData() {
    this.commonService.getAllUserData().subscribe(response => {
      if(response.success){
        let data = response.data
        this.createUserAPIData = data.filter((x)=>x.role.toLocaleLowerCase() != "admin")
        this.createUserAPIData = this.createUserAPIData.filter((x)=>x.is_active != false)
        
        this.dataSource = new MatTableDataSource(this.createUserAPIData)
        this.dataSource.paginator = this.paginator
       
      }else{
        this._snackBar.open(response.message,'')
      }
    })
  }
 

  getAllModule(){
    this.commonService.getAllModule().subscribe(response => {
      
      if(response.data){
        this.moduleList = response.data
      }else{

      }
      
    })
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  validatePassword(event) {
    const password = event.target.value;
   
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNoSpace = /[\S+$]/.test(password);
    const hasMinLength = password.length>= 7 ;
   
    if(hasSpecialChar){
      this.isCheckSpecialChar=true
    }
    else{
      this.isCheckSpecialChar=false
    }
    if(hasNumber){
      this.isCheckNum=true
    }
    else{ this.isCheckNum=false }
    if(hasUpperCase){
      this.isCheckUpperCase=true
    }
    else{this.isCheckUpperCase=false}
    if(password.length >= 7 && password.length <= 15){
     this.isMaxLength=true
    }else{this.isMaxLength=false}
   
   
    if (hasSpecialChar && hasNumber && hasUpperCase && hasMinLength && hasNoSpace) {
       
       this.isShowErrorMsg=false
       if(this.CreateUserForm.controls.password.value != null && this.CreateUserForm.controls.confirmPassword.value.trim() != ""){
        if( this.CreateUserForm.controls.confirmPassword.value.trim()==this.CreateUserForm.controls.password.value.trim()){
          this.isShowPasswordMatch = true
         }
         else{
          this.isShowPasswordMatch = false
         }
       }
   
    } else {
   
        this.isShowErrorMsg=true
    }
  }
   
  checkConfirmPassword() {
   
    let password: any = document.getElementById("txtPassword");
    let confirmPassword: any = document.getElementById("txtConfirmPassword")
    if (password && confirmPassword) {
      let valueOfpassword = password.value;
      let valueOfConfirmpassword = confirmPassword.value;
      if (valueOfpassword == valueOfConfirmpassword) {
        this.isShowPasswordMatch = true;
       
      }
      else {
        this.isShowPasswordMatch = false;
       
      }
    }
  }


  isDrawer(value) {
    if (value == 'open') {
      this.addCancelButtonFlag = false;
      this.saveUpdateBtn = true;




    } else {
      this.hideWhileOnView = true
      this.saveUpdateBtn = true;
      this.addCancelButtonFlag = true;
      this.closeDrawer();

    }
  }



  closeDrawer() {
    this.saveUpdateBtn = true
    this.matDrawer.close();
    this.isCheckFlag = 'save'
    this.addCancelButtonFlag = true
    this.CreateUserFormNgForm.resetForm()
    this.userCreateModuleObj = new userCreateModuleObj
  }


  alphabetsAndSpaceOnly(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    const keyCode = event.keyCode;
    if (
      (inputValue.length === 0 && keyCode === 32) ||
      (keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 65 && keyCode <= 90) ||
      (keyCode >= 97 && keyCode <= 122) ||
      keyCode === 32
    ) {
      return;
    } else {
      event.preventDefault();
    }
  }

  confirmSaveDialog(userSavePopUp) {
    this.dialogRef = this.dialog.open(userSavePopUp, {
      width: "350px",
    });
  }

  confirmDeleteDialog(budgetDeletePopUp, id) {
    this.tempDeleteDataId = id
    this.dialogRef = this.dialog.open(budgetDeletePopUp, {
      width: "350px",
    });
  }

  confirmUpdateDialog(updateUpdatePopUp) {
    this.dialogRef = this.dialog.open(updateUpdatePopUp, {
      width: "350px",
    });

  }

  confirmAuditDialog(AuditLog, Id) {

    this.dialogRef = this.dialog.open(AuditLog, {
      width: "1050px",
      height: "450px"
    });

  }

  CloseDialog() {
    this.dialogRef.close()
  }


 



  //#endregion
}
