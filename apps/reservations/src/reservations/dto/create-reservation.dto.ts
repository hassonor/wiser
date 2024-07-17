import { Prop } from "@nestjs/mongoose";

export class CreateReservationDto {
  startDate: Date;
  endDate: Date;
  userId: string;
  placeId: string;
  invoiceId: string;
}
