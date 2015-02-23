var power = 5.0;
static var ast : Rigidbody;
var con : Rigidbody;
var handFull = false;
var strafing = false;

var playerHolder : Transform;
var target : Transform;

static var speedZ : float;

function Start () {

}

function Update () {

	speedZ = rigidbody.velocity.z;
	print(speedZ);
	
	if(Input.GetKey(KeyCode.LeftShift))
	{
		strafing = true;
	}
	else
	{
		strafing = false;
	}

	if(Input.GetKey(KeyCode.W))
	{
		rigidbody.AddRelativeForce(Vector3.forward*power);
		transform.parent = null;

	}
	
	else if(Input.GetKey(KeyCode.S))
	{
		rigidbody.AddRelativeForce(Vector3.forward*-power);
		transform.parent = null;		
	}
	
	else if(Input.GetKey(KeyCode.A))
	{
		//rigidbody.AddRelativeForce(Vector3.right*-power);
		if(strafing)
		{
			rigidbody.AddForce(Vector3.right*-power);
		}
		else 
		{
			rigidbody.AddRelativeForce(Vector3.right*-power);
		}
		
	}
	
	else if(Input.GetKey(KeyCode.D))
	{
		if(strafing)
		{
			rigidbody.AddForce(Vector3.right*power);
		}
		else 
		{
			rigidbody.AddRelativeForce(Vector3.right*power);
		}
			
	}
	
	//transform.Translate(Input.GetAxis("Horizontal")*power*Time.deltaTime,0.0,0.0);
	
	var camRay : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var floorHit : RaycastHit;
	
	if(Physics.Raycast(camRay, floorHit, 100.0))
	{
		var playerToMouse : Vector3 = floorHit.point - transform.position;
		playerToMouse.y = 0.0;
	
		var newRotation = Quaternion.LookRotation(playerToMouse);
		var newRotation2 = Quaternion.Slerp(transform.rotation,newRotation,7.0*Time.deltaTime);
		rigidbody.MoveRotation(newRotation2);

	}

	
	if(Input.GetButtonUp("Fire1") && !handFull)
	{
//		GameObject.AddComponent(HingeJoint);
		ast.rigidbody.mass = 0.0;
		hingeJoint.connectedBody = ast;
		handFull = true;
	}
	
	else if(Input.GetButtonUp("Fire1") && handFull)
	{
		hingeJoint.connectedBody = con;
		handFull = false;
	}
	
	if(Input.GetButtonUp("Fire2"))
	{
	
		print("fired");
		hingeJoint.connectedBody = con;
		ast.rigidbody.mass = 1.0;
		ast.AddRelativeForce(Vector3.forward*1000.0);
	}
	
}

function AsteroidMedium()
{

}