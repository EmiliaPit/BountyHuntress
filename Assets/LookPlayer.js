var target : Transform;

function Start () {
	GameObject.Find("Player");
}

function Update () {
	transform.LookAt(target);
}