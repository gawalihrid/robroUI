import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule
{
}

export class departmentModel{
    id:number
    departmentName:string;
    isActive:boolean=true;
}

export class capexCategoryModel{
    id:number
    categoryName:string;
    isActive:boolean=true;
}

export class capexSubCategoryModel{
    id:number
    subCategoryName:string
    categoryName:string;
    isActive:boolean=true;
}

export class approverTypeModel{
    id:number
    approverType:string
    remark:string;
    isActive:boolean=true;
    isAutoApprovalRequired:boolean
    noOfDays:number
}



