/* eslint-disable @typescript-eslint/member-ordering */
import { IMoney } from "@saleor/components/Money";

import {
  OrderDiscountCalculationMode,
  OrderDiscountCommonInput
} from "./types";

const PERMIL = 0.01;
const DEFAULT_AMOUNT = 0;

class DiscountCalculator {
  totalMoney: IMoney;
  discount: OrderDiscountCommonInput;

  constructor(totalMoney, orderDiscount) {
    this.totalMoney = totalMoney;
    this.discount = orderDiscount;
  }

  private getTotalMoney = () => this.totalMoney;

  getCalculatedDiscountAmount = (): number => {
    if (!this.discount) {
      return DEFAULT_AMOUNT;
    }

    const { type, value } = this.discount;

    if (type === OrderDiscountCalculationMode.PERCENTAGE) {
      return value * PERMIL * this.getTotalMoney().amount;
    }

    return value;
  };

  getDiscountedMoney = () => ({
    amount: this.getCalculatedDiscountAmount(),
    currency: this.getTotalMoney().currency
  });

  getTotalMoneyIncludingDiscount = (): IMoney => {
    const { amount: totalAmount, currency } = this.getTotalMoney();

    return this.discount
      ? {
          amount: totalAmount - this.getCalculatedDiscountAmount(),
          currency
        }
      : this.getTotalMoney();
  };
}

const useDiscountCalculator = (
  totalMoney: IMoney,
  discount: OrderDiscountCommonInput
) => new DiscountCalculator(totalMoney, discount);

export default useDiscountCalculator;
