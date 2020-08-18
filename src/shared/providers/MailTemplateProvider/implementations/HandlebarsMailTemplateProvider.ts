import handlebars from 'handlebars'
import fs from 'fs'
import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

export default class HandlerbarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({file, variables}: IParseMailTemplateDTO): Promise<string> {
    const template = await fs.promises.readFile(file, { encoding: 'utf-8'})
    const parseTemplate = handlebars.compile(template)
    return parseTemplate(variables)
  }
}
