console.info(
`Made by RoyalFang
astralissarnaci@gmail.com`
)

//Can't load files with JS
console.debug("Link");
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
let weaponsGenerated = [];
//Weapon class constructor
class weapon {
  constructor(type,rarity,damageType,physicalDamageType, magicalDamageType){
    this.type = type;
    this.rarity = rarity;
    this.damageType = damageType;
    if (damageType<=5) {
      damageType = physicalDamageType;
    }
    else{
      damageType = magicalDamageType;
    }
    this.name = `${rarity} ${type} of ${damageType}`;
    this.physicalDamageType = physicalDamageType;
    this.magicalDamageType = magicalDamageType;
    this.damageValue = getRandNum(1,1000);
    //damage type <=5 is physical damage
    //damage type >=6 is magical damage
  }
}

loadInv(9);

//Functions
function loadInv(invSlots){
  for (let i = invSlotMem; i < invSlots+invSlotMem; i++) {
    inventory.innerHTML+=`<button id="invslot${i}" class="invslot" onclick="showInfo()"></button>\n`;
  }
  console.debug(inventory.innerHTML, invSlots, invSlotMem);
  invSlotMem = invSlotMem+invSlots;
  console.debug(invSlots, invSlotMem);
}

function generateWeapon(n=1){
  for (let i = 0; i < n; i++) {
    weaponsGenerated.push(new weapon(weaponValues.weaponType[getRandNum(0,14)],weaponValues.weaponRarity[getRandNum(0,6)],getRandNum(0,11),weaponValues.weaponPhysicalDamageType[getRandNum(0,2)],weaponValues.weaponMagicalDamageType[getRandNum(0,5)]));
  }
  console.debug(weaponsGenerated);
}

function showInfo(){
  weaponShow.innerHTML=
  `
  <p class="small-title">Weapon Show</p>
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

function getRandNum(min, max) {
  return parseInt(Math.random() * (max - min) + min); 
}

function ThrowError(popUp ,errorCode = 0) {
  if (popUp) {
    alert(`Error code: ${errorCode}`);  
  }
  else{
    console.error(`Error code: ${errorCode}`);
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
