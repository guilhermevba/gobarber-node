export default interface IHashProvider{
  generateHash(payload: string): Promise<string>
  compare(payload: string, hash: string): Promise<boolean>
}
