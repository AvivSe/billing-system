import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import Customer from "./customer.entity";
import Transaction from "../transaction/transaction.entity";
import CreateCustomerDto from "./dto/CreateCustomerDto";
import UpdateCustomerDto from "./dto/UpdateCustomerDto";

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Customer)
    private transactionRepository: Repository<Transaction>
  ) {}

  get(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = Customer.create(createCustomerDto);
    await customer.save();
    return customer;
  }

  update(updateCustomerDto: UpdateCustomerDto): Promise<UpdateResult> {
    return Customer.update(updateCustomerDto.id, updateCustomerDto);
  }

  async delete(id: string): Promise<Customer> {
    const customer = await Customer.findOneOrFail(id, { relations: ['transactions']});
    await this.transactionRepository.delete(customer.transactions.map(({id})=>id))
    return await customer.remove();
  }
}
