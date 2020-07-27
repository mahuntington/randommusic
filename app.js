const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.querySelector("body")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Size our SVG:
renderer.resize(1000, 1000);

// And get a drawing context:
var context = renderer.getContext();


const drawNotes = (measureNum) => {
    // Create a stave at position 10, 40 of width 400 on the canvas.
    var stave = new VF.Stave(10+(measureNum*400), 40, 400);

    // Add a clef and time signature.
    if(measureNum === 0){
        stave.addClef("treble").addTimeSignature("4/4");
    }

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    var notes = [
      new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "4" }),
      new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "4" }),
      new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "4" }),
      new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "4" }),
    ];

    // Create a voice in 4/4 and add the notes from above
    var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Render voice
    voice.draw(context, stave);
}

drawNotes(0);
drawNotes(1);
