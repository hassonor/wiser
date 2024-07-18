import { Injectable, Inject } from "@nestjs/common";
import { CreateReservationDto } from "./reservations/dto/create-reservation.dto";
import { UpdateReservationDto } from "./reservations/dto/update-reservation.dto";
import { ReservationsRepository } from "./reservations.repository";
import { PAYMENTS_SERVICE, UserDto } from "@app/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationsRepository: ReservationsRepository,
              @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy) {
  }


  async create(createReservationDto: CreateReservationDto, { email, _id: userId }: UserDto) {
    return this.paymentsService
      .send("create_charge", {
        ...createReservationDto.charge,
        email
      })
      .pipe(
        map((res) => {
          return this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            timestamp: new Date(),
            userId
          });
        })
      );
  }

  async findAll() {
    return this.reservationsRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto }
    );
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
