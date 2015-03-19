
var anim : Animator;
var smooth = 15.0;
var swordTrigger : GameObject;
var canDamage : boolean = true;
static var shieldEmpty : boolean = false;
var jumpSpeed = 5.0;


function Start () {




}

function Update()
{
	if(Input.GetButtonDown("Fire1"))
	{
		
		//swordTrigger.collider.enabled = true;
		anim.SetBool("Hit",true);
		
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
	if(Input.GetButtonDown("Jump"))
	{
		anim.SetBool("Jump",true);
		rigidbody.AddForce(Vector3.up*jumpSpeed);
	}

}



function OnTriggerEnter(other : Collider){
	if(other.gameObject.tag == "shieldrestore" && GUImanager.currentShield < 100){
		GUImanager.currentShield +=10;
		
		}
	if(other.gameObject.tag == "hprestore" && GUImanager.currentShield < 100){
		GUImanager.currentHealth +=10;
		
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
		




function Stop()
{
	anim.SetBool("Hit", false);
}

function Hit(){
	
	
	//swordTrigger.collider.enabled = false;
	
	}
function OnCollisionEnter(other : Collision)
{
	if(other.gameObject.tag == "ground")
	{
		anim.SetBool("Jump",false);
	}
}

