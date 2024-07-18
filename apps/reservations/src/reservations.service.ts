import { Injectable, Inject } from "@nestjs/common";
import { CreateReservationDto } from "./reservations/dto/create-reservation.dto";
import { UpdateReservationDto } from "./reservations/dto/update-reservation.dto";
import { ReservationsRepository } from "./reservations.repository";
import { PAYMENTS_SERVICE } from "@app/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationsRepository,
              @Inject(PAYMENTS_SERVICE) paymentService: ClientProxy) {
  }

  async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId
    });
  }

  async findAll() {
    return this.reservationRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto }
    );
  }

  async remove(_id: string) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
