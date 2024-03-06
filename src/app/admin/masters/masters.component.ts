import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { HttpMastersService } from 'src/app/https/http-masters.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {

  displayedColumns: string[] = ['No', 'groupName', 'itemName', 'itemValue', 'status'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedGroupName: any
  groupNameOption: any[] = []
  newItem: any = []
  constructor(
    private $masters: HttpMastersService,
    private $alert: SweetAlertGeneralService
  ) { }

  async ngOnInit(): Promise<void> {
    let params: HttpParams = new HttpParams()
    const resData = await lastValueFrom(this.$masters.get(params))
    this.groupNameOption = resData.map((item: any) => item.groupName)
      .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
    this.selectedGroupName = this.groupNameOption[0]
    this.dataSource = new MatTableDataSource(resData.map((data: any, index: number) => {
      return {
        ...data,
        No: index + 1,
        checked: data.status == 'active' ? true : false
      }
    }))
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 300);


    this.onChangeGroupName({ value: this.groupNameOption[0] })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onChangeGroupName(event: any) {
    let value = event.value
    if (value) {
      this.dataSource.filter = value
    }
  }

  async onChangeItemName(element: any) {
    const output = await this.onClickTextToInput(element.itemName)
    if (output) {
      element.itemName = output
      await lastValueFrom(this.$masters.update([element]))
      Swal.fire(`Changed data is ${output}`);
    }
  }
  async onChangeItemValue(element: any) {
    const output = await this.onClickTextToInput(element.itemValue)
    if (output) {
      element.itemValue = output
      await lastValueFrom(this.$masters.update([element]))
      Swal.fire(`Changed data is ${output}`);
    }
  }

  async onClickTextToInput(value: string) {
    const { value: output } = await Swal.fire({
      title: "Enter your data change",
      input: "text",
      showCancelButton: true,
      inputValue: value,
    });
    return output
  }

  async onChangeSlide(event: any, element: any) {
    let checked = event.checked
    element.status = checked ? 'active' : 'inActive'
    await lastValueFrom(this.$masters.update([element]))
    Swal.fire(`Changed data`);

  }

  onNewItem() {
    let dataTemp: any = this.dataSource.filteredData[0]
    this.newItem.push({
      itemValue: '',
      itemName: '',
      checked: true,
      status: 'active',
      groupName: dataTemp.groupName
    })
  }
  onClickDeleteNewItem(index: number) {
    this.newItem = this.newItem.filter((item: any, indexItem: number) => indexItem != index)
  }
  async onSubmitNewItem() {
    await lastValueFrom(this.$masters.create(this.newItem.map((item: any) => {
      return {
        ...item,
        status: item.checked ? 'active' : 'inActive'
      }
    })))
    this.newItem = []
    this.$alert.success(true)
  }

}
