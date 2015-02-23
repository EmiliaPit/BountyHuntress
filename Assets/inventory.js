//inventory

static var inventoryArray : int[] = [1,2,0,0,0];
var inventoryText : GameObject;

function Start () {

}

function Update () {
//if(Input.GetKeyDown("i")){

inventoryText.guiText.text = "Healthpotion" +"[" + inventoryArray[0] + "]" +"Manapotion " + "[" + inventoryArray[1] +"]";
//}

//inventoryArray[0]++;
//inventoryArray[1] += 2;

}

function HealthPotion() {
	GUImanager.currentHealth += 20;
	inventoryArray[0] -= 1;



}