const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
const UNIQUE_ID_REGEX = /^[A-Za-z0-9]{5}$/

export function isStrongPassword(password: string): boolean {
  return PASSWORD_REGEX.test(password)
}

export function isUniqueId(id: string): boolean {
  return UNIQUE_ID_REGEX.test(id)
}

export function generateUniqueId(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let value = ''
  for (let i = 0; i < 5; i += 1) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return value
}

export function generateDisplayId(prefix: 'H' | 'V'): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let value = prefix
  for (let i = 0; i < 4; i += 1) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return value
}
