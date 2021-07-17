import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Transaction from "../transaction/transaction.entity";

export enum Gender {
  Male,
  Female,
  Bi
}

@Entity()
class Customer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  gender: Gender;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  phone: string;

  @OneToMany(() => Transaction, transaction => transaction.customer)
  transactions: Transaction[];

}

export default Customer;
