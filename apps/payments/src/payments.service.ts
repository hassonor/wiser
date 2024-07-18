import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { CreateChargeDto } from "@app/common/dto/create-charge.dto";

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get("STRIPE_SECRET_KEY"),
    {
      apiVersion: "2024-06-20"
    }
  );

  constructor(
    private readonly configService: ConfigService
  ) {
  }

  async createCharge({ amount }: CreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      payment_method_types: ["card"],
      currency: "usd",
      payment_method: "pm_card_visa"
    });
    return paymentIntent;
  }

}
