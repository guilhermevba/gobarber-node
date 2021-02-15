import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListProviderMonthAvailabilityService from '@appointments/services/ListProviderMonthAvailabilityService'

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query
    const { provider_id } = request.params
    const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService)

    const providerMonthAvailability = await listProviderMonthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    })
    return response.send(providerMonthAvailability)
  }
}
