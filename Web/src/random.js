export const rollPercentile = () => rollD(100);

export const rollTableDice = () => rollD(2); // Roll 1d2 to determine whether to use event table 1 or 2

export const rollMultipleD = (diceSize, diceCount = 1, modifier = 0) =>
  [...Array(diceCount + 1).keys()].reduce(total => total + rollD(diceSize)) +
  modifier;

export const rollD = diceSize => generateRandom(1, diceSize);

export const generateRandom = (min, max) => {
  const rand = min + Math.random() * (max - min);
  return Math.round(rand);
};
