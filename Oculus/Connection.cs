using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using NativeWebSocket;

public class Connection : MonoBehaviour
{

  private static Connection instance;

  private void Awake()
  {
      // ensure that is the only instance
      if (instance == null)
      {
          instance = this;
          DontDestroyOnLoad(gameObject);
      }
      else
      {
          Destroy(gameObject);
      }
  }



  WebSocket websocket;
  public AudioManager audioManager;
  public VideoManager videoManager;

  // Start is called before the first frame update
  async void Start()
  {
    websocket = new WebSocket("ws://localhost:3000");

    websocket.OnOpen += () =>
    {
      Debug.Log("Connection open!");
    };

    websocket.OnError += (e) =>
    {
      Debug.Log("Error! " + e);
    };

    websocket.OnClose += (e) =>
    {
      Debug.Log("Connection closed!");
    };

    websocket.OnMessage += (bytes) =>
    {
      // Debug.Log("OnMessage!");
      // Debug.Log(bytes);

      // getting the message as a string
      var message = System.Text.Encoding.UTF8.GetString(bytes);
      Debug.Log("OnMessage! " + message);
      // if(message == )
      // SceneManager.LoadScene("Scene2");
      // Debug.Log("Number of Scenes: " + SceneManager.sceneCount);
      
      messageHandler(message);
      
      // Debug.Log("Name of Scene " + SceneManager.GetActiveScene().name);

      // audioManager.SwitchAudio();
    };

    // Keep sending messages at every 0.3s
    InvokeRepeating("SendWebSocketMessage", 0.0f, 0.3f);

    // waiting for messages
    await websocket.Connect();
  }

  void Update()
  {
    #if !UNITY_WEBGL || UNITY_EDITOR
      websocket.DispatchMessageQueue();
    #endif
  }

  async void SendWebSocketMessage()
  {
    if (websocket.State == WebSocketState.Open)
    {
      // Sending bytes
      // await websocket.Send(new byte[] { 10, 20, 30 });

      // Sending plain text
      // await websocket.SendText("plain text message");
    }
  }

  private async void OnApplicationQuit()
  {
    await websocket.Close();
  }

  void messageHandler(string message){
    switch(message){
      case "next scene":
        videoManager.SwitchScene();
        break;
      case "next audio":
        audioManager.SwitchAudio();
        break;
      case "forest":
        videoManager.SwitchScene("Scene1");
        break;
      case "countryside":
        videoManager.SwitchScene("Scene2");
        break;
      case "wave":
        audioManager.SwitchAudio("wave");
        break;
      case "nature":
        audioManager.SwitchAudio("nature");
        break;
      case "rain":
        audioManager.SwitchAudio("rain");
        break;
      default:
        break;
      

    }
  }

}