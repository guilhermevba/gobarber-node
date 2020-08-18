import Appointment from "@appointments/infra/http/typeorm/entitites/Appointment"
import createAppointmentDTO from "@appointments/dto/ICreateAppointmentDTO";

export default interface IAppointmentsRepository{
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: createAppointmentDTO): Promise<Appointment>
}
