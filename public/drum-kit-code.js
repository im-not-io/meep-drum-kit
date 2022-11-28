const context = new AudioContext();

const createDrumKit = () => {
  const drums = [
    {
      buttonTitle: "Kick [A]",
      audioFile: "kick.wav",
      key: "a",
      volume: 1
    },
    {
      buttonTitle: "Snare [S]",
      audioFile: "snare.wav",
      key: "s",
      volume: 0.7
    },
    {
      buttonTitle: "Hi-hat [D]",
      audioFile: "hi-hat.wav",
      key: "d",
      volume: 0.7
    },
    {
      buttonTitle: "Snap [Z]",
      audioFile: "snap.wav",
      key: "z",
      volume: 1
    },
    {
      buttonTitle: "Clap [X]",
      audioFile: "clap.wav",
      key: "x",
      volume: 1
    },
    {
      buttonTitle: "Meep [C]",
      audioFile: "meep.wav",
      key: "c",
      volume: 1
    },
    {
      buttonTitle: "R&B Guitar [G]",
      audioFile: "rnb-loop.wav",
      key: "g",
      volume: 1
    },
    {
      buttonTitle: "Synth [H]",
      audioFile: "synth-loop.wav",
      key: "h",
      volume: 0.75
    },
    {
      buttonTitle: "Hip-hop [J]",
      audioFile: "hip-hop.wav",
      key: "j",
      volume: 1
    },
  ];

  const playAudioFile = (audioBuffer, button) => {
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
    button.classList.add("playing");
    setTimeout(() => {
      button.classList.remove("playing");
    }, 300);
  };

  const createButtons = async () => {

    for (let drum of drums) {
      const button = document.createElement("button");
      const textNode = document.createTextNode(drum.buttonTitle);
      button.appendChild(textNode);
      drum.audioElement = new Audio(drum.audioFile);
      drum.audioElement.volume = drum.volume;

  drum.audioBuffer = await fetch(drum.audioFile)
    .then(res => res.arrayBuffer())
    .then(ArrayBuffer => context.decodeAudioData(ArrayBuffer));

    console.log("audio buffer", drum.audioBuffer);
      document.addEventListener("keydown", (event) => {
        if (drum.key === event.key.toLowerCase()) {
          playAudioFile(drum.audioBuffer, button);
        }
      });
      button.addEventListener("click", (event) => {
        playAudioFile(drum.audioBuffer, button);
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
