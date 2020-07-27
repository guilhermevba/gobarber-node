import Appointment from "@appointments/infra/typeorm/entitites/appointments.model"
import createAppointmentDTO from "@appointments/dto/ICreateAppointmentDTO";

export default interface IAppointmentsRepository{
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: createAppointmentDTO): Promise<Appointment>
}
