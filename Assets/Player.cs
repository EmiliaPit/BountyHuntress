using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {

	public float speed = 5f;
	public float jumpSpeed = 600f;
	public float moveDirection;
	public bool facingRight = true;
	public GameObject gem;
	public GameObject box;
	public bool canCreateBox = true;
	public bool moving = false;

	public float point;

	public bool grounded = false;
	public Transform groundCheck;
	public Transform groundCheck2;
	public Transform groundCheck3;
	public float groundCheckRay = 0.2f;
	public LayerMask whatIsGround;
	public Camera myCam;

	public Vector3 checkPos;


	// Use this for initialization
	void Start () {
		checkPos = transform.position;
	}

	void FixedUpdate(){

		grounded = Physics.CheckSphere(groundCheck.position, groundCheckRay, whatIsGround);
		grounded = Physics.CheckSphere(groundCheck2.position, groundCheckRay, whatIsGround);
		grounded = Physics.CheckSphere(groundCheck3.position, groundCheckRay, whatIsGround);
		rigidbody.velocity = new Vector2(moveDirection*speed,rigidbody.velocity.y);

		if (moveDirection > 0.0 && !facingRight) 
		{
			Flip();
		}

		else if (moveDirection < -0.0 && facingRight) 
		{
			Flip();
		}
		if (rigidbody.velocity.x == 0f && canCreateBox) 
		{
			Instantiate (box, transform.position, transform.rotation);
			canCreateBox = false;

			moving = false;
			point = transform.position.x;
		}



	}

	// Update is called once per frame
	void Update () {
		moveDirection = Input.GetAxis ("Horizontal");



		if (grounded && Input.GetButtonDown ("Jump")) 
		{
			rigidbody.AddForce(new Vector2(0.0f,jumpSpeed));
		}



		//Debug.Log (rigidbody.velocity.y);

		if(rigidbody.velocity.y >= 0.1)
		{
			gameObject.layer = 0;
		}
		else
		{
			gameObject.layer = 9;		
		}

	}

	void Flip()
	{
		facingRight = !facingRight;

		transform.Rotate(Vector3.up,180.0f,Space.World);	
	}

	void OnCollisionEnter(Collision other)
	{
		if(other.gameObject.tag == "Enemy")
		{
			Destroy (other.gameObject);
			Instantiate (gem, transform.position, transform.rotation);
		}


	}

	void OnCollisionStay(Collision other)
	{
		if(other.gameObject.tag == "pass")
		{
			//gameObject.layer = 0;
				
		}
	}


	void OnTriggerEnter(Collider other)
	{


		if(other.gameObject.tag == "coinTrigger")
		{
			Destroy(other.gameObject);
		}

		if(other.gameObject.name == "DeadZone")
		{
			transform.position = checkPos;
		}
	}

	void OnTriggerStay(Collider other)
	{
		if(other.gameObject.name == "CameraOut")
		{
			myCam.SendMessage("ZoomOut");
		}
	}

	void OnTriggerExit(Collider other)
	{
		if(other.gameObject.tag == "box")
		{
			Destroy(other.gameObject);
			moving = true;
			canCreateBox = true;
		}

		if(other.gameObject.name == "CameraOut")
		{
			myCam.SendMessage("ZoomIn");
		}
	}

}

