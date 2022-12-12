import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hash'
})
export class HashPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let tokens = value.replace(/\n/g," <br>").split(" ");
    for(let i=0;i<tokens.length;i++){
      if(tokens[i].startsWith("Hash")){
        tokens[i] = `<img height="18px" src="assets/icon/hash/${tokens[i].replace("Hash","")}.png" class="hash-icon" alt="">`;
      }
    }
    return tokens.join(" ");
  }

}
