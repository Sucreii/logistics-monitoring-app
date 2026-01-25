export function useValidationRules() {
  const rules = {
    requiredRules: [(v: string | number | boolean | null | undefined) => !!v || 'This is required'],
    email: [
      (v: string | number | boolean | null | undefined) => !!v || 'This is required',
      (v: string) => /\S+@\S+\.\S+/.test(v) || 'Email must be valid',
    ],

    number: [(v: number) => !!v || 'Mobile Number is required'],
  }

  return {
    rules,
  }
}
