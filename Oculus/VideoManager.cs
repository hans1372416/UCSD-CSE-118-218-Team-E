using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;


public class VideoManager : MonoBehaviour
{
    private static VideoManager instance;

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
    public AudioManager audioManager;

    public void SwitchScene(){
        // keep the name of current playing audio
        string name = audioManager.audioSource.clip.name;

        int currentSceneIndex = SceneManager.GetActiveScene().buildIndex;
        SceneManager.LoadScene((currentSceneIndex + 1) % SceneManager.sceneCountInBuildSettings);
        // To Do: Recover audio
        Debug.Log("Name: " + name);
        audioManager.SwitchAudio(name);
    }

    public void SwitchScene(String name){
        SceneManager.LoadScene(name);
    }
}
