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
var deathEffect : Transform;
var allmotions : AnimationClip[];
var healthdrop : Transform;
var shielddrop : Transform;
var animationcounter = 0;
var deathSound : GameObject;
var minionSound : GameObject;




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
	if (distance < 10 && distance > 5.1){
	playerSpotted = true;
	anim.SetBool("playerSpotted",true);
	
	
		
		}
		
			if(distance < 5) {
			battleOn = true;
			anim.SetBool("battleOn",true);
			anim.SetBool("playerSpotted",false);
			speed = 0;
			transform.LookAt(target);
			if(canHit){
			Battle();
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
	deathSound.SetActive(true);
		print("enemy dead");
		
		Destroy(this.gameObject);
		Instantiate(deathEffect,transform.position,transform.rotation);
		Instantiate(shielddrop,transform.position,transform.rotation);
		Instantiate(healthdrop,transform.position,transform.rotation);
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
		minionSound.SetActive(true);
		health -= 10;
		canDamage = false;
		yield WaitForSeconds(0.5);
		canDamage = true;
		
		}
	}

}

function OnTriggerExit(other : Collider){
	if(other.gameObject.tag == "playerweapon"){
	minionSound.SetActive(false);
}
}

function Battle () {
	canHit = false;
	var randomTime = Random.Range(0.5,4.0);
	yield WaitForSeconds(randomTime);
	
	anim.SetBool("canHit",true);
	swordTrigger.collider.enabled = true;
	if(animationcounter == 1){
	anim.SetBool("battle1",true);
	anim.SetBool("battle2",false);
	anim.SetBool("battle3",false);
	}
	if(animationcounter == 2){
	anim.SetBool("battle2",true);
	anim.SetBool("battle1",false);
	anim.SetBool("battle3",false);
	}
	if(animationcounter == 3){
	anim.SetBool("battle3",true);
	anim.SetBool("battle2",false);
	anim.SetBool("battle1",false);
	}
	

	
	
	

}

function StopHit() {
	anim.SetBool("canHit",false);
	canHit = true;
	swordTrigger.collider.enabled = false;
	animationcounter = (Random.Range(0,4));
		if(animationcounter == 1){
	anim.SetBool("battle1",true);
	anim.SetBool("battle2",false);
	anim.SetBool("battle3",false);
	}
	if(animationcounter == 2){
	anim.SetBool("battle2",true);
	anim.SetBool("battle1",false);
	anim.SetBool("battle3",false);
	}
	if(animationcounter == 3){
	anim.SetBool("battle3",true);
	anim.SetBool("battle2",false);
	anim.SetBool("battle1",false);
	}
}