import { IsAlphanumeric, IsOptional, Length } from "class-validator";

class UpdateTransactionDto {

  @Length(36, 36)
  id: string;

  @Length(36, 36)
  @IsOptional()
  customerId: string;

  @Length(2, 60)
  @IsOptional()
  totalPrice: string;

  @Length(2, 60)
  @IsAlphanumeric()
  @IsOptional()
  currency: string;

  @Length(2, 60)
  @IsAlphanumeric()
  @IsOptional()
  creditCardType: string;

  @Length(2, 60)
  @IsAlphanumeric()
  @IsOptional()
  creditCardNumber: string;

}

export default UpdateTransactionDto;
