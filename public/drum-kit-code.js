
const createDrumKit = () => {
  const drums = [
    {
      buttonTitle: "Kick [A]",
      audioFile: "kick.wav",
      key: "a",
    },
    {
      buttonTitle: "Snare [S]",
      audioFile: "snare.wav",
      key: "s",
    },
    {
      buttonTitle: "Hi-hat [D]",
      audioFile: "hi-hat.wav",
      key: "d",
    },
    {
      buttonTitle: "Snap [Z]",
      audioFile: "snap.wav",
      key: "z",
    },
    {
      buttonTitle: "Clap [X]",
      audioFile: "clap.wav",
      key: "x",
    },
    {
      buttonTitle: "Meep [C]",
      audioFile: "meep.wav",
      key: "c",
    },
    {
      buttonTitle: "R&B Guitar [G]",
      audioFile: "rnb-loop.wav",
      key: "g",
    },
    {
      buttonTitle: "Synth [H]",
      audioFile: "synth-loop.wav",
      key: "h",
    },
    {
      buttonTitle: "Hip-hop [J]",
      audioFile: "hip-hop.wav",
      key: "j",
    },
  ];

  const playAudioFile = (audioElement, button) => {
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.play();
    button.classList.add("playing");
    setTimeout(() => {
      button.classList.remove("playing");
    }, 300);
  };

  const createButtons = async () => {
    for (let drum of drums) {
      console.log("processing", drum.audioFile);
      const button = document.createElement("button");
      const textNode = document.createTextNode(drum.buttonTitle);
      button.appendChild(textNode);
      drum.audioElement = new Audio(drum.audioFile);
      document.addEventListener("keydown", (event) => {
        if (drum.key === event.key.toLowerCase()) {
          playAudioFile(drum.audioElement, button);
        }
      });
      button.addEventListener("click", (event) => {
        playAudioFile(drum.audioElement, button);
      });
      document.querySelector(".drums").appendChild(button);
    }
  };
  createButtons();
};

const setup = () => {
  if (document.readyState !== "loading") {
    createDrumKit();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      createDrumKit();
    });
  }
};
setup();
