const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }
  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this.process(message, key, 'encrypt');
  }
  decrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this.process(message, key, 'decrypt');
  }

  process(message, key, mode) {
    const result = [];
    let keyIndex = 0;

    key = key.toUpperCase();

    for (let i = 0; i < message.length; i++) {
      const char = message[i].toUpperCase();

      if (/[A-Z]/.test(char)) {
        const keyChar = key[keyIndex % key.length];
        const keyShift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);

        let shiftedChar;
        if (mode === 'encrypt') {
          shiftedChar = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) + keyShift) % 26) + 'A'.charCodeAt(0)
        );
        } else {
          shiftedChar = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) - keyShift + 26) % 26) + 'A'.charCodeAt(0)
        );
        }

        result.push(shiftedChar);
        keyIndex++;
      } else {
        result.push(char);
      }
    }

    let output = result.join('');
    if (!this.direct) {
      output = output.split('').reverse().join('');
    }

    return output;
  }
}

module.exports = {
  VigenereCipheringMachine
};
