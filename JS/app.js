console.info(
`Made by RoyalFang
astralissarnaci@gmail.com`
);
console.debug("Link");

let invSlotMem = 0;

const gameBody = document.getElementById('game');
const inventory = document.getElementById('inv');
const weaponShow = document.getElementById('show');
//Contains all values for weapons
const weaponValues = {
  weaponRarity: ['Common', 'Uncommon', 'Rare', 'Ultra Rare', 'Legendary', 'Mythic', 'Special'],
  weaponType: ['Knife', 'Dagger', 'Shortsword', 'Longsword', 'Bastard Sword', 'Bow', 'Polearm', 'Spear', '2-handed Sword', 'Shield', 'Hammer', 'Mace', 'War Axe', 'Battle Axe', 'Rapier'],
  weaponPhysicalDamageType: ['Slashing','Piercing', 'Blunt'],
  weaponMagicalDamageType: ['Fire', 'Water', 'Earth', 'Air', 'Void', 'Lux']
};
//Contains all values for armors
const armorValues = {
  armorType: {
    helmet: ['Helmet'], 
    chestplate: ['Chestplate'], 
    leggings: ['Leggings'], 
    boots:['Boots']},
}
//Contains all applicable modifiers
const modifiers = {
  good:[],
  bad:[],
}

//Arrays for saving all the generated X
let weaponsGenerated = [];
let playersGenerated = [];
let armorsGenerated = [];

//Work in progress. 
//v2 of class player
//Class that generates a player with stats, a weapon, armor and proficiency modifiers
class player{
  constructor(){
    this.helmet = new armor(armorValues.armorType[0]);
    this.chestplate = new armor(armorValues.armorType[1]);
    this.leggings = new armor(armorValues.armorType[2]);
    this.boots = new armor(armorValues.armorType[3]);
    this.weapon = new Weapon(weaponValues.weaponType[getRandNum(0,15)],weaponValues.weaponRarity[getRandNum(0,7)],getRandNum(0,12)," ",weaponValues.weaponMagicalDamageType[getRandNum(0,6)]);

    this.health = getRandNum(2000,10001);
    this.stamina = getRandNum(100,501);
    this.mana = getRandNum(100,501);
    this.proficiency = [0,0,0,getRandNum(0,2),''];//[0] - Health Proficiency \ [1] - Stamina Proficiency \ [2] - Mana Proficiency \ [3] - Damage Proficiency

    if (getRandNum(1, 101) > 80){
      this.proficiency[0] = 1;
      this.health *= 1.5;
    }
    if (getRandNum(1, 101) > 50){ 
      this.proficiency[1] = 1;
      this.stamina *= 1.5;
    }
    if (getRandNum(1, 101) > 50){ 
      this.proficiency[2] = 1;
      this.mana *= 1.5;
    }
    if (this.proficiency[3]) {
      this.proficiency[4] = weaponValues.weaponMagicalDamageType[getRandNum(0,6)];
    }
    else{
      this.proficiency[4] = weaponValues.weaponPhysicalDamageType[getRandNum(0,3)];
    }
    this.damage = parseFloat(this.weapon.mainMagical)+parseFloat(this.weapon.mainPhysical);
    if (this.weapon.damageType == this.proficiency[4])
      this.damage*1.5;
    this.health = this.health.toFixed(2);
    this.stamina = this.stamina.toFixed(2);
    this.mana = this.mana.toFixed(2);
    this.damage = this.damage.toFixed(2);
  } 
}
//v1 of class armor
//Will receive modifiers in the future.
class armor {
  constructor(type){
    this.armor = getRandNum(1,1001);
    this.armorPiece = type;
    switch (type) {
      case 'Helmet':
        this.armor *= 0.5;
        break;
      case 'Chestplate':
        this.armor *= 1;
        break;
      case 'Leggings':
        this.armor *= 0.7;
        break;
      case 'Boots':
        this.armor *= 0.4;
        break;
      default:
        break;
    }
    this.armor = this.armor.toFixed(2);
  }
}
//v2 of class weapon
//Will receive modifiers in the future.
class Weapon {
  constructor(){
    this.assemblyDamage = getRandNum(1,1001);
    this.mainPhysical = 0;
    this.mainMagical = 0;
    this.critRate = getRandNum(1,21);
    this.critMult = getRandNum(1.05,2.51);
    this.rawDmgType = getRandNum(1,11,0);
    this.magDmgType = weaponValues.weaponMagicalDamageType[getRandNum(0,6,0)];
    this.wType = weaponValues.weaponType[getRandNum(0,15,0)];
    this.physDmgType = this.setPhysDmg();
    this.dmgType = this.setDmgType();
    this.rarity = weaponValues.weaponRarity[getRandNum(0,7,0)];
    this.applyRarityMod();
    this.applyMainDmgMod();
    this.setName();
    this.setPrecision(2);
  }
  setPrecision(prec){
    this.assemblyDamage=this.assemblyDamage.toFixed(prec);
    this.mainPhysical=this.mainPhysical.toFixed(prec);
    this.mainMagical=this.mainMagical.toFixed(prec);
    this.critMult=this.critMult.toFixed(prec);
    this.critRate=this.critRate.toFixed(prec);
  }
  setDmgType(){
    if (this.rawDmgType < 6) {
      let dmgType = this.physDmgType;
      return dmgType;
    }
    else{
      let dmgType = this.magDmgType;
      
      return dmgType;
    }
    
  }
  setPhysDmg(){
    switch (this.wType) {
      case 'Longsword':
      case 'Knife':
      case 'Bastard Sword':
      case 'Polearm':
      case '2-handed Sword':
      case 'War Axe':
      case 'Battle Axe':
      case 'Shortsword':
        return weaponValues.weaponPhysicalDamageType[0]; //Slashing
      case 'Bow':
      case 'Spear':
      case 'Rapier':
      case 'Dagger':
        return weaponValues.weaponPhysicalDamageType[1]; //Piercing
      case 'Mace':
      case 'Hammer':
        return weaponValues.weaponPhysicalDamageType[2]; //Blunt
      case 'Shield':
        return 'Protection';
      default:
        break;
    }
  }
  applyRarityMod(){
    switch (this.rarity) {
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
  }
  applyMainDmgMod(){
    switch (this.dmgType) {
      case 'Slashing':
        this.mainPhysical = 1*this.assemblyDamage;// Slashing damage modifier
        this.mainMagical = 0.01*this.assemblyDamage;// Non-magic weapon modifier
        break;
      case 'Piercing':
        this.mainPhysical = 0.5*this.assemblyDamage;// Piercing damage modifier
        this.mainMagical = 0.01*this.assemblyDamage;// Non-magic weapon modifier
        break;
      case 'Blunt':
        this.mainPhysical = 0.8*this.assemblyDamage;// Blunt damage modifier
        this.mainMagical = 0.01*this.assemblyDamage;// Non-magic weapon modifier
        break;
      case 'Fire':
        this.mainMagical = 0.4*this.assemblyDamage;
        switch(this.physDmgType){
        case 'Slashing':
          this.mainPhysical = 0.5*this.assemblyDamage;
        break;
        case 'Piercing':
          this.mainPhysical = 0.1*this.assemblyDamage;
          break;
        case 'Blunt':
          this.mainPhysical = 0.4*this.assemblyDamage;
        break;
        }
        break;
      case 'Water':
        this.mainMagical = 0.4*this.assemblyDamage;
        switch(this.physDmgType){
          case 'Slashing':
            this.mainPhysical = 0.5*this.assemblyDamage;
          break;
          case 'Piercing':
            this.mainPhysical = 0.1*this.assemblyDamage;
            break;
          case 'Blunt':
            this.mainPhysical = 0.4*this.assemblyDamage;
          break;
          }
        break;
      case 'Air':
        this.mainMagical = 0.4*this.assemblyDamage;
        switch(this.physDmgType){
          case 'Slashing':
            this.mainPhysical = 0.5*this.assemblyDamage;
          break;
          case 'Piercing':
            this.mainPhysical = 0.1*this.assemblyDamage;
            break;
          case 'Blunt':
            this.mainPhysical = 0.4*this.assemblyDamage;
          break;
          }
        break;
      case 'Earth':
        this.mainMagical = 0.4*this.assemblyDamage;
        switch(this.physDmgType){
          case 'Slashing':
            this.mainPhysical = 0.5*this.assemblyDamage;
          break;
          case 'Piercing':
            this.mainPhysical = 0.1*this.assemblyDamage;
            break;
          case 'Blunt':
            this.mainPhysical = 0.4*this.assemblyDamage;
          break;
          }
        break;
      case 'Void':
        this.mainMagical = 0.4*this.assemblyDamage;
        switch(this.physDmgType){
          case 'Slashing':
            this.mainPhysical = 0.5*this.assemblyDamage;
          break;
          case 'Piercing':
            this.mainPhysical = 0.1*this.assemblyDamage;
          break;
          case 'Blunt':
            this.mainPhysical = 0.4*this.assemblyDamage;
          break;
          }
        break;
      case 'Lux':
        this.mainMagical = 2*this.assemblyDamage;
        switch(this.physDmgType){
          case 'Slashing':
            this.mainPhysical = 0.5*this.assemblyDamage;
          break;
          case 'Piercing':
            this.mainPhysical = 0.1*this.assemblyDamage;
            break;
          case 'Blunt':
            this.mainPhysical = 0.4*this.assemblyDamage;
          break;
          }
        break;
      default:
        break;
    }
  }
  setName(){
    this.name = `${this.rarity} ${this.wType} of ${this.dmgType}`;
  }
  get giveDebugData(){
    return `${this.name}:${this.assemblyDamage}:${this.physDmgType}:${this.magDmgType}:${this.critRate}:${this.critMult}:${this.rarity}:${this.wType}:${this.dmgType}:${this.mainPhysical}:${this.mainMagical}`;
  }
}

loadInv(10);

//Functions
function loadInv(invSlots){
  for (let i = invSlotMem; i < invSlots+invSlotMem; i++) {
    inventory.innerHTML+=`<button id="invslot${i}" class="invslot" onclick="showInfo(${i})"></button>\n`;
  }
  invSlotMem = invSlotMem+invSlots;
}
function generateWeapon(n = 1, debug = 0){
  for (let i = 0; i < n; i++) {
    weaponsGenerated.push(new Weapon());
    }
  
  if (debug)
  {
    let string = 'ID:Name:Assembly Damage:Main Physical DMG:Main Magical DMG:Crit Rate:Crit Mult:Rarity:Weapon Type:Leading Damage:Physical Damage:Magical Damage\n';
    for (let i = 0; i < n; i++) {
      
      string += `${i}:${weaponsGenerated[i].giveDebugData}\n`;
    }
    console.debug(string);  
  }
}
function generatePlayer(n = 1, debug = 0){
  for (let i = 0; i < n; i++) {
    playersGenerated.push(new player);
  }
  
  if (debug)
  {
    //Add names of players later, perhaps?
    let string = 'ID:Health:Total Armor:Helmet:Chestplate:Leggings:Boots:Stamina:Mana:Health Proficiency:Stamina Proficiency:Mana Proficiency:Damage Type Proficiency:Weapon Damage:Weapon Crit Rate:Weapon Crit Mult:Weapon Damage Type\n';
    for (let i = 0; i < n; i++) {
      let a = parseFloat(playersGenerated[i].helmet.armor)+parseFloat(playersGenerated[i].chestplate.armor)+parseFloat(playersGenerated[i].leggings.armor)+parseFloat(playersGenerated[i].boots.armor);
      string +=
`${i}:${playersGenerated[i].health}:${a.toFixed(2)}:${playersGenerated[i].helmet.armor}:${playersGenerated[i].chestplate.armor}:${playersGenerated[i].leggings.armor}:${playersGenerated[i].boots.armor}:${playersGenerated[i].stamina}:${playersGenerated[i].mana}:${playersGenerated[i].proficiency[0]}:${playersGenerated[i].proficiency[1]}:${playersGenerated[i].proficiency[2]}:${playersGenerated[i].proficiency[4]}:${playersGenerated[i].damage}:${playersGenerated[i].weapon.critRate}:${playersGenerated[i].weapon.critMult}:${playersGenerated[i].weapon.damageType}\n`;
    }
    console.debug(string);
    string = '';
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
  <p class="show-weapon-info-text">Weapon Type: ${weaponsGenerated[i].wType}</p>
  <p class="show-weapon-info-text">Main Damage Type: ${weaponsGenerated[i].dmgType}</p>
  <p class="show-weapon-info-text">Physical Damage: ${weaponsGenerated[i].mainPhysical}</p>
  <p class="show-weapon-info-text">Magical Damage: ${weaponsGenerated[i].mainMagical}</p>
  <p class="show-weapon-info-text">DMG Value: ${weaponsGenerated[i].assemblyDamage}</p>
  <p class="show-weapon-info-text">Crit Mult: ${weaponsGenerated[i].critMult}</p>
  <p class="show-weapon-info-text">Crit Rate: ${weaponsGenerated[i].critRate}</p>
</div>`;
  }
}
//0=integer, 1=float
function getRandNum(min=0, max=0, what = 1) {
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