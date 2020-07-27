const vf = new Vex.Flow.Factory({renderer: {elementId: 'main'}});
const score = vf.EasyScore();
const system = vf.System();

system.addStave({
    voices: [score.voice(score.notes('C#5/q, B4, A4, G#4'))]
}).addClef('treble').addTimeSignature('4/4');

vf.draw();
