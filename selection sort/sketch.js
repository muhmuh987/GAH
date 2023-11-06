
let values =[]
let smallestnum=1000
const ARRAY_SIZE = 20;
function setup() {
  noCanvas(); populatearray();
  console.log(values);
  selectionSort(); print(values);
}
function populatearray(){
  for(let i= 0;i<ARRAY_SIZE;i++){
    values.push(floor(random(1000)));
  }
}
function selectionSort(){
//feliz navidad
  for(let index = 0; index < values.length-1; index++){
    let minimumLoc = index;
    let minimum = values[index];
    for(let searchIndex = index+1; searchIndex<values.length;searchIndex++){
      let cur = values[searchIndex];
      if(cur<minimum){
        minimum = cur;
        minimumLoc = searchIndex;
      }
    }
    let tem = values[index];
    values[index] = values[minimumLoc];
    values[minimumLoc] = tem;
  }
}