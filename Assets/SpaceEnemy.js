var startPos : Vector3;
var endPos : Vector3;

var timer : float;
var setEndPos = true;


function Update () {
	timer += Time.deltaTime;
	if(timer >= 2.0)
	{
		startPos = transform.position;
		transform.position = Vector3.Lerp(startPos,endPos,10.0*Time.deltaTime);
	}	
	else
	{
		NewPos();
	}
	
	if(startPos == endPos)
	{
		timer = 0.0;
	}
}

function NewPos()
{
	var newCoordx = Random.Range(-5,5);
	var newCoordz = Random.Range(-5,5);
	endPos = new Vector3(transform.position.x+newCoordx, transform.position.y, transform.position.z+newCoordz);
	setEndPos = false;
}