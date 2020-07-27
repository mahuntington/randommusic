const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
const div = document.querySelector("body")
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Size our SVG:
renderer.resize(1200, 1200);

// And get a drawing context:
const context = renderer.getContext();


const drawNotes = (measureNum) => {
    const staveWidth = 550;
    // Create a stave at position 10, 40 of width 400 on the canvas.
    const stave = new VF.Stave(10+(measureNum*staveWidth), 40, staveWidth);

    // Add a clef and time signature.
    if(measureNum === 0){
        stave.addClef("treble").addTimeSignature("7/8");
    }

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    const notes = [
        new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "8" }),
        new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "8" }),
    ];
    const notes2 = [
        new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "8" }),
        new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "8" }),
    ];
    const notes3 = [
        new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "8" }),
        new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "8" }),
        new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "8" }),
    ];
    const allNotes = notes.concat(notes2).concat(notes3);

    const beams = [
      new VF.Beam(notes),
      new VF.Beam(notes2),
      new VF.Beam(notes3)
    ]

    // Create a voice in 4/4 and add the notes from above
    const voice = new VF.Voice({num_beats: 7,  beat_value: 8});
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    Vex.Flow.Formatter.FormatAndDraw(context, stave, allNotes);
    beams.forEach(function(b) {b.setContext(context).draw()})
}

drawNotes(0);
drawNotes(1);
