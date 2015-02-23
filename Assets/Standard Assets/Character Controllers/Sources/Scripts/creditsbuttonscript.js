var buttonNormal : Texture2D;
var buttonHover : Texture2D;

function OnMouseEnter () {
	guiTexture.texture = buttonHover;
}

function OnMouseExit () {
	guiTexture.texture = buttonNormal;
	}
	
function OnMouseDown(){
	Application.LoadLevel("credits");
	}