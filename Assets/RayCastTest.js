var ray1 : Vector3;
var ray2 : Vector3;
var ray3 : Vector3;

var rayLength : float = 3.0;
var rayCastDist : float = 2.0;

function Update () {

	ray1 = transform.position;
	ray2 = Vector3(ray1.x+rayCastDist,ray1.y,ray1.z);
	ray3 = Vector3(ray1.x-rayCastDist,ray1.y,ray1.z);	
	
	var myRay : RaycastHit;
	
	Debug.DrawRay(ray1, -Vector3.up*rayLength, Color.green);
	Debug.DrawRay(ray2, -Vector3.up*rayLength, Color.blue);
	Debug.DrawRay(ray3, -Vector3.up*rayLength, Color.red);
			
	if(Physics.Raycast(ray1, -Vector3.up, myRay, rayLength))
	{
		print("hit1");
	}
	
	if(Physics.Raycast(ray2, -Vector3.up, myRay, rayLength))
	{
		print("hit2");
	}
	
	if(Physics.Raycast(ray3, -Vector3.up, myRay, rayLength))
	{
		print("hit3");
	}
}