import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Transaction from "../transaction/transaction.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import CreateTransactionDto from "./dto/CreateTransactionDto";
import UpdateTransactionDto from "./dto/UpdateTransactionDto";

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>
  ) {}

  get(): Promise<Transaction[]> {
    return this.transactionRepository.find({ relations: ['customer']});
  }

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = Transaction.create(createTransactionDto)
    await transaction.save();
    return await Transaction.findOneOrFail(transaction.id, { relations: ['customer']});
  }

  async update(createTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    await this.transactionRepository.update(createTransactionDto.id, createTransactionDto);
    return this.transactionRepository.findOneOrFail(createTransactionDto.id, { relations: ['customer'] });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.transactionRepository.delete(id);
  }
}
