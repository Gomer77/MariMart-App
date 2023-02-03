import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortfilter'
})
export class SortfilterPipe implements PipeTransform {

  transform(value : Array<string>, args: any[]): any {
    const sortItem = args[0];
    const sortDirection = args[1];
    let multiplier = 1;

    if(sortDirection === "desc"){
      multiplier = -1;
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

    return value;
  }

}
