using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AudioManager : MonoBehaviour
{
    public AudioSource audioSource;
    private List<AudioClip> audioClips = new List<AudioClip>();
    private Dictionary<string, int> audioNames = new Dictionary<string, int>();

    private int index;

    private static AudioManager instance;

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
    void Start()
    {
        // audioSource = GetComponent<AudioSource>();
        LoadAudioClips();
    }

    void LoadAudioClips()
    {
        // Load all audio clips from the Resources folder
        Object[] clips = Resources.LoadAll("Audio", typeof(AudioClip));
        int count = 0;
        foreach (Object clip in clips)
        {
            if (clip is AudioClip)
            {
                audioClips.Add((AudioClip)clip);
                audioNames.Add(((AudioClip)clip).name,count);

                // load index
                if(clip.name == audioSource.clip.name){
                    index = count;
                }
            }
            count ++;
        }
    }

    public void SwitchAudio()
    {
        if (audioClips.Count > 0)
        {
            index = (index + 1) % audioClips.Count;
            audioSource.clip = audioClips[index];
            PlayAudio();
        }
        else
        {
            Debug.LogError("No audio clips found in the Resources folder!");
        }
    }

    public void SwitchAudio(string name){
        audioSource.clip = audioClips[audioNames[name]];
        PlayAudio();
    }

    void PlayAudio()
    {
        // Play the assigned audio clip
        audioSource.Play();
    }

}
