import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { NOTIFICATIONS_SERVICE, CreateChargeDto } from "@app/common";
import { ClientProxy } from "@nestjs/microservices";
import { PaymentsCreateChargeDto } from "../dto/payments-create-charge.dto";

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get("STRIPE_SECRET_KEY"),
    {
      apiVersion: "2024-06-20"
    }
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy
  ) {
  }

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      payment_method_types: ["card"],
      currency: "usd",
      payment_method: "pm_card_visa"
    });
    this.notificationsService.emit("notify_email", {
      email,
      text: `Your payment of $${amount} has completed successfully.`
    });
    return paymentIntent;
  }

}
