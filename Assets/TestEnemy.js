var alert = false;
var target : Transform;

var facingRight = true;

function Start () {

}

function Update () {
	var dist = Vector3.Distance(target.transform.position, transform.position);
	if(dist <= 5.0){
		alert = true;
	}
	else
	{
		alert = false;
	}
	
	if(alert)
	{
		if(transform.position.x > target.transform.position.x && facingRight)
		{
			Flip();
		}
		else if(transform.position.x < target.transform.position.x && !facingRight)
		{
			Flip();
		}
	}
}

function Flip()
{
	facingRight = !facingRight;
	transform.Rotate(Vector3.up,180.0,Space.World);
}