var target : Transform;

var targetfront : Transform;
var targetback : Transform;
var targetcenter : Transform;


function Start () {

}

function Update () {

	transform.LookAt(target);

	if(SpaceShip.speedZ > 1.0)
	{
		target = targetfront;
	}
	
	else if(SpaceShip.speedZ < -1.0)
	{
		target = targetback;
	}
	else
	{
		target = targetcenter;
	}
	
	Debug.DrawLine(transform.position, target.position, Color.green);
}