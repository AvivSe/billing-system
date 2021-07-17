import { Body, Controller, Get, Post } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import Transaction from "../transaction/transaction.entity";

@Controller('/api/transaction')
export class CustomerController {
  constructor(private readonly customerController: CustomerController) {}

  @Get()
  get(): Promise<CustomerController[]> {
    return this.customerController.get();
  }

  @Post()
  create(@Body() createTransactionDto: Transaction): Promise<Transaction> {
    return this.customerController.create(createTransactionDto);
  }
}
