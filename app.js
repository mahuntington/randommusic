const VF = Vex.Flow;
const numBeats = 7;
const beatValue = 8;
const widthPerBeat = 40;
let numBars = 0;

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
    const stave = new VF.Stave(numBars*staveWidth, 40, staveWidth);

    // Add a clef and time signature.
    if(numBars === 0){
        stave.addClef("treble").addTimeSignature("7/8");
    }

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    const notes = [
        returnNewNote(),
        returnNewNote(),
    ];
    const notes2 = [
        returnNewNote(),
        returnNewNote(),
    ];
    const notes3 = [
        returnNewNote(),
        returnNewNote(),
        returnNewNote(),
    ];
    const allNotes = notes.concat(notes2).concat(notes3);

    const beams = [
      new VF.Beam(notes),
      new VF.Beam(notes2),
      new VF.Beam(notes3)
    ]

    // Create a voice in 4/4 and add the notes from above
    const voice = new VF.Voice({num_beats: numBeats,  beatValue: 8});
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    Vex.Flow.Formatter.FormatAndDraw(context, stave, allNotes);
    beams.forEach(function(b) {b.setContext(context).draw()})
    numBars++;
}

for(let i = 0; i < 4; i++){
    createBar();
}
