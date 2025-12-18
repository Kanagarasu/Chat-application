const keyStrikeSounds =[
    new Audio("/sounds/keystroke1.mp3"),
    new Audio("/sounds/keystroke2.mp3"),
    new Audio("/sounds/keystroke3.mp3"),
    new Audio("/sounds/keystroke4.mp3")
];

function useKeyboardSound() {

    const playRandomKeyStrokeSound = () =>{
        const randomSound = keyStrikeSounds[Math.floor(Math.random()*keyStrikeSounds.length)];
        randomSound.currentTime =0;
        // above for a better UX, def add this
        randomSound.play().catch(err => console.log("Audio play failed:",err));

    }

    return {playRandomKeyStrokeSound}
}

export default useKeyboardSound;