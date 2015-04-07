
var anim : Animator;
var smooth = 15.0;
var swordTrigger : GameObject;
var canDamage : boolean = true;
static var shieldEmpty : boolean = false;
var jumpSpeed = 5.0;
var clickCounter = 0.0;
var blocking = false;
var dodging = false;
static var keycardcount = 0;
var maincharaudio1 : GameObject;
var maincharaudio2 : GameObject;
var maincharaudio3 : GameObject;
var maincharaudio4 : GameObject;
var axeaudio : GameObject;


function Start () {




}

function Update()
{	print(keycardcount);
	if(Input.GetButtonDown("Fire1"))
	{	maincharaudio1.SetActive(true);
		
		axeaudio.SetActive(true);
		//swordTrigger.collider.enabled = true;
		anim.SetBool("Hit",true);
		
		clickCounter += 1.0;
		if (clickCounter > 1.0){
		maincharaudio2.SetActive(true);
		anim.SetBool("combo2",true);
	}
	if (clickCounter > 2.0){
		maincharaudio3.SetActive(true);
		anim.SetBool("combo3",true);
		
	}
		}
		
	if (clickCounter == 0.0){
	anim.SetBool("combo2",false);
	anim.SetBool("combo3",false);
	maincharaudio1.SetActive(false);
	maincharaudio2.SetActive(false);
	maincharaudio3.SetActive(false);
	
	}
	
	if(Input.GetButtonDown("Fire2")){

	anim.SetBool("Dodge",true);
	canDamage = false;
	}
	
	if(Input.GetButtonDown("Fire1_2")){
	anim.SetBool("Blocking",true);
	canDamage = false;
	}
	
	
	
	}


function OnTriggerStay(other : Collider){
	if(other.gameObject.tag == "weapon"){
		
		if(canDamage){
		GUImanager.currentShield -=20;
		maincharaudio4.SetActive(true);
		print("player takes damage");
		canDamage = false;
		yield WaitForSeconds(1.0);
		maincharaudio4.SetActive(false);
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
	/*if(other.gameObject.tag == "shieldrestore" && GUImanager.currentShield < 100){
		GUImanager.currentShield +=10;
		
		
	if(other.gameObject.tag == "hprestore" && GUImanager.currentShield < 100){
		GUImanager.currentHealth +=10;
		
		}*/
		
		if(other.gameObject.tag == "weapon" && shieldEmpty){
		maincharaudio4.SetActive(true);
		if(canDamage){
		GUImanager.currentHealth-= 20;
		canDamage = false;
		yield WaitForSeconds(1.0);
		canDamage = true;
		}
		
	

	

	
}
if(other.gameObject.tag == "gate" && keycardcount == 2){
		
		Application.LoadLevel("level2");
		}
		}
		




function Stop()
{	
	
	anim.SetBool("Hit", false);
	clickCounter = 0.0;
	
	
	}

function Dodged()
{
	anim.SetBool("Dodge",false);
	anim.SetBool("Hit",false);
	anim.SetBool("combo2",false);
	anim.SetBool("combo3",false);
	clickCounter = 0.0;
	canDamage = true;

}

function Blocked()
{
	anim.SetBool("Blocking",false);
	anim.SetBool("Hit",false);
	anim.SetBool("combo2",false);
	anim.SetBool("combo3",false);
	clickCounter = 0.0;
	canDamage = true;

}


function Hit(){
	
	
	swordTrigger.collider.enabled = false;
	
	}
function OnCollisionEnter(other : Collision)
{
	if(other.gameObject.tag == "ground")
	{
		anim.SetBool("Jump",false);
	}
}

