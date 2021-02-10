import useNotifier from "@saleor/hooks/useNotifier";
import { OrderDiscountCommonInput } from "@saleor/orders/components/OrderLineDiscountModal/types";
import {
  useOrderLineDiscountRemoveMutation,
  useOrderLineDiscountUpdateMutation
} from "@saleor/orders/mutations";
import { OrderDetails_order } from "@saleor/orders/types/OrderDetails";
import React, { createContext } from "react";
import { useIntl } from "react-intl";

import {
  getOrderLineDiscount,
  getParsedDiscountData
} from "../OrderDiscountProvider/utils";
import { GetOrderLineDiscountProviderValues } from "./types";
import { getDiscountNotifierData, useDiscountDialog } from "./utils";

export interface OrderLineDiscountProviderValues {
  isLoadingOrderLineDiscount: boolean;
  addOrderLineDiscount: (data: OrderDiscountCommonInput) => void;
  removeOrderLineDiscount: () => void;
  orderLineDiscount?: OrderDiscountCommonInput;
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

interface DiscountProviderProps {
  children: React.ReactNode;
  order: OrderDetails_order;
}

const DiscountContext = createContext<GetOrderLineDiscountProviderValues>({});

export const OrderLineDiscountProvider: React.FC<DiscountProviderProps> = ({
  children,
  order
}) => {
  const intl = useIntl();
  const notify = useNotifier();
  const { isDialogOpen, openDialog, closeDialog } = useDiscountDialog();

  const [
    orderLineDiscountAddOrUpdate,
    orderLineDiscountAddOrUpdateOpts
  ] = useOrderLineDiscountUpdateMutation({});

  const [
    orderLineDiscountRemove,
    orderLineDiscountRemoveOpts
  ] = useOrderLineDiscountRemoveMutation({});

  const handleDiscountDataSubmission = (errors: any[]) => {
    closeDialog();
    notify(getDiscountNotifierData(errors, intl));
  };

  const addOrUpdateOrderLineDiscount = (orderLineId: string) => (
    input: OrderDiscountCommonInput
  ) =>
    orderLineDiscountAddOrUpdate({
      variables: { orderLineId, input: getParsedDiscountData(input) }
    });

  const removeOrderLineDiscount = (orderLineId: string) => () =>
    orderLineDiscountRemove({ variables: { orderLineId } });

  const isLoading =
    orderLineDiscountRemoveOpts.loading ||
    orderLineDiscountAddOrUpdateOpts.loading;

  const getDiscountProviderValues = (
    orderLineId: string
  ): OrderLineDiscountProviderValues => ({
    addOrderLineDiscount: addOrUpdateOrderLineDiscount(orderLineId),
    removeOrderLineDiscount: removeOrderLineDiscount(orderLineId),
    orderLineDiscount: getOrderLineDiscount(order, orderLineId),
    isDialogOpen,
    isLoadingOrderLineDiscount: isLoading,
    closeDialog,
    openDialog
  });

  return (
    <DiscountContext.Provider value={getDiscountProviderValues}>
      {children}
    </DiscountContext.Provider>
  );
};

interface DiscountConsumerProps {
  children: React.ReactNode;
  orderLineId: string;
}

export const OrderLineDiscountConsumer: React.FC<DiscountConsumerProps> = ({
  children,
  orderLineId
}) => (
  <DiscountContext.Consumer>
    {(getValues: GetOrderLineDiscountProviderValues) =>
      children(getValues(orderLineId))
    }
  </DiscountContext.Consumer>
);
