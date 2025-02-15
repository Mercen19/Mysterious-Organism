// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherOrg) {
      const similarities = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === otherOrg.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
      const percentOfDNAshared = (similarities / this.dna.length) * 100;
      const percentageTo2Deci = percentOfDNAshared.toFixed(2);
      console.log(`${this.specimenNum} and ${otherOrg.specimenNum} have ${percentageTo2Deci}% DNA in common.`);
    },
    willLikelySurvive() {
      const cOrG = this.dna.filter(el => el === 'C' || el === 'G');
      return cOrG.length / this.dna.length >= 0.6;
    },
    complementStrand() {
      let compStrand = [];
      for (let i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case 'A':
            compStrand.push('T');
            break;
          case 'T':
            compStrand.push('A');
            break;
          case 'C':
            compStrand.push('G');
            break;
          case 'G':
            compStrand.push('C');
            break;
          default:
            break;
        }
      }
      return compStrand;
    }
  }
};

const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
  idCounter++;
}

console.log(survivingSpecimen);

//Test cases
const pAequor = pAequorFactory(1, mockUpStrand());
//const pAequor2 = pAequorFactory(2, mockUpStrand());
console.log(pAequor);
//pAequor.mutate();
//console.log(pAequor.dna);
//console.log(pAequor2);
//pAequor.compareDNA(pAequor2);
//console.log(pAequor.willLikelySurvive());
console.log(pAequor.complementStrand());

