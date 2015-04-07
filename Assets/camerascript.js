var target : Transform;
var smooth = 2.0;

function Start () {

}

function Update () {
	transform.position.x = Mathf.Lerp(transform.position.x,target.transform.position.x,smooth*Time.deltaTime);
	transform.position.z = Mathf.Lerp(transform.position.z,target.transform.position.z-5.5,smooth*Time.deltaTime);
	transform.position.y = Mathf.Lerp(transform.position.y,target.transform.position.y+3.0,smooth*Time.deltaTime);
	

}