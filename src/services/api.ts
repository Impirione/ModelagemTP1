import seedDatabase from '../../data/db.json'

const STORAGE_KEY = 'vianuvem:database'

type Database = {
  processos: any[]
  users: any[]
}

function cloneSeed(): Database {
  return JSON.parse(JSON.stringify(seedDatabase)) as Database
}

function ensureDatabase(database: Partial<Database> | null | undefined): Database {
  return {
    processos: Array.isArray(database?.processos) ? database!.processos : [],
    users: Array.isArray(database?.users) ? database!.users : [],
  }
}

function readDatabase(): Database {
  if (typeof window === 'undefined') {
    return cloneSeed()
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    const fresh = cloneSeed()
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
    return fresh
  }

  try {
    return ensureDatabase(JSON.parse(raw))
  } catch {
    const fresh = cloneSeed()
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
    return fresh
  }
}

function writeDatabase(database: Database) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(database))
}

function generateId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function nextNumeroProcesso(processos: any[], tipoOperacao: string) {
  const year = new Date().getFullYear()
  const prefix = tipoOperacao === 'compra' ? 'CMP' : 'VND'
  const pattern = new RegExp(`^${prefix}-${year}-(\\d+)$`)

  const highestSequence = processos.reduce((highest, processo) => {
    const match = String(processo.numeroProcesso || '').match(pattern)
    if (!match) return highest
    const sequence = Number.parseInt(match[1], 10)
    return Number.isNaN(sequence) ? highest : Math.max(highest, sequence)
  }, 0)

  return `${prefix}-${year}-${String(highestSequence + 1).padStart(3, '0')}`
}

export async function getProcessos() {
  return readDatabase().processos
}

export async function getProcesso(id: string) {
  const processo = readDatabase().processos.find((item) => item.id === id)
  if (!processo) throw new Error('Failed to fetch processo')
  return processo
}

export async function getUsers() {
  return readDatabase().users
}

export async function createProcesso(processo: any) {
  const database = readDatabase()
  const agora = new Date().toISOString()
  const novoProcesso = {
    ...processo,
    id: processo.id || generateId('proc'),
    numeroProcesso: processo.numeroProcesso || nextNumeroProcesso(database.processos, processo.tipoOperacao),
    createdAt: processo.createdAt || agora,
    updatedAt: agora,
  }

  database.processos.unshift(novoProcesso)
  writeDatabase(database)
  return novoProcesso
}

export async function updateProcesso(id: string, processo: any) {
  const database = readDatabase()
  const index = database.processos.findIndex((item) => item.id === id)
  if (index === -1) throw new Error('Failed to update processo')

  const updated = {
    ...database.processos[index],
    ...processo,
    id,
    updatedAt: new Date().toISOString(),
  }

  database.processos[index] = updated
  writeDatabase(database)
  return updated
}

export async function deleteProcesso(id: string) {
  const database = readDatabase()
  const before = database.processos.length
  database.processos = database.processos.filter((item) => item.id !== id)
  writeDatabase(database)
  return { deleted: before - database.processos.length }
}

export async function createUser(user: any) {
  const database = readDatabase()
  const novoUsuario = {
    ...user,
    id: user.id || generateId('usr'),
    createdAt: user.createdAt || new Date().toISOString(),
  }

  database.users.unshift(novoUsuario)
  writeDatabase(database)
  return novoUsuario
}

export async function updateUser(id: string, user: any) {
  const database = readDatabase()
  const index = database.users.findIndex((item) => item.id === id)
  if (index === -1) throw new Error('Failed to update user')

  const updated = {
    ...database.users[index],
    ...user,
    id,
  }

  database.users[index] = updated
  writeDatabase(database)
  return updated
}

export async function deleteUser(id: string) {
  const database = readDatabase()
  const before = database.users.length
  database.users = database.users.filter((item) => item.id !== id)
  writeDatabase(database)
  return { deleted: before - database.users.length }
}
