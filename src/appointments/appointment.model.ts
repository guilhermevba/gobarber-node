import {uuid} from 'uuidv4'

class Model{
  id: string;
  provider: string;
  date: Date;

  constructor ({ provider, date }: Omit<Model, 'id'>){
    this.id = uuid()
    this.provider = provider
    this.date = date
  }
}

export default Model
