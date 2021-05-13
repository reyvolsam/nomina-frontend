import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutFileNameUrl'
})
export class CutFileNameUrlPipe implements PipeTransform {

  transform(value: string): string {
    let d = value.split('/');
    let name = d[d.length-1];
    console.log(d);
    return name;
  }

}
