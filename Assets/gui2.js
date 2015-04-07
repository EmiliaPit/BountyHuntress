var texture : Texture;
var x3: float = 0;
var y3 : float = 0;
var w3 : float;
var h3 : float;

function Start () {

}

function Update () {

}

function OnGUI(){
	GUI.depth = 0;
	GUI.DrawTexture(Rect(x3, y3, w3, h3), texture);
	
	}