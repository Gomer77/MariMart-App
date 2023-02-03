import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryfilter'
})
export class CategoryfilterPipe implements PipeTransform {

  transform(value: any[]): any[] {
    var result: any = [];
    const sortItem: string = "totalItemSale";
    let multiplier = -1;

    if(!value){
      return value;
    }
    value.sort((a: any, b: any) => {
        if(a[sortItem] < b[sortItem]){
          return -1*multiplier;
        } else if (a[sortItem] > b[sortItem]){
          return 1*multiplier;
        } else {
          return 0;
        }
      });

      for(let i=0; i<5; i++){
        result.push(value[i])
      }
      return result;
  }

}
