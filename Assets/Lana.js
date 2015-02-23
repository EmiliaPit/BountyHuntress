var offSetX : float;
var offSetZ : float;

var target : Transform;

function Start () {
}

function Update () {
	transform.position.x = target.transform.position.x+offSetX;
	transform.position.z = target.transform.position.z+offSetZ;
}