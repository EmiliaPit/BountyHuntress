var music : AudioClip;

function Start () {
	audio.PlayOneShot(music);
	DontDestroyOnLoad (gameObject);
}

function Update () {
	if(Input.GetButtonUp("Fire1"))
	{
		Application.LoadLevel("Space");
	}
}