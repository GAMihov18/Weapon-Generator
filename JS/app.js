//Can't load files with JS
console.log("Link");
let invSlotMem = 0;
const gameBody = document.getElementById('game');
const inventory = document.getElementById('inv');
const weaponShow = document.getElementById('show');
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

loadInv(9);

//Functions
function loadInv(invSlots){
  for (let i = invSlotMem; i < invSlots+invSlotMem; i++) {
    inventory.innerHTML+=`<button id="invslot${i}" class="invslot" onclick="showInfo()"></button>
    `;
  }
  console.log(inventory.innerHTML, invSlots, invSlotMem);
  invSlotMem = invSlotMem+invSlots;
  console.log(invSlots, invSlotMem);
}

function showInfo(){
  weaponShow.innerHTML=
  `
  <div class="show-weapon-info">
    <img src="" alt="Pic of Weapon" class="show-weapon-info-img">
    <p class="show-weapon-info-text">Name: </p>
    <p class="show-weapon-info-text">Weapon Type: </p>
    <p class="show-weapon-info-text">Damage Type: </p>
    <p class="show-weapon-info-text">Physical Damage: </p>
    <p class="show-weapon-info-text">Magical Damage: </p>
  </div>
  `;
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
  7 - 
  8 - 
  9 - 
  10 - 
  */
}
