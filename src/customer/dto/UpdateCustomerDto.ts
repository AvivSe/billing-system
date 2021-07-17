import { IsAlphanumeric, IsEmail, IsEnum, IsOptional, Length } from "class-validator";
import { Gender } from "../customer.entity";

class UpdateCustomerDto {

  @Length(36, 36)
  id: string;

  @Length(2, 60)
  @IsAlphanumeric()
  @IsOptional()
  firstName: string;

  @Length(2, 60)
  @IsAlphanumeric()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @Length(2, 60)
  @IsAlphanumeric()
  @IsOptional()
  country: string;

  @Length(2, 60)
  @IsAlphanumeric()
  @IsOptional()
  city: string;

  @Length(2, 60)
  @IsAlphanumeric()
  @IsOptional()
  street: string;

  @Length(2, 60)
  @IsOptional()
  phone: string;

}

export default UpdateCustomerDto;
