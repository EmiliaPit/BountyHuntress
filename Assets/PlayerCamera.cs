using UnityEngine;
using System.Collections;

public class PlayerCamera : MonoBehaviour {

	public Transform target;
	public float speed;
	public float storedSpeed;
	public float cameraOffset = 2.0f;
	private Vector3 offset;
	public Vector3 targetPos;
	public Vector3 cameraPos;
	public Vector3 zoomOutPos;
	public Player other;
	public AnimationCurve mult;
	public bool zoomOut = false;

	// Use this for initialization

	void Start () {
		offset = transform.position;
		storedSpeed = speed;
	}

	void Update()
	{	
		//targetPos.x = target.transform.position.x;

		if(other.facingRight == true && other.moving)
		{
			targetPos.x = target.transform.position.x+cameraOffset;
			speed += Time.deltaTime;
		}
		
		else if(other.facingRight == false && other.moving)
		{
			targetPos.x = target.transform.position.x-cameraOffset;
			speed += Time.deltaTime;
		}
		else
		{
			speed = storedSpeed;
		}

		cameraPos.x = transform.position.x;
		zoomOutPos.x = cameraPos.x;
		zoomOutPos.y = cameraPos.y;
	}

	void FixedUpdate () {
			if (!zoomOut) 
			{
					transform.position = Vector3.Lerp (cameraPos, targetPos, speed * Time.deltaTime);
			} 
			else 
			{
				transform.position = Vector3.Lerp (cameraPos, zoomOutPos,speed*Time.deltaTime);
			}
		}

	void ZoomOut(){
		zoomOut = true;
	}
	void ZoomIn(){
		zoomOut = false;
	}

}
