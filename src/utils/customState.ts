export function useCustomState(defaultValue: any) {
  let value = defaultValue

  function getValue() {
    return value
  }

  function setValue(newValue: any) {
    value = newValue
  }

  return [getValue, setValue];
}