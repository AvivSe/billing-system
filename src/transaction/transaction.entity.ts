import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Customer from "../customer/customer.entity";

@Entity("transaction")
class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  customerId: string;

  @ManyToOne(() => Customer)
  customer: Customer;

  @Column()
  totalPrice: string;

  @Column()
  currency: string;

  @Column()
  creditCardType: string;

  @Column()
  creditCardNumber: string;

}

export default Transaction;
