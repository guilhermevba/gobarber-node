import IHashProvider from "../models/IHashProvider";

class FakeHashProvider implements IHashProvider{
  public async generateHash (payload: string ): Promise<string> {
    return payload
  }

  public async compare( payload: string, hash: string): Promise<boolean> {
    return payload === hash
  }
}

export default FakeHashProvider
