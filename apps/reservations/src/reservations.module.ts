import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from "@app/common";
import { ConfigModule } from "@nestjs/config";
import { ReservationsRepository } from "./reservations.repository";
import { ReservationDocument, ReservationSchema } from "./reservations/models/reservation.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    DatabaseModule.forFeature([{name: ReservationDocument.name, schema: ReservationSchema}])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
