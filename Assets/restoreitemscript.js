﻿

function OnTriggerEnter (other : Collider) {
	if(other.gameObject.tag == "Player"){
		Destroy(gameObject);
	}
}
function Update () {

}