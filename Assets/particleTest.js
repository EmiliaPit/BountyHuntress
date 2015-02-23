
    
     function OnParticleCollision (other : GameObject) {
         if (other.gameObject.tag == "Player") {
             Debug.Log("player");
         }
     }