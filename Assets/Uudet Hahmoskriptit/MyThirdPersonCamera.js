var distanceAway : float;
var distanceUp : float;
private var offset : Vector3 = new Vector3(0.0,1.5,0.0);
var smooth : float;
var followXform : Transform;

var lookDir : Vector3;
var targetPosition : Vector3;
var toPos : Vector3;

var velocityCamSmooth : Vector3 = Vector3.zero;
var camSmoothDampTime : float = 0.1;

function Start () {
	//followXform = GameObject.FindWithTag("Player").transform;
}

function LateUpdate () {

	var characterOffset : Vector3 = followXform.position + offset;
	
	lookDir = characterOffset - transform.position;
	lookDir.y = 0;
	lookDir.Normalize();
	Debug.DrawRay(transform.position, lookDir, Color.green);

	targetPosition = characterOffset + followXform.up *distanceUp - lookDir * distanceAway;
	
	//Debug.DrawRay(followXform.position, Vector3.up * distanceUp, Color.red);
	//Debug.DrawRay(followXform.position,-followXform.forward*distanceAway,Color.blue);
	Debug.DrawLine(followXform.position, targetPosition, Color.magenta);
	
	CompensateForWalls(characterOffset, targetPosition);
	
	SmoothPosition(transform.position,targetPosition);
	
	
	transform.LookAt(followXform);
}

function SmoothPosition(fromPos : Vector3, toPos : Vector3)
{
	transform.position = Vector3.SmoothDamp(fromPos, toPos, velocityCamSmooth, camSmoothDampTime);
}

function CompensateForWalls(fromObject : Vector3, toPos : Vector3)
{
	Debug.DrawLine(fromObject, toPos, Color.cyan);
	var wallHit : RaycastHit = new RaycastHit();
	if(Physics.Linecast(fromObject, toPos, wallHit))
	{
		Debug.DrawRay(wallHit.point, Vector3.left, Color.red);
		var toTarget = new Vector3(wallHit.point.x, toPos.y, wallHit.point.z);
		toPos = toTarget;
	}
}