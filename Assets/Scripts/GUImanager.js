static var currentHealth : float;
var maxHealth : int = 100;
var healthTexture : Texture2D;
var mat : Material;



var x : float = 0;
var y : float = 0;
var w : float;
var h : float;

static var currentShield : float = 100;
var maxShield : int = 100;
var shieldTexture : Texture2D;
var shieldMat : Material;


var x2: float = 0;
var y2 : float = 0;
var w2 : float;
var h2 : float;

var barLength = 0.0;


function Start () {
	
	currentHealth = 100;
	currentShield = 100;
}

function Update () {
var healthy : float = 1-(currentHealth/100);
	if (healthy == 0){
		healthy = 0.1;
	
	}
	mat.SetFloat("_Cutoff",healthy);
	
	
var shieldfull : float = 1-(currentShield/100);
	if (shieldfull == 0){
		shieldfull = 0.1;
	
	}
	shieldMat.SetFloat("_Cutoff",shieldfull);

if (currentShield <= 0){
	CharacterTest.shieldEmpty = true;

}
}

function OnGUI(){
	if(Event.current.type.Equals(EventType.Repaint)){
		var box : Rect = new Rect(x,y,w,h);
		Graphics.DrawTexture(box, healthTexture, mat);
	
	}
	if(Event.current.type.Equals(EventType.Repaint)){
		var box2 : Rect = new Rect(x2,y2,w2,h2);
		Graphics.DrawTexture(box2, shieldTexture, shieldMat);
	
	}
	

}