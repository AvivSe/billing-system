import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Transaction from "../transaction/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>
  ) {}

  getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async create(createTransactionDto: Transaction): Promise<Transaction> {
    const transaction = Transaction.create(createTransactionDto)
    await transaction.save();
    return transaction;
  }
}
