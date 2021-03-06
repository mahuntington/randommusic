const VF = Vex.Flow;
const numBeats = 7;
const clave = [3,2,2];
const beatValue = 8;
const widthPerBeat = 40;
let numBars = 0;
let numBarsOnCurrentLine = 0;
let numLines = 0;

// Create an SVG renderer and attach it to the DIV element named "boo".
const musicSection = document.querySelector("#music");
const renderer = new VF.Renderer(musicSection, VF.Renderer.Backends.SVG);

// Size our SVG:
renderer.resize(4*numBeats*widthPerBeat+2, musicSection.offsetHeight);

// And get a drawing context:
const context = renderer.getContext();

const randomArrayElement = (array) => {
    const randomIndex = Math.floor(Math.random()*array.length);
    return array[randomIndex];

}

const randomNote = () => {
    const pitch = randomArrayElement(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
    const octave = randomArrayElement(['4', '5']);

    return `${pitch}/${octave}`;
}

const returnNewNote = () => {
    const newNote = new VF.StaveNote({clef: "treble", keys: [randomNote()], duration: "8" })
    if(Math.random() > 0.6){
        const accidentals = ['b', '#'];
        const randomAccidentalIndex = Math.floor(Math.random()*accidentals.length);
        const accidental = accidentals[randomAccidentalIndex];
        newNote.addAccidental(0, new VF.Accidental(accidental));
    }

    return newNote;
}

const createBar = () => {
    const staveWidth = numBeats*widthPerBeat;
    const stave = new VF.Stave(numBarsOnCurrentLine*staveWidth, 40 + (numLines * 150), staveWidth);

    // Add a clef and time signature.
    if(numBars === 0){
        stave.addClef("treble").addTimeSignature("7/8");
    }

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    const allNotes = [];
    for(let i = 0; i < numBeats; i++){
        allNotes.push(returnNewNote());
    }
    const beams = [];
    let allNotesIndex = 0;
    for(let i = 0; i < clave.length; i++){
        const beat = []
        for(let j = 0; j < clave[i]; j++){
            beat.push(allNotes[allNotesIndex]);
            allNotesIndex++;
        }
        beams.push(new VF.Beam(beat))
    }
    console.log(beams);

    // Create a voice in 4/4 and add the notes from above
    const voice = new VF.Voice({num_beats: numBeats,  beatValue: 8});
    voice.addTickables(allNotes);

    // Format and justify the notes to 400 pixels.
    Vex.Flow.Formatter.FormatAndDraw(context, stave, allNotes);
    beams.forEach(function(b) {b.setContext(context).draw()})
    numBars++;
    numBarsOnCurrentLine++;
    if(numBarsOnCurrentLine === 4){
        numLines++;
        numBarsOnCurrentLine = 0;
    }
}

for(let i = 0; i < 7; i++){
    createBar();
}
