// Tone Orbs
// Chris Schnaars


// OSCILLATOR SETTINGS
var key = 220;  // LOW A
var tones = [key, (key * 5/4), (key * 4/3), (key * 3/2), (key * 15/8)]; // SERIES OF 5 TONES

// SETUP REVERB EFFECT
var rev = new Tone.Reverb({
	"decay" : 10.6,
	"preDealy" : 0.01
});


// SETUP POLYSYNTH 1
var synth1 = new Tone.PolySynth(6, Tone.Synth, {
	"oscillator" : {
		"type" : "triangle8",
		"phase" : 2.5,
		"detune" : -1200,
		"harmonicity" : 12.5
	},
	"envelope" : {
		"attackCurve" : 'sine',
		"attack" : 0.05,
		"decay" : 0.2,
		"sustain" : 1.5,
		"release" : 3.5
	}
}).connect(rev).toMaster();

// SETUP POLYSYNTH 2
var synth2 = new Tone.PolySynth(6, Tone.Synth, {
	"oscilla2tor" : {
		"type" : "sawtooth",
		"phase" : 2.5,
		"detune" : -1200,
		"harmonicity" : 12.5
	},
	"envelope" : {
		"attackCurve" : 'sine',
		"attack" : 0.5,
		"decay" : 0.2,
		"sustain" : 1.5,
		"release" : 6.5
	}
}).connect(rev).toMaster();

// AMPLITUDE LEVEL MIXING
synth1.volume.value = -4;
synth2.volume.value = -12;

// PLAY TONE ON INTERSECT
function playTone(f) {

	// USED PASSED TONE ID TO FIND THE CORREPSONDING TONE VALUE
	f = tones[f];

	// PLAY BOTH SYNTHS AT TONE
  synth1.triggerAttackRelease(f, '8n');
	synth2.triggerAttackRelease(f, '8n');
	
}
