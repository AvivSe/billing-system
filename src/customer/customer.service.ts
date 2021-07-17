import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import Customer, { Gender } from "./customer.entity";
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

  async migrate(): Promise<any> {
    // console.log(MOCK_DATA);
    //
    //
    // for (let i = 0; i < MOCK_DATA.length; i++) {
    //   const {
    //     first_name: firstName,
    //     last_name: lastName,
    //     email,
    //     gender,
    //     country,
    //     city,
    //     street,
    //     phone,
    //     total_price: totalPrice,
    //     currency,
    //     cerdit_card_type: creditCardType,
    //     cerdit_card_number: creditCardNumber,
    //
    //   } = MOCK_DATA[i];
    //
    //   try {
    //     console.log(firstName);
    //     const customer = await Customer.create({ firstName, lastName, email, gender: Gender[gender], country, city, street, phone });
    //     await customer.save();
    //     const transaction = Transaction.create({
    //       totalPrice,
    //       currency,
    //       creditCardType,
    //       creditCardNumber,
    //       customerId: customer.id
    //     })
    //     await transaction.save();
    //   } catch (e) {
    //     console.log(e);
    //   }
    //
    // }
    return "OK";
  }
}
