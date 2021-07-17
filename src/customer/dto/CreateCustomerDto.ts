import { IsAlphanumeric, IsEmail, IsEnum, Length } from "class-validator";
import { Gender } from "../customer.entity";

class CreateCustomerDto {


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

}

export default CreateCustomerDto;
