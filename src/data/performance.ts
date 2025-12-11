function gen(seed: number) {
  const arr: number[] = [];
  let v = seed;
  for (let i = 0; i < 60; i++) {
    v += Math.sin(i / 6) * 0.6 + (Math.random() - 0.5) * 0.4;
    arr.push(parseFloat(v.toFixed(2)));
  }
  return arr;
}

export const performance = [gen(10), gen(12), gen(8)];
