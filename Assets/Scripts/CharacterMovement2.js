var turnSmoothing : float = 15.0;
var speedDampTime : float = 0.1f;    
var speed = 5.0;


var anim : Animator;

function Start () {
	anim = GetComponent(Animator);
}

function FixedUpdate () {
	var h = Input.GetAxis("Horizontal");
	var v = Input.GetAxis("Vertical");
	
	MovementManagement(h,v);
}

function MovementManagement(h : float,v : float)
{
	if(h !=0 || v !=0)
	{
		var vel = Mathf.Abs(h+v);
		anim.SetFloat("Speed",1.0);
		transform.Translate(Vector3.forward*speed*Time.deltaTime);
		Rotating(h,v);
	}
	
	else{
	anim.SetFloat("Speed",0.0);
	}
	
}

function Rotating (h : float, v : float)
{
    var targetDirection : Vector3 = new Vector3(h, 0f, v);
    var targetRotation : Quaternion = Quaternion.LookRotation(targetDirection, Vector3.up);
    var newRotation : Quaternion = Quaternion.Lerp(rigidbody.rotation, targetRotation, turnSmoothing * Time.deltaTime); 
    rigidbody.MoveRotation(newRotation);
}