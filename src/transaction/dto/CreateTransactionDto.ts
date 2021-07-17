import { IsAlphanumeric, Length } from "class-validator";

class CreateTransactionDto {
  @Length(36, 36)
  customerId: string;

  @Length(2, 60)
  totalPrice: string;

  @Length(2, 60)
  @IsAlphanumeric()
  currency: string;

  @Length(2, 60)
  creditCardType: string;

  @Length(2, 60)
  @IsAlphanumeric()
  creditCardNumber: string;

}

export default CreateTransactionDto;
