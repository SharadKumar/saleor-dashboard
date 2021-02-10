/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderDiscountCommonInput, OrderErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderLineDiscountUpdate
// ====================================================

export interface OrderLineDiscountUpdate_orderLineDiscountUpdate_errors {
  __typename: "OrderError";
  code: OrderErrorCode;
  field: string | null;
}

export interface OrderLineDiscountUpdate_orderLineDiscountUpdate {
  __typename: "OrderLineDiscountUpdate";
  errors: OrderLineDiscountUpdate_orderLineDiscountUpdate_errors[];
}

export interface OrderLineDiscountUpdate {
  orderLineDiscountUpdate: OrderLineDiscountUpdate_orderLineDiscountUpdate | null;
}

export interface OrderLineDiscountUpdateVariables {
  input: OrderDiscountCommonInput;
  orderLineId: string;
}
