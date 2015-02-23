var speed : float = 5.0;
var backWardSpeed : float = -1.5;
var rotationSpeed = 5.0;
var anim : Animator;
var smooth = 15.0;
var swordTrigger : GameObject;
var canDamage : boolean = true;
static var shieldEmpty : boolean = false;


function Start () {
	anim = GetComponent(Animator);
	
}

function FixedUpdate () {
	var hor = Input.GetAxis("Horizontal");
	var ver = Input.GetAxis("Vertical");
	
	anim.SetFloat("Speed",ver);
	anim.SetFloat("Direction",hor);
	
	Movement(hor,ver);
	

}

function Update()
{
	if(Input.GetButtonDown("Fire1"))
	{
		anim.SetBool("Hit",true);
		swordTrigger.collider.enabled = true;
		Hit();
	}
}

function OnTriggerStay(other : Collider){
	if(other.gameObject.tag == "weapon"){
		
		if(canDamage){
		GUImanager.currentShield -=20;
		print("player takes damage");
		canDamage = false;
		yield WaitForSeconds(1.0);
		canDamage = true;
		}
		
	
	}
	if(other.gameObject.tag == "weapon" && shieldEmpty){
		
		if(canDamage){
		GUImanager.currentHealth-= 20;
		print("player takes damage");
		canDamage = false;
		yield WaitForSeconds(1.0);
		canDamage = true;
		}

}

}

function OnTriggerEnter(other : Collider){
	if(other.gameObject.tag == "shieldrestore" && GUImanager.currentShield < 100){
		GUImanager.currentShield +=10;
		
		}
	if(other.gameObject.tag == "hprestore" && GUImanager.currentShield < 100){
		GUImanager.currentHealth +=10;
		
		}
		}
		
function Movement(hor : float, ver : float)
{
	
	if(ver > 0.1)
	{	
		rigidbody.velocity = transform.TransformDirection(Vector3.forward)*speed;
	}
	if(ver < -0.1)
	{	
		rigidbody.velocity = transform.TransformDirection(Vector3.forward)*backWardSpeed;
	}
	
	if(hor != 0.0)
	{
		transform.Rotate(0.0,hor*rotationSpeed,0.0);
	}
}

function Stop()
{
	anim.SetBool("Hit", false);
}

function Hit(){
	yield WaitForSeconds(0.5);
	swordTrigger.collider.enabled = false;

}