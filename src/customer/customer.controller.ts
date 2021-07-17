import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import Customer from "./customer.entity";
import CreateCustomerDto from "./dto/CreateCustomerDto";
import UpdateCustomerDto from "./dto/UpdateCustomerDto";

@Controller("api/customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {
  }

  @Get()
  get(): Promise<Customer[]> {
    return this.customerService.get();
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Put()
  update(@Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(updateCustomerDto);
  }

  @Delete(":id")
  delete(@Param() params): Promise<Customer> {
    return this.customerService.delete(params.id);
  }

  @Get("migrate")
  migrate(): any {
    return this.customerService.migrate();
  }
}
