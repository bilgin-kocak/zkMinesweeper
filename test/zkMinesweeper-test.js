//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected

const chai = require('chai');
const path = require('path');

const wasm_tester = require('circom_tester').wasm;

const F1Field = require('ffjavascript').F1Field;
const Scalar = require('ffjavascript').Scalar;
exports.p = Scalar.fromString(
  '21888242871839275222246405745257275088548364400416034343698204186575808495617'
);
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe('zkMinesweeper', function () {
  this.timeout(100000000);

  it('Correct Solution', async () => {
    const circuit = await wasm_tester(
      'contracts/circuits/zkMinesweeper.circom'
    );
    await circuit.loadConstraints();

    const INPUT = {
      feedbacks: [
        9, 2, 2, 9, 2, 9, 1, 0, 0, 0, 3, 9, 2, 1, 2, 1, 1, 0, 0, 0, 9, 3, 2, 0,
        0, 0, 0, 0, 0, 0, 2, 9, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 2, 9, 2, 0, 0, 0, 0, 0, 1, 2, 4, 9, 2, 0, 0, 0, 0, 0, 1, 9,
        9, 2, 1, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0,
      ],
      pubSolnHash:
        '11414370478817179293890632160603067187506325298598019497210865537850261918304',
      privSolutions: [
        9, 2, 2, 9, 2, 9, 1, 0, 0, 0, 3, 9, 2, 1, 2, 1, 1, 0, 0, 0, 9, 3, 2, 0,
        0, 0, 0, 0, 0, 0, 2, 9, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 2, 9, 2, 0, 0, 0, 0, 0, 1, 2, 4, 9, 2, 0, 0, 0, 0, 0, 1, 9,
        9, 2, 1, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0,
      ],
      privSalt: 25,
    };

    const witness = await circuit.calculateWitness(INPUT, true);

    // console.log(witness);
    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    assert(
      witness[1],
      '11414370478817179293890632160603067187506325298598019497210865537850261918304'
    );
  });

  it('Not Finished Game', async () => {
    const circuit = await wasm_tester(
      'contracts/circuits/zkMinesweeper.circom'
    );
    await circuit.loadConstraints();

    const INPUT = {
      feedbacks: [
        10, 2, 2, 10, 2, 10, 1, 0, 0, 0, 10, 10, 2, 1, 2, 1, 1, 0, 0, 0, 10, 3,
        2, 0, 0, 0, 0, 0, 0, 0, 10, 10, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 2, 10, 2, 0, 0, 0, 0, 0, 1, 2, 4, 10, 2, 0, 0, 0,
        0, 0, 10, 10, 10, 2, 1, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      pubSolnHash:
        '11414370478817179293890632160603067187506325298598019497210865537850261918304',
      privSolutions: [
        9, 2, 2, 9, 2, 9, 1, 0, 0, 0, 3, 9, 2, 1, 2, 1, 1, 0, 0, 0, 9, 3, 2, 0,
        0, 0, 0, 0, 0, 0, 2, 9, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 2, 9, 2, 0, 0, 0, 0, 0, 1, 2, 4, 9, 2, 0, 0, 0, 0, 0, 1, 9,
        9, 2, 1, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0,
      ],
      privSalt: 25,
    };

    const witness = await circuit.calculateWitness(INPUT, true);

    // console.log(witness);
    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    assert(
      witness[1],
      '11414370478817179293890632160603067187506325298598019497210865537850261918304'
    );
  });
});
