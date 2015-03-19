var target : Transform;
var speed : float = 5.0;
var storedSpeed : float;
var anim : Animator;
var canHit = true;

function Start () {
	target = GameObject.FindWithTag("Player").transform;
	storedSpeed = speed;
	anim = GetComponent(Animator);
}

function Update () {

	var dist = Vector3.Distance(transform.position, target.transform.position);
	
	if(dist<3.0)
	{
		speed = 0.0;
		if(canHit)
		{
			Hit();
		}
	}
	else
	{
		speed = storedSpeed;	
	}

	transform.Translate(Vector3.forward*speed*Time.deltaTime);
	transform.LookAt(target);
}

function Hit()
{
	canHit = false;
	var randomTime = Random.Range(2.0,10.0);

	yield WaitForSeconds(randomTime);
	anim.SetBool("canHit",true);
	yield WaitForSeconds(3.0);
	anim.SetBool("canHit",false);;
}

function Stop()
{
	canHit = true;
}