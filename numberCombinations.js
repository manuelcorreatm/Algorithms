function code(num){
  return (num==0)?'+':String.fromCharCode(64+num);
}

function find(num,res = '', count = 0){
  if(num < 1) {console.log(res); return count+1;}
  if(num < 10) {console.log(code(num)+res); return count+1;}
  count = find(Math.floor(num/10), code(num%10)+res, count);
  if(num %100 < 27){
  count =  find(Math.floor(num/100), code(num%100)+res, count); 
  }
  return count;
}

console.log(find(1224));