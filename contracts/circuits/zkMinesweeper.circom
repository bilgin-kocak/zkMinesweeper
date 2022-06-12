pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/comparators.circom";
include "../../node_modules/circomlib/circuits/bitify.circom";
include "../../node_modules/circomlib/circuits/poseidon.circom";

template MineSweeper(fieldSize) {
    // Public inputs
    signal input feedbacks[fieldSize*fieldSize];
    // signal input mineCounts
    signal input pubSolnHash;

    // Private inputs
    signal input privSolutions[fieldSize*fieldSize];
    signal input privSalt;

    // Output
    signal output solnHashOut;

    signal hashes[fieldSize];

    var size = fieldSize*fieldSize;
    var j = 0;
    var k = 0;
    component lessThan[2*size];
    component poseidons[fieldSize];
    component equalGuess[10];
    component equalSoln[10];
    var equalIdx = 0;

    // Create a constraint that the solution and guess digits are all less than 11.
    for (j=0; j<size; j++) {
        lessThan[j] = LessThan(4);
        lessThan[j].in[0] <== feedbacks[j];
        lessThan[j].in[1] <== 11;
        lessThan[j].out === 1;
        lessThan[j+size] = LessThan(4);
        lessThan[j+size].in[0] <== privSolutions[j];
        lessThan[j+size].in[1] <== 11;
        lessThan[j+size].out === 1;
    }

    // Count corrects
    var correct = 0;
    component equalSol[size];
    component equalUnknown[size];

    // Here we will count correct solution
    // Also for unknown regions we have value 10 we consider unknown as correct solution.
    for (j=0; j<size; j++) {
        equalUnknown[j] = IsEqual();
        equalUnknown[j].in[0] <== feedbacks[j];
        equalUnknown[j].in[1] <== 10;


        equalSol[j] = IsEqual();
        equalSol[j].in[0] <== feedbacks[j];
        equalSol[j].in[1] <== privSolutions[j];
        correct += equalSol[j].out;
        correct += equalUnknown[j].out;
        
    }

    // Create a constraint around the number of correct feedback
    // At the end of the game all feedback must be equal to the solution.
    component equalCorrect = IsEqual();
    equalCorrect.in[0] <== size;
    equalCorrect.in[1] <== correct;
    equalCorrect.out === 1;

    // Poseidon hash is obtained for each row in the field. Since Poseidon maximum input is 16.
    for (var i = 0; i < fieldSize; i++){
        poseidons[i] = Poseidon(fieldSize);
        for (var j = 0; j < fieldSize;j++){
            poseidons[i].inputs[j] <== privSolutions[i*fieldSize + j];
        }
        hashes[i] <== poseidons[i].out;
    }

    // We calculate hash of hashes also salt value
    component poseidon = Poseidon(fieldSize + 1);
    poseidon.inputs[0] <== privSalt;
    for (var i = 0; i < fieldSize; i++){
        poseidon.inputs[i + 1] <== hashes[i];
    }


    solnHashOut <== poseidon.out;
    // log(solnHashOut);
    // log(pubSolnHash);
    pubSolnHash === solnHashOut;

 }

 component main {public [feedbacks, pubSolnHash]} = MineSweeper(10);