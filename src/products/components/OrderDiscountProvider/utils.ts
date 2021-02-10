import { OrderDiscountCommonInput } from "@saleor/orders/components/OrderLineDiscountModal/types";
import {
  OrderDetails_order,
  OrderDetails_order_discounts,
  OrderDetails_order_lines
} from "@saleor/orders/types/OrderDetails";
import { OrderDiscountType } from "@saleor/types/globalTypes";

export const getManualOrderDiscount = (order: OrderDetails_order) =>
  order ? getOrderDiscount(order, OrderDiscountType.MANUAL) : null;

export const getOrderDiscount = (
  order: OrderDetails_order,
  discountType: OrderDiscountType
): OrderDetails_order_discounts =>
  order.discounts.find(({ type }) => type === discountType);

export const getOrderLineDiscount = (
  order: OrderDetails_order,
  orderLineId: string
) =>
  order.lines.find(
    ({ id, discount }: OrderDetails_order_lines) => id === orderLineId
  )?.discount;

export const getParsedDiscountData = ({
  value,
  calculationMode,
  reason
}: OrderDiscountCommonInput) => ({ value, valueType: calculationMode, reason });
