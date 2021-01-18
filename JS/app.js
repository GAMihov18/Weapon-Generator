console.info(
`Made by RoyalFang
astralissarnaci@gmail.com`
);

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
  constructor(type,rarity,damageType,physicalDamageType, magicalDamageType,mainMagical=1,mainPhysical=1){
    this.type = type;
    this.rarity = rarity;
    this.assemblyDamage = getRandNum(1,1001);
    this.critRate = getRandNum(1,21);
    this.critMult = getRandNum(1.05, 2.51);
    switch (type) {
      case 'Longsword':
      case 'Knife':
      case 'Bastard Sword':
      case 'Polearm':
      case '2-handed Sword':
      case 'War Axe':
      case 'Battle Axe':
      case 'Shortsword':
        physicalDamageType = weaponValues.weaponPhysicalDamageType[0]; //Slashing
        break;
      case 'Bow':
      case 'Spear':
      case 'Rapier':
      case 'Dagger':
        physicalDamageType = weaponValues.weaponPhysicalDamageType[1]; //Piercing
        break;
      case 'Mace':
      case 'Hammer':
        physicalDamageType = weaponValues.weaponPhysicalDamageType[2]; //Blunt
        break;
      case 'Shield':
        physicalDamageType = 'Protection';
      default:
        break;
    }
    this.physicalDamageType = physicalDamageType;
    if (damageType<=5) {
      this.damageType = physicalDamageType;
    }
    else{
      this.damageType = magicalDamageType;
    }
    //damage type <=5 is physical damage
    //damage type >=6 is magical damage
    this.name = `${rarity} ${type} of ${this.damageType}`;
    this.magicalDamageType = magicalDamageType;
    switch (rarity) {
      case 'Common':
        this.assemblyDamage *= 0.7;
        this.critRate *= 0.5;
        this.critMult *= 1;
        break;
      case 'Uncommon':
        this.assemblyDamage+=100;
        this.assemblyDamage *= 0.9;
        this.critRate *= 0.6;
        this.critMult *= 1.08;
        break;
      case 'Rare':
        this.assemblyDamage+=150;
        this.assemblyDamage *= 1;
        this.critRate *= 0.8;
        this.critMult *= 1.2;
        break;
      case 'Ultra Rare':
        this.assemblyDamage+=200;
        this.assemblyDamage *= 1.1;
        this.critRate *= 0.9;
        this.critMult *= 1.3;
        break;
      case 'Legendary':
        this.assemblyDamage+=250;
        this.assemblyDamage *= 1.175;
        this.critRate *= 1.05;
        this.critMult *= 1.5;
        break;
      case 'Mythic':
        this.assemblyDamage+=300;
        this.assemblyDamage *= 1.2;
        this.critRate *= 1.1;
        this.critMult *= 1.6;
        break;
      case 'Special':
        this.assemblyDamage+=400;
        this.assemblyDamage *= 1.3;
        this.critRate *= 1.2;
        this.critMult *= 1.7;
        break;
      default:
        break;
    }
    switch (this.damageType) {
      case 'Slashing':
        mainPhysical = 1*this.assemblyDamage;// Slashing damage modifier
        mainMagical = 0.01*this.assemblyDamage;// Non-magic weapon modifier
        break;
      case 'Piercing':
        mainPhysical = 0.5*this.assemblyDamage;// Piercing damage modifier
        mainMagical = 0.01*this.assemblyDamage;// Non-magic weapon modifier
        break;
      case 'Blunt':
        mainPhysical = 0.8*this.assemblyDamage;// Blunt damage modifier
        mainMagical = 0.01*this.assemblyDamage;// Non-magic weapon modifier
        break;
      case 'Fire':
        mainMagical = 0.4*this.assemblyDamage;
        switch(physicalDamageType){
        case 'Slashing':
        mainPhysical = 0.5*this.assemblyDamage;
        break;
        case 'Piercing':
          mainPhysical = 0.1*this.assemblyDamage;
          break;
        case 'Blunt':
          mainPhysical = 0.4*this.assemblyDamage;
        break;
        }
        break;
      case 'Water':
        mainMagical = 0.4*this.assemblyDamage;
        switch(physicalDamageType){
          case 'Slashing':
          mainPhysical = 0.5*this.assemblyDamage;
          break;
          case 'Piercing':
            mainPhysical = 0.1*this.assemblyDamage;
            break;
          case 'Blunt':
            mainPhysical = 0.4*this.assemblyDamage;
          break;
          }
        break;
      case 'Air':
        mainMagical = 0.4*this.assemblyDamage;
        switch(physicalDamageType){
          case 'Slashing':
          mainPhysical = 0.5*this.assemblyDamage;
          break;
          case 'Piercing':
            mainPhysical = 0.1*this.assemblyDamage;
            break;
          case 'Blunt':
            mainPhysical = 0.4*this.assemblyDamage;
          break;
          }
        break;
      case 'Earth':
        mainMagical = 0.4*this.assemblyDamage;
        switch(physicalDamageType){
          case 'Slashing':
          mainPhysical = 0.5*this.assemblyDamage;
          break;
          case 'Piercing':
            mainPhysical = 0.1*this.assemblyDamage;
            break;
          case 'Blunt':
            mainPhysical = 0.4*this.assemblyDamage;
          break;
          }
        break;
      case 'Void':
        mainMagical = 0.4*this.assemblyDamage;
        switch(physicalDamageType){
          case 'Slashing':
          mainPhysical = 0.5*this.assemblyDamage;
          break;
          case 'Piercing':
            mainPhysical = 0.1*this.assemblyDamage;
            break;
          case 'Blunt':
            mainPhysical = 0.4*this.assemblyDamage;
          break;
          }
        break;
      case 'Lux':
        mainMagical = 2*this.assemblyDamage;
        switch(physicalDamageType){
          case 'Slashing':
          mainPhysical = 0.5*this.assemblyDamage;
          break;
          case 'Piercing':
            mainPhysical = 0.1*this.assemblyDamage;
            break;
          case 'Blunt':
            mainPhysical = 0.4*this.assemblyDamage;
          break;
          }
        break;
      default:
        break;
    }
    this.assemblyDamage = this.assemblyDamage.toFixed(2);
    this.mainMagical = mainMagical.toFixed(2);
    this.mainPhysical = mainPhysical.toFixed(2);
    this.critRate = this.critRate.toFixed(2);
    this.critMult = this.critMult.toFixed(2);
  }
}

loadInv(10);

//Functions
function loadInv(invSlots){
  for (let i = invSlotMem; i < invSlots+invSlotMem; i++) {
    inventory.innerHTML+=`<button id="invslot${i}" class="invslot" onclick="showInfo(${i})"></button>\n`;
  }
  console.debug(inventory.innerHTML, invSlots, invSlotMem);
  invSlotMem = invSlotMem+invSlots;
  console.debug(invSlots, invSlotMem);
}

function generateWeapon(n = 1, debug = 0){
  for (let i = 0; i < n; i++) {
    weaponsGenerated.push(new weapon(weaponValues.weaponType[getRandNum(0,15)],weaponValues.weaponRarity[getRandNum(0,7)],getRandNum(0,12)," ",weaponValues.weaponMagicalDamageType[getRandNum(0,6)]));
  }
  
  if (debug)
  {
    let string = 'ID:Name:Assembly Damage:Main Physical DMG:Main Magical DMG:Crit Rate:Crit Mult:Rarity:Weapon Type:Leading Damage:Physical Damage:Magical Damage\n';
    for (let i = 0; i < n; i++) {
      
      string +=
`${i}:${weaponsGenerated[i].name}:${weaponsGenerated[i].assemblyDamage}:${weaponsGenerated[i].mainPhysical}:${weaponsGenerated[i].mainMagical}:${weaponsGenerated[i].critRate}:${weaponsGenerated[i].critMult}:${weaponsGenerated[i].rarity}:${weaponsGenerated[i].type}:${weaponsGenerated[i].damageType}:${weaponsGenerated[i].physicalDamageType}:${weaponsGenerated[i].magicalDamageType}\n`;
    }
    console.debug(string);  
  }
}

function showInfo(i){
  if (weaponsGenerated[i]==undefined) {
    throwError(0,2);
  }
  else{
  weaponShow.innerHTML=
`<p class="small-title">Weapon Show</p>
<div class="show-weapon-info">
  <img src="" alt="Pic of Weapon" class="show-weapon-info-img">
  <p class="show-weapon-info-text">${weaponsGenerated[i].name}</p>
  <p class="show-weapon-info-text">Weapon Type: ${weaponsGenerated[i].type}</p>
  <p class="show-weapon-info-text">Main Damage Type: ${weaponsGenerated[i].damageType}</p>
  <p class="show-weapon-info-text">Physical Damage: ${weaponsGenerated[i].physicalDamageType}</p>
  <p class="show-weapon-info-text">Magical Damage: ${weaponsGenerated[i].magicalDamageType}</p>
  <p class="show-weapon-info-text">DMG Value: ${weaponsGenerated[i].assemblyDamage}</p>
  <p class="show-weapon-info-text">Crit Mult: ${weaponsGenerated[i].critMult}</p>
  <p class="show-weapon-info-text">Crit Rate: ${weaponsGenerated[i].critRate}</p>
</div>`;
  }
}

function getRandNum(min, max, what) {
  if (what==2) {
    return 1;
  }
  if (what) {
    return Math.random() * (max - min) + min;
  }
  else{
  return parseInt(Math.random() * (max - min) + min); 
  }
}


function throwError(popUp ,errorCode = 0) {
  if (popUp) {
    alert(`Error code: ${errorCode}`);  
  }
  else{
    console.warn(`Error code: ${errorCode}`);
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