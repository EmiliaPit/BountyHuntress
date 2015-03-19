var target : Transform;
var speed : float = 5.0;

function Start () {

}

function Update () {
	transform.position = target.transform.position;
	
	transform.Rotate(Vector3.up*Input.GetAxis("Mouse X")*speed * Time.deltaTime, Space.World);
}