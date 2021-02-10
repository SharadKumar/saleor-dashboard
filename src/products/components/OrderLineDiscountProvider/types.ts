import { OrderLineDiscountProviderValues } from "./OrderLineDiscountProvider";

export type GetOrderLineDiscountProviderValues = (
  orderLineId: string
) => OrderLineDiscountProviderValues;
