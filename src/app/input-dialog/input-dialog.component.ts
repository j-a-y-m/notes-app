import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  inputType : string ;

  constructor(public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {inputType : string}) { 

      this.inputType = data.inputType ;

    }

  ngOnInit() {
  }

  submitInput(formValues: any)
  {     
        console.log("dialog submit");
        
        this.dialogRef.close({inputName: formValues.name});
  }

}
