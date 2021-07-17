import { Module } from "@nestjs/common";
import Transaction from "./transaction/transaction.entity";
import Customer from "./customer/customer.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModule } from "./customer/customer.module";
import { TransactionModule } from "./transaction/transaction.module";
import { join } from "path";
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client", "build"),
      exclude: ["/api*"]
    }),
    TypeOrmModule.forRoot({
    type: "sqlite",
    database: "./database/database.sqlite3",
    entities: [Transaction, Customer],
    synchronize: true
  }),
    CustomerModule,
    TransactionModule],
  controllers: [],
  providers: []
})
export class AppModule {
}
