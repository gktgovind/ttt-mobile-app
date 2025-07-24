type BankRates = {
  [bank: string]: {
    [tenure: number]: number; // monthly interest rate
  };
};

const bankRates: BankRates = {
  Kotak: { 3: 0.12 / 12, 6: 0.12 / 12, 9: 0.14 / 12, 12: 0.14 / 12, 18: 0.15 / 12, 24: 0.15 / 12 },
  IndusInd: {
    3: 0.13 / 12,
    6: 0.13 / 12,
    9: 0.13 / 12,
    12: 0.12 / 12,
    18: 0.12 / 12,
    24: 0.12 / 12,
    36: 0.12 / 12,
  },
  ICICI: { 3: 0.13 / 12, 6: 0.14 / 12, 9: 0.14 / 12, 12: 0.14 / 12 },
  Axis: { 3: 0.13 / 12, 6: 0.13 / 12, 9: 0.14 / 12, 12: 0.14 / 12 },
  Yes: { 3: 0.13 / 12, 6: 0.13 / 12, 9: 0.14 / 12, 12: 0.14 / 12, 18: 0.15 / 12, 24: 0.15 / 12 },
  RBL: { 3: 0.13 / 12, 6: 0.14 / 12, 9: 0.15 / 12, 12: 0.15 / 12, 18: 0.15 / 12, 24: 0.15 / 12 },
  Corporation: { 6: 0.16 / 12, 12: 0.18 / 12, 24: 0.18 / 12 },
  Baroda: {
    3: 0.13 / 12,
    6: 0.13 / 12,
    9: 0.13 / 12,
    12: 0.13 / 12,
    18: 0.15 / 12,
    24: 0.15 / 12,
    36: 0.15 / 12,
  },
  HSBC: { 3: 0.12 / 12, 6: 0.12 / 12, 9: 0.13 / 12, 12: 0.13 / 12, 18: 0.13 / 12 },
  IDBI: { 3: 0.13 / 12, 6: 0.13 / 12, 9: 0.13 / 12, 12: 0.13 / 12 },
  Standard: { 3: 0.13 / 12, 6: 0.13 / 12, 9: 0.14 / 12, 12: 0.14 / 12, 18: 0.15 / 12, 24: 0.15 / 12 },
};

const calculateEMI = (principal: number, rate: number, tenure: number): number => {
  // EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
  const emi =
    (principal * rate * Math.pow(1 + rate, tenure)) /
    (Math.pow(1 + rate, tenure) - 1);
  return emi;
};

export const getLowestEMI = (amount: number): { emi: number; bank: string; tenure: number } => {
  let lowestEMI = Infinity;
  let bestBank = "";
  let bestTenure = 0;

  for (const bank in bankRates) {
    const tenures = bankRates[bank];
    for (const tenure in tenures) {
      const rate = tenures[+tenure];
      const emi = calculateEMI(amount, rate, +tenure);
      if (emi < lowestEMI) {
        lowestEMI = emi;
        bestBank = bank;
        bestTenure = +tenure;
      }
    }
  }

  return {
    emi: Math.round(lowestEMI),
    bank: bestBank,
    tenure: bestTenure,
  };
};

type EMIOption = {
  price: number;
  month: number;
  interest: number;
  extraInterest: number;
  totalCost: number;
};

export const getAllEMIs = (amount: number): { [bank: string]: EMIOption[] } => {
  const allEMIs: { [bank: string]: EMIOption[] } = {};

  for (const bank in bankRates) {
    const tenures = bankRates[bank];
    const plans: EMIOption[] = [];

    for (const tenure in tenures) {
      const month = +tenure;
      const rate = tenures[month];

      const emi = calculateEMI(amount, rate, month);
      const roundedEMI = Math.round(emi);
      const totalCost = roundedEMI * month;
      const extraInterest = totalCost - amount;
      const interestPA = rate * 12 * 100;

      plans.push({
        price: roundedEMI,
        month,
        interest: interestPA,
        extraInterest,
        totalCost,
      });
    }

    allEMIs[bank] = plans.sort((a, b) => a.month - b.month); // sort by tenure ascending
  }

  return allEMIs;
};