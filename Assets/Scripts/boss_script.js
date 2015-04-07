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
var animationcounter = 0;
//var clips : AudioClip[];
var soundclipcounter = 0;
var bossAudio1 : GameObject;
var bossAudio2 : GameObject;
var bossAudio3 : GameObject;
var bossAudio4 : GameObject;

function Start () {
	randomRotation();
	target = GameObject.FindWithTag("Player").transform;
	anim = GetComponent(Animator);
	storedSpeed = speed;
	SoundclipCounter();
}

function Update(){
	//print(soundclipcounter);
	var distance = Vector3.Distance(target.position,transform.position);
	if (distance < 15){
	this.transform.Translate(Vector3.forward * speed *Time.deltaTime);
	playerSpotted = true;
	anim.SetBool("playerSpotted",true);
	
	
	
	
		if(distance < 6) {
			//bossAudio.SetActive(true);
			AudioCounter();
			battleOn = true;
			anim.SetBool("battleOn",true);
			BattleAnimationCounter();
			anim.SetBool("playerSpotted",false);
			speed = 0;
			transform.LookAt(target);
			
			if(canHit){
			Battle();
			
			}
		
		}
	}
	
	else {
	AudioCounterDisable();
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
				
function AudioCounter (){
	if(soundclipcounter == 1){
	bossAudio1.SetActive(true);
	}
	if(soundclipcounter == 2){
	bossAudio2.SetActive(true);
	}
	
	if(soundclipcounter == 3){
	bossAudio3.SetActive(true);
	}
	if(soundclipcounter == 4){
	bossAudio4.SetActive(true);
	}
}

function AudioCounterDisable (){
	bossAudio1.SetActive(false);
	bossAudio2.SetActive(false);
	bossAudio3.SetActive(false);
	bossAudio4.SetActive(false);
}


function randomRotation () {
	while(isWalking) {
		yield WaitForSeconds(Random.Range(5,8));
		transform.eulerAngles = Vector3(0, Random.Range(0,360),0);
	
	}

}

/*function OnCollisionEnter(collision : Collision){
	if(collision.gameObject.tag == "wall"){
		randomRotation();
		}
	
	

}*/

function BattleAnimationCounter() {
	animationcounter = (Random.Range(0,5));

}

function SoundclipCounter(){
soundclipcounter = (Random.Range(0,5));
}




function OnTriggerEnter(other : Collider){
	if(other.gameObject.tag == "playerweapon"){
		if(canDamage){
		SoundclipCounter();
		AudioCounter();
		health -= 20;
		print("enemy takes damage");
		canDamage = false;
		yield WaitForSeconds(1.0);
		canDamage = true;
		}
	}

}


function Battle () {
	//audioCounter();
	canHit = false;
	var randomTime = Random.Range(0.5,3.0);
	yield WaitForSeconds(randomTime);
	anim.SetBool("canHit",true);
	swordTrigger.collider.enabled = true;
	if(animationcounter == 1){
	anim.SetBool("battle1",true);
	anim.SetBool("battle2",false);
	anim.SetBool("battle3",false);
	anim.SetBool("blocking",false);
	}
	if(animationcounter == 2){
	anim.SetBool("battle2",true);
	anim.SetBool("battle1",false);
	anim.SetBool("battle3",false);
	anim.SetBool("blocking",false);
	}
	if(animationcounter == 3){
	anim.SetBool("battle3",true);
	anim.SetBool("battle2",false);
	anim.SetBool("battle1",false);
	anim.SetBool("blocking",false);
	}
	
	if(animationcounter == 4){
	anim.SetBool("battle3",false);
	anim.SetBool("battle2",false);
	anim.SetBool("battle1",false);
	//anim.SetBool("canHit",false);
	anim.SetBool("blocking",true);
	canDamage = false;
	}
	
	
	

}

function StopHit() {
	anim.SetBool("canHit",false);
	canHit = true;
	SoundclipCounter();
	AudioCounter();
	AudioCounterDisable();
	
	BattleAnimationCounter();
	yield WaitForSeconds(2.0);
	
		if(animationcounter == 1){
	anim.SetBool("battle1",true);
	anim.SetBool("battle2",false);
	anim.SetBool("battle3",false);
	anim.SetBool("blocking",false);
	canDamage = true;
	}
	if(animationcounter == 2){
	anim.SetBool("battle2",true);
	anim.SetBool("battle1",false);
	anim.SetBool("battle3",false);
	anim.SetBool("blocking",false);
	canDamage = true;
	}
	if(animationcounter == 3){
	anim.SetBool("battle3",true);
	anim.SetBool("battle2",false);
	anim.SetBool("battle1",false);
	anim.SetBool("blocking",false);
	canDamage = true;
	}
	if(animationcounter == 4){
	anim.SetBool("battle3",false);
	anim.SetBool("battle2",false);
	anim.SetBool("battle1",false);
	anim.SetBool("blocking",true);
	canDamage = false;
	}
	
	}