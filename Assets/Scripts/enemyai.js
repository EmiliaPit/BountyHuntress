var speed : float;
var storedSpeed : float;
var isWalking : boolean = true;
var target : Transform;
var playerSpotted : boolean = false;
var battleOn : boolean = false;
var rotationSpeed = 3;
var myTransform : Transform;
var anim : Animator;
var canHit : boolean = true;
var swordTrigger : GameObject;
var health : float = 100;
var canDamage = true;


function Start () {
	randomRotation();
	//target = GameObject.FindWithTag("Player").transform;
	anim = GetComponent(Animator);
	storedSpeed = speed;
}

function Update(){
	this.transform.Translate(Vector3.forward * speed *Time.deltaTime);
	var distance = Vector3.Distance(target.position,transform.position);
	//print(distance);
	if (distance < 15){
	playerSpotted = true;
	anim.SetBool("playerSpotted",true);
	
		if(distance < 4) {
			battleOn = true;
			anim.SetBool("battleOn",true);
			anim.SetBool("playerSpotted",false);
			speed = 0;
			transform.LookAt(target);
			if(canHit){
			Battle();
			}
		
		}
	}
	
	else {
	playerSpotted = false;
	battleOn = false;
	speed = storedSpeed;
	anim.SetBool("playerSpotted",false);
	
	anim.SetBool("battleOn",false);
	}
	
	if (playerSpotted ){
	myTransform.rotation = Quaternion.Slerp(myTransform.rotation,Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed*Time.deltaTime);
	
	}
	
	if (health <= 0){
		print("enemy dead");
		Destroy(this.gameObject);
	
	}
	
	}
				


function randomRotation () {
	while(isWalking) {
		yield WaitForSeconds(Random.Range(5,8));
		transform.eulerAngles = Vector3(0, Random.Range(0,360),0);
	
	}

}

function OnCollisionEnter(collision : Collision){
	if(collision.gameObject.tag == "wall"){
		randomRotation();
		}
	
	

}

function OnTriggerEnter(other : Collider){
	if(other.gameObject.tag == "playerweapon"){
		if(canDamage){
		health -= 10;
		print("enemy takes damage");
		canDamage = false;
		yield WaitForSeconds(1.0);
		canDamage = true;
		}
	}

}


function Battle () {
	canHit = false;
	var randomTime = Random.Range(2.0,10.0);
	yield WaitForSeconds(randomTime);
	anim.SetBool("canHit",true);
	swordTrigger.collider.enabled = true;
	
	
	

}

function StopHit() {
	anim.SetBool("canHit",false);
	canHit = true;
	swordTrigger.collider.enabled = false;
}