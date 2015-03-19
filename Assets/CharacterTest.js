var speed : float = 5.0;
var jumpSpeed : float = 10.0;
var directionDampTime = 0.25;
var backWardSpeed : float = -1.5;
var rotationSpeed = 5.0;
var anim : Animator;
var smooth = 15.0;
var gameCam : Camera;
var directionSpeed : float;
var rotationDegreePerSecond : float = 120.0;

var direction = 0.0;
var horizontal = 0.0;
var vertical = 0.0;



function Start () 
{
	anim = GetComponent(Animator);

}

function Update()
{

	horizontal = Input.GetAxis("Horizontal");
	vertical = Input.GetAxis("Vertical");
	
	StickToWorldSpace(this.transform, gameCam.transform, direction, speed, horizontal, vertical);
	
	anim.SetFloat("Speed",speed);
	anim.SetFloat("Direction",direction ,directionDampTime,Time.deltaTime);
	
	


	
	if(Input.GetButtonDown("Jump"))
	{
		anim.SetBool("Jump",true);
		rigidbody.AddForce(Vector3.up*jumpSpeed);
	}
	
	if(Input.GetAxis("Target")>0.1)
	{
		print("pulled trigger");
	}
	
}

function FixedUpdate()
{
	if(anim.GetFloat("Speed")>0.05 && (direction >= 0 && horizontal >= 0) || (direction <0 && horizontal < 0))
	
	var rotationAmount : Vector3 = Vector3.Lerp(Vector3.zero,new Vector3(0.0,rotationDegreePerSecond*(horizontal<0.0 ? -1.0 : 1.0),0.0), Mathf.Abs(horizontal));
	var deltaRotation : Quaternion = Quaternion.Euler(rotationAmount*Time.deltaTime);
	transform.rotation = (transform.rotation*deltaRotation);
}

function StickToWorldSpace(root : Transform, camera : Transform, directionOut : float, speedOut : float, h : float, v : float)
{

	var rootDirection : Vector3 = root.forward;
	var stickDirection = new Vector3(h, 0, v);
	
	speedOut = stickDirection.sqrMagnitude;
	
	var cameraDirection : Vector3 = camera.forward;
	cameraDirection.y = 0.0;
	var referentialShift = Quaternion.FromToRotation(Vector3.forward, cameraDirection);
	
	var moveDirection : Vector3 = referentialShift * stickDirection;
	var axisSign = Vector3.Cross(moveDirection, rootDirection);
	
	Debug.DrawRay(new Vector3(root.position.x,root.position.y+2.0,root.position.z),moveDirection,Color.green);
	Debug.DrawRay(new Vector3(root.position.x,root.position.y+2.0,root.position.z),stickDirection,Color.blue);
	Debug.DrawRay(new Vector3(root.position.x,root.position.y+2.0,root.position.z),rootDirection,Color.magenta);
	Debug.DrawRay(new Vector3(root.position.x,root.position.y+2.0,root.position.z),axisSign,Color.red);

	
	var angleRootToMove : float = Vector3.Angle(rootDirection, moveDirection) * (axisSign.y >= 0 ? -1f : 1f);
	
	angleRootToMove /= 180.0;
	
	directionOut = angleRootToMove * directionSpeed;
	direction = directionOut;
	speed = speedOut;
}





function OnCollisionEnter(other : Collision)
{
	if(other.gameObject.tag == "ground")
	{
		anim.SetBool("Jump",false);
	}
}

