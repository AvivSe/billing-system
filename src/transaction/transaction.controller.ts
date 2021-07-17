import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import Transaction from "../transaction/transaction.entity";
import { DeleteResult, UpdateResult } from "typeorm";
import CreateTransactionDto from "./dto/CreateTransactionDto";
import UpdateTransactionDto from "./dto/UpdateTransactionDto";

@Controller('api/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  get(): Promise<Transaction[]> {
    return this.transactionService.get();
  }

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionService.create(createTransactionDto);
  }

  @Put()
  update(@Body() updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    return this.transactionService.update(updateTransactionDto);
  }

  @Delete(':id')
  delete(@Param() params): Promise<DeleteResult> {
    return this.transactionService.delete(params.id);
  }
}
