import { OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Transaction from "../../transaction/transaction.entity";
import { Length, IsAlphanumeric, IsEmail, IsEnum } from "class-validator";
import { Gender } from "../customer.entity";

class CreateCustomerDto {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Length(2, 60)
  @IsAlphanumeric()
  firstName: string;

  @Length(2, 60)
  @IsAlphanumeric()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(Gender)
  gender: Gender;

  @Length(2, 60)
  @IsAlphanumeric()
  country: string;

  @Length(2, 60)
  @IsAlphanumeric()
  city: string;

  @Length(2, 60)
  @IsAlphanumeric()
  street: string;

  @Length(2, 60)
  phone: string;

  @OneToMany(() => Transaction, transaction => transaction.customer)
  transactions: Transaction[];
}

export default CreateCustomerDto;
