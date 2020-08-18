import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

export default interface IMailTemplateProvider {
  parse(templateDTO: IParseMailTemplateDTO) : Promise<string>
}
