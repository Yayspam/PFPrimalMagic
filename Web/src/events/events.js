import {
  makeConstantVariable,
  makeVariable,
} from '../state/activePrimalEvents/activePrimalEventsState';

export const events = [
  {
    percentileMin: 1,
    percentileMax: 6,
    title: 'Colour Drain',
    createVariables: cr => ({
      radius: makeConstantVariable(cr * 5), // 5xCR ft
      duration: makeConstantVariable(cr * 10), // CR minutes
      save: makeConstantVariable(15), // DC 15 Will Save
    }),
  },
  {
    percentileMin: 7,
    percentileMax: 10,
    title: 'Centipedes',
    createVariables: () => ({
      centipedeCount: makeVariable(6), // new - centipede count, need to figure out how this works to make the CR total work
    }),
  },
  {
    percentileMin: 11,
    percentileMax: 14,
    title: 'Music',
    createVariables: cr => ({
      duration: makeConstantVariable(cr * 10), // CR minutes
      chantType: makeVariable(4), // 1d4; 1=Ulfen battle chants, 2=Chelish opera arias, 3=Desnan Prayers, 4=Vudrani monastic chants
    }),
  },
  {
    percentileMin: 15,
    percentileMax: 18,
    title: 'Zone of Unluck',
    createVariables: cr => ({
      radius: makeConstantVariable(cr * 5), // 5xCR ft
      duration: makeConstantVariable(cr * 10 * 60), // CR hours
    }),
  },
  {
    percentileMin: 19,
    percentileMax: 22,
    title: 'Mirror Image',
    createVariables: () => ({}),
  },
  {
    percentileMin: 23,
    percentileMax: 26,
    title: 'Pit',
    createVariables: cr => ({
      depth: makeConstantVariable(cr * 10), // 10xCR ft
    }),
  },
  {
    percentileMin: 27,
    percentileMax: 32,
    title: 'Tiny Object Rain',
    createVariables: cr => ({
      radius: makeConstantVariable(cr * 5), // 5xCR ft
      duration: makeConstantVariable(cr), // CR rounds
    }),
  },
  {
    percentileMin: 33,
    percentileMax: 38,
    title: 'Heal',
    createVariables: cr => ({
      casterLevel: makeConstantVariable(cr), // CL = CR
    }),
  },
  {
    percentileMin: 39,
    percentileMax: 44,
    title: 'Harm',
    createVariables: cr => ({
      casterLevel: makeConstantVariable(cr), // CL = CR
    }),
  },
  {
    percentileMin: 45,
    percentileMax: 48,
    title: 'Darkness',
    createVariables: cr => ({
      depth: makeConstantVariable(cr * 10), // 10xCR ft
    }),
  },
  {
    percentileMin: 49,
    percentileMax: 54,
    title: 'Elemental Uprising',
    createVariables: () => ({
      elementalCount: makeVariable(6), // new - elemental count, need to figure out how this works to make the CR total work
    }),
  },
  {
    percentileMin: 55,
    percentileMax: 62,
    title: 'Aurora Borealis',
    createVariables: cr => ({
      elementalCount: makeVariable(6), // new - elemental count, need to figure out how this works to make the CR total work
      save: makeConstantVariable(cr + 10), // DC 10 + cr Will Save
      duration: makeConstantVariable(cr), // CR rounds
    }),
  },
  {
    percentileMin: 63,
    percentileMax: 68,
    title: 'Mass Delusion',
    createVariables: cr => ({
      creatureCount: makeVariable(cr), // 1d(cr) creatures confused
      save: makeConstantVariable(cr + 10), // DC 10 + cr Will Save
    }),
  },
  {
    percentileMin: 69,
    percentileMax: 74,
    title: 'Energy Storm',
    createVariables: cr => ({
      energyType: makeVariable(4), // 1d4; 1=acid, 2=cold, 3=electricity, 4=fire
      radius: makeConstantVariable(cr * 5), // 5xCR ft
      damage: makeConstantVariable(cr * 2), // 2 damage per CR
      duration: makeConstantVariable(cr), // CR rounds
      save: makeConstantVariable(cr + 10), // DC 10 + cr Reflex Save
    }),
  },
  {
    percentileMin: 75,
    percentileMax: 78,
    title: 'Telekinesis',
    createVariables: cr => ({
      radius: makeConstantVariable(cr * 10), // 10xCR ft
      cmb: makeConstantVariable(cr + 10), // CMB of 10 + CR
    }),
  },
  {
    percentileMin: 79,
    percentileMax: 88,
    title: 'Telekinesis',
    createVariables: cr => ({
      rodOfWonderPercentile: makeVariable(100), // rod of wander percentile roll
      radius: makeConstantVariable(cr * 10), // 10xCR ft
      cmb: makeConstantVariable(cr + 10), // CMB of 10 + CR
    }),
  },
  {
    percentileMin: 89,
    percentileMax: 94,
    title: 'Telekinesis',
    createVariables: cr => ({
      save: makeConstantVariable(cr + 10), // DC 10 + cr Will Save
      distance: makeConstantVariable(cr * 5), // 5xCR ft - only for one creature? Not sure on this one
    }),
  },
  {
    percentileMin: 95,
    percentileMax: 98,
    title: 'Magic Jar',
    createVariables: cr => ({
      save: makeConstantVariable(cr + 10), // DC 10 + cr Will Save
      stunDuration: makeVariable(4), // 1d4 rounds stun duration
      bodyStopDuration: makeConstantVariable(cr), // CR rounds of body swap
    }),
  },
  {
    percentileMin: 99,
    percentileMax: 100,
    title: 'Two Simultaneous Events',
    createVariables: () => ({
      percentileOne: makeVariable(100), // First event percentile
      percentileTwo: makeVariable(100), // Second even percentile
    }), // Not sure how to do this one...
  },
];

export const getEvent = percentileRoll => {
  const eventsInRange = events.filter(
    e => percentileRoll >= e.percentileMin && percentileRoll <= e.percentileMax
  );

  if (eventsInRange.length === 0) {
    return events[0];
  }

  return eventsInRange[0];
};
