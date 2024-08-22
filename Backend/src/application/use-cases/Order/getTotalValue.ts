import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";

export const getTotalvalue = (orderRepository: IOrderRepository) => {
  const execute = async (timeframe: string) => {
    const totalValue = await orderRepository.getTotalOrderValue(timeframe);

    return totalValue;
  };
  return {
    execute,
  };
};
