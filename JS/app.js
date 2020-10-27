//Can't load files with JS
console.log("Link");

const gameBody = document.getElementById('game')
const itemValues = {
  itemRarity = ['Common','Uncommon','Rare','Ultra Rare','Legendary'],
  itemType = [''],
};

//Functions
function ThrowError(popUp ,errorCode = 0) {
  if (popUp) {
    alert(`Error code: ${errorCode}`);  
  }
  else{
    console.log(`Error code: ${errorCode}`);
  }
  /*
  Error codes:
  1 - Wrong input
  2 - Incorrect request
  3 - 
  4 - 
  5 - 
  6 - 
  6 - 
  7 - 
  8 - 
  9 - 
  10 - 
  */
}

function loadInv(){

}