export function runCalculator(name: string, payload: any) {
  return {
    calculator: name,
    input: payload,
    result: {
      status: "core-stub"
    }
  };
}
