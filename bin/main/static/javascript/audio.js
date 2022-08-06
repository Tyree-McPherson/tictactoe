document.addEventListener("DOMContentLoaded", () => {
  
  document.getElementById("speaker-mute").addEventListener("click", HandleToggleAudio);
});

const HandleToggleAudio = () => {

  const Speaker = document.getElementById("speaker");
  const SpeakerMute = document.getElementById("speaker-mute");
  const Audio = document.getElementById("audio");

  // Determine the state of the audio.
  const AudioState = Speaker.style.opacity;
  
  if (AudioState === "1") {

    // Mute the audio.
    Speaker.style.opacity = "0";
    SpeakerMute.style.opacity = "1";

    Audio.pause();

  } else {

    // Audio is muted, unmute it.
    Speaker.style.opacity = "1";
    SpeakerMute.style.opacity = "0";

    Audio.volume = 0.5;
    Audio.play();
  };
};