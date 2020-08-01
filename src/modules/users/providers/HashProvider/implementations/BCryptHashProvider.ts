import { hash, compare } from 'bcryptjs'
import IHashProvider from '../models/IHashProvider'

class BCryptHashProvider implements IHashProvider{
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }
  public async compare(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash)
  }
}

export default BCryptHashProvider
