var pos1 : Vector3;
var pos2 : Vector3;

var player : Transform;

function Start()
{

}

function OnMouseEnter()
{
	SpaceShip.ast = this.gameObject.rigidbody;
}

function Update()
{

	pos1 = transform.position;
	pos2 = player.transform.position;
	var lineRenderer : LineRenderer = GetComponent(LineRenderer);
	lineRenderer.SetPosition(1.0,pos1);
	
}