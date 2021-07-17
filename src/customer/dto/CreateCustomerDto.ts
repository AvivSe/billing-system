import { IsEmail, IsEnum, Length } from "class-validator";
import { Gender } from "../customer.entity";

class CreateCustomerDto {


  @Length(2, 60)
  firstName: string;

  @Length(2, 60)
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(Gender)
  gender: Gender;

  @Length(2, 60)
  country: string;

  @Length(2, 60)
  city: string;

  @Length(2, 60)
  street: string;

  @Length(2, 60)
  phone: string;

}

export default CreateCustomerDto;
