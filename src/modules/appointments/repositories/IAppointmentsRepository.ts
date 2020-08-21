import Appointment from "@appointments/infra/http/typeorm/entities/appointment"
import createAppointmentDTO from "@appointments/dto/ICreateAppointmentDTO";
import IFindAllInMonthOfProviderDTO from "@appointments/dto/IFindAllInMonthOfProviderDTO";
import IFindAllInDayOfProviderDTO from "@appointments/dto/IFindAllInDayOfProviderDTO";
import IFindByUserAndDateDTO from "@appointments/dto/IFindByProviderAndDateDTO";

export default interface IAppointmentsRepository{
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByProviderAndDate(data: IFindByUserAndDateDTO): Promise<Appointment | undefined>;
  create(data: createAppointmentDTO): Promise<Appointment>;
  findAllInMonthOfProvider(data: IFindAllInMonthOfProviderDTO): Promise<Appointment[]>
  findAllInDayOfProvider(data: IFindAllInDayOfProviderDTO): Promise<Appointment[]>
}
