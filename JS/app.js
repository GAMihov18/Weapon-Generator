//Can't load files with JS
console.log("Link");

const gameBody = document.getElementById('game');
const inventory = document.getElementById('inv');
const weaponValues = {
  weaponRarity: ['Common', 'Uncommon', 'Rare', 'Ultra Rare', 'Legendary', 'Mythic', 'Special'],
  weaponType: ['Knife', 'Dagger', 'Shortsword', 'Longsword', 'Bastard Sword', 'Bow', 'Polearm', 'Spear', '2-handed Sword', 'Shield', 'Hammer', 'Mace', 'War Axe', 'Battle Axe', 'Rapier'],
  weaponPhysicalDamageType: ['Slashing','Piercing', 'Blunt'],
  weaponMagicalDamageType: ['Fire', 'Water', 'Earth', 'Air', 'Void', 'Lux']
};

//Weapon class constructor
class weapon {
  constructor(name,type,damageType,physicalDamageType, magicalDamageType){
    this.name = name;
    this.type = type;
    this.damageType = damageType;
    this.physicalDamageType = physicalDamageType;
    this.magicalDamageType = magicalDamageType; 
  }
}



//Functions
function loadInv(invSlots){
  for (let i = 0; i < invSlots; i++) {
    inventory.innerHTML+=`<div class="invslot"></div>`;
    console.log(inventory.innerHTML);
  }
}

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
