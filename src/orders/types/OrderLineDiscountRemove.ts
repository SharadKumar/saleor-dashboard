/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderLineDiscountRemove
// ====================================================

export interface OrderLineDiscountRemove_orderLineDiscountRemove_errors {
  __typename: "OrderError";
  code: OrderErrorCode;
  field: string | null;
}

export interface OrderLineDiscountRemove_orderLineDiscountRemove {
  __typename: "OrderLineDiscountRemove";
  errors: OrderLineDiscountRemove_orderLineDiscountRemove_errors[];
}

export interface OrderLineDiscountRemove {
  orderLineDiscountRemove: OrderLineDiscountRemove_orderLineDiscountRemove | null;
}

export interface OrderLineDiscountRemoveVariables {
  orderLineId: string;
}
