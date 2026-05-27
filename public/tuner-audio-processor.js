// AudioWorkletProcessor for the tuner. Buffers incoming mic frames
// (128-sample blocks from the audio graph) until a full analysis window is
// available, then posts the concatenated Float32Array to the main thread for
// YIN pitch detection.
//
// Worklet code is plain ES2017 — no imports. Served from /tuner-audio-processor.js.

const FRAME_SIZE = 8192;

class TunerAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._buffer = new Float32Array(FRAME_SIZE);
    this._offset = 0;
  }

  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (!channel || channel.length === 0) return true;

    let i = 0;
    while (i < channel.length) {
      const space = FRAME_SIZE - this._offset;
      const take = Math.min(space, channel.length - i);
      this._buffer.set(channel.subarray(i, i + take), this._offset);
      this._offset += take;
      i += take;

      if (this._offset === FRAME_SIZE) {
        const out = new Float32Array(this._buffer);
        this.port.postMessage({ samples: out }, [out.buffer]);
        this._buffer = new Float32Array(FRAME_SIZE);
        this._offset = 0;
      }
    }
    return true;
  }
}

registerProcessor("tuner-audio-processor", TunerAudioProcessor);
