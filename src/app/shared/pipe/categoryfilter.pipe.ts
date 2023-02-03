import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryfilter'
})
export class CategoryfilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, args: string[]): any[] {
    const result: any = [];
    const propertyName = args[0];
    const propertyCategory = args[1];

    if(!value || filterString === '' || propertyName === '' || propertyCategory === ''){
      return value;
    }
    value.forEach((a:any) => {
      if(a[propertyName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }
      if(a[propertyCategory].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }
    })
    return result;
  }

}
